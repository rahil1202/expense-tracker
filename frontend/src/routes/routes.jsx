import { createBrowserRouter } from 'react-router-dom'
import Layout from '../layout/layout'
import DashboardPage from '../page/DashboardPage.jsx'
import UsersPage from '../page/UsersPage'
import ExpensesPage from '../page/ExpensesPage.jsx'
import CategoriesPage from '../page/CategoriesPage'

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'expenses', element: <ExpensesPage /> },
      { path: 'users', element: <UsersPage /> },
      { path: 'categories', element: <CategoriesPage /> }
    ]
  }
]

export const router = createBrowserRouter(routes)
