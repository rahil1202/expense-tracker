import { Outlet, Link } from 'react-router-dom'
import { Wallet, Menu } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import React, { useState } from 'react'

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="flex h-screen">
        {/* Desktop Sidebar */}
        <Sidebar />
        
        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="w-60 h-full bg-white">
              <Sidebar />
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 min-w-0 flex flex-col">
          <header className="sticky top-0 z-30 border-b bg-white shadow-sm">
            <div className="mx-auto max-w-7xl px-4 md:px-6 py-4">
              <div className="flex items-center gap-3">
                {/* Mobile Menu Button */}
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className="p-2 rounded-lg hover:bg-gray-100 md:hidden"
                  aria-label="Open mobile menu"
                >
                  <Menu className="w-5 h-5" />
                </button>

                <Link to="/" className="inline-flex items-center gap-2 hover:opacity-75 transition-opacity">
                  <Wallet className="w-6 h-6 text-black" />
                  <span className="font-bold text-lg">Expense Tracker</span>
                </Link>
                
                <div className="ml-auto flex items-center gap-3">
                  <span className="text-sm text-gray-500 px-2 py-1 bg-gray-100 rounded-full">
                    Rahil Vahora
                  </span>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-auto">
            <div className="mx-auto max-w-7xl px-4 md:px-6 py-6">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
