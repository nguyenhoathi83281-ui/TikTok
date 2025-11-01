# 部署指南

## 本地部署

### 快速启动

```bash
# 1. 进入项目目录
cd tiktok-viral-agent

# 2. 配置环境变量
cd backend
cp .env.example .env
# 编辑.env文件，添加API Key

# 3. 安装依赖
npm install

# 4. 启动服务
npm start
```

访问 http://localhost:3000

---

## 生产环境部署

### 方式一：使用 PM2（推荐）

#### 1. 安装PM2

```bash
npm install -g pm2
```

#### 2. 创建PM2配置文件

创建 `backend/ecosystem.config.js`：

```javascript
module.exports = {
  apps: [{
    name: 'hookmaster-ai',
    script: 'src/server.js',
    cwd: '/path/to/tiktok-viral-agent/backend',
    instances: 2,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
```

#### 3. 启动应用

```bash
cd backend
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

#### 4. 管理应用

```bash
# 查看状态
pm2 status

# 查看日志
pm2 logs hookmaster-ai

# 重启
pm2 restart hookmaster-ai

# 停止
pm2 stop hookmaster-ai
```

---

### 方式二：Docker部署

#### 1. 创建Dockerfile

在项目根目录创建 `Dockerfile`：

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY backend/package*.json ./
RUN npm install --production

COPY backend/ ./

EXPOSE 3000

CMD ["npm", "start"]
```

#### 2. 创建docker-compose.yml

```yaml
version: '3.8'

services:
  hookmaster-ai:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
    restart: unless-stopped
```

#### 3. 启动容器

```bash
docker-compose up -d
```

---

### 方式三：云服务器部署

#### AWS EC2 / 阿里云 ECS / 腾讯云 CVM

1. **创建服务器实例**
   - 选择 Ubuntu 20.04 或更高版本
   - 至少 1GB RAM
   - 开放端口 3000（或自定义端口）

2. **SSH连接服务器**

```bash
ssh user@your-server-ip
```

3. **安装Node.js**

```bash
# 使用NodeSource安装最新版本
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

4. **上传代码**

```bash
# 方式1: 使用Git
cd /var/www
sudo git clone https://github.com/your-repo/tiktok-viral-agent.git
cd tiktok-viral-agent

# 方式2: 使用SCP
scp -r tiktok-viral-agent user@your-server-ip:/var/www/
```

5. **配置环境**

```bash
cd backend
sudo cp .env.example .env
sudo nano .env  # 编辑API Key
```

6. **安装依赖并启动**

```bash
npm install
npm install -g pm2
pm2 start src/server.js --name hookmaster-ai
pm2 save
pm2 startup
```

7. **配置Nginx反向代理（可选）**

```bash
sudo apt install nginx

# 创建配置文件
sudo nano /etc/nginx/sites-available/hookmaster-ai
```

配置内容：

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

启用配置：

```bash
sudo ln -s /etc/nginx/sites-available/hookmaster-ai /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

### 方式四：Vercel部署（仅前端）

如果只部署前端静态页面，可以使用Vercel：

1. **安装Vercel CLI**

```bash
npm install -g vercel
```

2. **部署前端**

```bash
cd frontend
vercel deploy --prod
```

注意：需要单独部署后端到其他服务器，并在前端配置中修改API地址。

---

## 环境变量配置

### 生产环境必需变量

```env
# 基础配置
NODE_ENV=production
PORT=3000

# 至少配置一个AI模型
OPENAI_API_KEY=sk-...
# 或
ANTHROPIC_API_KEY=sk-ant-...
# 或
DEEPSEEK_API_KEY=...
# 或
GOOGLE_API_KEY=...
```

### 安全建议

1. **使用环境变量**
   - 不要在代码中硬编码API Key
   - 使用云服务商的密钥管理服务

2. **HTTPS配置**
   - 生产环境必须使用HTTPS
   - 使用Let's Encrypt免费证书

3. **防火墙配置**
   - 只开放必要端口（80, 443）
   - 限制管理端口访问

4. **日志管理**
   - 配置日志轮转
   - 定期清理旧日志

---

## 性能优化

### 1. 使用CDN

将静态资源部署到CDN，提高加载速度。

### 2. 启用Gzip压缩

```javascript
// 在server.js中添加
const compression = require('compression');
app.use(compression());
```

### 3. 配置缓存

```javascript
// 静态资源缓存
app.use(express.static('public', {
  maxAge: '7d'
}));
```

### 4. 负载均衡

使用PM2集群模式或Nginx负载均衡：

```bash
pm2 start src/server.js -i max  # 启动多个实例
```

---

## 监控与维护

### 1. 健康检查

设置定时任务检查服务状态：

```bash
# 使用cron
*/5 * * * * curl -f http://localhost:3000/api/health || pm2 restart hookmaster-ai
```

### 2. 日志监控

```bash
# PM2日志
pm2 logs hookmaster-ai --lines 100

# 系统日志
tail -f /var/log/nginx/access.log
```

### 3. 性能监控

推荐工具：
- PM2 Plus（付费）
- New Relic
- Datadog

---

## 故障排查

### 服务无法启动

```bash
# 检查端口占用
lsof -i :3000

# 检查Node.js版本
node -v

# 检查依赖
npm install
```

### API调用失败

```bash
# 检查环境变量
cat backend/.env

# 测试API Key
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

### 内存泄漏

```bash
# 查看内存使用
pm2 monit

# 定期重启（临时方案）
pm2 restart hookmaster-ai --cron "0 3 * * *"
```

---

## 备份与恢复

### 数据备份

```bash
# 备份配置文件
tar -czf backup-$(date +%Y%m%d).tar.gz backend/.env

# 定期备份（cron）
0 2 * * * cd /var/www/tiktok-viral-agent && tar -czf /backups/backup-$(date +\%Y\%m\%d).tar.gz .
```

### 快速恢复

```bash
# 1. 拉取最新代码
git pull origin main

# 2. 恢复配置
tar -xzf backup-20250101.tar.gz

# 3. 重启服务
pm2 restart hookmaster-ai
```

---

## 升级指南

### 版本更新

```bash
# 1. 备份当前版本
tar -czf backup-before-upgrade.tar.gz .

# 2. 拉取新版本
git pull origin main

# 3. 更新依赖
cd backend
npm install

# 4. 重启服务
pm2 restart hookmaster-ai

# 5. 验证功能
curl http://localhost:3000/api/health
```

---

## 成本估算

### 基础配置（月费用）

- **服务器**：$5-10/月（1GB RAM）
- **域名**：$10-15/年
- **SSL证书**：免费（Let's Encrypt）
- **API调用**：根据使用量，约$10-100/月

### 优化建议

1. 使用DeepSeek降低API成本
2. 实施请求缓存减少重复调用
3. 限制单用户调用频率
4. 选择合适的服务器配置

---

## 技术支持

- 📖 [完整文档](README.md)
- 🐛 [提交Issue](https://github.com/your-repo/issues)
- 💬 [社区讨论](https://github.com/your-repo/discussions)

---

**祝部署顺利！🚀**
