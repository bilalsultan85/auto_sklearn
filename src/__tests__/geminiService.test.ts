import { geminiService } from '../services/geminiService';
import { ExamGenerationOptions, HeroImageOptions, ToolInput } from '../types';

describe('GeminiService', () => {
  describe('configuration', () => {
    test('should start unconfigured', () => {
      expect(geminiService.isConfigured()).toBe(false);
    });

    test('should allow setting API key', () => {
      geminiService.setApiKey('test-api-key');
      expect(geminiService.getApiKey()).toBe('test-api-key');
      expect(geminiService.isConfigured()).toBe(true);
      
      geminiService.setApiKey('');
    });
  });

  describe('exam generation', () => {
    test('should generate mock exam when not configured', async () => {
      const options: ExamGenerationOptions = {
        subject: 'Mathematics',
        difficulty: 'medium',
        questionCount: 5,
        language: 'en',
        includeAnswers: true,
      };

      const result = await geminiService.generateExam(options);

      expect(result.questions).toHaveLength(5);
      expect(result.metadata.subject).toBe('Mathematics');
      expect(result.metadata.difficulty).toBe('medium');
      expect(result.questions[0]).toHaveProperty('id');
      expect(result.questions[0]).toHaveProperty('text');
      expect(result.questions[0]).toHaveProperty('type');
      expect(result.questions[0]).toHaveProperty('correctAnswer');
    });

    test('should generate Arabic exam', async () => {
      const options: ExamGenerationOptions = {
        subject: 'الرياضيات',
        difficulty: 'easy',
        questionCount: 3,
        language: 'ar',
        includeAnswers: false,
      };

      const result = await geminiService.generateExam(options);

      expect(result.questions).toHaveLength(3);
      expect(result.questions[0].text).toContain('السؤال');
    });
  });

  describe('hero image generation', () => {
    test('should generate mock hero image', async () => {
      const options: HeroImageOptions = {
        prompt: 'Beautiful sunset over mountains',
        style: 'photographic',
        aspectRatio: '16:9',
      };

      const imageUrl = await geminiService.generateHeroImage(options);

      expect(imageUrl).toBeTruthy();
      expect(typeof imageUrl).toBe('string');
      expect(imageUrl).toContain('http');
    });
  });

  describe('service tool runner', () => {
    test('should run mock tool', async () => {
      const toolInput: ToolInput = {
        toolName: 'dataAnalysis',
        parameters: {
          dataset: 'sales_data',
          analysisType: 'trend',
        },
        context: {
          userId: 'user123',
        },
      };

      const result = await geminiService.runServiceTool(toolInput);

      expect(result.success).toBe(true);
      expect(result).toHaveProperty('executionTime');
      expect(result.data).toHaveProperty('toolName', 'dataAnalysis');
    });
  });

  describe('chat', () => {
    test('should return mock chat response', async () => {
      const response = await geminiService.chat('Hello, how are you?');

      expect(response).toBeTruthy();
      expect(typeof response).toBe('string');
      expect(response.length).toBeGreaterThan(0);
    });
  });
});
