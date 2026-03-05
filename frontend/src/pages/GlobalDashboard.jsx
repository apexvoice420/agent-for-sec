import React, { useState, useEffect } from 'react';
import {
    Zap,
    ShieldCheck,
    Search,
    Bell,
    ArrowUpRight,
    MessageSquare,
    Edit3,
    FileText,
    AlertCircle,
    CheckCircle,
    Clock,
    User
} from 'lucide-react';
import { UserButton } from '@clerk/clerk-react';
import FilingCard from '../components/FilingCard';

const API_BASE = import.meta.env.VITE_API_URL || 'https://earnings-copilot-api.up.railway.app';

const GlobalDashboard = ({ onNavigate, user }) => {
    const [ticker, setTicker] = useState('NVDA');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);
    const [activeMode, setActiveMode] = useState('audit'); // 'audit' or 'draft'
    const [activeForm, setActiveForm] = useState('10-K');
    const [activeSection, setActiveSection] = useState('mda');
    const [editorContent, setEditorContent] = useState('');

    // Fetch data from backend
    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE}/api/fetch/${ticker}?form_type=${activeForm}`);
            const data = await response.json();
            if (data.status === 'success') {
                setResults(data);
            } else {
                setError(data.detail || 'Failed to fetch data');
            }
        } catch (err) {
            setError(`Connection error: ${err.message}`);
        }
        setLoading(false);
    };

    // Run audit
    const runAudit = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE}/api/audit/${ticker}?form_type=${activeForm}`);
            const data = await response.json();
            if (data.error) {
                setError(data.error);
            } else {
                setResults(data);
                setEditorContent(formatAuditReport(data));
            }
        } catch (err) {
            setError(`Audit error: ${err.message}`);
        }
        setLoading(false);
    };

    // Run draft
    const runDraft = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE}/api/draft/${ticker}?section=${activeSection}&form_type=${activeForm}`);
            const data = await response.json();
            if (data.error) {
                setError(data.error);
            } else {
                setResults(data);
                setEditorContent(data.draft || 'Draft generated successfully');
            }
        } catch (err) {
            setError(`Draft error: ${err.message}`);
        }
        setLoading(false);
    };

    const formatAuditReport = (data) => {
        return `# SEC ${data.form_type} Compliance Audit: ${data.company_name}

**Filing Date:** ${data.filing_date || 'N/A'}  
**Transcript Date:** ${data.transcript_date || 'N/A'}

---

## 1. YoY/Period Delta Analysis
${data.yoy_analysis || 'Analysis pending...'}

---

## 2. Strategic Alignment
${data.transcript_alignment || 'Alignment check pending...'}

---

