export type Language = 'ar' | 'en';
export type Currency = 'USD' | 'SAR' | 'YER';
export type Theme = 'light' | 'dark';

export interface LanguageConfig {
  code: Language;
  name: string;
  direction: 'ltr' | 'rtl';
  flag: string;
}

export interface CurrencyConfig {
  code: Currency;
  symbol: string;
  name: string;
  locale: string;
}

export interface ServiceConfig {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  currency: Currency;
  duration?: number;
  isActive: boolean;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface ToolInput {
  toolName: string;
  parameters: Record<string, any>;
  context?: Record<string, any>;
}

export interface ToolOutput {
  success: boolean;
  data?: any;
  error?: string;
  executionTime?: number;
}

export interface PaymentRecord {
  id: string;
  userId: string;
  serviceId?: string;
  amount: number;
  currency: Currency;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod: string;
  transactionId?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface VisitorLog {
  id: string;
  sessionId: string;
  ipAddress?: string;
  userAgent?: string;
  page: string;
  referrer?: string;
  country?: string;
  city?: string;
  language: Language;
  timestamp: Date;
  duration?: number;
}

export interface HistoryEntry {
  id: string;
  userId: string;
  action: string;
  entityType: string;
  entityId: string;
  changes?: Record<string, any>;
  metadata?: Record<string, any>;
  timestamp: Date;
}

export interface Review {
  id: string;
  userId: string;
  serviceId: string;
  rating: number;
  comment?: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  salary?: {
    min: number;
    max: number;
    currency: Currency;
  };
  requirements: string[];
  isActive: boolean;
  postedAt: Date;
  expiresAt?: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  isRead: boolean;
  link?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
}

export interface ExamGenerationOptions {
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questionCount: number;
  language: Language;
  includeAnswers: boolean;
}

export interface ExamResult {
  questions: Question[];
  metadata: {
    subject: string;
    difficulty: string;
    generatedAt: Date;
  };
}

export interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer' | 'essay';
  options?: string[];
  correctAnswer?: string | string[];
  points: number;
}

export interface HeroImageOptions {
  prompt: string;
  style?: string;
  aspectRatio?: '16:9' | '4:3' | '1:1';
}

export interface StorageCollections {
  services: ServiceConfig[];
  reviews: Review[];
  payments: PaymentRecord[];
  jobs: Job[];
  history: HistoryEntry[];
  visitors: VisitorLog[];
  notifications: Notification[];
}

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  isDemo?: boolean;
}

export interface AutomationWebhook {
  id: string;
  name: string;
  type: 'bot' | 'financial' | 'notification' | 'workflow';
  triggerType: 'manual' | 'scheduled' | 'event';
  payload: Record<string, any>;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  executedAt?: Date;
  result?: any;
}
