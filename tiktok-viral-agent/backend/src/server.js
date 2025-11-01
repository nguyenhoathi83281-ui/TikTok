/**
 * HookMaster AI 5.0 后端服务器
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const AIService = require('./services/aiService');
const { SYSTEM_PROMPT, buildUserPrompt } = require('./prompts/hookmaster');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// 初始化AI服务
const aiService = new AIService();

// 日志中间件
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// ==================== API路由 ====================

/**
 * 健康检查
 */
app.get('/api/health', async (req, res) => {
  try {
    const health = await aiService.healthCheck();
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      ...health
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

/**
 * 获取可用的AI提供商
 */
app.get('/api/providers', (req, res) => {
  try {
    const providers = aiService.getAvailableProviders();
    res.json({
      success: true,
      providers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * 生成TikTok脚本
 */
app.post('/api/generate', async (req, res) => {
  try {
    const {
      product,
      targetAudience,
      mode = 'lightning',
      provider = 'openai',
      model,
      additionalRequirements
    } = req.body;

    // 验证必填字段
    if (!product) {
      return res.status(400).json({
        success: false,
        error: '请提供产品或服务描述'
      });
    }

    // 验证模式
    const validModes = ['lightning', 'precision', 'ecosystem'];
    if (!validModes.includes(mode)) {
      return res.status(400).json({
        success: false,
        error: `无效的模式: ${mode}。有效模式: ${validModes.join(', ')}`
      });
    }

    console.log(`开始生成脚本 - 模式: ${mode}, 提供商: ${provider}`);

    // 构建提示词
    const userPrompt = buildUserPrompt(product, targetAudience, mode, additionalRequirements);

    // 生成内容
    const result = await aiService.generate(
      provider,
      SYSTEM_PROMPT,
      userPrompt,
      { model }
    );

    res.json({
      success: true,
      data: {
        content: result.content,
        metadata: {
          mode,
          provider,
          model: result.model,
          usage: result.usage,
          executionTime: result.executionTime
        }
      }
    });

  } catch (error) {
    console.error('生成脚本错误:', error);
    res.status(500).json({
      success: false,
      error: error.message || '生成脚本失败'
    });
  }
});

/**
 * 流式生成（实时响应）
 */
app.post('/api/generate-stream', async (req, res) => {
  try {
    const {
      product,
      targetAudience,
      mode = 'lightning',
      provider = 'openai',
      model,
      additionalRequirements
    } = req.body;

    if (!product) {
      return res.status(400).json({
        success: false,
        error: '请提供产品或服务描述'
      });
    }

    // 设置SSE响应头
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // 构建提示词
    const userPrompt = buildUserPrompt(product, targetAudience, mode, additionalRequirements);

    // 发送开始事件
    res.write(`data: ${JSON.stringify({ type: 'start', mode, provider })}\n\n`);

    // 这里可以实现流式响应（需要AI服务支持）
    // 当前简化版本：直接生成后返回
    const result = await aiService.generate(
      provider,
      SYSTEM_PROMPT,
      userPrompt,
      { model }
    );

    // 发送内容
    res.write(`data: ${JSON.stringify({ type: 'content', content: result.content })}\n\n`);

    // 发送完成事件
    res.write(`data: ${JSON.stringify({
      type: 'done',
      metadata: {
        model: result.model,
        usage: result.usage,
        executionTime: result.executionTime
      }
    })}\n\n`);

    res.end();

  } catch (error) {
    console.error('流式生成错误:', error);
    res.write(`data: ${JSON.stringify({ type: 'error', error: error.message })}\n\n`);
    res.end();
  }
});

/**
 * 获取TikTok社区数据
 */
app.get('/api/communities', (req, res) => {
  const { TIKTOK_COMMUNITIES } = require('./prompts/hookmaster');
  res.json({
    success: true,
    communities: TIKTOK_COMMUNITIES
  });
});

/**
 * 批量生成（多个脚本）
 */
app.post('/api/generate-batch', async (req, res) => {
  try {
    const {
      products = [],
      targetAudience,
      mode = 'lightning',
      provider = 'openai',
      model
    } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        success: false,
        error: '请提供至少一个产品'
      });
    }

    if (products.length > 5) {
      return res.status(400).json({
        success: false,
        error: '批量生成最多支持5个产品'
      });
    }

    const results = [];

    for (const product of products) {
      const userPrompt = buildUserPrompt(product, targetAudience, mode);
      const result = await aiService.generate(provider, SYSTEM_PROMPT, userPrompt, { model });

      results.push({
        product,
        content: result.content,
        metadata: {
          model: result.model,
          usage: result.usage,
          executionTime: result.executionTime
        }
      });
    }

    res.json({
      success: true,
      data: results
    });

  } catch (error) {
    console.error('批量生成错误:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ==================== 错误处理 ====================

// 404处理
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: '接口不存在'
  });
});

// 全局错误处理
app.use((err, req, res, next) => {
  console.error('全局错误:', err);
  res.status(500).json({
    success: false,
    error: err.message || '服务器内部错误'
  });
});

// ==================== 启动服务器 ====================

app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║          HookMaster AI 5.0 ⚡                            ║
║          TikTok病毒算法征服系统                           ║
║                                                           ║
║          服务器启动成功！                                 ║
║          端口: ${PORT}                                      ║
║          时间: ${new Date().toLocaleString('zh-CN')}                      ║
║                                                           ║
║          API文档:                                         ║
║          - GET  /api/health          健康检查             ║
║          - GET  /api/providers       获取AI提供商         ║
║          - POST /api/generate        生成脚本             ║
║          - POST /api/generate-stream 流式生成             ║
║          - GET  /api/communities     TikTok社区数据       ║
║          - POST /api/generate-batch  批量生成             ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  `);

  // 显示可用的AI提供商
  const providers = aiService.getAvailableProviders();
  if (providers.length > 0) {
    console.log('\n✅ 可用的AI提供商:');
    providers.forEach(p => {
      console.log(`   - ${p.name} (${p.id})`);
    });
  } else {
    console.log('\n⚠️  警告: 未配置任何AI提供商API Key');
    console.log('   请在.env文件中配置至少一个API Key');
  }

  console.log('\n🚀 访问 http://localhost:' + PORT + ' 开始使用\n');
});

module.exports = app;
