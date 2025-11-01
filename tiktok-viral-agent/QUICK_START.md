# 🚀 快速开始指南

## 5分钟快速部署 HookMaster AI 5.0

### 步骤 1: 准备API Key

你需要至少一个AI模型的API Key。推荐选项：

#### 选项A: OpenAI（推荐，质量最佳）

1. 访问 https://platform.openai.com/
2. 注册/登录账户
3. 进入 API Keys 页面
4. 创建新的API Key
5. 复制保存（格式：`sk-...`）

**费用参考**：GPT-4每次生成约$0.15-$1.25（根据模式不同）

#### 选项B: Anthropic Claude（推荐，速度与质量平衡）

1. 访问 https://console.anthropic.com/
2. 注册/登录账户
3. 生成API Key
4. 复制保存（格式：`sk-ant-...`）

**费用参考**：Claude 3 Sonnet每次生成约$0.10-$0.80

#### 选项C: DeepSeek（国内推荐，性价比高）

1. 访问 https://platform.deepseek.com/
2. 注册/登录账户
3. 获取API Key
4. 复制保存

**费用参考**：每次生成约¥0.5-¥3

#### 选项D: Google Gemini（免费额度）

1. 访问 https://ai.google.dev/
2. 获取API Key
3. 有一定的免费额度

---

### 步骤 2: 下载并解压项目

```bash
# 如果从GitHub下载
git clone https://github.com/your-repo/tiktok-viral-agent.git
cd tiktok-viral-agent

# 或直接解压下载的ZIP文件
```

---

### 步骤 3: 安装依赖

```bash
cd backend
npm install
```

等待几分钟，npm会自动下载所有依赖包。

---

### 步骤 4: 配置API Key

#### 方法1：使用文本编辑器

```bash
# 1. 复制环境变量模板
cp .env.example .env

# 2. 用任何文本编辑器打开.env文件
nano .env  # Linux/Mac
notepad .env  # Windows
```

#### 方法2：直接编辑

打开 `backend/.env` 文件，找到对应的行，填入你的API Key：

```env
# OpenAI配置（如果使用OpenAI）
OPENAI_API_KEY=sk-你的OpenAI-Key在这里
OPENAI_MODEL=gpt-4-turbo-preview

# Anthropic配置（如果使用Claude）
ANTHROPIC_API_KEY=sk-ant-你的Anthropic-Key在这里
ANTHROPIC_MODEL=claude-3-sonnet-20240229

# DeepSeek配置（如果使用DeepSeek）
DEEPSEEK_API_KEY=你的DeepSeek-Key在这里
DEEPSEEK_MODEL=deepseek-chat

# Google配置（如果使用Gemini）
GOOGLE_API_KEY=你的Google-Key在这里
GOOGLE_MODEL=gemini-pro
```

**重要**：至少配置一个API Key！

---

### 步骤 5: 启动服务

#### Linux/Mac

```bash
# 方法1：使用启动脚本
cd ..  # 回到项目根目录
./start.sh

# 方法2：手动启动
cd backend
npm start
```

#### Windows

```bash
# 方法1：双击start.bat文件

# 方法2：命令行启动
cd backend
npm start
```

---

### 步骤 6: 打开浏览器

看到以下信息表示启动成功：

```
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║          HookMaster AI 5.0 ⚡                            ║
║          TikTok病毒算法征服系统                           ║
║                                                           ║
║          服务器启动成功！                                 ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝

✅ 可用的AI提供商:
   - OpenAI (GPT-4) (openai)

🚀 访问 http://localhost:3000 开始使用
```

打开浏览器，访问：**http://localhost:3000**

---

## 🎬 第一次使用

### 1. 填写产品信息

在左侧表单中输入：

```
产品描述：一款智能保温杯，可以显示水温，提醒喝水，支持无线充电

目标受众：25-35岁的都市白领

特殊要求：强调科技感和健康概念
```

### 2. 选择配置

- **输出模式**：选择"⚡ 闪电模式"（首次使用建议）
- **AI模型**：选择你配置了API Key的模型

### 3. 生成脚本

点击"🚀 生成病毒脚本"按钮，等待2分钟左右。

### 4. 查看结果

右侧会显示生成的TikTok脚本，包括：

- 完整15秒时间轴
- 5种剪辑版本
- 视觉设计方案
- 音频策略
- 评论区运营脚本
- 数据预测

### 5. 导出使用

- 点击"📋"按钮复制到剪贴板
- 点击"💾"按钮下载为Markdown文件

---

## 🆘 常见问题快速解决

### Q: 启动后显示"未配置任何AI提供商"

**解决**：
```bash
# 1. 检查.env文件是否存在
ls backend/.env

# 2. 打开.env文件，确保至少有一个API Key
cat backend/.env

# 3. 重新启动服务
npm start
```

### Q: 生成失败，提示"API错误"

**可能原因**：
- API Key错误或过期
- 账户余额不足
- 网络问题（国内访问OpenAI可能需要代理）

**解决方案**：
1. 检查API Key是否正确
2. 登录API提供商网站检查账户状态
3. 尝试切换其他AI模型（如使用DeepSeek）

### Q: 端口3000被占用

**解决**：
```bash
# 修改backend/.env文件
PORT=8080  # 使用其他端口

# 然后重新启动
npm start
```

访问时使用新端口：http://localhost:8080

### Q: 国内访问OpenAI速度慢

**解决方案**：
1. 使用DeepSeek替代（国内优化）
2. 配置HTTP代理
3. 使用Claude或Gemini

---

## 📝 推荐配置

### 入门配置（成本优先）

```env
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-3.5-turbo
```

- **优点**：速度快，成本低（每次约$0.01-$0.05）
- **缺点**：质量略逊于GPT-4

### 专业配置（质量优先）

```env
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4-turbo-preview

ANTHROPIC_API_KEY=sk-ant-...
ANTHROPIC_MODEL=claude-3-opus-20240229
```

- **优点**：顶级质量，适合专业团队
- **缺点**：成本较高（每次约$0.30-$1.50）

### 国内配置（网络优先）

```env
DEEPSEEK_API_KEY=...
DEEPSEEK_MODEL=deepseek-chat
```

- **优点**：国内访问快速，中文支持好
- **缺点**：某些创意可能不如GPT-4

---

## 🎉 开始创作

一切准备就绪！现在你可以：

1. 🎬 为你的产品生成TikTok病毒脚本
2. ✂️ 根据不同剪辑版本制作多个视频
3. 📊 参考数据预测优化内容策略
4. 💬 使用评论区运营脚本引导互动
5. 🚀 发布并监测数据表现

**Ready to Break TikTok? Let's Go Viral! ⚡**

---

## 📚 进阶学习

完成首次使用后，建议阅读：

- [README.md](README.md) - 完整文档
- [API文档](#) - 接口说明
- [核心算法原理](#) - 深入理解

---

## 💬 需要帮助？

- GitHub Issues: [提交问题](https://github.com/your-repo/issues)
- 文档: [完整文档](README.md)
- Email: support@example.com

---

**祝你的TikTok内容大爆！🎉**
