import React from 'react'
import KpiCard from './KpiCard'
import { TrendingUp, LineChart as LineChartIcon, Receipt, Users as UsersIcon } from 'lucide-react'

export default function KpiRow({ loadingSummary, loadingMonth, totalSpendThisMonth, totalPredicted, expensesCountThisMonth, activeUsers, usersTotal }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <KpiCard
        icon={TrendingUp}
        title="Total Spend (selected month)"
        value={loadingMonth ? '…' : `₹ ${totalSpendThisMonth.toFixed(2)}`}
        footer="Sum of expenses in selected month"
      />
      <KpiCard
        icon={LineChartIcon}
        title="Predicted Next Month (sum)"
        value={loadingSummary ? '…' : `₹ ${totalPredicted.toFixed(2)}`}
        footer="Avg of last 3 months per user"
      />
      <KpiCard
        icon={Receipt}
        title="#Expenses (selected month)"
        value={loadingMonth ? '…' : expensesCountThisMonth}
        footer="Number of expense records"
      />
      <KpiCard
        icon={UsersIcon}
        title="Active Users"
        value={activeUsers}
        footer={`${usersTotal} total users`}
      />
    </div>
  )
}
