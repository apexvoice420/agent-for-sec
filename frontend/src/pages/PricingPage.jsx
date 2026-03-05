import React from 'react'
import { Check, ArrowRight, HelpCircle } from 'lucide-react'

const PricingCard = ({ title, price, subtitle, features, badge, highlighted }) => (
    <div className={`relative glass-card p-10 flex flex-col h-full transition-all duration-300 ${highlighted ? 'ring-2 ring-blue-500 scale-105 z-10' : 'hover:-translate-y-2'}`}>
        {badge && (
            <div className="absolute top-0 right-10 -translate-y-1/2 bg-accent-gradient text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                {badge}
            </div>
        )}
        <h3 className="text-2xl text-primary mb-2">{title}</h3>
        <div className="flex items-baseline mb-4">
            <span className="text-4xl font-bold text-primary">{price}</span>
            {price !== 'Custom' && <span className="text-gray-500 ml-2">/call</span>}
        </div>
        <p className="text-gray-500 text-sm mb-8">{subtitle}</p>

        <div className="flex-grow">
            <ul className="space-y-4 mb-10">
                {features.map((f, i) => (
                    <li key={i} className="flex items-start text-sm text-gray-600">
                        <Check className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
                        {f}
                    </li>
                ))}
            </ul>
        </div>

        <button className={`w-full py-4 rounded-xl font-bold transition-all ${highlighted ? 'btn-gradient' : 'bg-gray-100 text-primary hover:bg-gray-200'}`}>
            Get Started
        </button>
    </div>
)

const PricingPage = ({ onNavigate }) => {
    return (
        <div className="pt-32 pb-24 bg-[#f8f9fa]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20 animate-fade-in">
                    <h1 className="text-4xl lg:text-6xl mb-6 tracking-tight">Simple, Transparent <span className="gradient-text">Pricing</span></h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto font-sans">
                        Choose the plan that fits your Investor Relations team's needs. Scale as you grow.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
                    <PricingCard
                        title="Starter"
                        price="$497"
                        subtitle="Perfect for single-call deep dives."
                        features={[
                            "AI Report for 1 Ticker",
                            "Executive Summary",
                            "Predicted Q&A (10 Questions)",
                            "Citation Verification",
                            "PDF Export"
                        ]}
                    />
                    <PricingCard
                        title="Quarterly"
                        price="$1,497"
                        badge="Most Popular"
                        highlighted
                        subtitle="Full coverage for your earnings cycle."
                        features={[
                            "Reports for 4 Tickers",
                            "Analyst Sentiment Analysis",
                            "Competitor Benchmarking",
                            "Contradiction Detection",
                            "Priority Processing",
                            "White-label Reports"
                        ]}
                    />
                    <PricingCard
                        title="Enterprise"
                        price="$4,997"
                        subtitle="Annual solution for global teams."
                        features={[
                            "Unlimited Tickers",
                            "Custom AI Model Training",
                            "API Access",
                            "Dedicated Account Manager",
                            "24/7 IR Support",
                            "Multi-user Access"
                        ]}
                    />
                </div>

                {/* FAQ Section */}
                <section className="max-w-3xl mx-auto">
                    <h2 className="text-3xl text-center mb-16">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        {[
                            { q: "How accurate is the AI analysis?", a: "Our models are purpose-built for financial text and achieve 98% accuracy in entity extraction and semantic matching compared to manual IR reviews." },
                            { q: "Can I cancel my Quarterly plan anytime?", a: "Yes, you can cancel your subscription at any time. You will continue to have access until the end of your billing period." },
                            { q: "Is my data secure?", a: "We use enterprise-grade SOC2 compliant infrastructure. Your filings and internal notes are encrypted at rest and in transit." },
                            { q: "Do you support international exchanges?", a: "Currently we support all US major exchanges (NYSE, NASDAQ). International support is launching in Q4 2024." }
                        ].map((faq, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                                <h4 className="text-lg mb-3 flex items-center">
                                    <HelpCircle className="w-5 h-5 text-blue-500 mr-3" />
                                    {faq.q}
                                </h4>
                                <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Comparison Table (Simple) */}
                <div className="mt-32 text-center">
                    <h2 className="text-3xl mb-12">Detailed Comparison</h2>
                    <div className="glass-card overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-8 py-6 text-sm font-bold uppercase tracking-wider text-gray-500">Feature</th>
                                    <th className="px-8 py-6 text-sm font-bold uppercase tracking-wider text-gray-500">Starter</th>
                                    <th className="px-8 py-6 text-sm font-bold uppercase tracking-wider text-gray-500">Quarterly</th>
                                    <th className="px-8 py-6 text-sm font-bold uppercase tracking-wider text-gray-500">Enterprise</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {[
                                    { name: "SEC Filings Search", s: true, q: true, e: true },
                                    { name: "Transcript Analysis", s: true, q: true, e: true },
                                    { name: "Competitor Benchmarking", s: false, q: true, e: true },
                                    { name: "API Access", s: false, q: false, e: true },
                                    { name: "Export Formats", s: "PDF", q: "PDF, Word, CSV", e: "All + Direct API" }
                                ].map((row, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-8 py-5 text-sm font-medium text-gray-700">{row.name}</td>
                                        <td className="px-8 py-5 text-sm text-gray-500">{typeof row.s === 'boolean' ? (row.s ? <Check className="w-4 h-4 text-green-500" /> : '-') : row.s}</td>
                                        <td className="px-8 py-5 text-sm text-gray-500">{typeof row.q === 'boolean' ? (row.q ? <Check className="w-4 h-4 text-green-500" /> : '-') : row.q}</td>
                                        <td className="px-8 py-5 text-sm text-gray-500">{typeof row.e === 'boolean' ? (row.e ? <Check className="w-4 h-4 text-green-500" /> : '-') : row.e}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-32 bg-accent-gradient rounded-3xl p-12 lg:p-20 text-center text-white shadow-2xl overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <h2 className="text-3xl lg:text-5xl mb-8 relative z-10">Still have questions?</h2>
                    <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto relative z-10">Our team of former IR professionals is here to help you find the right fit.</p>
                    <button className="bg-white text-primary font-bold px-10 py-4 rounded-xl hover:bg-blue-50 transition-all shadow-xl relative z-10">
                        Contact Sales
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PricingPage
