"""
Earnings Copilot - FastAPI Backend
Real SEC data + AI analysis with Auth + Stripe
"""
from fastapi import FastAPI, HTTPException, Request, Depends
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os
import stripe

app = FastAPI(title="Earnings Copilot API")

# Stripe config
stripe.api_key = os.environ.get("STRIPE_SECRET_KEY", "")

# CORS for frontend
allowed_origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://earningscopilot.com",
    "https://www.earningscopilot.com",
    "https://earnings-copilot.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins + ["*"],  # Allow all in dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global state for current analysis
current_data = {}

# Simple auth check (extend with Clerk JWT verification in production)
async def verify_auth(request: Request):
    """Verify user is authenticated. Extend with Clerk JWT verification."""
    # In production, verify Clerk JWT token here
    # For now, allow all requests
    return True

# Subscription check
async def verify_subscription(request: Request):
    """Verify user has active subscription."""
    # In production, check Stripe subscription status
    # For now, allow all requests
    return True


@app.get("/")
async def root():
    return {"message": "Earnings Copilot API", "status": "running"}


@app.get("/api/status")
async def get_status():
    """Health check endpoint for Railway."""
    return {
        "status": "healthy",
        "version": "3.0.0",
        "name": "Earnings Copilot",
        "features": ["SEC EDGAR", "AI Analysis", "Multi-Filing Support", "Drafting Assistant", "Auth + Stripe"]
    }


@app.get("/health")
async def health():
    """Simple health check."""
    return {"status": "ok"}


# ============ STRIPE ENDPOINTS ============

@app.post("/api/stripe/create-checkout-session")
async def create_checkout_session(request: Request):
    """Create Stripe checkout session for subscription."""
    try:
        data = await request.json()
        price_id = data.get("priceId")
        
        # Create checkout session
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=[{
                "price": price_id,
                "quantity": 1,
            }],
            mode="subscription",
            success_url="https://earningscopilot.com/dashboard?session_id={CHECKOUT_SESSION_ID}",
            cancel_url="https://earningscopilot.com/pricing",
        )
        
        return {"sessionId": checkout_session.id, "url": checkout_session.url}
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/api/stripe/webhook")
async def stripe_webhook(request: Request):
    """Handle Stripe webhooks for subscription events."""
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature")
    webhook_secret = os.environ.get("STRIPE_WEBHOOK_SECRET", "")
    
    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, webhook_secret
        )
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid payload")
    except stripe.error.SignatureVerificationError:
        raise HTTPException(status_code=400, detail="Invalid signature")
    
    # Handle the event
    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]
        # TODO: Create user account, activate subscription
        print(f"Payment successful: {session}")
    
    elif event["type"] == "customer.subscription.updated":
        subscription = event["data"]["object"]
        # TODO: Update subscription status in database
        print(f"Subscription updated: {subscription}")
    
    elif event["type"] == "customer.subscription.deleted":
        subscription = event["data"]["object"]
        # TODO: Deactivate subscription in database
        print(f"Subscription cancelled: {subscription}")
    
    return {"status": "success"}


@app.get("/api/stripe/prices")
async def get_prices():
    """Get available subscription prices."""
    # Return your Stripe price IDs
    return {
        "prices": [
            {
                "id": "price_monthly",  # Replace with actual Stripe price ID
                "name": "Monthly",
                "amount": 4900,
                "currency": "usd",
                "interval": "month",
            },
            {
                "id": "price_annual",  # Replace with actual Stripe price ID
                "name": "Annual",
                "amount": 49000,
                "currency": "usd",
                "interval": "year",
            }
        ]
    }


# ============ SEC API ENDPOINTS ============

