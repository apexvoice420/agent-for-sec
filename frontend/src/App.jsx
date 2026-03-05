import React, { useState } from 'react'
import { ClerkProvider, SignIn, SignedIn, SignedOut, RedirectToSignIn, useUser, UserButton } from '@clerk/clerk-react'
import LandingPage from './pages/LandingPage'
import GlobalDashboard from './pages/GlobalDashboard'
import PricingPage from './pages/PricingPage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

function AppContent() {
    const [currentPage, setCurrentPage] = useState('landing')
    const { user, isLoaded } = useUser()

    const renderPage = () => {
        switch (currentPage) {
            case 'landing': return <LandingPage onNavigate={setCurrentPage} />
            case 'dashboard': 
                return (
                    <>
                        <SignedIn>
                            <GlobalDashboard onNavigate={setCurrentPage} user={user} />
                        </SignedIn>
                        <SignedOut>
                            <div className="min-h-screen flex items-center justify-center bg-[#0a0c10]">
                                <div className="text-center">
                                    <h2 className="text-2xl text-white font-bold mb-4">SEC Filing Assistant</h2>
                                    <p className="text-gray-400 mb-6">Sign in to access your dashboard</p>
                                    <SignIn routing="hash" />
                                </div>
                            </div>
                        </SignedOut>
                    </>
                )
            case 'pricing': return <PricingPage onNavigate={setCurrentPage} />
            default: return <LandingPage onNavigate={setCurrentPage} />
        }
    }

    if (!isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0a0c10]">
                <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar onNavigate={setCurrentPage} currentPage={currentPage} />
            <main className="flex-grow">
                {renderPage()}
            </main>
            {currentPage !== 'dashboard' && <Footer onNavigate={setCurrentPage} />}
        </div>
    )
}

function App() {
    return (
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
            <AppContent />
        </ClerkProvider>
    )
}

export default App
