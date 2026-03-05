import React from 'react'
import { Layout, Menu, LogIn, Play } from 'lucide-react'

const Navbar = ({ onNavigate, currentPage }) => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-lg border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div
                        className="flex items-center cursor-pointer group"
                        onClick={() => onNavigate('landing')}
                    >
                        <div className="bg-accent-gradient p-1.5 rounded-lg mr-2 group-hover:rotate-12 transition-transform duration-300">
                            <Layout className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-xl font-headings font-bold text-primary group-hover:gradient-text transition-all">
                            Earnings Copilot
                        </span>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <button
                            onClick={() => onNavigate('landing')}
                            className={`text-sm font-medium transition-colors ${currentPage === 'landing' ? 'gradient-text' : 'text-gray-600 hover:text-primary'}`}
                        >
                            Platform
                        </button>
                        <button
                            onClick={() => onNavigate('pricing')}
                            className={`text-sm font-medium transition-colors ${currentPage === 'pricing' ? 'gradient-text' : 'text-gray-600 hover:text-primary'}`}
                        >
                            Pricing
                        </button>
                        <button className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">Resources</button>
                        <button className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">About</button>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button className="hidden sm:flex items-center text-sm font-semibold text-primary hover:opacity-80 transition-opacity">
                            <LogIn className="w-4 h-4 mr-1.5" />
                            Sign In
                        </button>
                        <button
                            onClick={() => onNavigate('dashboard')}
                            className="btn-gradient text-sm px-5 py-2 whitespace-nowrap"
                        >
                            Launch App
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