## 3. Redline & Puffery Check
${data.sec_redline || 'Redline check pending...'}
`;
    };

    const userName = user?.firstName || user?.fullName || 'Analyst';
    const userInitials = userName.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';

    return (
        <div className="flex flex-col min-h-screen bg-[#0a0c10] text-gray-300 font-sans selection:bg-emerald-500/30">
            {/* Top Navigation */}
            <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-[#0a0c10]/80 backdrop-blur-xl sticky top-0 z-50">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2 group cursor-pointer" onClick={() => onNavigate('landing')}>
                        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center font-bold text-black shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">E</div>
                        <span className="text-white font-bold tracking-tight text-xl uppercase">Earnings <span className="text-emerald-500">Copilot</span></span>
                    </div>

                    <nav className="flex items-center gap-6 ml-4">
                        <button className="text-emerald-400 font-bold text-xs uppercase tracking-widest border-b-2 border-emerald-500 pb-1">Dashboard</button>
                        <button className="text-gray-500 hover:text-white text-xs uppercase tracking-widest transition-colors">Reports</button>
                        <button className="text-gray-500 hover:text-white text-xs uppercase tracking-widest transition-colors">Settings</button>
                    </nav>
                </div>

                <div className="flex items-center gap-5">
                    <div className="relative group">
                        <Bell className="w-5 h-5 text-gray-500 group-hover:text-white cursor-pointer transition-colors" />
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full border border-[#0a0c10]"></span>
                    </div>
                    <div className="flex items-center gap-3 pl-5 border-l border-white/10">
                        <div className="flex flex-col items-end">
                            <span className="text-white text-xs font-bold uppercase tracking-tight">{userName}</span>
                            <span className="text-emerald-500 text-[10px] font-bold uppercase opacity-80">Principal Analyst</span>
                        </div>
                        <UserButton afterSignOutUrl="/" />
                    </div>
                </div>
            </header>

            <main className="flex-grow p-8">
                {/* Dashboard Stats / Header */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-white tracking-tight mb-2 uppercase">SEC Filing <span className="text-emerald-500">Center</span></h1>
                        <p className="text-gray-500 text-sm font-medium">Drafting & Compliance Suite v2.0 • <span className="text-emerald-500/80">API Connected</span></p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                value={ticker}
                                onChange={(e) => setTicker(e.target.value.toUpperCase())}
                                className="bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 w-64 transition-all"
                                placeholder="Search Ticker..."
                            />
                        </div>
                        <button 
                            onClick={() => fetchData()}
                            disabled={loading}
                            className="bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-500/50 text-black px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/10">
                            {loading ? 'Loading...' : 'Fetch Data'} <ArrowUpRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Mode Selector */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="flex bg-white/5 rounded-xl p-1">
                        <button 
                            onClick={() => setActiveMode('audit')}
                            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all ${activeMode === 'audit' ? 'bg-emerald-500 text-black' : 'text-gray-400 hover:text-white'}`}>
                            Audit Existing
                        </button>
                        <button 
                            onClick={() => setActiveMode('draft')}
                            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all ${activeMode === 'draft' ? 'bg-emerald-500 text-black' : 'text-gray-400 hover:text-white'}`}>
                            Draft New Section
                        </button>
                    </div>

                    <div className="flex bg-white/5 rounded-xl p-1">
                        {['10-K', '10-Q', '8-K'].map(form => (
                            <button 
                                key={form}
                                onClick={() => setActiveForm(form)}
                                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all ${activeForm === form ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'}`}>
                                {form}
                            </button>
                        ))}
                    </div>

                    {activeMode === 'draft' && (
                        <div className="flex bg-white/5 rounded-xl p-1">
                            {['mda', 'risk_factors', 'business'].map(section => (
                                <button 
                                    key={section}
                                    onClick={() => setActiveSection(section)}
                                    className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all ${activeSection === section ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'}`}>
                                    {section.replace('_', ' ')}
                                </button>
                            ))}
                        </div>
                    )}

                    <button 
                        onClick={activeMode === 'audit' ? runAudit : runDraft}
                        disabled={loading}
                        className="ml-auto px-6 py-2 bg-indigo-500 hover:bg-indigo-400 disabled:bg-indigo-500/50 text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all">
                        {loading ? 'Processing...' : `Run ${activeMode === 'audit' ? 'Audit' : 'Draft'}`}
                    </button>
                </div>

                {/* Error Display */}
                {error && (
                    <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-rose-500" />
                        <span className="text-rose-400 text-sm">{error}</span>
                    </div>
                )}

                {/* Results Status */}
                {results && !error && (
                    <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                        <span className="text-emerald-400 text-sm">
                            {results.company_name || ticker} • {results.form_type || activeForm} • 
                            {results.filing_date ? ` Filed: ${results.filing_date}` : ' Data loaded'}
                        </span>
                    </div>
                )}

                {/* Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Column 1: 10-K Annual */}
                    <div>
                        <div className="flex items-center gap-2 mb-6 group cursor-default">
                            <div className="w-1.5 h-6 bg-emerald-500 rounded-full group-hover:h-8 transition-all"></div>
                            <h2 className="text-white text-xl font-bold tracking-tight uppercase">10-K <span className="text-gray-500 font-medium">Annual</span></h2>
                            <p className="ml-auto text-emerald-500 text-[10px] font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md uppercase">FY 2024</p>
                        </div>
                        <FilingCard title="MD&A Drafting" period="Full Year 2024" status={activeForm === '10-K' ? 'Active' : 'Ready'} progress={activeForm === '10-K' ? 74 : 0} />
                        <FilingCard title="Risk Factors" period="Review Item 1A" status="Ready" />
                        <FilingCard title="Business Overview" period="Item 1 Update" status="Ready" />
                    </div>

                    {/* Column 2: 10-Q Quarterly */}
                    <div>
                        <div className="flex items-center gap-2 mb-6 group cursor-default">
                            <div className="w-1.5 h-6 bg-teal-500 rounded-full group-hover:h-8 transition-all"></div>
                            <h2 className="text-white text-xl font-bold tracking-tight uppercase">10-Q <span className="text-gray-500 font-medium">Quarterly</span></h2>
                            <p className="ml-auto text-teal-500 text-[10px] font-bold bg-teal-500/10 px-2 py-0.5 rounded-md uppercase">Q3 2024</p>
                        </div>
                        <FilingCard title="Business Update" period="Q3 Operations" status={activeForm === '10-Q' ? 'Active' : 'Ready'} />
                        <FilingCard title="Notes to Financials" period="Part I, Item 1" status="Ready" />
                        <FilingCard title="Risk Refresher" period="QoQ Changes" status="Ready" />
                    </div>

                    {/* Column 3: 8-K Real-time */}
                    <div>
                        <div className="flex items-center gap-2 mb-6 group cursor-default">
                            <div className="w-1.5 h-6 bg-indigo-500 rounded-full group-hover:h-8 transition-all"></div>
                            <h2 className="text-white text-xl font-bold tracking-tight uppercase">8-K <span className="text-gray-500 font-medium">Real-time</span></h2>
                            <p className="ml-auto text-indigo-500 text-[10px] font-bold bg-indigo-500/10 px-2 py-0.5 rounded-md uppercase">Live</p>
                        </div>
                        <FilingCard title="Earnings Release" period="Item 2.02" status={activeForm === '8-K' ? 'Active' : 'Ready'} />
                        <FilingCard title="Material Events" period="Item 8.01" status="Ready" />
                    </div>
                </div>

                {/* Editor View */}
                <div className="mt-12 bg-white/5 border border-white/10 rounded-3xl overflow-hidden p-8">
                    <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-emerald-500/10 rounded-2xl">
                                <Edit3 className="w-6 h-6 text-emerald-500" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-lg uppercase tracking-tight">
                                    {activeMode === 'audit' ? 'Audit Results' : 'Draft Editor'}: <span className="text-emerald-500">{activeSection.toUpperCase()}</span>
                                </h3>
                                <p className="text-gray-500 text-xs font-medium uppercase">{ticker} {activeForm} Analysis</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="px-4 py-2 rounded-xl text-gray-500 hover:text-white text-xs font-bold uppercase transition-colors">Clear</button>
                            <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-white text-xs font-bold uppercase transition-colors">Copy</button>
                            <button className="px-6 py-2 bg-emerald-500 text-black rounded-xl text-xs font-bold uppercase tracking-widest transition-transform hover:scale-105">Export</button>
                        </div>
                    </div>

                    <div className="flex gap-8">
                        {/* Editor Canvas */}
                        <div className="flex-grow bg-[#05070a] border border-white/10 rounded-2xl p-8 shadow-inner min-h-[400px] overflow-auto">
                            {loading ? (
                                <div className="flex items-center justify-center h-64">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                                        <span className="text-gray-500 text-sm">Processing {ticker}...</span>
                                    </div>
                                </div>
                            ) : editorContent ? (
                                <div className="prose prose-invert prose-sm max-w-none">
                                    <pre className="whitespace-pre-wrap text-gray-300 font-mono text-sm">{editorContent}</pre>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-64 text-center">
                                    <FileText className="w-12 h-12 text-gray-700 mb-4" />
                                    <p className="text-gray-500 text-sm mb-2">Select a filing type and run an audit or draft</p>
                                    <p className="text-gray-600 text-xs">Results will appear here</p>
                                </div>
                            )}
                        </div>

                        {/* AI Assistant Sidebar */}
                        <div className="w-80 space-y-6">
                            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <Zap className="w-4 h-4 text-emerald-500" />
                                    <h4 className="text-white text-sm font-bold uppercase tracking-widest">Quick Stats</h4>
                                </div>
                                {results ? (
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-gray-400">Company</span>
                                            <span className="text-emerald-500 text-xs font-bold">{results.company_name || ticker}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-gray-400">Form Type</span>
                                            <span className="text-emerald-500 text-xs font-bold">{results.form_type || activeForm}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-gray-400">Sentiment</span>
                                            <span className="text-emerald-500 text-xs font-bold">{results.sentiment?.sentiment || 'N/A'}</span>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-[11px] text-gray-500">Fetch data to see analysis</p>
                                )}
                            </div>

                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <MessageSquare className="w-4 h-4 text-indigo-400" />
                                    <h4 className="text-white text-sm font-bold uppercase tracking-widest">Transcript Sync</h4>
                                </div>
                                <p className="text-[11px] text-gray-500 italic mb-4">
                                    {results?.transcript_date ? `Transcript from ${results.transcript_date} loaded` : 'No transcript loaded'}
                                </p>
                                <button className="w-full py-2 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 rounded-lg text-indigo-400 text-[10px] font-bold uppercase transition-all">
                                    Fetch Transcript
                                </button>
                            </div>

                            <div className="bg-rose-500/5 border border-rose-500/20 rounded-2xl p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <ShieldCheck className="w-4 h-4 text-rose-500" />
                                    <h4 className="text-white text-sm font-bold uppercase tracking-widest">Compliance Check</h4>
                                </div>
                                <p className="text-[10px] text-gray-400 mb-0">
                                    {results?.sec_redline ? 'Audit complete - review results above' : 'Run audit to check for issues'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default GlobalDashboard;
