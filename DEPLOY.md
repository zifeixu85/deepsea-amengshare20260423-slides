# 如何把这份 slides 分享给学员

这是一份**纯静态**的 HTML 内容（slides 只用了 HTML/CSS/JS，没有构建步骤），任何能托管静态文件的地方都能部署。最推荐 **GitHub Pages**：免费、免配置、一个永久 URL。

---

## 要推送哪些文件？哪些不用？

### ✅ 要推送（部署必需）

```
├── index.html           # 根入口（两张卡片通向 slides / landing）
├── slides/              # 全部 slides（包含头像、IMG-01、IMG-02 等副本）
├── landing/             # 4 个版本 + _overlay.js + 版本切换器
├── README.md            # 可选，给学员的一句话说明
├── DEPLOY.md            # 可选，留个部署笔记
└── .gitignore
```

### ❌ 不要推送

| 目录 | 原因 |
|---|---|
| `reference/` | 4 个 skill 的源码克隆，几百 MB，跟学员无关 |
| `img/` | **原始素材文件夹** — slides 里已经自带了副本（`slides/avatar.png` / `img-01-pencil.png` / `img-02-claude-design.png` / `wechat-qr.jpg`），**不需要再推一份 img** |
| `大纲.md` | 个人笔记 |
| `IMAGES-TODO.md` | 个人待办 |
| `.DS_Store` / `node_modules/` | 系统和依赖垃圾 |

这些已经写进 `.gitignore` 了。

---

## 一键部署到你的仓库

你的仓库：`https://github.com/zifeixu85/deepsea-amengshare20260423-slides.git`

### 第一次推送（完整流程）

```bash
cd /Users/cheche/workspace/deepsea-0423

# 1. 初始化 git
git init
git branch -M main

# 2. 添加要推送的内容（.gitignore 会自动排除不需要的）
git add .
git commit -m "初版：slides + 4 版 landing 案例 + 部署指南"

# 3. 连接到你的 GitHub 仓库
git remote add origin https://github.com/zifeixu85/deepsea-amengshare20260423-slides.git

# 4. 推送
git push -u origin main
```

### 开启 GitHub Pages

1. 打开仓库页面：https://github.com/zifeixu85/deepsea-amengshare20260423-slides
2. **Settings** → 左侧 **Pages**
3. **Source**: `Deploy from a branch`
4. **Branch**: `main` · `/ (root)` → **Save**

1-2 分钟后，公开 URL：

```
https://zifeixu85.github.io/deepsea-amengshare20260423-slides/
```

---

## 分享给学员的链接

| 用途 | URL |
|---|---|
| **整份入口（推荐）** | `https://zifeixu85.github.io/deepsea-amengshare20260423-slides/` |
| 直接看 slides | `https://zifeixu85.github.io/deepsea-amengshare20260423-slides/slides/` |
| 跳到封面 | `…/slides/#1` |
| 跳到 Skills 章节 | `…/slides/#17` |
| 跳到 Landing 案例 | `…/slides/#33` |
| 跳到部署章节 | `…/slides/#36` |
| Landing 版本对比 | `https://zifeixu85.github.io/deepsea-amengshare20260423-slides/landing/` |

---

## 之后更新的流程

改完本地文件后：

```bash
cd /Users/cheche/workspace/deepsea-0423
git add .
git commit -m "更新：<简单说明>"
git push
```

GitHub Pages 会在 1-2 分钟内自动重新部署，URL 不变。

---

## 备选方案

### 方案 B · Vercel（更快的全球 CDN）

1. 注册 [vercel.com](https://vercel.com) → **Add New Project**
2. 导入 GitHub 仓库 `deepsea-amengshare20260423-slides`
3. Framework: `Other`（自动识别为静态站）
4. Deploy

URL 会是：`https://deepsea-amengshare20260423-slides.vercel.app`

**优点**：首字节更快、自动 HTTPS、有 preview 分支。

### 方案 C · 直接打包 zip（内网/断网兜底）

```bash
cd /Users/cheche/workspace/deepsea-0423
zip -r deepsea-slides.zip index.html slides/ landing/ README.md
```

学员解压后需要**用本地静态服务器打开**（双击打开会因为 iframe 的同源策略白屏），最简单：

```bash
cd deepsea-slides
python3 -m http.server 8000
# 然后访问 http://localhost:8000
```

---

## 部署后自检清单

- [ ] 根 URL 打开能看到两张卡片（slides / landing）
- [ ] 点击"打开 Slides"能进入 `#1` 封面
- [ ] 键盘 `→` 翻页、`O` 概览、`T` 切换明暗都正常
- [ ] 第 33 页"Landing 四版迭代" 能看到 4 个 iframe 预览
- [ ] 第 33 页的"打开 v1~v4 实例"按钮能跳到对应 landing 版本
- [ ] Landing 页面右下角有教学浮层（`_overlay.js`）
- [ ] Landing 版本切换器里按 1/2/3/4 键能快速切
- [ ] 手机访问不溢出
- [ ] 分享的所有外链（4 个 skill 的官网 / github）能正常跳转

---

## 常见问题

**Q: iframe 预览看不到内容 / 白屏？**
A: 检查部署后的文件结构。slides 里用的是相对路径 `../landing/v1/index.html`，所以部署后 `/slides/` 和 `/landing/` 必须是兄弟目录。根目录 `index.html` 存在就肯定不会错。

**Q: 分享 URL 太长？**
A: 可以在仓库 Settings → Pages 里绑自定义域名（需要你有一个域名），或者用 `dub.sh` 之类的短链工具。

**Q: 学员手机上加载慢？**
A: Google Fonts（Noto Serif SC 等中文字体）在国内有时会慢。可以：
1. 直接跟学员说"用 WiFi 或多等 1-2 秒"
2. 或者把 fonts 切到自托管（进阶）

**Q: 想在 `/img/` 里加新图怎么办？**
A: **不要**往 `/img/` 加 —— 那是本地原始素材库。应该直接把图放到 `slides/` 目录里，然后在 HTML 里引用 `./your-image.png`。这样才能被部署看到。
