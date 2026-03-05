import React, { useState } from 'react'
import LandingPage from './pages/LandingPage'
import GlobalDashboard from './pages/GlobalDashboard'
import PricingPage from './pages/PricingPage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
    const [currentPage, setCurrentPage] = useState('landing')

    const renderPage = () => {
        switch (currentPage) {
            case 'landing': return <LandingPage onNavigate={setCurrentPage} />
            case 'dashboard': return <GlobalDashboard onNavigate={setCurrentPage} />
            case 'pricing': return <PricingPage onNavigate={setCurrentPage} />
            default: return <LandingPage onNavigate={setCurrentPage} />
        }
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

export default App
