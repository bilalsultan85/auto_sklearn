import type { FC } from 'react'
import { MainLayout } from '@/layouts/MainLayout'
import { BarChart, Users, TrendingUp, Activity } from 'lucide-react'

export const Dashboard: FC = () => {
  const stats = [
    {
      label: 'Total Users',
      value: '2,543',
      change: '+12%',
      icon: Users,
    },
    {
      label: 'Revenue',
      value: '$45,231',
      change: '+8%',
      icon: TrendingUp,
    },
    {
      label: 'Active Sessions',
      value: '1,234',
      change: '+23%',
      icon: Activity,
    },
    {
      label: 'Analytics',
      value: '98.5%',
      change: '+2%',
      icon: BarChart,
    },
  ]

  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back! Here's your application overview.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:shadow-lg transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                      {stat.value}
                    </p>
                  </div>
                  <Icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
                <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                  {stat.change} from last month
                </p>
              </div>
            )
          })}
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-800 last:border-0"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      Activity Item {item}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {Math.random() * 24} hours ago
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-full">
                    Completed
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full px-4 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition">
                Create New Project
              </button>
              <button className="w-full px-4 py-3 border-2 border-primary-600 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-gray-800 font-medium rounded-lg transition">
                View Reports
              </button>
              <button className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium rounded-lg transition">
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
