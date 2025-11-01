/**
 * HookMaster AI 5.0 前端脚本
 */

// ==================== 配置 ====================

const CONFIG = {
  API_BASE_URL: 'http://localhost:3000/api',
  MODE_TIMES: {
    lightning: 2,
    precision: 5,
    ecosystem: 10
  },
  MODE_DESCRIPTIONS: {
    lightning: '⚡ 闪电模式：快速生成3个立即可执行的TikTok爆款脚本，包含完整15秒时间轴和5个3秒剪辑版本。',
    precision: '🎯 精准模式：生成10个差异化脚本矩阵，包含详细分镜、A/B测试方案、评论区运营脚本等。',
    ecosystem: '🏆 生态模式：完整的TikTok营销生态系统，包含30天内容日历、账号矩阵策略、直播方案、数据监控体系等。'
  }
};

// ==================== 状态管理 ====================

const state = {
  providers: [],
  currentGeneration: null,
  isGenerating: false
};

// ==================== DOM元素 ====================

const elements = {
  statusIndicator: document.getElementById('statusIndicator'),
  product: document.getElementById('product'),
  targetAudience: document.getElementById('targetAudience'),
  additionalRequirements: document.getElementById('additionalRequirements'),
  mode: document.getElementById('mode'),
  provider: document.getElementById('provider'),
  modeDescription: document.getElementById('modeDescription'),
  generateBtn: document.getElementById('generateBtn'),
  output: document.getElementById('output'),
  copyBtn: document.getElementById('copyBtn'),
  downloadBtn: document.getElementById('downloadBtn'),
  metadataCard: document.getElementById('metadataCard'),
  metadataContent: document.getElementById('metadataContent'),
  communityList: document.getElementById('communityList'),
  loadingOverlay: document.getElementById('loadingOverlay'),
  loadingTime: document.getElementById('loadingTime'),
  toast: document.getElementById('toast')
};

// ==================== 初始化 ====================

async function init() {
  console.log('初始化应用...');

  // 检查服务器状态
  await checkServerHealth();

  // 加载AI提供商
  await loadProviders();

  // 加载TikTok社区数据
  await loadCommunities();

  // 绑定事件
  bindEvents();

  console.log('初始化完成');
}

// ==================== 服务器健康检查 ====================

async function checkServerHealth() {
  try {
    const response = await fetch(`${CONFIG.API_BASE_URL}/health`);
    const data = await response.json();

    if (data.status === 'ok') {
      updateStatus('online', `服务正常 (${data.availableProviders} 个AI模型可用)`);
    } else {
      updateStatus('offline', '服务异常');
      showToast('警告：后端服务可能未启动', 'error');
    }
  } catch (error) {
    console.error('健康检查失败:', error);
    updateStatus('offline', '无法连接到后端服务');
    showToast('错误：无法连接到后端服务，请确保后端已启动', 'error');
  }
}

function updateStatus(status, text) {
  elements.statusIndicator.className = `status-indicator ${status}`;
  elements.statusIndicator.querySelector('.status-text').textContent = text;
}

// ==================== 加载AI提供商 ====================

async function loadProviders() {
  try {
    const response = await fetch(`${CONFIG.API_BASE_URL}/providers`);
    const data = await response.json();

    if (data.success && data.providers.length > 0) {
      state.providers = data.providers;
      renderProviders();
    } else {
      elements.provider.innerHTML = '<option value="">未配置AI模型</option>';
      showToast('警告：未检测到可用的AI模型，请配置API Key', 'error');
    }
  } catch (error) {
    console.error('加载提供商失败:', error);
    elements.provider.innerHTML = '<option value="">加载失败</option>';
  }
}

function renderProviders() {
  elements.provider.innerHTML = '';

  state.providers.forEach(provider => {
    const option = document.createElement('option');
    option.value = provider.id;
    option.textContent = provider.name;
    elements.provider.appendChild(option);
  });

  // 默认选择第一个
  if (state.providers.length > 0) {
    elements.provider.value = state.providers[0].id;
  }
}

// ==================== 加载TikTok社区 ====================

async function loadCommunities() {
  try {
    const response = await fetch(`${CONFIG.API_BASE_URL}/communities`);
    const data = await response.json();

    if (data.success) {
      renderCommunities(data.communities);
    }
  } catch (error) {
    console.error('加载社区数据失败:', error);
    elements.communityList.innerHTML = '<div class="loading">加载失败</div>';
  }
}

function renderCommunities(communities) {
  elements.communityList.innerHTML = '';

  Object.entries(communities).forEach(([name, info]) => {
    const item = document.createElement('div');
    item.className = 'community-item';
    item.innerHTML = `
      <div class="community-name">${name}</div>
      <div class="community-stats">规模: ${info.规模}</div>
      <div class="community-features">
        特征: ${info.特征} | 钩子: ${info.钩子}
      </div>
    `;
    elements.communityList.appendChild(item);
  });
}

// ==================== 事件绑定 ====================

function bindEvents() {
  // 模式切换
  elements.mode.addEventListener('change', () => {
    const mode = elements.mode.value;
    elements.modeDescription.innerHTML = `<p><strong>${CONFIG.MODE_DESCRIPTIONS[mode]}</strong></p>`;
    elements.loadingTime.textContent = CONFIG.MODE_TIMES[mode];
  });

  // 生成按钮
  elements.generateBtn.addEventListener('click', handleGenerate);

  // 复制按钮
  elements.copyBtn.addEventListener('click', handleCopy);

  // 下载按钮
  elements.downloadBtn.addEventListener('click', handleDownload);
}

