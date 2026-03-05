import React from 'react'
import { CheckCircle, BarChart2, Shield, Search, Zap, MessageSquare, ArrowRight, Play } from 'lucide-react'

const FeatureCard = ({ icon: Icon, title, description }) => (
    <div className="glass-card p-8 hover:transform hover:-translate-y-2 transition-all duration-300">
        <div className="bg-accent-gradient w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20">
            <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl mb-3 text-primary">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
)

const LandingPage = ({ onNavigate }) => {
    return (
        <div className="pt-16">
            {/* Hero Section */}
            <section className="relative py-20 lg:py-32 overflow-hidden">
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-blue-50 rounded-full blur-3xl -z-10 opacity-60" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-8 animate-fade-in">
                        <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-3 animate-pulse" />
                        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Trusted by 50+ CFOs</span>
                    </div>
                    <h1 className="text-5xl lg:text-7xl mb-6 tracking-tight leading-[1.1]">
                        Prepare for Earnings Calls in <span className="gradient-text">Hours, Not Days</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed font-sans">
                        AI-powered analysis of 10-Ks, transcripts, and competitor filings.
                        Empowering CFOs and IR teams with instant insights and potential Q&A preparation.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={() => onNavigate('dashboard')}
                            className="btn-gradient text-lg px-8 py-4 w-full sm:w-auto flex items-center justify-center"
                        >
                            Start Free Trial
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </button>
                        <button className="px-8 py-4 border border-gray-200 rounded-xl font-semibold text-primary hover:bg-gray-50 transition-all w-full sm:w-auto">
                            Watch Demo
                        </button>
                    </div>
                    <div className="mt-20 relative px-4">
                        <div className="glass-card max-w-5xl mx-auto overflow-hidden shadow-2xl border-white/50">
                            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070" alt="Dashboard Preview" className="w-full opacity-90" />
                            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent pointer-events-none opacity-40" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl mb-4">Enterprise-Grade Intelligence</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Our specialized AI models are trained on SEC filings and financial data to provide accurate, reliable results.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <FeatureCard
                            icon={Zap}
                            title="Executive Summaries"
                            description="Get a high-level overview of complex filings in seconds, highlighting key financial shifts and trends."
                        />
                        <FeatureCard
                            icon={MessageSquare}
                            title="Analyst Q&A Prep"
                            description="Predict potential analyst questions based on current market sentiment and historical transcripts."
                        />
                        <FeatureCard
                            icon={Shield}
                            title="Contradiction Detection"
                            description="Identify inconsistencies between your current statements and previous SEC filings instantly."
                        />
                        <FeatureCard
                            icon={BarChart2}
                            title="Benchmarking"
                            description="Compare your performance and strategic messaging against key industry competitors in real-time."
                        />
                    </div>
                </div>
            </section>

            {/* How it Works */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="flex-1">
                            <h2 className="text-3xl lg:text-4xl mb-8">Seamless Intelligence Workflow</h2>
                            <div className="space-y-8">
                                {[
                                    { step: '01', title: 'Input Ticker', desc: 'Enter any public company ticker. Our system instantly fetches all relevant 10-Ks, 10-Qs, and transcripts.' },
                                    { step: '02', title: 'AI Analysis', desc: 'Our Earnings Copilot processes thousands of pages, identifying trends, risks, and strategic keywords.' },
                                    { step: '03', title: 'Ready for Call', desc: 'Export your comprehensive preparation report with predicted Q&A and verified citations.' }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex gap-6">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-blue-500 flex items-center justify-center font-bold text-blue-600">
                                            {item.step}
                                        </div>
                                        <div>
                                            <h4 className="text-xl mb-1">{item.title}</h4>
                                            <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex-1 w-full">
                            <div className="glass-card p-4 aspect-video flex items-center justify-center bg-primary overflow-hidden group">
                                <Play className="w-16 h-16 text-white opacity-40 group-hover:opacity-100 transition-opacity cursor-pointer group-hover:scale-110 duration-300" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-primary relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-accent-gradient opacity-10" />
                <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
                    <h2 className="text-3xl lg:text-5xl text-white mb-8">Ready to Elevate Your Investor Relations?</h2>
                    <p className="text-blue-100/70 text-lg mb-12 max-w-2xl mx-auto">Join leading finance teams using Earnings Copilot to stay ahead of the curve.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => onNavigate('dashboard')}
                            className="bg-white text-primary font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-all"
                        >
                            Start Free Trial
                        </button>
                        <button
                            onClick={() => onNavigate('pricing')}
                            className="border border-white/20 text-white font-bold px-8 py-4 rounded-xl hover:bg-white/10 transition-all"
                        >
                            View Pricing
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default LandingPage
