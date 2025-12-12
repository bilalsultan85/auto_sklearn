import type { FC } from 'react'
import { MainLayout } from '@/layouts/MainLayout'
import { ArrowRight, Zap, Shield, Code } from 'lucide-react'

export const Home: FC = () => {
  return (
    <MainLayout>
      <div className="space-y-12">
        {/* Hero Section */}
        <section className="py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Welcome to <span className="text-primary-600 dark:text-primary-400">SaaS App</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              A modern, fully-featured SaaS application built with React 18, TypeScript, Tailwind CSS,
              and powered by Vite for lightning-fast development.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a
                href="/#/dashboard"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition"
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/#/settings"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary-600 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-gray-900 rounded-lg font-semibold transition"
              >
                Learn More
              </a>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl border border-blue-200 dark:border-blue-700">
              <Zap className="w-12 h-12 text-primary-600 dark:text-primary-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Lightning Fast
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Built with Vite for instant HMR and optimized production builds.
              </p>
            </div>

            <div className="p-8 bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20 rounded-xl border border-teal-200 dark:border-teal-700">
              <Shield className="w-12 h-12 text-secondary-600 dark:text-secondary-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Type Safe
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Full TypeScript support for better development experience and fewer runtime errors.
              </p>
            </div>

            <div className="p-8 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-xl border border-yellow-200 dark:border-yellow-700">
              <Code className="w-12 h-12 text-accent-600 dark:text-accent-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Modern Stack
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                React 18, Tailwind CSS, and modern web standards for a solid foundation.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-900 dark:to-secondary-900 rounded-2xl text-white">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Explore the dashboard and discover all the features this modern SaaS stack has to offer.
            </p>
            <a
              href="/#/dashboard"
              className="inline-block px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition"
            >
              Go to Dashboard
            </a>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
