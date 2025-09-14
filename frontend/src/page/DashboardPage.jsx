import React from 'react'
import { useQuery } from '@tanstack/react-query'
import api from '../lib/api'
import { monthRange } from '../lib/date'
import MonthSelector from '../features/dashboard/components/MonthSelector'
import QuickActions from '../features/dashboard/components/QuickActions'
import KpiRow from '../features/dashboard/components/KpiRow'
import MonthlyTrendChart from '../features/dashboard/components/MonthlyTrendChart'
import CategoryBreakdownPie from '../features/dashboard/components/CategoryBreakdownPie'
import RecentExpensesTable from '../features/dashboard/components/RecentExpensesTable'

async function fetchSummary(months = 6) {
  const { data } = await api.get(`/stats/summary`, { params: { months } })
  return data
}
async function fetchUsers() {
  return (await api.get('/users')).data
}
async function fetchThisMonthExpenses(startStr, endStr) {
  const { data } = await api.get('/expenses', {
    params: { start_date: startStr, end_date: endStr, limit: 200, offset: 0 },
  })
  return data
}

export default function DashboardPage() {
  // Selected month state
  const [selectedMonth, setSelectedMonth] = React.useState(new Date())
  const { startStr, endStr } = monthRange(selectedMonth)

  // Queries
  const { data: summary, isLoading: loadingSummary } = useQuery({
    queryKey: ['stats', 'summary', 6],
    queryFn: () => fetchSummary(6),
  })

  const { data: users } = useQuery({
    queryKey: ['users', 'all'],
    queryFn: fetchUsers,
  })

  const { data: monthExpenses, isLoading: loadingMonth } = useQuery({
    queryKey: ['expenses', 'month', startStr, endStr],
    queryFn: () => fetchThisMonthExpenses(startStr, endStr),
  })

  // KPIs
  const totalPredicted = React.useMemo(() => {
    if (!summary?.prediction) return 0
    return summary.prediction.reduce((acc, r) => acc + Number(r.predicted_next_month || 0), 0)
  }, [summary])

  const totalSpendThisMonth = React.useMemo(() => {
    if (!monthExpenses) return 0
    return monthExpenses.reduce((acc, e) => acc + Number(e.amount || 0), 0)
  }, [monthExpenses])

  const expensesCountThisMonth = monthExpenses?.length ?? 0
  const activeUsers = (users ?? []).filter(u => u.status === 'ACTIVE').length
  const usersTotal = (users ?? []).length

  // Category pie data for selected month
  const pieData = React.useMemo(() => {
    if (!monthExpenses) return []
    const map = new Map()
    monthExpenses.forEach(e => {
      const key = e.category_name || e.category
      map.set(key, (map.get(key) || 0) + Number(e.amount || 0))
    })
    return Array.from(map, ([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value)
  }, [monthExpenses])

  // Monthly trend from summary (aggregate across users)
  const monthlyTrend = React.useMemo(() => {
    if (!summary?.monthlyChange) return []
    const map = new Map()
    summary.monthlyChange.forEach(r => {
      const k = r.month_start
      map.set(k, (map.get(k) || 0) + Number(r.month_total || 0))
    })
    return Array.from(map, ([month, total]) => ({ month: month.slice(0, 7), total }))
      .sort((a, b) => a.month.localeCompare(b.month))
  }, [summary])

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-center gap-3 justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <div className="flex items-center gap-3">
          <MonthSelector month={selectedMonth} onChange={setSelectedMonth} />
          <QuickActions />
        </div>
      </div>

      <KpiRow
        loadingSummary={loadingSummary}
        loadingMonth={loadingMonth}
        totalSpendThisMonth={totalSpendThisMonth}
        totalPredicted={totalPredicted}
        expensesCountThisMonth={expensesCountThisMonth}
        activeUsers={activeUsers}
        usersTotal={usersTotal}
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2">
          <MonthlyTrendChart data={monthlyTrend} />
        </div>
        <div>
          <CategoryBreakdownPie data={pieData} />
        </div>
      </div>

      <RecentExpensesTable rows={monthExpenses ?? []} />
    </div>
  )
}