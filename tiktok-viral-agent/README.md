# HookMaster AI 5.0 ⚡

**TikTok病毒算法征服系统 - 网页版**

一个强大的AI智能体系统，专注于生成TikTok病毒营销内容。通过深度解码TikTok算法，生成15秒完整视频脚本（可剪辑成5个3秒病毒片段），实现内容的病毒式传播。

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)
![AI](https://img.shields.io/badge/AI-Multi--Model-purple.svg)

---

## ✨ 核心特性

### 🧬 深度算法解码
- **三层推流机制**：精确匹配TikTok算法的0-300、300-3000、3000+播放量各阶段
- **权重模型分析**：基于2025年最新算法权重（3秒完播率45%、重播率20%等）
- **实时数据闭环**：15分钟/1小时/6小时/24小时多维度数据预测

### 🎬 15秒黄金母版
- **完整叙事结构**：0.0-15.0秒精确到0.5秒的时间轴设计
- **5种剪辑版本**：一个视频可生成极致钩子、产品植入、效果震撼、价值输出、循环钩子等5个不同版本
- **多维度设计**：视觉、音频、文案、评论区全方位策划

### 🤖 多模型支持
- ✅ **OpenAI GPT-4** / GPT-3.5
- ✅ **Anthropic Claude 3** (Opus/Sonnet/Haiku)
- ✅ **Google Gemini Pro**
- ✅ **DeepSeek** 系列
- 🔜 更多模型持续添加中...

### 🎯 三种输出模式
- **⚡ 闪电模式**：2分钟生成3个立即可执行的脚本
- **🎯 精准模式**：5分钟生成10个差异化脚本矩阵 + A/B测试方案
- **🏆 生态模式**：10分钟生成完整30天运营计划 + 数据监控体系

### 🎨 TikTok原生策略
- 特洛伊木马矩阵（假失败真成功、POV沉浸、Storytime等）
- 6大热门社区渗透（BookTok、CleanTok、FoodTok等）
- 原生功能深度利用（Stitch、Duet、Green Screen、Live）

---

## 🚀 快速开始

### 环境要求

- **Node.js**: >= 16.0.0
- **npm**: >= 8.0.0
- **至少一个AI模型的API Key**

### 安装步骤

#### 1. 克隆项目

```bash
cd tiktok-viral-agent
```

#### 2. 安装后端依赖

```bash
cd backend
npm install
```

#### 3. 配置环境变量

```bash
# 复制环境变量模板
cp .env.example .env

# 编辑.env文件，添加至少一个API Key
nano .env  # 或使用其他编辑器
```

**.env 配置示例：**

```env
# 服务器配置
PORT=3000
NODE_ENV=development

# OpenAI（推荐）
OPENAI_API_KEY=sk-your-openai-api-key-here
OPENAI_MODEL=gpt-4-turbo-preview

# Anthropic Claude（推荐）
ANTHROPIC_API_KEY=sk-ant-your-anthropic-key-here
ANTHROPIC_MODEL=claude-3-sonnet-20240229

# Google Gemini
GOOGLE_API_KEY=your-google-api-key-here
GOOGLE_MODEL=gemini-pro

# DeepSeek（国内推荐）
DEEPSEEK_API_KEY=your-deepseek-api-key-here
DEEPSEEK_MODEL=deepseek-chat
```

#### 4. 启动后端服务

```bash
npm start

# 或使用开发模式（支持热重载）
npm run dev
```

看到以下信息表示启动成功：

```
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║          HookMaster AI 5.0 ⚡                            ║
║          TikTok病毒算法征服系统                           ║
║                                                           ║
║          服务器启动成功！                                 ║
║          端口: 3000                                       ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝

✅ 可用的AI提供商:
   - OpenAI (GPT-4) (openai)
   - Anthropic (Claude) (anthropic)

🚀 访问 http://localhost:3000 开始使用
```

#### 5. 访问Web界面

打开浏览器访问：**http://localhost:3000**

---

## 📖 使用指南

### 基本使用流程

1. **填写产品信息**
   - 输入产品/服务描述（必填）
   - 可选填写目标受众和特殊要求

2. **选择生成配置**
   - 选择输出模式（闪电/精准/生态）
   - 选择AI模型（OpenAI/Claude/Gemini等）

3. **生成脚本**
   - 点击"生成病毒脚本"按钮
   - 等待2-10分钟（根据模式不同）
   - 查看生成结果

4. **导出使用**
   - 复制到剪贴板
   - 下载为Markdown文件
   - 直接用于视频制作

### 输出模式详解

#### ⚡ 闪电模式（2分钟）

**适用场景**：需要快速测试创意、紧急发布内容

**输出内容**：
- 3个立即可执行的TikTok脚本
- 每个脚本包含完整15秒时间轴
- 5个不同的3秒剪辑版本
- 趋势音频推荐
- 预期数据表现

#### 🎯 精准模式（5分钟）

**适用场景**：系统化内容规划、专业团队使用

**输出内容**：
- 10个差异化脚本矩阵
- 详细拍摄分镜（0.5秒精度）
- 评论区运营脚本（前20条种子评论）
- A/B测试方案（5个维度）
- KOC激活策略
- 风险评估与优化建议

#### 🏆 生态模式（10分钟）

**适用场景**：长期运营规划、品牌营销策略

**输出内容**：
- 30天TikTok内容日历
- 账号矩阵运营策略（品牌号+员工号+KOC）
- 直播承接方案（流量转化路径）
- 私域转化路径（TikTok→社群→成交）
- 数据监控体系（多时间维度）
- ROI预测模型与优化迭代机制

### 示例用例

#### 示例 1：美妆产品

**输入**：
```
产品描述：一款多功能修容棒，3种颜色一体，适合不同肤色和场景
目标受众：18-28岁的美妆爱好者
模式：精准模式
```

**输出重点**：
- 开场：修容"翻车"画面吸引注意
- 反转：展示正确使用方法
- 效果：前后对比震撼展示
- 互动：评论区教程式引导

#### 示例 2：家居清洁产品

**输入**：
```
产品描述：强力去污喷雾，天然成分，适合厨房、浴室等多场景
目标受众：25-40岁的家庭主妇/主夫
模式：闪电模式
```

**输出重点**：
- 开场：极度脏乱场景
- 过程：Time-lapse快速清洁
- 效果：光洁如新的满足感
- 音频：ASMR擦拭音效

---

## 🏗️ 项目结构

```
tiktok-viral-agent/
├── backend/                    # 后端服务
│   ├── src/
│   │   ├── server.js          # 主服务器
│   │   ├── services/
│   │   │   └── aiService.js   # AI服务层（多模型集成）
│   │   ├── prompts/
│   │   │   └── hookmaster.js  # 核心提示词系统
│   │   └── config/
│   ├── package.json
│   ├── .env.example           # 环境变量模板
│   └── .env                   # 实际配置（需自行创建）
│
└── frontend/                   # 前端界面
    ├── index.html             # 主页面
    ├── style.css              # 样式文件
    └── script.js              # 前端逻辑
```

---

## 🔌 API文档

### 基础URL

```
http://localhost:3000/api
```

### 端点列表

#### 1. 健康检查

**GET** `/health`

**响应**：
```json
{
  "status": "ok",
  "timestamp": "2025-01-15T10:30:00.000Z",
  "availableProviders": 2,
  "providers": ["openai", "anthropic"]
}
```

#### 2. 获取AI提供商

**GET** `/providers`

**响应**：
```json
{
  "success": true,
  "providers": [
    {
      "id": "openai",
      "name": "OpenAI (GPT-4)",
      "models": ["gpt-4-turbo-preview", "gpt-4", "gpt-3.5-turbo"]
    }
  ]
}
```

#### 3. 生成TikTok脚本

**POST** `/generate`

**请求体**：
```json
{
  "product": "产品描述",
  "targetAudience": "目标受众",
  "mode": "lightning",
  "provider": "openai",
  "model": "gpt-4-turbo-preview",
  "additionalRequirements": "特殊要求"
}
```

**响应**：
```json
{
  "success": true,
  "data": {
    "content": "生成的完整脚本内容...",
    "metadata": {
      "mode": "lightning",
      "provider": "openai",
      "model": "gpt-4-turbo-preview",
      "usage": {
        "prompt_tokens": 1500,
        "completion_tokens": 2000,
        "total_tokens": 3500
      },
      "executionTime": 15234
    }
  }
}
```

#### 4. 获取TikTok社区数据

**GET** `/communities`

**响应**：
```json
{
  "success": true,
  "communities": {
    "BookTok": {
      "规模": "50B+ views",
      "特征": "情感丰富、故事驱动",
      "钩子": "Plot Twist、书摘金句",
      "时长": "30-45秒"
    }
  }
}
```

#### 5. 批量生成

**POST** `/generate-batch`

**请求体**：
```json
{
  "products": ["产品1", "产品2", "产品3"],
  "targetAudience": "目标受众",
  "mode": "lightning",
  "provider": "openai"
}
```

---

## 🎯 核心算法原理

### TikTok算法权重模型

```javascript
第一层筛选 (0-300播放) {
  3秒完播率: 45%
  重播率: 20%
  点赞率: 15%
  评论率: 10%
  分享率: 10%
}

第二层推流 (300-3000播放) {
  完整完播率: 35%
  互动深度: 25%
  账号关注转化: 20%
  视频循环次数: 20%
}

爆款突破 (3000+播放) {
  用户标签匹配度: 30%
  话题关联度: 25%
  音频使用增长: 25%
  二创激发率: 20%
}
```

### 15秒黄金时间轴

| 时间段 | 目标 | 关键要素 | 心理机制 |
|--------|------|----------|----------|
| 0.0-0.3秒 | 打破滑动惯性 | 视觉冲击、突然音效 | 惊讶反射 |
| 0.3-1.0秒 | 确认留存价值 | 痛点呈现、好奇钩子 | 好奇心激活 |
| 1.0-3.0秒 | 建立观看承诺 | 悬念构建、价值预告 | 损失厌恶 |
| 3.0-5.0秒 | 产品自然融入 | 解决方案、剧情需要 | 解决方案渴望 |
| 5.0-8.0秒 | 效果极致展示 | Before/After对比 | 即时满足 |
| 8.0-10.0秒 | 信任与深化 | 真实反应、数据支撑 | 信任建立 |
| 10.0-12.0秒 | 社交货币制造 | 知识点、小技巧 | 分享动机 |
| 12.0-14.0秒 | 行动推动 | 互动引导、评论号召 | 参与欲望 |
| 14.0-15.0秒 | 循环触发 | 首尾呼应、新悬念 | 完形心理 |

---

## 🛠️ 技术栈

### 后端
- **Node.js** + **Express** - 轻量级Web框架
- **OpenAI SDK** - GPT模型集成
- **Anthropic SDK** - Claude模型集成
- **Axios** - HTTP客户端
- **dotenv** - 环境变量管理

### 前端
- **原生JavaScript** - 无框架依赖
- **CSS3** - 现代化样式设计
- **HTML5** - 语义化标签
- **Fetch API** - 异步请求

### AI模型
- OpenAI GPT-4 / GPT-3.5
- Anthropic Claude 3 (Opus/Sonnet/Haiku)
- Google Gemini Pro
- DeepSeek Chat/Coder

---

## 🔧 高级配置

### 自定义提示词

编辑 `backend/src/prompts/hookmaster.js` 可以自定义系统提示词和输出模板。

```javascript
const SYSTEM_PROMPT = `
你是 HookMaster AI 5.0 ⚡
[在这里自定义你的系统提示词]
`;
```

### 添加新的AI模型

在 `backend/src/services/aiService.js` 中添加新的生成方法：

```javascript
async generateWithNewProvider(systemPrompt, userPrompt, options = {}) {
  // 实现新模型的调用逻辑
}
```

### 端口配置

修改 `.env` 文件中的 `PORT` 变量：

```env
PORT=8080  # 使用自定义端口
```

---

## 📊 性能优化

### 建议配置

- **OpenAI GPT-4**：最佳质量，适合精准模式和生态模式
- **Claude 3 Sonnet**：质量与速度平衡，适合所有模式
- **GPT-3.5 Turbo**：最快速度，适合闪电模式
- **DeepSeek**：国内访问友好，性价比高

### Token使用估算

| 模式 | 平均Token使用 | 预估成本（GPT-4） |
|------|---------------|-------------------|
| 闪电模式 | 3,000-5,000 | $0.15-$0.25 |
| 精准模式 | 8,000-12,000 | $0.40-$0.60 |
| 生态模式 | 15,000-25,000 | $0.75-$1.25 |

---

## 🚨 常见问题

### Q1: 启动后显示"未配置任何AI提供商"

**A**: 请确保 `.env` 文件中至少配置了一个有效的API Key。

```bash
# 检查.env文件是否存在
ls -la backend/.env

# 确保至少有一个API Key配置
OPENAI_API_KEY=sk-...
```

### Q2: 生成失败，提示API错误

**A**: 可能的原因：
1. API Key无效或过期
2. 账户余额不足
3. 网络连接问题（特别是国内访问OpenAI）

**解决方案**：
- 验证API Key有效性
- 检查账户余额
- 使用代理或VPN（如果访问OpenAI）
- 尝试使用DeepSeek等国内模型

### Q3: 前端无法连接后端

**A**: 检查以下几点：
1. 后端服务是否正常运行
2. 端口是否被占用
3. 防火墙是否阻止连接
4. 前端API_BASE_URL配置是否正确

### Q4: 生成内容质量不理想

**A**: 优化建议：
1. 提供更详细的产品描述
2. 明确目标受众特征
3. 在"特殊要求"中添加更多指导
4. 尝试切换不同的AI模型
5. 使用精准模式或生态模式获得更详细的输出

---

## 🔒 安全注意事项

⚠️ **重要提醒**：

1. **API Key安全**
   - 永远不要将 `.env` 文件提交到Git仓库
   - 不要在前端代码中暴露API Key
   - 定期轮换API Key

2. **内容合规**
   - 确保生成的内容符合TikTok社区规范
   - 避免虚假宣传和误导信息
   - 尊重版权，使用授权音乐

3. **使用限制**
   - 本系统仅供合法营销使用
   - 禁止用于垃圾内容、欺诈等非法用途
   - 建议在正式使用前进行小规模测试

---

## 🤝 贡献指南

欢迎提交Issue和Pull Request！

### 开发流程

1. Fork本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建Pull Request

### 代码规范

- 使用ESLint进行代码检查
- 遵循现有的代码风格
- 添加必要的注释
- 更新相关文档

---

## 📄 许可证

本项目采用 **MIT License** 开源协议。

---

## 🙏 致谢

- [OpenAI](https://openai.com/) - GPT模型
- [Anthropic](https://www.anthropic.com/) - Claude模型
- [Google](https://ai.google.dev/) - Gemini模型
- [DeepSeek](https://www.deepseek.com/) - DeepSeek模型
- 所有贡献者和用户

---

## 📞 联系方式

- **GitHub**: [项目仓库](https://github.com/your-repo/tiktok-viral-agent)
- **Issues**: [问题反馈](https://github.com/your-repo/tiktok-viral-agent/issues)
- **Email**: your-email@example.com

---

## 🎉 开始你的TikTok病毒营销之旅！

```bash
cd backend
npm install
npm start
```

然后访问 **http://localhost:3000** 🚀

**Ready to Break TikTok? Let's Go Viral! ⚡**
