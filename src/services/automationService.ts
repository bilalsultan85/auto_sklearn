import { AutomationWebhook } from '../types';

interface WebhookConfig {
  url?: string;
  headers?: Record<string, string>;
  retryAttempts?: number;
  timeout?: number;
}

interface BotAutomationPayload {
  botType: 'telegram' | 'whatsapp' | 'slack' | 'discord';
  action: string;
  recipients: string[];
  message: string;
  metadata?: Record<string, any>;
}

interface FinancialAutomationPayload {
  type: 'payment' | 'invoice' | 'subscription' | 'refund';
  amount: number;
  currency: string;
  userId: string;
  metadata?: Record<string, any>;
}

interface NotificationAutomationPayload {
  type: 'email' | 'sms' | 'push' | 'in-app';
  recipients: string[];
  subject?: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  metadata?: Record<string, any>;
}

interface WorkflowAutomationPayload {
  workflowId: string;
  steps: WorkflowStep[];
  variables?: Record<string, any>;
}

interface WorkflowStep {
  id: string;
  name: string;
  action: string;
  parameters: Record<string, any>;
  condition?: string;
}

type AutomationPayload =
  | BotAutomationPayload
  | FinancialAutomationPayload
  | NotificationAutomationPayload
  | WorkflowAutomationPayload;

class AutomationService {
  private config: WebhookConfig = {
    retryAttempts: 3,
    timeout: 30000,
  };
  private webhookHistory: AutomationWebhook[] = [];

  constructor(config?: WebhookConfig) {
    if (config) {
      this.config = { ...this.config, ...config };
    }
  }

  setConfig(config: Partial<WebhookConfig>): void {
    this.config = { ...this.config, ...config };
  }

  async triggerBotAutomation(payload: BotAutomationPayload): Promise<AutomationWebhook> {
    const webhook: AutomationWebhook = {
      id: this.generateId(),
      name: `Bot Automation - ${payload.botType}`,
      type: 'bot',
      triggerType: 'manual',
      payload,
      status: 'pending',
    };

    return this.executeWebhook(webhook);
  }

  async triggerFinancialAutomation(
    payload: FinancialAutomationPayload
  ): Promise<AutomationWebhook> {
    const webhook: AutomationWebhook = {
      id: this.generateId(),
      name: `Financial Automation - ${payload.type}`,
      type: 'financial',
      triggerType: 'manual',
      payload,
      status: 'pending',
    };

    return this.executeWebhook(webhook);
  }

  async triggerNotificationAutomation(
    payload: NotificationAutomationPayload
  ): Promise<AutomationWebhook> {
    const webhook: AutomationWebhook = {
      id: this.generateId(),
      name: `Notification Automation - ${payload.type}`,
      type: 'notification',
      triggerType: 'manual',
      payload,
      status: 'pending',
    };

    return this.executeWebhook(webhook);
  }

  async triggerWorkflowAutomation(
    payload: WorkflowAutomationPayload
  ): Promise<AutomationWebhook> {
    const webhook: AutomationWebhook = {
      id: this.generateId(),
      name: `Workflow Automation - ${payload.workflowId}`,
      type: 'workflow',
      triggerType: 'manual',
      payload,
      status: 'pending',
    };

    return this.executeWebhook(webhook);
  }

  async scheduleAutomation(
    type: AutomationWebhook['type'],
    payload: AutomationPayload,
    schedule: string
  ): Promise<AutomationWebhook> {
    const webhook: AutomationWebhook = {
      id: this.generateId(),
      name: `Scheduled ${type} Automation`,
      type,
      triggerType: 'scheduled',
      payload,
      status: 'pending',
    };

    console.info(`Scheduled automation for: ${schedule}`);
    
    return this.mockScheduledExecution(webhook);
  }

  async triggerEventBasedAutomation(
    type: AutomationWebhook['type'],
    payload: AutomationPayload,
    eventName: string
  ): Promise<AutomationWebhook> {
    const webhook: AutomationWebhook = {
      id: this.generateId(),
      name: `Event-based ${type} Automation - ${eventName}`,
      type,
      triggerType: 'event',
      payload,
      status: 'pending',
    };

    return this.executeWebhook(webhook);
  }

