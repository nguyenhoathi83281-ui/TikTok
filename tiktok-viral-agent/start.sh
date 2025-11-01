#!/bin/bash

# HookMaster AI 5.0 启动脚本

echo "╔═══════════════════════════════════════════════════════════╗"
echo "║                                                           ║"
echo "║          HookMaster AI 5.0 ⚡                            ║"
echo "║          TikTok病毒算法征服系统                           ║"
echo "║                                                           ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""

# 检查Node.js是否安装
if ! command -v node &> /dev/null; then
    echo "❌ 错误: 未检测到Node.js"
    echo "请先安装Node.js (>= 16.0.0): https://nodejs.org/"
    exit 1
fi

# 显示Node.js版本
echo "✅ Node.js版本: $(node -v)"
echo "✅ npm版本: $(npm -v)"
echo ""

# 进入后端目录
cd backend

# 检查.env文件
if [ ! -f ".env" ]; then
    echo "⚠️  警告: 未找到.env文件"
    echo "正在从.env.example创建.env文件..."
    cp .env.example .env
    echo "✅ .env文件已创建"
    echo ""
    echo "⚠️  重要: 请编辑backend/.env文件，配置至少一个API Key"
    echo "   OPENAI_API_KEY=your_key_here"
    echo "   或"
    echo "   ANTHROPIC_API_KEY=your_key_here"
    echo ""
    read -p "按Enter键继续（如果已配置API Key）或Ctrl+C退出..."
fi

# 检查依赖是否安装
if [ ! -d "node_modules" ]; then
    echo "📦 安装依赖..."
    npm install
    echo "✅ 依赖安装完成"
    echo ""
fi

# 启动服务器
echo "🚀 启动服务器..."
echo ""
npm start
