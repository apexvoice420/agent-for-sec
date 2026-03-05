import React, { useState } from 'react';
import {
    Layout,
    FileText,
    Zap,
    ShieldCheck,
    Search,
    Bell,
    Settings,
    User,
    ArrowUpRight,
    MessageSquare,
    Edit3
} from 'lucide-react';
import FilingCard from '../components/FilingCard';

const GlobalDashboard = ({ onNavigate }) => {
    const [ticker, setTicker] = useState('NVDA');

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
                            <span className="text-white text-xs font-bold uppercase tracking-tight">Aaron S.</span>
                            <span className="text-emerald-500 text-[10px] font-bold uppercase opacity-80">Principal Analyst</span>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-black font-bold text-xs shadow-inner">AS</div>
                    </div>
                </div>
            </header>

            <main className="flex-grow p-8">
                {/* Dashboard Stats / Header */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-white tracking-tight mb-2 uppercase">SEC Filing <span className="text-emerald-500">Center</span></h1>
                        <p className="text-gray-500 text-sm font-medium">Drafting & Compliance Suite v1.2.4 • <span className="text-emerald-500/80">Real-time Sync Active</span></p>
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
                        <button className="bg-emerald-500 hover:bg-emerald-400 text-black px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/10">
                            Launch New Draft <ArrowUpRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Column 1: 10-K Annual */}
                    <div>
                        <div className="flex items-center gap-2 mb-6 group cursor-default">
                            <div className="w-1.5 h-6 bg-emerald-500 rounded-full group-hover:h-8 transition-all"></div>
                            <h2 className="text-white text-xl font-bold tracking-tight uppercase">10-K <span className="text-gray-500 font-medium">Annual</span></h2>
                            <p className="ml-auto text-emerald-500 text-[10px] font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md uppercase">FY 2024</p>
                        </div>
                        <FilingCard
                            title="MD&A Drafting"
                            period="Full Year 2024"
                            status="In Progress"
                            progress={74}
                        />
                        <FilingCard
                            title="Risk Factors"
                            period="Review Item 1A"
                            status="Needs Review"
                        />
                        <FilingCard
                            title="Legal Proceedings"
                            period="Item 3 Update"
                            status="Drafting"
                        />
                    </div>

                    {/* Column 2: 10-Q Quarterly */}
                    <div>
                        <div className="flex items-center gap-2 mb-6 group cursor-default">
                            <div className="w-1.5 h-6 bg-teal-500 rounded-full group-hover:h-8 transition-all"></div>
                            <h2 className="text-white text-xl font-bold tracking-tight uppercase">10-Q <span className="text-gray-500 font-medium">Quarterly</span></h2>
                            <p className="ml-auto text-teal-500 text-[10px] font-bold bg-teal-500/10 px-2 py-0.5 rounded-md uppercase">Q3 2024</p>
                        </div>
                        <FilingCard
                            title="Business Update"
                            period="Q3 Operations"
                            status="Complete"
                        />
                        <FilingCard
                            title="Notes to Financials"
                            period="Part I, Item 1"
                            status="In Progress"
                            progress={45}
                        />
                        <FilingCard
                            title="Risk Refresher"
                            period="QoQ Changes"
                            status="Needs Review"
                        />
                    </div>

                    {/* Column 3: 8-K Real-time */}
                    <div>
                        <div className="flex items-center gap-2 mb-6 group cursor-default">
                            <div className="w-1.5 h-6 bg-indigo-500 rounded-full group-hover:h-8 transition-all"></div>
                            <h2 className="text-white text-xl font-bold tracking-tight uppercase">8-K <span className="text-gray-500 font-medium">Real-time</span></h2>
                            <p className="ml-auto text-indigo-500 text-[10px] font-bold bg-indigo-500/10 px-2 py-0.5 rounded-md uppercase">Live</p>
                        </div>
                        <FilingCard
                            title="Earnings Release"
                            period="Item 2.02"
                            status="Complete"
                        />
                        <FilingCard
                            title="Acquisition of TechCo"
                            period="Item 2.01 Material"
                            status="In Progress"
                            progress={20}
                        />
                    </div>
                </div>

                {/* Floating Editor View (Simulator) */}
                <div className="mt-12 bg-white/5 border border-white/10 rounded-3xl overflow-hidden p-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
                    <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-emerald-500/10 rounded-2xl">
                                <Edit3 className="w-6 h-6 text-emerald-500" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-lg uppercase tracking-tight">Active Editor: <span className="text-emerald-500">MD&A</span></h3>
                                <p className="text-gray-500 text-xs font-medium uppercase">Drafting Item 7 for {ticker} 10-K</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="px-4 py-2 rounded-xl text-gray-500 hover:text-white text-xs font-bold uppercase transition-colors">Discard</button>
                            <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-white text-xs font-bold uppercase transition-colors">Save Draft</button>
                            <button className="px-6 py-2 bg-emerald-500 text-black rounded-xl text-xs font-bold uppercase tracking-widest transition-transform hover:scale-105">Sync to Edgar</button>
                        </div>
                    </div>

                    <div className="flex gap-8">
                        {/* Editor Canvas */}
                        <div className="flex-grow bg-[#05070a] border border-white/10 rounded-2xl p-8 shadow-inner min-h-[400px]">
                            <div className="flex items-center gap-4 mb-6 text-gray-500 border-b border-white/5 pb-4">
                                <span className="text-xs font-bold uppercase opacity-50">Results of Operations</span>
                                <div className="w-1 h-1 bg-gray-700 rounded-full"></div>
                                <span className="text-xs font-bold uppercase opacity-50">Drivers of Change</span>
                            </div>
                            <div className="space-y-6 text-gray-400 leading-relaxed font-light font-serif text-lg">
                                <p>Management's Discussion and Analysis shows significant growth in the data center segment, primarily driven by the transition to Blackwell architecture. Total revenue increased by $12.4B year-over-year, representing a 265% increase...</p>
                                <p className="border-l-2 border-emerald-500/50 pl-6 bg-emerald-500/5 py-4 rounded-r-xl italic">
                                    "The acceleration of generative AI enterprise adoption has created a tectonic shift in compute demand, which we have capitalized on through our vertical software stack."
                                </p>
                                <p>Operating margins expanded to 78.4% as a result of product mix shifting heavily toward high-value H100 and H200 systems, offset slightly by increased R&D spend on next-gen interconnects...</p>
                            </div>
                        </div>

                        {/* AI Assistant Sidebar */}
                        <div className="w-80 space-y-6">
                            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <Zap className="w-4 h-4 text-emerald-500" />
                                    <h4 className="text-white text-sm font-bold uppercase tracking-widest">AI Driver Analysis</h4>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center group cursor-default">
                                        <span className="text-xs text-gray-400 group-hover:text-white transition-colors">Cloud Adoption</span>
                                        <span className="text-emerald-500 text-xs font-bold">+18%</span>
                                    </div>
                                    <div className="flex justify-between items-center group cursor-default">
                                        <span className="text-xs text-gray-400 group-hover:text-white transition-colors">Supply Chain Cost</span>
                                        <span className="text-emerald-500 text-xs font-bold">+4%</span>
                                    </div>
                                    <div className="flex justify-between items-center group cursor-default">
                                        <span className="text-xs text-gray-400 group-hover:text-white transition-colors">Intl. Expansion</span>
                                        <span className="text-emerald-500 text-xs font-bold">+12%</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <MessageSquare className="w-4 h-4 text-indigo-400" />
                                    <h4 className="text-white text-sm font-bold uppercase tracking-widest">Transcript Sync</h4>
                                </div>
                                <p className="text-[11px] text-gray-500 italic mb-4">"We stay focused on margin expansion through cloud services demand."</p>
                                <button className="w-full py-2 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 rounded-lg text-indigo-400 text-[10px] font-bold uppercase transition-all">
                                    Apply Driver Insights
                                </button>
                            </div>

                            <div className="bg-rose-500/5 border border-rose-500/20 rounded-2xl p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <ShieldCheck className="w-4 h-4 text-rose-500" />
                                    <h4 className="text-white text-sm font-bold uppercase tracking-widest">Puffery Guard</h4>
                                </div>
                                <p className="text-[10px] text-gray-400 mb-0">No marketing language detected. Draft is SEC-ready.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default GlobalDashboard;
