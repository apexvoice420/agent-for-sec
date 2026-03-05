import React from 'react'
import { Layout, Twitter, Linkedin, Github } from 'lucide-react'

const Footer = ({ onNavigate }) => {
    return (
        <footer className="bg-primary text-white pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center mb-6 cursor-pointer" onClick={() => onNavigate('landing')}>
                            <div className="bg-accent-gradient p-1.5 rounded-lg mr-2">
                                <Layout className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-xl font-headings font-bold">Earnings Copilot</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            AI-powered earnings call preparation platform for modern CFOs and IR teams. Turn weeks of prep into hours of insight.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-wider mb-6">Platform</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><button onClick={() => onNavigate('landing')} className="hover:text-white transition-colors text-left uppercase text-[10px] font-bold tracking-[.1em] text-white/50 mb-1">Features</button></li>
                            <li><a href="#" className="hover:text-white transition-colors">Analysis Engine</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Ticker Search</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Export Tools</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-wider mb-6">Company</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-wider mb-6">Stay Updated</h4>
                        <p className="text-gray-400 text-sm mb-4">Join our newsletter for the latest in financial AI.</p>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="email@example.com"
                                className="bg-white/10 border border-white/20 rounded-l-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
                            />
                            <button className="bg-accent-gradient px-4 py-2 rounded-r-lg text-sm font-bold">Join</button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs text-gray-500">
                    <p>© 2024 Earnings Copilot. All rights reserved.</p>
                    <div className="flex space-x-6">
                        <a href="#" className="hover:text-white transition-colors">Status</a>
                        <a href="#" className="hover:text-white transition-colors">Security</a>
                        <a href="#" className="hover:text-white transition-colors">Contact</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
