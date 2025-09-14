# 🎬 ClearVideo - 去水印下载工具

一个简洁易用的视频去水印下载网站，支持抖音、快手等主流平台的视频无水印下载。

## ✨ 功能特性

### 🔐 安全验证
- 固定密码验证系统（联系邮箱获取：wge408937@gmail.com）
- 本地存储记住验证状态，无需重复输入

### 🔗 智能链接提取
- 正则表达式自动提取HTTP/HTTPS链接
- 支持复杂分享文本解析
- 实时链接验证和预览

### 📱 现代化界面
- 响应式设计，完美支持移动端和桌面端
- 渐变背景和流畅动画效果
- 直观的操作流程和用户体验

### 🎬 视频解析功能
- 集成第三方API解析视频信息
- 显示视频标题、类型、链接等详细信息
- 高清封面图片预览
- 完善的加载状态和错误处理

### 💾 下载功能
- 一键下载无水印视频文件
- 一键下载高清封面图片
- 智能文件名处理和格式化
- 实时下载状态通知

## 🚀 快速开始

### 环境要求
- 现代浏览器（Chrome、Firefox、Safari、Edge等）
- Python 3.x（用于本地服务器）

### 安装使用

1. **克隆项目**
   ```bash
   git clone https://github.com/xiaoge-rong/clearvideo.git
   cd clearvideo
   ```

2. **启动本地服务器**
   ```bash
   # 使用Python内置服务器
   python -m http.server 8000
   
   # 或者使用Node.js
   npx serve .
   ```

3. **访问网站**
   - 打开浏览器访问：`http://localhost:8000`
   - 输入密码：`123456`

### 使用方法

1. **密码验证**
   - 首次访问需要输入密码：`123456`
   - 验证成功后会自动记住，无需重复输入

2. **解析视频**
   - 复制包含视频链接的分享文本
   - 粘贴到输入框中
   - 点击"开始解析"按钮

3. **下载内容**
   - 查看解析结果（标题、封面、视频信息）
   - 点击"下载视频"或"下载封面"按钮
   - 文件将自动下载到浏览器默认下载文件夹

## 📁 项目结构

```
clearvideo/
├── index.html          # 主页面文件
├── style.css           # 样式文件
├── script.js           # 核心功能脚本
├── README.md           # 项目说明文档
└── .gitignore          # Git忽略文件
```

## 🛠️ 技术栈

- **前端**: HTML5 + CSS3 + JavaScript (ES6+)
- **样式**: 原生CSS，响应式设计
- **API**: 第三方视频解析接口
- **存储**: LocalStorage（密码验证状态）

## 🎯 支持平台

- ✅ 抖音 (douyin.com)
- ✅ 快手 (kuaishou.com)
- ✅ 其他支持的视频平台（取决于API支持）

## 📝 使用示例

**输入示例**：
```
4.89 03/24 cNJ:/ K@W.md 随意"搭讪"韩国美女，印度富人区的三哥能有多自信？ # 外国人 # 歪果仁真会玩 # 印度 # 旅行 # 看世界  https://v.douyin.com/ZOqdo9qsYuY/  复制此链接，打开Dou音搜索，直接观看视频！
```

**解析结果**：
- 自动提取链接：`https://v.douyin.com/ZOqdo9qsYuY/`
- 显示视频标题、封面预览
- 提供下载按钮

## ⚠️ 注意事项

1. **合法使用**：请遵守相关法律法规，仅用于个人学习和研究
2. **版权尊重**：下载的内容请尊重原作者版权
3. **网络环境**：需要稳定的网络连接以访问解析API
4. **浏览器兼容**：建议使用最新版本的现代浏览器

## 🔧 自定义配置

### 修改密码
在 `script.js` 文件中修改：
```javascript
const CORRECT_PASSWORD = '你的新密码';
```

### 更换API
在 `script.js` 文件中修改：
```javascript
const API_BASE_URL = '你的API地址';
const API_KEY = '你的API密钥';
```

## 🤝 贡献指南

欢迎提交Issue和Pull Request来改进项目！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 📞 联系方式

- GitHub: [@xiaoge-rong](https://github.com/xiaoge-rong)
- 项目链接: [https://github.com/xiaoge-rong/clearvideo](https://github.com/xiaoge-rong/clearvideo)

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者！

---

⭐ 如果这个项目对你有帮助，请给它一个星标！