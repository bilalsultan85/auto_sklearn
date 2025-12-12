import { automationService } from '../services/automationService';

describe('AutomationService', () => {
  beforeEach(() => {
    automationService.clearHistory();
  });

  describe('bot automation', () => {
    test('should trigger bot automation', async () => {
      const payload = {
        botType: 'telegram' as const,
        action: 'sendMessage',
        recipients: ['user1', 'user2'],
        message: 'Hello from bot!',
      };

      const webhook = await automationService.triggerBotAutomation(payload);

      expect(webhook).toBeDefined();
      expect(webhook.type).toBe('bot');
      expect(webhook.status).toMatch(/completed|failed/);
      expect(webhook).toHaveProperty('id');
      expect(webhook).toHaveProperty('executedAt');
    });
  });

  describe('financial automation', () => {
    test('should trigger financial automation', async () => {
      const payload = {
        type: 'payment' as const,
        amount: 100,
        currency: 'USD',
        userId: 'user123',
      };

      const webhook = await automationService.triggerFinancialAutomation(payload);

      expect(webhook).toBeDefined();
      expect(webhook.type).toBe('financial');
      expect(webhook.status).toMatch(/completed|failed/);
    });
  });

  describe('notification automation', () => {
    test('should trigger notification automation', async () => {
      const payload = {
        type: 'email' as const,
        recipients: ['user@example.com'],
        subject: 'Test Notification',
        message: 'This is a test notification',
        priority: 'medium' as const,
      };

      const webhook = await automationService.triggerNotificationAutomation(payload);

      expect(webhook).toBeDefined();
      expect(webhook.type).toBe('notification');
      expect(webhook.status).toMatch(/completed|failed/);
    });
  });

  describe('workflow automation', () => {
    test('should trigger workflow automation', async () => {
      const payload = {
        workflowId: 'workflow_123',
        steps: [
          {
            id: 'step1',
            name: 'Fetch Data',
            action: 'fetchData',
            parameters: { source: 'database' },
          },
          {
            id: 'step2',
            name: 'Process Data',
            action: 'processData',
            parameters: { algorithm: 'ml_model' },
          },
        ],
      };

      const webhook = await automationService.triggerWorkflowAutomation(payload);

      expect(webhook).toBeDefined();
      expect(webhook.type).toBe('workflow');
      expect(webhook.status).toMatch(/completed|failed/);
    });
  });

  describe('webhook history', () => {
    test('should track webhook history', async () => {
      const payload = {
        botType: 'slack' as const,
        action: 'sendMessage',
        recipients: ['channel1'],
        message: 'Test message',
      };

      await automationService.triggerBotAutomation(payload);
      await automationService.triggerBotAutomation(payload);

      const history = automationService.getWebhookHistory();
      expect(history.length).toBe(2);
    });

    test('should retrieve webhook by ID', async () => {
      const payload = {
        botType: 'discord' as const,
        action: 'sendMessage',
        recipients: ['user1'],
        message: 'Test',
      };

      const webhook = await automationService.triggerBotAutomation(payload);
      const retrieved = automationService.getWebhookById(webhook.id);

      expect(retrieved).toBeDefined();
      expect(retrieved?.id).toBe(webhook.id);
    });

    test('should limit history results', async () => {
      const payload = {
        botType: 'telegram' as const,
        action: 'sendMessage',
        recipients: ['user1'],
        message: 'Test',
      };

      for (let i = 0; i < 5; i++) {
        await automationService.triggerBotAutomation(payload);
      }

      const history = automationService.getWebhookHistory(3);
      expect(history.length).toBe(3);
    });
  });

  describe('scheduled automation', () => {
    test('should schedule automation', async () => {
      const payload = {
        type: 'invoice' as const,
        amount: 500,
        currency: 'SAR',
        userId: 'user456',
      };

      const webhook = await automationService.scheduleAutomation(
        'financial',
        payload,
        '0 9 * * 1'
      );

      expect(webhook).toBeDefined();
      expect(webhook.triggerType).toBe('scheduled');
      expect(webhook.status).toBe('pending');
    });
  });

  describe('event-based automation', () => {
    test('should trigger event-based automation', async () => {
      const payload = {
        type: 'push' as const,
        recipients: ['user123'],
        message: 'New event occurred',
        priority: 'high' as const,
      };

      const webhook = await automationService.triggerEventBasedAutomation(
        'notification',
        payload,
        'user.signup'
      );

      expect(webhook).toBeDefined();
      expect(webhook.triggerType).toBe('event');
    });
  });
});