// ==================== 生成脚本 ====================

async function handleGenerate() {
  // 验证输入
  const product = elements.product.value.trim();
  if (!product) {
    showToast('请输入产品或服务描述', 'error');
    elements.product.focus();
    return;
  }

  if (state.isGenerating) {
    showToast('正在生成中，请稍候...', 'info');
    return;
  }

  // 准备请求数据
  const requestData = {
    product: product,
    targetAudience: elements.targetAudience.value.trim(),
    mode: elements.mode.value,
    provider: elements.provider.value,
    additionalRequirements: elements.additionalRequirements.value.trim()
  };

  console.log('生成请求:', requestData);

  // 显示加载状态
  showLoading(true);
  state.isGenerating = true;
  elements.generateBtn.disabled = true;

  try {
    const response = await fetch(`${CONFIG.API_BASE_URL}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });

    const data = await response.json();

    if (data.success) {
      state.currentGeneration = data.data;
      renderOutput(data.data.content);
      renderMetadata(data.data.metadata);
      showToast('生成成功！', 'success');
    } else {
      throw new Error(data.error || '生成失败');
    }
  } catch (error) {
    console.error('生成失败:', error);
    showToast(`生成失败: ${error.message}`, 'error');
    elements.output.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">❌</div>
        <h3>生成失败</h3>
        <p>${error.message}</p>
        <p style="margin-top: 1rem; font-size: 0.85rem; color: var(--text-tertiary);">
          请检查：<br>
          1. 后端服务是否正常运行<br>
          2. API Key是否正确配置<br>
          3. 网络连接是否正常
        </p>
      </div>
    `;
  } finally {
    showLoading(false);
    state.isGenerating = false;
    elements.generateBtn.disabled = false;
  }
}

// ==================== 渲染输出 ====================

function renderOutput(content) {
  // 使用简单的Markdown渲染
  const html = markdownToHtml(content);
  elements.output.innerHTML = html;

  // 显示操作按钮
  elements.copyBtn.style.display = 'block';
  elements.downloadBtn.style.display = 'block';

  // 滚动到顶部
  elements.output.scrollTop = 0;
}

function markdownToHtml(markdown) {
  let html = markdown;

  // 标题
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // 粗体
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // 代码块
  html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');

  // 行内代码
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // 列表
  html = html.replace(/^\* (.*$)/gim, '<li>$1</li>');
  html = html.replace(/^- (.*$)/gim, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

  // 段落
  html = html.split('\n\n').map(para => {
    if (para.startsWith('<h') || para.startsWith('<ul') || para.startsWith('<pre')) {
      return para;
    }
    return `<p>${para}</p>`;
  }).join('\n');

  return html;
}

// ==================== 渲染元数据 ====================

function renderMetadata(metadata) {
  const items = [
    { label: '生成模式', value: getModeLabel(metadata.mode) },
    { label: 'AI模型', value: metadata.model },
    { label: '提供商', value: metadata.provider },
    { label: '生成时间', value: `${(metadata.executionTime / 1000).toFixed(2)}秒` }
  ];

  if (metadata.usage) {
    items.push(
      { label: 'Token使用', value: metadata.usage.total_tokens?.toLocaleString() || 'N/A' }
    );
  }

  elements.metadataContent.innerHTML = items.map(item => `
    <div class="metadata-item">
      <span class="metadata-label">${item.label}:</span>
      <span class="metadata-value">${item.value}</span>
    </div>
  `).join('');

  elements.metadataCard.style.display = 'block';
}

function getModeLabel(mode) {
  const labels = {
    lightning: '⚡ 闪电模式',
    precision: '🎯 精准模式',
    ecosystem: '🏆 生态模式'
  };
  return labels[mode] || mode;
}

// ==================== 复制功能 ====================

async function handleCopy() {
  if (!state.currentGeneration) return;

  try {
    await navigator.clipboard.writeText(state.currentGeneration.content);
    showToast('已复制到剪贴板', 'success');
  } catch (error) {
    console.error('复制失败:', error);
    showToast('复制失败，请手动复制', 'error');
  }
}

// ==================== 下载功能 ====================

function handleDownload() {
  if (!state.currentGeneration) return;

  const content = state.currentGeneration.content;
  const metadata = state.currentGeneration.metadata;

  // 添加元数据到文件头部
  const header = `---
生成时间: ${new Date().toLocaleString('zh-CN')}
生成模式: ${getModeLabel(metadata.mode)}
AI模型: ${metadata.model}
---

`;

  const fullContent = header + content;

  // 创建Blob并下载
  const blob = new Blob([fullContent], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `TikTok脚本_${new Date().getTime()}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast('文件下载成功', 'success');
}

// ==================== 加载状态 ====================

function showLoading(show) {
  elements.loadingOverlay.style.display = show ? 'flex' : 'none';
}

// ==================== Toast通知 ====================

let toastTimer = null;

function showToast(message, type = 'info') {
  // 清除之前的定时器
  if (toastTimer) {
    clearTimeout(toastTimer);
  }

  elements.toast.textContent = message;
  elements.toast.className = `toast ${type} show`;

  toastTimer = setTimeout(() => {
    elements.toast.classList.remove('show');
  }, 3000);
}

// ==================== 启动应用 ====================

document.addEventListener('DOMContentLoaded', init);

// ==================== 导出（用于调试） ====================

window.HookMasterApp = {
  state,
  config: CONFIG,
  checkHealth: checkServerHealth,
  loadProviders,
  loadCommunities
};
