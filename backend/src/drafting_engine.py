import os
import json
from typing import Dict, List, Optional
from .prompts import DRAFTING_SYSTEM_PROMPT, MDA_DRAFT_PROMPT
from .report_generator import call_llm

class DraftingEngine:
    """
    Core engine for generating SEC filing drafts by synthesizing 
    historical filings with recent earnings transcript data.
    """
    
    def __init__(self, agent_client):
        self.agent = agent_client

    def draft_mda_section(self, filing_type: str, company: str, transcript_data: str, previous_filing_text: str) -> str:
        """
        Generates a draft for the MD&A (Item 7 for 10-K, Part I Item 2 for 10-Q).
        """
        prompt = MDA_DRAFT_PROMPT.format(
            filing_type=filing_type,
            company=company,
            transcript_context=transcript_data[:8000],  # Limit context
            historical_context=previous_filing_text[:5000]
        )
        
        # Use the agent's generate method which calls call_llm
        response = self.agent.generate(
            system_prompt=DRAFTING_SYSTEM_PROMPT,
            user_prompt=prompt
        )
        return response

    def check_8k_materiality(self, event_description: str) -> Dict:
        """
        Analyzes an event to determine if an 8-K filing is required.
        """
        materiality_prompt = f"""Analyze the following event and determine if it requires an 8-K filing.
        
Event Description: {event_description}

Check against these 8-K trigger items:
- Item 1.01: Entry into a Material Definitive Agreement
- Item 1.02: Termination of a Material Definitive Agreement
- Item 2.01: Completion of Acquisition or Disposition of Assets
- Item 2.02: Results of Operations and Financial Condition
- Item 3.01: Notice of Delisting or Failure to Satisfy a Continued Listing Rule
- Item 4.01: Changes in Registrant's Certifying Accountant
- Item 5.01: Changes in Control of Registrant
- Item 5.02: Departure of Directors or Certain Officers
- Item 5.03: Amendments to Articles of Incorporation or Bylaws
- Item 7.01: Regulation FD Disclosure

Respond with:
1. Is filing required? (Yes/No)
2. Which Item(s) apply?
3. Recommended filing deadline (4 business days for most items)
"""
        response = call_llm(DRAFTING_SYSTEM_PROMPT, materiality_prompt, "")
        return {
            "analysis": response,
            "event": event_description
        }

    def highlight_delta(self, current_draft: str, previous_filing: str) -> List[Dict]:
        """
        Identifies 'boilerplate' sections that haven't changed despite business shifts.
        """
        delta_prompt = f"""Compare the current draft with the previous filing and identify 'boilerplate' sections.

CURRENT DRAFT:
{current_draft[:5000]}

PREVIOUS FILING:
{previous_filing[:5000]}

Identify:
1. Sections with identical or near-identical language (potential boilerplate)
2. Areas where the business has changed but the text hasn't been updated
3. Risk factors that may need refresh given current market conditions

Format as a list with severity (High/Medium/Low) for each finding.
"""
        response = call_llm(DRAFTING_SYSTEM_PROMPT, delta_prompt, "")
        return [{
            "analysis": response,
            "type": "delta_highlight"
        }]
