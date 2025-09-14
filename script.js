// 全局变量
const CORRECT_PASSWORD = '123456';
const API_BASE_URL = 'https://api.guijianpan.com/waterRemoveDetail/xxmQsyByAk';
const API_KEY = '1f53947f6fee4bef8ca9241b45f44975';

// DOM 元素
const passwordModal = document.getElementById('passwordModal');
const passwordInput = document.getElementById('passwordInput');
const submitPasswordBtn = document.getElementById('submitPassword');
const passwordError = document.getElementById('passwordError');
const mainContent = document.getElementById('mainContent');

const linkInput = document.getElementById('linkInput');
const parseBtn = document.getElementById('parseBtn');
const extractedLink = document.getElementById('extractedLink');
const loadingSection = document.getElementById('loadingSection');
const resultSection = document.getElementById('resultSection');
const errorSection = document.getElementById('errorSection');

const videoTitle = document.getElementById('videoTitle');
const coverImage = document.getElementById('coverImage');
const coverError = document.getElementById('coverError');
const downloadCover = document.getElementById('downloadCover');
const videoType = document.getElementById('videoType');
const videoUrl = document.getElementById('videoUrl');
const downloadVideo = document.getElementById('downloadVideo');
const errorMessage = document.getElementById('errorMessage');
const retryBtn = document.getElementById('retryBtn');

// 当前解析的数据
let currentVideoData = null;

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // 检查是否已经验证过密码
    if (localStorage.getItem('passwordVerified') === 'true') {
        showMainContent();
    } else {
        showPasswordModal();
    }
    
    // 绑定事件监听器
    bindEventListeners();
}

function bindEventListeners() {
    // 密码验证相关
    submitPasswordBtn.addEventListener('click', handlePasswordSubmit);
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handlePasswordSubmit();
        }
    });
    
    // 主功能相关
    parseBtn.addEventListener('click', handleParseClick);
    linkInput.addEventListener('input', handleLinkInputChange);
    retryBtn.addEventListener('click', handleRetryClick);
    
    // 下载相关
    downloadCover.addEventListener('click', handleDownloadCover);
    downloadVideo.addEventListener('click', handleDownloadVideo);
    
    // 封面图片加载事件
    coverImage.addEventListener('load', handleCoverImageLoad);
    coverImage.addEventListener('error', handleCoverImageError);
}

// 密码验证功能
function showPasswordModal() {
    passwordModal.classList.remove('hidden');
    passwordInput.focus();
}

function hidePasswordModal() {
    passwordModal.classList.add('hidden');
}

function showMainContent() {
    hidePasswordModal();
    mainContent.classList.remove('hidden');
}

function handlePasswordSubmit() {
    const password = passwordInput.value.trim();
    
    if (password === CORRECT_PASSWORD) {
        localStorage.setItem('passwordVerified', 'true');
        showMainContent();
        passwordError.textContent = '';
    } else {
        passwordError.textContent = '密码错误，请重试';
        passwordInput.value = '';
        passwordInput.focus();
    }
}