@app.get("/api/fetch/{ticker}")
async def fetch_data(ticker: str, form_type: str = "10-K", auth=Depends(verify_auth)):
    """Fetch SEC filing data for a ticker. Supports 10-K, 10-Q, 8-K."""
    global current_data
    
    try:
        from src.sec_fetcher import fetch_and_process_filing
        from src.transcript_fetcher import fetch_and_analyze_transcript
        
        ticker = ticker.upper()
        
        # Fetch filing data
        print(f"Fetching {form_type} data for {ticker}...")
        sec_data = fetch_and_process_filing(ticker, form_type)
        
        if "error" in sec_data:
            raise HTTPException(status_code=404, detail=sec_data["error"])
        
        # Fetch earnings transcript
        print(f"Fetching transcript for {ticker}...")
        transcript_data = fetch_and_analyze_transcript(ticker)
        
        # Store for report generation
        current_data[ticker] = {
            "ticker": ticker,
            "company_name": sec_data.get("company_name", ticker),
            "metrics": sec_data.get("metrics", {}),
            "sections": sec_data.get("sections", {}),
            "filing_date": sec_data.get("filing_date"),
            "form_type": form_type,
            "transcript": transcript_data.get("full_content"),
            "transcript_date": transcript_data.get("date"),
            "qa_content": transcript_data.get("qa_content"),
            "sentiment": transcript_data.get("sentiment", {}),
            "management_statements": transcript_data.get("management_statements", []),
        }
        
        return {
            "ticker": ticker,
            "company_name": sec_data.get("company_name", ticker),
            "filing_date": sec_data.get("filing_date"),
            "form_type": form_type,
            "metrics_available": list(sec_data.get("metrics", {}).keys()),
            "sections_loaded": list(sec_data.get("sections", {}).keys()),
            "transcript_date": transcript_data.get("date"),
            "sentiment": transcript_data.get("sentiment", {}),
            "status": "success"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/generate/{ticker}")
async def generate_report(ticker: str, auth=Depends(verify_auth)):
    """Generate earnings prep report using AI."""
    global current_data
    
    try:
        ticker = ticker.upper()
        
        # Auto-fetch if not already loaded
        if ticker not in current_data:
            from src.sec_fetcher import fetch_and_process_filing
            from src.transcript_fetcher import fetch_and_analyze_transcript
            
            sec_data = fetch_and_process_filing(ticker, "10-K")
            if "error" in sec_data:
                raise HTTPException(status_code=404, detail=sec_data["error"])
            
            transcript_data = fetch_and_analyze_transcript(ticker)
            current_data[ticker] = {
                "ticker": ticker,
                "company_name": sec_data.get("company_name", ticker),
                "metrics": sec_data.get("metrics", {}),
                "sections": sec_data.get("sections", {}),
                "filing_date": sec_data.get("filing_date"),
                "transcript": transcript_data.get("full_content"),
                "transcript_date": transcript_data.get("date"),
            }
        
        from src.report_generator import ReportGenerator
        
        gen = ReportGenerator()
        gen.set_data(current_data[ticker])
        
        print(f"Generating report for {ticker}...")
        report = gen.generate_full_report()
        
        return report
        
    except HTTPException:
        raise
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/metrics/{ticker}")
async def get_metrics(ticker: str, auth=Depends(verify_auth)):
    """Get financial metrics for a ticker."""
    try:
        from src.sec_fetcher import extract_financial_metrics, get_cik
        
        ticker = ticker.upper()
        cik = get_cik(ticker)
        
        if not cik:
            raise HTTPException(status_code=404, detail=f"Ticker {ticker} not found")
        
        metrics = extract_financial_metrics(cik)
        
        return {
            "ticker": ticker,
            "cik": cik,
            "metrics": metrics
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/audit/{ticker}")
async def run_audit(ticker: str, form_type: str = "10-K", auth=Depends(verify_subscription)):
    """Run SEC Specialist Agent compliance audit for a ticker. Requires subscription."""
    try:
        from src.sec_agent import SECSpecialistAgent
        
        ticker = ticker.upper()
        
        print(f"Running SEC audit for {ticker} ({form_type})...")
        agent = SECSpecialistAgent()
        results = agent.run_audit(ticker, form_type=form_type)
        
        if "error" in results:
            raise HTTPException(status_code=404, detail=results["error"])
        
        return results
        
    except HTTPException:
        raise
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/draft/{ticker}")
async def draft_section(ticker: str, section: str = "mda", form_type: str = "10-K", auth=Depends(verify_subscription)):
    """Draft a filing section using AI. Requires subscription."""
    try:
        from src.sec_agent import SECSpecialistAgent
        
        ticker = ticker.upper()
        
        print(f"Drafting {section} for {ticker} ({form_type})...")
        agent = SECSpecialistAgent()
        results = agent.run_drafting(ticker, section=section, form_type=form_type)
        
        if "error" in results:
            raise HTTPException(status_code=404, detail=results["error"])
        
        return results
        
    except HTTPException:
        raise
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    print(f"Starting Earnings Copilot API on port {port}...")
    print(f"MODAL_API_KEY configured: {'Yes' if os.environ.get('MODAL_API_KEY') else 'No'}")
    print(f"STRIPE configured: {'Yes' if os.environ.get('STRIPE_SECRET_KEY') else 'No'}")
    uvicorn.run(app, host="0.0.0.0", port=port)
