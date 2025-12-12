import React from 'react';
import {
  GlobalProviders,
  useLanguage,
  useCurrency,
  useTheme,
  useAuth,
  useStorage,
} from '../src';
import { geminiService, automationService } from '../src/services';

function NavBar() {
  const { language, setLanguage, t, isRTL } = useLanguage();
  const { currency, setCurrency, formatAmount } = useCurrency();
  const { theme, toggleTheme, isDark } = useTheme();
  const { user, signOut } = useAuth();

  return (
    <nav className={`p-4 ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <div className="flex justify-between items-center" dir={isRTL ? 'rtl' : 'ltr'}>
        <h1 className="text-2xl font-bold">{t('app.title', 'My App')}</h1>
        
        <div className="flex gap-4 items-center">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as 'en' | 'ar')}
            className="p-2 rounded border"
          >
            <option value="en">English</option>
            <option value="ar">العربية</option>
          </select>

          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as any)}
            className="p-2 rounded border"
          >
            <option value="USD">USD ($)</option>
            <option value="SAR">SAR (ر.س)</option>
            <option value="YER">YER (﷼)</option>
          </select>

          <button
            onClick={toggleTheme}
            className="p-2 rounded border"
            aria-label="Toggle theme"
          >
            {isDark ? '☀️' : '🌙'}
          </button>

          {user && (
            <div className="flex gap-2 items-center">
              <span>{user.displayName || user.email}</span>
              <button
                onClick={signOut}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                {t('auth.signout', 'Sign Out')}
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

function ServicesList() {
  const { data: services, loading, create, update, remove } = useStorage('services');
  const { formatAmount } = useCurrency();
  const { t } = useLanguage();

  const handleCreateService = async () => {
    await create({
      name: 'New Service',
      description: 'Service description',
      category: 'general',
      price: 100,
      currency: 'USD',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  };

  if (loading) {
    return <div>{t('common.loading', 'Loading...')}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Services</h2>
      
      <button
        onClick={handleCreateService}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Service
      </button>

      <div className="grid gap-4">
        {services.map((service) => (
          <div key={service.id} className="p-4 border rounded">
            <h3 className="font-bold">{service.name}</h3>
            <p>{service.description}</p>
            <p className="text-lg font-semibold">
              {formatAmount(service.price)}
            </p>
            
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => update(service.id, { price: service.price + 10 })}
                className="px-3 py-1 bg-green-500 text-white rounded text-sm"
              >
                Increase Price
              </button>
              <button
                onClick={() => remove(service.id)}
                className="px-3 py-1 bg-red-500 text-white rounded text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AIFeatures() {
  const [examResult, setExamResult] = React.useState<any>(null);
  const [heroImage, setHeroImage] = React.useState<string>('');
  const { language } = useLanguage();

  const generateExam = async () => {
    const result = await geminiService.generateExam({
      subject: 'Mathematics',
      difficulty: 'medium',
      questionCount: 5,
      language,
      includeAnswers: true,
    });
    setExamResult(result);
  };

  const generateImage = async () => {
    const url = await geminiService.generateHeroImage({
      prompt: 'Beautiful landscape with mountains',
      aspectRatio: '16:9',
    });
    setHeroImage(url);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">AI Features</h2>
      
      <div className="flex gap-4 mb-4">
        <button
          onClick={generateExam}
          className="px-4 py-2 bg-purple-500 text-white rounded"
        >
          Generate Exam
        </button>
        <button
          onClick={generateImage}
          className="px-4 py-2 bg-indigo-500 text-white rounded"
        >
          Generate Hero Image
        </button>
      </div>

      {examResult && (
        <div className="mb-4 p-4 border rounded">
          <h3 className="font-bold mb-2">Generated Exam</h3>
          {examResult.questions.map((q: any, idx: number) => (
            <div key={q.id} className="mb-2">
              <p className="font-semibold">{idx + 1}. {q.text}</p>
              {q.options && (
                <ul className="ml-4">
                  {q.options.map((opt: string, i: number) => (
                    <li key={i}>{opt}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {heroImage && (
        <div className="p-4 border rounded">
          <h3 className="font-bold mb-2">Generated Image</h3>
          <img src={heroImage} alt="Generated hero" className="max-w-full" />
        </div>
      )}
    </div>
  );
}

function AutomationDemo() {
  const [webhooks, setWebhooks] = React.useState<any[]>([]);

  const triggerBotAutomation = async () => {
    const webhook = await automationService.triggerBotAutomation({
      botType: 'telegram',
      action: 'sendMessage',
      recipients: ['user1', 'user2'],
      message: 'Hello from automation!',
    });
    setWebhooks(automationService.getWebhookHistory(10));
  };

  const triggerFinancialAutomation = async () => {
    await automationService.triggerFinancialAutomation({
      type: 'payment',
      amount: 100,
      currency: 'USD',
      userId: 'user123',
    });
    setWebhooks(automationService.getWebhookHistory(10));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Automation</h2>
      
      <div className="flex gap-4 mb-4">
        <button
          onClick={triggerBotAutomation}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Trigger Bot Automation
        </button>
        <button
          onClick={triggerFinancialAutomation}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Trigger Financial Automation
        </button>
      </div>

      <div className="space-y-2">
        {webhooks.map((webhook) => (
          <div key={webhook.id} className="p-3 border rounded">
            <div className="flex justify-between">
              <span className="font-semibold">{webhook.name}</span>
              <span className={`px-2 py-1 rounded text-sm ${
                webhook.status === 'completed' ? 'bg-green-100 text-green-800' :
                webhook.status === 'failed' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {webhook.status}
              </span>
            </div>
            <div className="text-sm text-gray-600">
              Type: {webhook.type} | Trigger: {webhook.triggerType}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <GlobalProviders>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <NavBar />
        <main className="container mx-auto py-8">
          <ServicesList />
          <AIFeatures />
          <AutomationDemo />
        </main>
      </div>
    </GlobalProviders>
  );
}