  async retryWebhook(webhookId: string): Promise<AutomationWebhook> {
    const webhook = this.webhookHistory.find((w) => w.id === webhookId);
    
    if (!webhook) {
      throw new Error(`Webhook with id ${webhookId} not found`);
    }

    if (webhook.status === 'completed') {
      throw new Error('Cannot retry a completed webhook');
    }

    const retryWebhook: AutomationWebhook = {
      ...webhook,
      status: 'pending',
      executedAt: undefined,
      result: undefined,
    };

    return this.executeWebhook(retryWebhook);
  }

  getWebhookHistory(limit?: number): AutomationWebhook[] {
    const history = [...this.webhookHistory].reverse();
    return limit ? history.slice(0, limit) : history;
  }

  getWebhookById(id: string): AutomationWebhook | undefined {
    return this.webhookHistory.find((w) => w.id === id);
  }

  clearHistory(): void {
    this.webhookHistory = [];
  }

  private async executeWebhook(webhook: AutomationWebhook): Promise<AutomationWebhook> {
    webhook.status = 'processing';
    webhook.executedAt = new Date();

    try {
      const result = await this.sendWebhook(webhook);
      
      webhook.status = 'completed';
      webhook.result = result;
    } catch (error) {
      webhook.status = 'failed';
      webhook.result = {
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }

    this.webhookHistory.push(webhook);
    return webhook;
  }

  private async sendWebhook(webhook: AutomationWebhook): Promise<any> {
    if (!this.config.url) {
      return this.mockWebhookExecution(webhook);
    }

    let lastError: Error | null = null;
    
    for (let attempt = 1; attempt <= (this.config.retryAttempts || 1); attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

        const response = await fetch(this.config.url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...this.config.headers,
          },
          body: JSON.stringify({
            id: webhook.id,
            name: webhook.name,
            type: webhook.type,
            triggerType: webhook.triggerType,
            payload: webhook.payload,
            executedAt: webhook.executedAt,
          }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error');
        
        if (attempt < (this.config.retryAttempts || 1)) {
          await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
        }
      }
    }

    throw lastError || new Error('Webhook execution failed');
  }

  private async mockWebhookExecution(webhook: AutomationWebhook): Promise<any> {
    await new Promise((resolve) => setTimeout(resolve, 500 + Math.random() * 1000));

    const success = Math.random() > 0.1;

    if (!success) {
      throw new Error('Mock webhook execution failed');
    }

    switch (webhook.type) {
      case 'bot':
        return {
          messagesSent: (webhook.payload as BotAutomationPayload).recipients.length,
          status: 'delivered',
          timestamp: new Date().toISOString(),
        };

      case 'financial':
        return {
          transactionId: `txn_${this.generateId()}`,
          status: 'processed',
          amount: (webhook.payload as FinancialAutomationPayload).amount,
          timestamp: new Date().toISOString(),
        };

      case 'notification':
        return {
          notificationsSent: (webhook.payload as NotificationAutomationPayload).recipients.length,
          status: 'sent',
          timestamp: new Date().toISOString(),
        };

      case 'workflow':
        const workflowPayload = webhook.payload as WorkflowAutomationPayload;
        return {
          workflowId: workflowPayload.workflowId,
          stepsCompleted: workflowPayload.steps.length,
          status: 'completed',
          timestamp: new Date().toISOString(),
        };

      default:
        return {
          status: 'completed',
          timestamp: new Date().toISOString(),
        };
    }
  }

  private async mockScheduledExecution(webhook: AutomationWebhook): Promise<AutomationWebhook> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    
    webhook.status = 'pending';
    this.webhookHistory.push(webhook);
    
    return webhook;
  }

  private generateId(): string {
    return `auto_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

export const automationService = new AutomationService();

export default automationService;
