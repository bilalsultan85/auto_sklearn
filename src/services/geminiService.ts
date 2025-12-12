import {
  ExamGenerationOptions,
  ExamResult,
  HeroImageOptions,
  ToolInput,
  ToolOutput,
  Question,
} from '../types';

interface GeminiConfig {
  apiKey: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

class GeminiService {
  private apiKey: string = '';
  private model: string = 'gemini-pro';
  private temperature: number = 0.7;
  private maxTokens: number = 2048;
  private baseUrl: string = 'https://generativelanguage.googleapis.com/v1beta';

  constructor(config?: Partial<GeminiConfig>) {
    if (config?.apiKey) {
      this.apiKey = config.apiKey;
    }
    if (config?.model) {
      this.model = config.model;
    }
    if (config?.temperature !== undefined) {
      this.temperature = config.temperature;
    }
    if (config?.maxTokens) {
      this.maxTokens = config.maxTokens;
    }
  }

  setApiKey(apiKey: string): void {
    this.apiKey = apiKey;
  }

  getApiKey(): string {
    return this.apiKey;
  }

  isConfigured(): boolean {
    return this.apiKey.length > 0;
  }

  async generateExam(options: ExamGenerationOptions): Promise<ExamResult> {
    if (!this.isConfigured()) {
      return this.getMockExam(options);
    }

    try {
      const prompt = this.buildExamPrompt(options);
      const response = await this.callGeminiAPI(prompt);
      
      return this.parseExamResponse(response, options);
    } catch (error) {
      console.error('Error generating exam with Gemini:', error);
      return this.getMockExam(options);
    }
  }

  async generateHeroImage(options: HeroImageOptions): Promise<string> {
    if (!this.isConfigured()) {
      return this.getMockHeroImage(options);
    }

    try {
      const response = await this.callGeminiVisionAPI(options);
      return response.imageUrl || this.getMockHeroImage(options);
    } catch (error) {
      console.error('Error generating hero image with Gemini:', error);
      return this.getMockHeroImage(options);
    }
  }

  async runServiceTool(toolInput: ToolInput): Promise<ToolOutput> {
    const startTime = Date.now();

    if (!this.isConfigured()) {
      return this.getMockToolOutput(toolInput, startTime);
    }

    try {
      const prompt = this.buildToolPrompt(toolInput);
      const response = await this.callGeminiAPI(prompt);
      
      const executionTime = Date.now() - startTime;

      return {
        success: true,
        data: response,
        executionTime,
      };
    } catch (error) {
      const executionTime = Date.now() - startTime;
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        executionTime,
      };
    }
  }

  async chat(message: string, context?: Record<string, any>): Promise<string> {
    if (!this.isConfigured()) {
      return this.getMockChatResponse(message);
    }

    try {
      const response = await this.callGeminiAPI(message, context);
      return response.text || 'No response generated';
    } catch (error) {
      console.error('Error in chat:', error);
      return 'Sorry, I encountered an error processing your message.';
    }
  }

  private async callGeminiAPI(
    prompt: string,
    context?: Record<string, any>
  ): Promise<any> {
    const url = `${this.baseUrl}/models/${this.model}:generateContent?key=${this.apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: this.temperature,
          maxOutputTokens: this.maxTokens,
        },
        ...(context && { context }),
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    return {
      text: data.candidates?.[0]?.content?.parts?.[0]?.text || '',
      raw: data,
    };
  }

  private async callGeminiVisionAPI(options: HeroImageOptions): Promise<any> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    
    return {
      imageUrl: this.getMockHeroImage(options),
    };
  }

  private buildExamPrompt(options: ExamGenerationOptions): string {
    const languageInstruction = options.language === 'ar' 
      ? 'Generate the exam in Arabic (العربية).'
      : 'Generate the exam in English.';

    return `
Create an exam with the following specifications:
- Subject: ${options.subject}
- Difficulty: ${options.difficulty}
- Number of questions: ${options.questionCount}
- ${languageInstruction}
- ${options.includeAnswers ? 'Include correct answers' : 'Do not include answers'}

Format the response as a JSON array of questions with the following structure:
{
  "id": "unique_id",
  "text": "question text",
  "type": "multiple-choice" | "true-false" | "short-answer" | "essay",
  "options": ["option1", "option2", ...] (for multiple-choice),
  "correctAnswer": "answer" (if requested),
  "points": number
}
    `.trim();
  }

  private buildToolPrompt(toolInput: ToolInput): string {
    return `
Execute the following tool:
Tool Name: ${toolInput.toolName}
Parameters: ${JSON.stringify(toolInput.parameters, null, 2)}
${toolInput.context ? `Context: ${JSON.stringify(toolInput.context, null, 2)}` : ''}

Provide the result in a structured format.
    `.trim();
  }

  private parseExamResponse(response: any, options: ExamGenerationOptions): ExamResult {
    try {
      const text = response.text || '';
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      
      if (jsonMatch) {
        const questions = JSON.parse(jsonMatch[0]);
        return {
          questions,
          metadata: {
            subject: options.subject,
            difficulty: options.difficulty,
            generatedAt: new Date(),
          },
        };
      }
    } catch (error) {
      console.error('Error parsing exam response:', error);
    }

    return this.getMockExam(options);
  }

  private getMockExam(options: ExamGenerationOptions): ExamResult {
    const questions: Question[] = [];
    
    for (let i = 1; i <= options.questionCount; i++) {
      const questionText = options.language === 'ar'
        ? `السؤال ${i} حول ${options.subject}`
        : `Question ${i} about ${options.subject}`;

      questions.push({
        id: `q${i}`,
        text: questionText,
        type: 'multiple-choice',
        options: options.language === 'ar'
          ? ['الخيار أ', 'الخيار ب', 'الخيار ج', 'الخيار د']
          : ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: options.includeAnswers ? (options.language === 'ar' ? 'الخيار أ' : 'Option A') : undefined,
        points: 10,
      });
    }

    return {
      questions,
      metadata: {
        subject: options.subject,
        difficulty: options.difficulty,
        generatedAt: new Date(),
      },
    };
  }

  private getMockHeroImage(options: HeroImageOptions): string {
    const aspectRatio = options.aspectRatio || '16:9';
    const [width, height] = aspectRatio.split(':').map(Number);
    const actualWidth = width * 100;
    const actualHeight = height * 100;
    
    return `https://via.placeholder.com/${actualWidth}x${actualHeight}?text=${encodeURIComponent(options.prompt)}`;
  }

  private getMockToolOutput(toolInput: ToolInput, startTime: number): ToolOutput {
    const executionTime = Date.now() - startTime;

    return {
      success: true,
      data: {
        toolName: toolInput.toolName,
        result: `Mock result for ${toolInput.toolName}`,
        parameters: toolInput.parameters,
      },
      executionTime,
    };
  }

  private getMockChatResponse(message: string): string {
    const responses = [
      'That\'s an interesting question. Let me help you with that.',
      'I understand what you\'re asking. Here\'s what I think...',
      'Based on your question, I would suggest...',
      'Great question! Let me provide some insights.',
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  }
}

export const geminiService = new GeminiService();

export default geminiService;
