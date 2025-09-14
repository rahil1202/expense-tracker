import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Receipt, Users, Layers, ChevronLeft, ChevronRight } from 'lucide-react'

const linkBase = 'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-200 relative group'
const active = 'bg-black text-white'
const inactive = 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)

  const navigationItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { to: '/expenses', icon: Receipt, label: 'Expenses' },
    { to: '/users', icon: Users, label: 'Users' },
    { to: '/categories', icon: Layers, label: 'Categories' }
  ]

  return (
    <aside className={`hidden md:flex flex-col border-r bg-white shadow-sm transition-all duration-300 ease-in-out ${
      isOpen ? 'w-60' : 'w-16'
    }`}>
      <div className="flex items-center justify-between px-4 py-3.5 border-b">
        {isOpen && (
          <div className="text-lg font-bold text-gray-800 transition-opacity duration-200">
            Expense Tracker
          </div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 ${
            !isOpen ? 'mx-auto' : ''
          }`}
          aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          {isOpen ? (
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronRight className="w-4 h-4 text-gray-600" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navigationItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `${linkBase} ${isActive ? active : inactive} ${
                  !isOpen ? 'justify-center' : ''
                }`
              }
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {isOpen && (
                <span className="transition-opacity duration-200">{item.label}</span>
              )}
              
              {/* Tooltip for collapsed state */}
              {!isOpen && (
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                  {item.label}
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
                </div>
              )}
            </NavLink>
          )
        })}
      </nav>

      {/* Footer */}
      <div className={`p-3 text-xs text-gray-500 border-t ${!isOpen ? 'text-center' : ''}`}>
        {isOpen ? 'v1.0' : '1.0'}
      </div>
    </aside>
  )
}
