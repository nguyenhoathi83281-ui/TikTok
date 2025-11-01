@echo off
chcp 65001 >nul
cls

echo ╔═══════════════════════════════════════════════════════════╗
echo ║                                                           ║
echo ║          HookMaster AI 5.0 ⚡                            ║
echo ║          TikTok病毒算法征服系统                           ║
echo ║                                                           ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

REM 检查Node.js是否安装
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ 错误: 未检测到Node.js
    echo 请先安装Node.js ^(^>= 16.0.0^): https://nodejs.org/
    pause
    exit /b 1
)

REM 显示Node.js版本
echo ✅ Node.js版本:
node -v
echo ✅ npm版本:
npm -v
echo.

REM 进入后端目录
cd backend

REM 检查.env文件
if not exist ".env" (
    echo ⚠️  警告: 未找到.env文件
    echo 正在从.env.example创建.env文件...
    copy .env.example .env >nul
    echo ✅ .env文件已创建
    echo.
    echo ⚠️  重要: 请编辑backend\.env文件，配置至少一个API Key
    echo    OPENAI_API_KEY=your_key_here
    echo    或
    echo    ANTHROPIC_API_KEY=your_key_here
    echo.
    pause
)

REM 检查依赖是否安装
if not exist "node_modules" (
    echo 📦 安装依赖...
    call npm install
    echo ✅ 依赖安装完成
    echo.
)

REM 启动服务器
echo 🚀 启动服务器...
echo.
call npm start
