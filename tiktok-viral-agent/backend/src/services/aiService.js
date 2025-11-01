/**
 * AI服务层 - 支持多个大模型API
 */

const OpenAI = require('openai');
const Anthropic = require('@anthropic-ai/sdk');
const axios = require('axios');

class AIService {
  constructor() {
    // OpenAI 客户端
    if (process.env.OPENAI_API_KEY) {
      this.openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        baseURL: process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1'
      });
    }

    // Anthropic (Claude) 客户端
    if (process.env.ANTHROPIC_API_KEY) {
      this.anthropic = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY
      });
    }

    // DeepSeek 配置
    this.deepseekConfig = {
      apiKey: process.env.DEEPSEEK_API_KEY,
      baseURL: process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com/v1',
      model: process.env.DEEPSEEK_MODEL || 'deepseek-chat'
    };

    // Google Gemini 配置
    this.googleConfig = {
      apiKey: process.env.GOOGLE_API_KEY,
      model: process.env.GOOGLE_MODEL || 'gemini-pro'
    };
  }

  /**
   * 使用OpenAI生成内容
   */
  async generateWithOpenAI(systemPrompt, userPrompt, options = {}) {
    if (!this.openai) {
      throw new Error('OpenAI API key not configured');
    }

    try {
      const response = await this.openai.chat.completions.create({
        model: options.model || process.env.OPENAI_MODEL || 'gpt-4-turbo-preview',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: options.temperature || 0.8,
        max_tokens: options.maxTokens || 4000,
        stream: false
      });

      return {
        content: response.choices[0].message.content,
        model: response.model,
        usage: response.usage
      };
    } catch (error) {
      console.error('OpenAI API Error:', error.message);
      throw new Error(`OpenAI生成失败: ${error.message}`);
    }
  }

  /**
   * 使用Anthropic Claude生成内容
   */
  async generateWithAnthropic(systemPrompt, userPrompt, options = {}) {
    if (!this.anthropic) {
      throw new Error('Anthropic API key not configured');
    }

    try {
      const response = await this.anthropic.messages.create({
        model: options.model || process.env.ANTHROPIC_MODEL || 'claude-3-sonnet-20240229',
        max_tokens: options.maxTokens || 4000,
        temperature: options.temperature || 0.8,
        system: systemPrompt,
        messages: [
          { role: 'user', content: userPrompt }
        ]
      });

      return {
        content: response.content[0].text,
        model: response.model,
        usage: {
          prompt_tokens: response.usage.input_tokens,
          completion_tokens: response.usage.output_tokens,
          total_tokens: response.usage.input_tokens + response.usage.output_tokens
        }
      };
    } catch (error) {
      console.error('Anthropic API Error:', error.message);
      throw new Error(`Anthropic生成失败: ${error.message}`);
    }
  }

  /**
   * 使用DeepSeek生成内容
   */
  async generateWithDeepSeek(systemPrompt, userPrompt, options = {}) {
    if (!this.deepseekConfig.apiKey) {
      throw new Error('DeepSeek API key not configured');
    }

    try {
      const response = await axios.post(
        `${this.deepseekConfig.baseURL}/chat/completions`,
        {
          model: options.model || this.deepseekConfig.model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          temperature: options.temperature || 0.8,
          max_tokens: options.maxTokens || 4000
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.deepseekConfig.apiKey}`
          }
        }
      );

      return {
        content: response.data.choices[0].message.content,
        model: response.data.model,
        usage: response.data.usage
      };
    } catch (error) {
      console.error('DeepSeek API Error:', error.message);
      throw new Error(`DeepSeek生成失败: ${error.message}`);
    }
  }

  /**
   * 使用Google Gemini生成内容
   */
  async generateWithGoogle(systemPrompt, userPrompt, options = {}) {
    if (!this.googleConfig.apiKey) {
      throw new Error('Google API key not configured');
    }

    try {
      const combinedPrompt = `${systemPrompt}\n\n---\n\n${userPrompt}`;

      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/${this.googleConfig.model}:generateContent?key=${this.googleConfig.apiKey}`,
        {
          contents: [{
            parts: [{
              text: combinedPrompt
            }]
          }],
          generationConfig: {
            temperature: options.temperature || 0.8,
            maxOutputTokens: options.maxTokens || 4000
          }
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      return {
        content: response.data.candidates[0].content.parts[0].text,
        model: this.googleConfig.model,
        usage: {
          prompt_tokens: response.data.usageMetadata?.promptTokenCount || 0,
          completion_tokens: response.data.usageMetadata?.candidatesTokenCount || 0,
          total_tokens: response.data.usageMetadata?.totalTokenCount || 0
        }
      };
    } catch (error) {
      console.error('Google API Error:', error.message);
      throw new Error(`Google生成失败: ${error.message}`);
    }
  }

  /**
   * 统一生成接口
   */
  async generate(provider, systemPrompt, userPrompt, options = {}) {
    const startTime = Date.now();

    let result;
    switch (provider.toLowerCase()) {
      case 'openai':
        result = await this.generateWithOpenAI(systemPrompt, userPrompt, options);
        break;
      case 'anthropic':
      case 'claude':
        result = await this.generateWithAnthropic(systemPrompt, userPrompt, options);
        break;
      case 'deepseek':
        result = await this.generateWithDeepSeek(systemPrompt, userPrompt, options);
        break;
      case 'google':
      case 'gemini':
        result = await this.generateWithGoogle(systemPrompt, userPrompt, options);
        break;
      default:
        throw new Error(`不支持的AI提供商: ${provider}`);
    }

    const endTime = Date.now();
    result.executionTime = endTime - startTime;

    return result;
  }

  /**
   * 获取可用的AI提供商列表
   */
  getAvailableProviders() {
    const providers = [];

    if (process.env.OPENAI_API_KEY) {
      providers.push({
        id: 'openai',
        name: 'OpenAI (GPT-4)',
        models: ['gpt-4-turbo-preview', 'gpt-4', 'gpt-3.5-turbo']
      });
    }

    if (process.env.ANTHROPIC_API_KEY) {
      providers.push({
        id: 'anthropic',
        name: 'Anthropic (Claude)',
        models: ['claude-3-opus-20240229', 'claude-3-sonnet-20240229', 'claude-3-haiku-20240307']
      });
    }

    if (process.env.DEEPSEEK_API_KEY) {
      providers.push({
        id: 'deepseek',
        name: 'DeepSeek',
        models: ['deepseek-chat', 'deepseek-coder']
      });
    }

    if (process.env.GOOGLE_API_KEY) {
      providers.push({
        id: 'google',
        name: 'Google (Gemini)',
        models: ['gemini-pro', 'gemini-pro-vision']
      });
    }

    return providers;
  }

  /**
   * 健康检查
   */
  async healthCheck() {
    const providers = this.getAvailableProviders();
    const health = {
      status: providers.length > 0 ? 'healthy' : 'no_providers',
      availableProviders: providers.length,
      providers: providers.map(p => p.id)
    };

    return health;
  }
}

module.exports = AIService;