// 链接提取功能
function extractUrlFromText(text) {
    // 正则表达式匹配 http 或 https 链接
    const urlRegex = /(https?:\/\/[^\s]+)/gi;
    const matches = text.match(urlRegex);
    
    if (matches && matches.length > 0) {
        // 返回第一个匹配的链接，并清理可能的尾部字符
        return matches[0].replace(/[\s.,;!?"')}\]]*$/, '');
    }
    
    return null;
}

function handleLinkInputChange() {
    const text = linkInput.value.trim();
    if (text) {
        const extractedUrl = extractUrlFromText(text);
        if (extractedUrl) {
            extractedLink.innerHTML = `<strong>提取到的链接：</strong> ${extractedUrl}`;
            extractedLink.classList.remove('hidden');
            parseBtn.disabled = false;
        } else {
            extractedLink.innerHTML = '<strong style="color: #e74c3c;">未找到有效链接</strong>';
            extractedLink.classList.remove('hidden');
            parseBtn.disabled = true;
        }
    } else {
        extractedLink.classList.add('hidden');
        parseBtn.disabled = true;
    }
}

// 解析功能
function handleParseClick() {
    const text = linkInput.value.trim();
    const url = extractUrlFromText(text);
    
    if (!url) {
        showError('请输入包含有效链接的文本');
        return;
    }
    
    parseVideo(url);
}

function handleRetryClick() {
    const text = linkInput.value.trim();
    const url = extractUrlFromText(text);
    
    if (url) {
        parseVideo(url);
    }
}

async function parseVideo(url) {
    showLoading();
    
    try {
        const apiUrl = `${API_BASE_URL}?ak=${API_KEY}&link=${encodeURIComponent(url)}`;
        
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP错误: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.code === '10000' && data.content && data.content.success) {
            currentVideoData = data.content;
            showResult(data.content);
        } else {
            throw new Error(data.msg || '解析失败，请检查链接是否正确');
        }
        
    } catch (error) {
        console.error('解析错误:', error);
        showError(`解析失败: ${error.message}`);
    }
}

// 显示状态管理
function showLoading() {
    hideAllSections();
    loadingSection.classList.remove('hidden');
    parseBtn.disabled = true;
}

function showResult(data) {
    hideAllSections();
    
    // 显示标题
    videoTitle.textContent = data.title || '无标题';
    
    // 显示视频类型
    videoType.textContent = data.type || 'VIDEO';
    
    // 显示视频链接（截断显示）
    const displayUrl = data.url ? (data.url.length > 50 ? data.url.substring(0, 50) + '...' : data.url) : '无';
    videoUrl.textContent = displayUrl;
    videoUrl.title = data.url; // 完整链接作为 tooltip
    
    // 处理封面
    if (data.cover) {
        coverImage.src = data.cover;
        coverImage.classList.remove('hidden');
        coverError.classList.add('hidden');
    } else {
        coverImage.classList.add('hidden');
        coverError.classList.remove('hidden');
        coverError.textContent = '无封面信息';
    }
    
    // 显示下载按钮
    if (data.url) {
        downloadVideo.classList.remove('hidden');
    }
    
    resultSection.classList.remove('hidden');
    parseBtn.disabled = false;
}

function showError(message) {
    hideAllSections();
    errorMessage.textContent = message;
    errorSection.classList.remove('hidden');
    parseBtn.disabled = false;
}

function hideAllSections() {
    loadingSection.classList.add('hidden');
    resultSection.classList.add('hidden');
    errorSection.classList.add('hidden');
}

// 封面图片处理
function handleCoverImageLoad() {
    downloadCover.classList.remove('hidden');
    coverError.classList.add('hidden');
}

function handleCoverImageError() {
    coverImage.classList.add('hidden');
    coverError.classList.remove('hidden');
    coverError.textContent = '封面加载失败';
    downloadCover.classList.add('hidden');
}

// 下载功能
function handleDownloadCover() {
    if (currentVideoData && currentVideoData.cover) {
        downloadFile(currentVideoData.cover, '封面.jpg');
    }
}

function handleDownloadVideo() {
    if (currentVideoData && currentVideoData.url) {
        const filename = `${currentVideoData.title || '视频'}.mp4`;
        downloadFile(currentVideoData.url, filename);
    }
}

function downloadFile(url, filename) {
    try {
        // 创建一个临时的 a 标签来触发下载
        const link = document.createElement('a');
        link.href = url;
        link.download = sanitizeFilename(filename);
        link.target = '_blank';
        
        // 添加到 DOM，点击，然后移除
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // 显示下载提示
        showDownloadNotification('下载已开始，请检查浏览器下载文件夹');
        
    } catch (error) {
        console.error('下载错误:', error);
        showDownloadNotification('下载失败，请手动复制链接下载', 'error');
    }
}

function sanitizeFilename(filename) {
    // 移除文件名中的非法字符
    return filename.replace(/[<>:"/\\|?*]/g, '_').replace(/\s+/g, '_');
}

function showDownloadNotification(message, type = 'success') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'error' ? '#e74c3c' : '#27ae60'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 10000;
        font-size: 14px;
        max-width: 300px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    notification.textContent = message;
    
    // 添加动画样式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // 3秒后自动移除
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideInRight 0.3s ease-out reverse';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
                if (style.parentNode) {
                    document.head.removeChild(style);
                }
            }, 300);
        }
    }, 3000);
}

// 工具函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 优化输入处理
const debouncedLinkInputChange = debounce(handleLinkInputChange, 300);
linkInput.addEventListener('input', debouncedLinkInputChange);

// 页面卸载时清理
window.addEventListener('beforeunload', function() {
    // 清理可能的定时器或其他资源
});

// 错误处理
window.addEventListener('error', function(e) {
    console.error('全局错误:', e.error);
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('未处理的 Promise 拒绝:', e.reason);
});