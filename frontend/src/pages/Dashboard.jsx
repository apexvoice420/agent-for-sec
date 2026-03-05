import React, { useState } from 'react'
import {
    Layout,
    Search,
    Calendar,
    Settings,
    LogOut,
    ChevronDown,
    TrendingUp,
    TrendingDown,
    Clock,
    FileText,
    AlertCircle,
    Download,
    Share2,
    ChevronRight
} from 'lucide-react'

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 mb-1 ${active
                ? 'bg-accent-gradient text-white shadow-md'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
    >
        <Icon className="w-5 h-5 mr-3" />
        <span className="font-medium text-sm">{label}</span>
    </button>
)

const StatCard = ({ label, value, trend, icon: Icon, colorClass }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2">{label}</p>
            <div className="flex items-center">
                <h4 className="text-2xl font-bold">{value}</h4>
                {trend && (
                    <span className={`ml-3 flex items-center text-xs font-bold ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {trend > 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                        {Math.abs(trend)}%
                    </span>
                )}
            </div>
        </div>
        <div className={`p-3 rounded-xl ${colorClass}`}>
            <Icon className="w-6 h-6 text-white" />
        </div>
    </div>
)

const Dashboard = ({ onNavigate }) => {
    const [activeTab, setActiveTab] = useState('summary')
    const [ticker, setTicker] = useState('AAPL')

    return (
        <div className="flex h-screen bg-[#f8f9fa] pt-16">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col hidden lg:flex">
                <div className="mb-10 flex items-center">
                    <div className="bg-accent-gradient p-1.5 rounded-lg mr-2">
                        <Layout className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-lg font-headings font-bold">Copilot Cloud</span>
                </div>

                <nav className="flex-grow">
                    <SidebarItem icon={Layout} label="Dashboard" active />
                    <SidebarItem icon={FileText} label="Recent Reports" />
                    <SidebarItem icon={Calendar} label="Earnings Calendar" />
                    <SidebarItem icon={Search} label="Search Filings" />
                    <SidebarItem icon={Settings} label="Settings" />
                </nav>

                <div className="mt-auto border-t border-gray-100 pt-6">
                    <button
                        onClick={() => onNavigate('landing')}
                        className="w-full flex items-center px-4 py-3 text-gray-500 hover:text-red-500 transition-colors"
                    >
                        <LogOut className="w-5 h-5 mr-3" />
                        <span className="font-medium text-sm">Log Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow overflow-y-auto p-4 lg:p-10">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-2xl lg:text-3xl mb-1">Welcome back, CFO</h1>
                        <p className="text-gray-500 text-sm">Analyze and prepare for upcoming earnings calls.</p>
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="relative flex-grow md:flex-grow-0">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                value={ticker}
                                onChange={(e) => setTicker(e.target.value.toUpperCase())}
                                placeholder="Enter Ticker (e.g. MSFT)"
                                className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                            />
                        </div>
                        <button className="btn-gradient py-2 px-6 text-sm flex items-center">
                            Generate Report
                        </button>
                    </div>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <StatCard
                        label="Sentiment Score"
                        value="Positive"
                        trend={+12}
                        icon={TrendingUp}
                        colorClass="bg-success-gradient"
                    />
                    <StatCard
                        label="Key Statements"
                        value="42"
                        icon={FileText}
                        colorClass="bg-accent-gradient"
                    />
                    <StatCard
                        label="Anomalies Found"
                        value="3"
                        trend={-5}
                        icon={AlertCircle}
                        colorClass="bg-warning-gradient"
                    />
                    <StatCard
                        label="Last Filing"
                        value="10-K"
                        icon={Clock}
                        colorClass="bg-gray-800"
                    />
                </div>

                {/* Report Section */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex space-x-2">
                            {[
                                { id: 'summary', label: 'Executive Summary' },
                                { id: 'qa', label: 'Analyst Q&A' },
                                { id: 'contradictions', label: 'Contradictions' }
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === tab.id
                                            ? 'bg-white text-primary shadow-sm ring-1 ring-gray-200'
                                            : 'text-gray-500 hover:text-primary'
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                        <div className="flex space-x-2">
                            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                                <Download className="w-4 h-4 text-gray-600" />
                            </button>
                            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                                <Share2 className="w-4 h-4 text-gray-600" />
                            </button>
                        </div>
                    </div>

                    <div className="p-8 lg:p-12">
                        {activeTab === 'summary' && (
                            <div className="animate-fade-in">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-2xl">{ticker} - Q3 2024 Executive Analysis</h2>
                                    <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-bold ring-1 ring-green-100">CONFIRMED BIAS: NEUTRAL</span>
                                </div>

                                <div className="prose prose-blue max-w-none text-gray-600 space-y-6">
                                    <p className="leading-relaxed">
                                        Apple's recent 10-K filing indicates a strong focus on Services revenue, which saw a <span className="text-green-600 font-bold">14% YoY increase</span>. The hardware segment remains dominated by iPhone sales, but supply chain optimizations in Vietnam are starting to reflect in lower COGS.
                                    </p>

                                    <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl">
                                        <h4 className="text-blue-900 mb-2 flex items-center">
                                            <Zap className="w-4 h-4 mr-2" />
                                            Strategic Highlight
                                        </h4>
                                        <p className="text-blue-800 text-sm italic">
                                            "The transition to M3 silicon across the entire lineup is expected to drive replacement cycles in the enterprise sector faster than previously modeled by Wall Street analysts."
                                        </p>
                                    </div>

                                    <h3 className="text-xl text-primary pt-4">Risk Factors Identified</h3>
                                    <ul className="list-disc pl-5 space-y-3">
                                        <li>Regulatory pressure in the European Union regarding App Store policies (DMA compliance).</li>
                                        <li>Exposure to currency fluctuations in emerging markets (India, Indonesia).</li>
                                        <li>Potential saturation in the high-end tablet market.</li>
                                    </ul>

                                    <div className="mt-10 pt-8 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400 uppercase tracking-widest font-bold">
                                        <span>Source: SEC EDGAR / 10-K Filing / Page 42</span>
                                        <button className="text-blue-600 hover:underline flex items-center">
                                            View Original
                                            <ChevronRight className="w-3 h-3 ml-1" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'qa' && (
                            <div className="animate-fade-in space-y-6">
                                <h2 className="text-2xl mb-8">Predicted Analyst Questions</h2>
                                {[
                                    { q: "How do you reconcile the margin compression in the China region despite the price hikes on high-end models?", a: "Prepare to discuss regional currency headwinds and the mix shift toward legacy models in tier-3 cities." },
                                    { q: "What is the long-term Capex commitment for the custom silicon transition over the next 3 fiscal years?", a: "Focus on the amortization schedule and the operational efficiency gains from vertically integrating the supply chain." }
                                ].map((item, idx) => (
                                    <div key={idx} className="border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
                                        <p className="font-bold text-primary mb-3">Q: {item.q}</p>
                                        <div className="flex gap-4">
                                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">A</div>
                                            <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'contradictions' && (
                            <div className="animate-fade-in text-center py-20">
                                <div className="bg-green-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle className="w-10 h-10 text-green-500" />
                                </div>
                                <h3 className="text-xl mb-2">No Contradictions Detected</h3>
                                <p className="text-gray-500 max-w-sm mx-auto">All statements in the current draft align with previously filed 10-Ks and 10-Qs.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Dashboard
