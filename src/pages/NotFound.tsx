import type { FC } from 'react'
import { MainLayout } from '@/layouts/MainLayout'
import { ArrowRight } from 'lucide-react'

export const NotFound: FC = () => {
  return (
    <MainLayout>
      <div className="text-center py-20">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
        <p className="text-2xl text-gray-600 dark:text-gray-400 mb-8">Page Not Found</p>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
          Sorry, the page you're looking for doesn't exist. It might have been moved or deleted.
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition"
        >
          Back to Home <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </MainLayout>
  )
}
