import React from 'react'
import { Wallet, User, Layers } from 'lucide-react'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-5 py-4 flex items-center gap-3">
          <Wallet className="w-6 h-6" />
          <h1 className="font-semibold text-lg">Expense Tracker</h1>
          <div className="ml-auto flex items-center gap-4 text-sm text-gray-600">
            <span className="inline-flex items-center gap-2"><User className="w-4 h-4" /> Users</span>
            <span className="inline-flex items-center gap-2"><Layers className="w-4 h-4" /> Categories</span>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-6">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-gray-700">Frontend setup complete. We’ll wire API & pages next.</p>
        </div>
      </main>
    </div>
  )
}
