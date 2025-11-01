# 项目概览

## HookMaster AI 5.0 - TikTok病毒算法征服系统

### 📁 项目结构

```
tiktok-viral-agent/
├── README.md                      # 完整项目文档
├── QUICK_START.md                 # 5分钟快速开始指南
├── DEPLOY.md                      # 部署指南
├── LICENSE                        # MIT许可证
├── .gitignore                     # Git忽略文件
├── start.sh                       # Linux/Mac启动脚本
├── start.bat                      # Windows启动脚本
│
├── backend/                       # 后端服务
│   ├── package.json              # 依赖配置
│   ├── .env.example              # 环境变量模板
│   ├── .env                      # 实际配置（需创建）
│   │
│   ├── src/
│   │   ├── server.js             # Express服务器主文件
│   │   ├── services/
│   │   │   └── aiService.js      # AI服务层（多模型集成）
│   │   ├── prompts/
│   │   │   └── hookmaster.js     # HookMaster核心提示词系统
│   │   └── config/
│   │
│   └── public/                   # 静态资源（自动从frontend复制）
│       ├── index.html
│       ├── style.css
│       └── script.js
│
└── frontend/                      # 前端源码
    ├── index.html                # 主页面
    ├── style.css                 # 样式文件
    └── script.js                 # 前端逻辑
```

---

## 🎯 核心功能

### 1. 多模型AI集成
- **OpenAI GPT-4/3.5**: 最高质量，适合专业团队
- **Anthropic Claude 3**: 速度与质量平衡
- **Google Gemini Pro**: 免费额度，适合测试
- **DeepSeek**: 国内优化，性价比高

### 2. 三种输出模式
- **⚡ 闪电模式**: 2分钟生成3个脚本
- **🎯 精准模式**: 5分钟生成10个脚本矩阵
- **🏆 生态模式**: 10分钟生成完整运营方案

### 3. TikTok原生策略
- 15秒黄金时间轴（精确到0.5秒）
- 5种剪辑版本（一个视频多种用途）
- 算法权重优化（基于2025年最新算法）
- 社区文化渗透（BookTok、CleanTok等）

### 4. 完整营销方案
- 视觉设计方案
- 音频策略推荐
- 评论区运营脚本
- 数据预测与优化
- A/B测试方案

---

## 🚀 快速启动

### 最简单的方式

```bash
# 1. 进入项目
cd tiktok-viral-agent

# 2. 配置API Key
cd backend
cp .env.example .env
nano .env  # 添加至少一个API Key

# 3. 启动（自动安装依赖）
./start.sh  # Linux/Mac
# 或
start.bat   # Windows
```

### 访问应用

打开浏览器访问：**http://localhost:3000**

---

## 🔑 API Key获取

### OpenAI（推荐）
- 访问: https://platform.openai.com/api-keys
- 费用: 约$0.15-$1.25/次生成

### Anthropic Claude
- 访问: https://console.anthropic.com/
- 费用: 约$0.10-$0.80/次生成

### DeepSeek（国内推荐）
- 访问: https://platform.deepseek.com/
- 费用: 约¥0.5-¥3/次生成

### Google Gemini
- 访问: https://ai.google.dev/
- 免费额度: 有

---

## 📊 技术栈

### 后端
- Node.js + Express
- OpenAI SDK
- Anthropic SDK
- Axios

### 前端
- 原生JavaScript（无框架依赖）
- CSS3（现代化设计）
- Fetch API

### 部署
- PM2（进程管理）
- Nginx（反向代理）
- Docker（容器化）

---

## 🎬 使用示例

### 输入
```
产品: 一款智能保温杯，可显示水温、提醒喝水
目标受众: 25-35岁都市白领
模式: 闪电模式
```

### 输出
```
✅ 3个完整TikTok脚本
✅ 15秒精确时间轴
✅ 5种剪辑版本
✅ 视觉音频方案
✅ 评论区运营脚本
✅ 预期数据分析
```

---

## 📈 核心算法

### TikTok推流机制

| 阶段 | 播放量 | 关键指标 | 权重 |
|------|--------|----------|------|
| 第一层 | 0-300 | 3秒完播率 | 45% |
| 第二层 | 300-3000 | 完整完播率 | 35% |
| 爆款层 | 3000+ | 用户标签匹配 | 30% |

### 15秒时间轴

```
0.0-0.3s: 打破滑动惯性（视觉冲击）
0.3-1.0s: 确认留存价值（痛点/好奇）
1.0-3.0s: 建立观看承诺（悬念/冲突）
3.0-5.0s: 产品自然融入（解决方案）
5.0-8.0s: 效果极致展示（Before/After）
8.0-10.0s: 信任与深化（真实反应）
10.0-12.0s: 社交货币制造（知识点）
12.0-14.0s: 行动推动（互动引导）
14.0-15.0s: 循环触发（首尾呼应）
```

---

## 🔒 安全注意事项

1. **API Key管理**
   - 永远不要将`.env`文件提交到Git
   - 不要在前端代码中暴露API Key
   - 定期轮换密钥

2. **内容合规**
   - 遵守TikTok社区规范
   - 避免虚假宣传
   - 尊重版权

3. **使用限制**
   - 仅供合法营销使用
   - 禁止垃圾内容
   - 建议先测试后使用

---

## 📚 相关文档

- [README.md](README.md) - 完整项目文档
- [QUICK_START.md](QUICK_START.md) - 快速开始指南
- [DEPLOY.md](DEPLOY.md) - 部署指南

---

## 🆘 常见问题

### 1. 无法启动服务
```bash
# 检查Node.js版本
node -v  # 需要 >= 16.0.0

# 检查依赖
npm install
```

### 2. API调用失败
- 检查API Key是否正确
- 检查账户余额
- 尝试切换其他模型

### 3. 端口被占用
```env
# 修改.env文件
PORT=8080
```

---

## 🎉 开始使用

```bash
cd backend
npm install
npm start
```

访问 **http://localhost:3000**

**Ready to Break TikTok? Let's Go Viral! ⚡**

---

## 📞 支持与反馈

- GitHub: [项目仓库](https://github.com/your-repo/tiktok-viral-agent)
- Issues: [问题反馈](https://github.com/your-repo/issues)
- Email: support@example.com

---

**版本**: 1.0.0
**最后更新**: 2025-01-15
**许可证**: MIT
