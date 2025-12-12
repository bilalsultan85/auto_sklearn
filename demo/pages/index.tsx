import React, { useState } from 'react';
import { useLanguage, useCurrency, useTheme } from '../../src/contexts';
import { useAuth, useStorage } from '../../src/hooks';
import { geminiService } from '../../src/services/geminiService';
import { automationService } from '../../src/services/automationService';
import type { ServiceConfig } from '../../src/types';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <ContextDemo />
          <AuthDemo />
          <StorageDemo />
          <AIDemo />
          <AutomationDemo />
        </div>
      </main>
    </div>
  );
}

function Header() {
  const { language, setLanguage, t, isRTL } = useLanguage();
  const { currency, setCurrency } = useCurrency();
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md transition-colors">
      <div className="container mx-auto px-4 py-4" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('app.title', 'Global Contexts Demo')}
          </h1>
          
          <div className="flex items-center gap-3">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'en' | 'ar')}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="en">🇺🇸 English</option>
              <option value="ar">🇸🇦 العربية</option>
            </select>

            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="USD">$ USD</option>
              <option value="SAR">ر.س SAR</option>
              <option value="YER">﷼ YER</option>
            </select>

            <button
              onClick={toggleTheme}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              title="Toggle theme"
            >
              {isDark ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

function ContextDemo() {
  const { language, direction, isRTL } = useLanguage();
  const { currency, config, formatAmount, convert } = useCurrency();
  const { theme, isDark } = useTheme();

  return (
    <Section title="Context Status">
      <div className="grid md:grid-cols-3 gap-4">
        <InfoCard title="Language Context">
          <p>Current Language: <strong>{language}</strong></p>
          <p>Direction: <strong>{direction}</strong></p>
          <p>Is RTL: <strong>{isRTL ? 'Yes' : 'No'}</strong></p>
        </InfoCard>

        <InfoCard title="Currency Context">
          <p>Current Currency: <strong>{currency}</strong></p>
          <p>Symbol: <strong>{config.symbol}</strong></p>
          <p>Example: <strong>{formatAmount(1234.56)}</strong></p>
          <p>100 USD = <strong>{convert(100, 'USD', currency)} {currency}</strong></p>
        </InfoCard>

        <InfoCard title="Theme Context">
          <p>Current Theme: <strong>{theme}</strong></p>
          <p>Is Dark: <strong>{isDark ? 'Yes' : 'No'}</strong></p>
          <p>Status: <strong className={isDark ? 'text-blue-400' : 'text-yellow-600'}>
            {isDark ? '🌙 Night Mode' : '☀️ Day Mode'}
          </strong></p>
        </InfoCard>
      </div>
    </Section>
  );
}

function AuthDemo() {
  const { user, loading, signIn, signOut, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('password123');

  const handleSignIn = async () => {
    try {
      await signIn(email, password);
    } catch (error) {
      console.error('Sign in failed:', error);
    }
  };

  return (
    <Section title="Authentication Demo">
      {loading ? (
        <p>Loading...</p>
      ) : isAuthenticated ? (
        <div className="space-y-4">
          <InfoCard title="Authenticated User">
            <p>Email: <strong>{user?.email}</strong></p>
            <p>Display Name: <strong>{user?.displayName || 'N/A'}</strong></p>
            <p>User ID: <strong>{user?.uid}</strong></p>
            <p>Demo Mode: <strong>{user?.isDemo ? 'Yes' : 'No'}</strong></p>
          </InfoCard>
          <button
            onClick={signOut}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <button
            onClick={handleSignIn}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Sign In (Demo Mode)
          </button>
        </div>
      )}
    </Section>
  );
}

function StorageDemo() {
  const { data: services, loading, create, remove } = useStorage<ServiceConfig>('services');
  const { formatAmount } = useCurrency();

  const handleAddService = async () => {
    await create({
      name: `Service ${Date.now()}`,
      description: 'A demo service',
      category: 'demo',
      price: Math.floor(Math.random() * 1000),
      currency: 'USD',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  };

  return (
    <Section title="Storage Service Demo">
      <div className="space-y-4">
        <button
          onClick={handleAddService}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          ➕ Add Random Service
        </button>

        {loading ? (
          <p>Loading services...</p>
        ) : services.length === 0 ? (
          <p className="text-gray-500">No services yet. Click the button above to add one!</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => (
              <div
                key={service.id}
                className="p-4 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
              >
                <h3 className="font-bold text-lg mb-2">{service.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {service.description}
                </p>
                <p className="text-lg font-semibold text-green-600 dark:text-green-400 mb-2">
                  {formatAmount(service.price)}
                </p>
                <button
                  onClick={() => remove(service.id)}
                  className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}

function AIDemo() {
  const [examResult, setExamResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { language } = useLanguage();

  const handleGenerateExam = async () => {
    setLoading(true);
    try {
      const result = await geminiService.generateExam({
        subject: language === 'ar' ? 'الرياضيات' : 'Mathematics',
        difficulty: 'medium',
        questionCount: 3,
        language,
        includeAnswers: true,
      });
      setExamResult(result);
    } catch (error) {
      console.error('Exam generation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section title="AI Services Demo (Gemini)">
      <div className="space-y-4">
        <button
          onClick={handleGenerateExam}
          disabled={loading}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
        >
          {loading ? '⏳ Generating...' : '🤖 Generate Exam (Mock)'}
        </button>

        {examResult && (
          <div className="space-y-3">
            <h3 className="font-bold text-lg">
              Generated Exam: {examResult.metadata.subject}
            </h3>
            {examResult.questions.map((q: any, idx: number) => (
              <div key={q.id} className="p-4 border rounded-md dark:border-gray-600">
                <p className="font-semibold mb-2">
                  {idx + 1}. {q.text}
                </p>
                {q.options && (
                  <ul className="ml-4 space-y-1">
                    {q.options.map((opt: string, i: number) => (
                      <li
                        key={i}
                        className={q.correctAnswer === opt ? 'text-green-600 font-semibold' : ''}
                      >
                        {opt} {q.correctAnswer === opt ? '✓' : ''}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}

function AutomationDemo() {
  const [webhooks, setWebhooks] = useState<any[]>([]);

  const triggerBot = async () => {
    await automationService.triggerBotAutomation({
      botType: 'telegram',
      action: 'sendMessage',
      recipients: ['user1', 'user2'],
      message: 'Hello from automation!',
    });
    setWebhooks(automationService.getWebhookHistory(5));
  };

  const triggerFinancial = async () => {
    await automationService.triggerFinancialAutomation({
      type: 'payment',
      amount: 100,
      currency: 'USD',
      userId: 'user123',
    });
    setWebhooks(automationService.getWebhookHistory(5));
  };

  return (
    <Section title="Automation Service Demo">
      <div className="space-y-4">
        <div className="flex gap-3">
          <button
            onClick={triggerBot}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            🤖 Trigger Bot
          </button>
          <button
            onClick={triggerFinancial}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            💰 Trigger Payment
          </button>
        </div>

        {webhooks.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-bold">Recent Webhooks:</h3>
            {webhooks.map((webhook) => (
              <div
                key={webhook.id}
                className="p-3 border rounded-md dark:border-gray-600 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{webhook.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Type: {webhook.type} | Trigger: {webhook.triggerType}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded text-sm ${
                    webhook.status === 'completed'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : webhook.status === 'failed'
                      ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  }`}
                >
                  {webhook.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
        {title}
      </h2>
      {children}
    </section>
  );
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-4 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700">
      <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
      <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
        {children}
      </div>
    </div>
  );
}
