/* =====================================================================
   Teaching Overlay
   直播教学用：在每个版本页面右下角展示"配方"。
   核心诉求：让学员一眼分清——
     你输入的指令（你打了什么）
     你做出的判断（你自己的审美取舍）
     Skill 自带规则（skill 替你强制的那些）
     实际呈现（加起来生成的样子）
     要注意（踩到的坑 / 下一版起点）

   用法：
   <script src="../_overlay.js" data-version="v4"></script>

   快捷键 `?` / `i` 切换展开，状态按版本单独记忆。
   ===================================================================== */
(function () {
  'use strict';

  // ---------------- 版本元数据 ----------------
  var META = {

    v1: {
      styleName: '传统 SaaS 模板（反面教材）',
      basedOn: null,
      skill: null,
      skillPath: null,
      rationale: '直播里的反面教材。没启用任何 skill，也没做任何审美判断——让 AI 默认写一个 landing，看它会落在哪。这就是 v2/v3/v4 的对照起点。大多数一开始用 AI 写 landing 的学员，都会得到长这样的东西。',
      youTyped: [
        '"做一个简单的案例 Landing page 页面，按照传统的方式设计"'
      ],
      youChose: [
        '刻意不挑风格、不给约束——就是想看 AI 的默认长相作为对照',
        '不激活任何 skill'
      ],
      skillSays: [
        '（无 skill。AI 的训练数据接管了这里。）'
      ],
      outcome: [
        '蓝色烂大街主色 #2563eb',
        '居中 Hero + 蓝色渐变 CTA',
        '3×2 图标卡片功能区（等距等大）',
        'Inter 字体',
        '🚀 ⚡ 🛡️ emoji 做视觉元素',
        'ACME / NOVA / STELLAR 这类套路虚构品牌',
        '"500+ 团队信赖" 这类整齐假数'
      ]
    },

    v2: {
      styleName: 'Editorial Engineering · 工程手册体',
      basedOn: 'v1',
      skill: '/frontend-design',
      skillPath: '~/.claude/skills/frontend-design/SKILL.md',
      rationale: '用"通用审美型" skill /frontend-design 重做 v1。skill 本身的主张：拒绝 AI slop、承诺一个明确的美学方向（这里选了 editorial / magazine）、distinctive 字体配对、每个细节到生产级。页面读起来像印在好纸上的技术随笔，有 taste。但这个 skill 只谈通用审美，不读项目 .impeccable.md——于是命中了项目级封禁字体（Fraunces / Newsreader）。这正是 v3 切换到 /impeccable 的起点：通用审美 skill → 项目约束型审美 skill。',
      youTyped: [
        '/frontend-design 优化 landing/v2/index.html（v1 不动作为对照）'
      ],
      youChose: [
        '承诺 editorial / magazine 方向——skill 要求你挑一个极端，你选了这个',
        '工程手册气质（而不是"漂亮网站"）',
        'v2 做实验，v1 保留作反面教材'
      ],
      skillSays: [
        '承诺一个极端美学方向（minimal / maximalist / editorial / brutalist…），禁止骑墙',
        '拒绝 AI slop（禁居中 Hero、禁 3 列等距卡片、禁 gradient 标题）',
        'distinctive 字体配对（display + body + mono 三件套）',
        '60-30-10 色彩分布稀用（单一强调色）',
        '每个细节做到生产级，不是玩具演示',
        '使用 OKLCH 而非 HSL'
      ],
      outcome: [
        'Fraunces + Newsreader + JetBrains Mono 三字体配对',
        '朱砂 Vermillion · oklch(58% 0.205 34) 做唯一强调色',
        '暖奶白纸 · oklch(95.5% 0.018 82) 做底色',
        '章节编号 01–09 的手册式叙事结构',
        '左文案 + 右终端 plate，带偏移投影和歪斜贴纸',
        'SVG 噪点 + 蓝图网格做纸质氛围',
        '旋转 SVG 圆形盖章 + ISSN 编号 + "printed in Shanghai" 工业细节',
        '强调色 60-30-10 稀用（盖章 / 斜体 / 划线）'
      ],
      gotcha: [
        '⚠ Fraunces / Newsreader 命中了项目 .impeccable.md 的封禁字体清单',
        '原因：/frontend-design 只谈通用审美，不读项目级约束',
        '→ 这正是 v3 切换到 /impeccable 的起点'
      ]
    },

    v3: {
      styleName: 'Bento + 暖奶白纸感 + 朱砂',
      basedOn: 'v1',
      skill: '/impeccable',
      skillPath: '~/.claude/skills/impeccable/',
      rationale: '用 /impeccable teach 先给项目建立一份 .impeccable.md（Design Context），把 A梦 在大纲里的 6 条主张（说清楚 > 好看、首屏一件事、视觉分层不是热闹……）落到文件里。之后所有 /impeccable /adapt /polish 设计技能都自动读这份上下文。每个 Bento cell 是刻意构图，不是掉进去的卡片。',
      youTyped: [
        '/adapt（前置：探讨要做哪种场景适配）',
        '/impeccable teach（跑 teach 流程，建立 .impeccable.md 项目级上下文）',
        '在 teach 对话里回答：Bento 风格、避蓝、字体不限、桌面+手机、就是要好看',
        '"帮我重构实施"（按刚建立的上下文重写 v3）'
      ],
      youChose: [
        '风格方向：Bento 网格',
        '必须避开蓝色（与 v1 一眼可见差距）',
        '字体不限，让 skill 按内容推荐',
        '桌面为主，手机也要能用',
        '不给参考站点，"就是要好看"'
      ],
      skillSays: [
        '封禁 Inter / DM Sans / IBM Plex / Fraunces / Newsreader / Outfit / Syne 等训练数据默认字体',
        '禁纯黑 #000 / 纯白 #fff（用近黑近白）',
        '禁 border-left > 1px 的彩色条纹（absolute ban）',
        '禁 gradient text（absolute ban）',
        '中性色要略带品牌色调（低 chroma warm tint）',
        '60-30-10 色彩分布稀用',
        '首屏非居中（variance 较高时强制）',
        '禁图标-标题-正文的模板网格',
        '响应式必须塌成单列（不是缩小桌面）',
        '项目级约束自动从 .impeccable.md 读（这是它比 /frontend-design 多出来的那一层）'
      ],
      outcome: [
        '12 列 Bento，cell 不等宽不等高',
        'Funnel Display + Host Grotesk + JetBrains Mono',
        '朱砂 Ember · oklch(62% 0.21 35) 主色',
        '暖奶白纸感 · oklch(97% 0.01 75) 底色',
        '一个墨黑签名 cell 做视觉主角',
        '手机端塌成单列垂直叙事（按论证顺序：看懂 → 相关 → 信任 → 行动）'
      ]
    },

    v4: {
      styleName: 'Vercel-core minimal premium + Zig-Zag',
      basedOn: 'v1',
      skill: 'taste-skill（全能型）',
      skillPath: 'reference/taste-skill/skills/taste-skill/SKILL.md',
      rationale: '不走 /impeccable 路径，换 taste-skill（社区 skill）试试。它比 /impeccable 更"大包大揽"——不用 teach、不读项目上下文，直接用自带的 3 档 dial（DESIGN_VARIANCE / MOTION_INTENSITY / VISUAL_DENSITY）和一份很长的反面清单来约束产出。v3 vs v4 就是"项目约束型 skill" vs "社区全能型 skill" 的对照演出。',
      youTyped: [
        '"从 V1 复制然后用 reference/taste-skill 这个来优化"',
        '"要用中文"（第二轮调整：默认产出是英文）'
      ],
      youChose: [
        '从 v1 重做，不是在 v3 基础上改（保持风格对照的独立性）',
        '选 taste-skill 而非 /impeccable（演示另一条路径）',
        '保留 taste-skill 的默认 3 档 dial（8 / 6 / 4，没手动调）',
        '文案最终使用中文'
      ],
      skillSays: [
        'DESIGN_VARIANCE = 8（非对称） / MOTION_INTENSITY = 6（流畅 CSS + stagger） / VISUAL_DENSITY = 4（常规间距）',
        '禁 Inter，推荐 Geist / Satoshi / Cabinet Grotesk',
        '禁 Lila 蓝紫色（AI 标志配色）、禁纯黑、禁 oversaturated',
        '禁 emoji（ANTI-EMOJI POLICY [CRITICAL]，全换 SVG）',
        '禁 ACME / Nexus / SmartFlow 这类套路虚构品牌',
        '禁 99.99% / 50% / 1234567 这类整齐假数',
        '禁 3 列等距卡片（用 Zig-Zag 或 Bento）',
        '禁居中 Hero（variance > 4）',
        '禁 Elevate / Seamless / Unleash / Next-Gen 等 AI 填词',
        'Rounded 2.5rem 容器 + 扩散阴影（Bento 2.0）',
        '禁 h-screen，用 min-h 防 iOS 跳屏'
      ],
      outcome: [
        'Geist + Geist Mono',
        'Emerald · #059669 单强调色（< 80% 饱和）',
        '非对称 split hero（左文案 + 右 dashboard 模拟）',
        'Zig-zag 2 列功能区交错',
        '次级 feature 用 border-divider strip，不再是卡片',
        '虚构品牌：Halcyon / Ledger / Arbor / Meridian',
        '凌乱真数：47.2ms / 482 teams / 30.4s / 99.84% / 87.3%'
      ],
      settings: {
        'DESIGN_VARIANCE': '8 · 非对称',
        'MOTION_INTENSITY': '6 · 流畅 CSS + stagger',
        'VISUAL_DENSITY': '4 · 常规间距'
      }
    }
  };

  // ---------------- 读取当前版本 ----------------
  var script = document.currentScript
    || Array.prototype.slice.call(document.scripts).pop();
  var version = (script && script.dataset && script.dataset.version) || 'v1';
  var meta = META[version];
  if (!meta) return;

  var STORAGE_KEY = 'deepsea-overlay-collapsed';

  // ---------------- 样式 ----------------
  // 注：section 左侧的色彩点是 inline dot，不是 border-left 条纹，
  //     不违反 impeccable 的 absolute ban。
  var style = document.createElement('style');
  style.setAttribute('data-teaching-overlay', '');
  style.textContent = [
    '.ds-teach {',
    '  position: fixed; right: 20px; bottom: 20px; z-index: 9999;',
    '  font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace;',
    '  color: #e5e7eb;',
    '  max-width: 380px; width: calc(100vw - 40px);',
    '  transition: transform 260ms cubic-bezier(0.16, 1, 0.3, 1), opacity 260ms cubic-bezier(0.16, 1, 0.3, 1);',
    '  transform-origin: bottom right;',
    '}',
    '.ds-teach * { box-sizing: border-box; }',
    '.ds-teach__card {',
    '  background: rgba(15, 17, 21, 0.94);',
    '  backdrop-filter: blur(10px) saturate(140%);',
    '  -webkit-backdrop-filter: blur(10px) saturate(140%);',
    '  border: 1px solid rgba(255, 255, 255, 0.08);',
    '  border-radius: 14px;',
    '  box-shadow: 0 20px 60px -20px rgba(0, 0, 0, 0.5), 0 2px 4px rgba(0, 0, 0, 0.3);',
    '  overflow: hidden;',
    '  font-size: 12px; line-height: 1.5;',
    '}',
    '.ds-teach__head {',
    '  display: flex; align-items: center; gap: 10px;',
    '  padding: 12px 12px 12px 14px;',
    '  border-bottom: 1px solid rgba(255, 255, 255, 0.06);',
    '  background: linear-gradient(180deg, rgba(255,255,255,0.04), transparent);',
    '}',
    '.ds-teach__badge {',
    '  display: inline-flex; align-items: center; gap: 6px;',
    '  font-size: 10.5px; font-weight: 600; letter-spacing: 0.12em;',
    '  text-transform: uppercase; color: #a7f3d0;',
    '}',
    '.ds-teach__badge::before {',
    '  content: ""; width: 6px; height: 6px; border-radius: 50%;',
    '  background: #10b981; box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.25);',
    '  display: inline-block;',
    '}',
    '.ds-teach__title {',
    '  color: #f9fafb; font-size: 12.5px; font-weight: 600;',
    '  letter-spacing: 0.01em; flex: 1;',
    '  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;',
    '}',
    '.ds-teach__min {',
    '  appearance: none; border: 0; background: transparent; cursor: pointer;',
    '  width: 24px; height: 24px; border-radius: 6px;',
    '  display: grid; place-items: center;',
    '  color: #9ca3af;',
    '  transition: background 150ms, color 150ms;',
    '}',
    '.ds-teach__min:hover { background: rgba(255,255,255,0.08); color: #f9fafb; }',
    '.ds-teach__body { padding: 14px; max-height: 62vh; overflow-y: auto; }',
    '.ds-teach__body::-webkit-scrollbar { width: 4px; }',
    '.ds-teach__body::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }',

    /* 分区块通用 */
    '.ds-teach__row { margin-bottom: 14px; }',
    '.ds-teach__row:last-child { margin-bottom: 0; }',
    '.ds-teach__k {',
    '  font-size: 10px; font-weight: 600; letter-spacing: 0.14em;',
    '  text-transform: uppercase; color: #6b7280;',
    '  margin-bottom: 4px;',
    '}',
    '.ds-teach__v { color: #e5e7eb; font-size: 12.5px; word-break: break-word; }',
    '.ds-teach__v em { font-style: normal; color: #a7f3d0; }',
    '.ds-teach__v a { color: #a7f3d0; text-decoration: underline;',
    '  text-decoration-color: rgba(167, 243, 208, 0.3); text-underline-offset: 2px; }',
    '.ds-teach__v a:hover { text-decoration-color: #a7f3d0; }',

    /* 设计主张 rationale block */
    '.ds-teach__rationale {',
    '  color: #d1d5db; font-size: 12px; line-height: 1.6;',
    '  padding: 10px 12px;',
    '  background: rgba(255, 255, 255, 0.03);',
    '  border-radius: 8px;',
    '  position: relative;',
    '}',

    /* 5 类分区的颜色：你输入 / 你判断 / skill / 呈现 / 坑 */
    '.ds-teach__sec { margin-bottom: 16px; }',
    '.ds-teach__sec:last-child { margin-bottom: 0; }',
    '.ds-teach__sec__head {',
    '  display: flex; align-items: center; gap: 8px;',
    '  font-size: 10.5px; font-weight: 700; letter-spacing: 0.14em;',
    '  text-transform: uppercase;',
    '  margin-bottom: 8px;',
    '}',
    '.ds-teach__sec__dot {',
    '  width: 8px; height: 8px; border-radius: 50%;',
    '  flex-shrink: 0;',
    '}',
    '.ds-teach__sec__en { color: #6b7280; font-weight: 500; margin-left: auto; }',

    '.ds-teach__sec--typed .ds-teach__sec__head { color: #fbbf24; }',
    '.ds-teach__sec--typed .ds-teach__sec__dot { background: #f59e0b; box-shadow: 0 0 0 3px rgba(245,158,11,0.2); }',
    '.ds-teach__sec--typed li::before { color: #f59e0b; }',

    '.ds-teach__sec--chose .ds-teach__sec__head { color: #86efac; }',
    '.ds-teach__sec--chose .ds-teach__sec__dot { background: #10b981; box-shadow: 0 0 0 3px rgba(16,185,129,0.22); }',
    '.ds-teach__sec--chose li::before { color: #10b981; }',

    '.ds-teach__sec--skill .ds-teach__sec__head { color: #93c5fd; }',
    '.ds-teach__sec--skill .ds-teach__sec__dot { background: #38bdf8; box-shadow: 0 0 0 3px rgba(56,189,248,0.22); }',
    '.ds-teach__sec--skill li::before { color: #38bdf8; }',

    '.ds-teach__sec--out .ds-teach__sec__head { color: #cbd5e1; }',
    '.ds-teach__sec--out .ds-teach__sec__dot { background: #94a3b8; box-shadow: 0 0 0 3px rgba(148,163,184,0.22); }',
    '.ds-teach__sec--out li::before { color: #94a3b8; }',

    '.ds-teach__sec--gotcha .ds-teach__sec__head { color: #fda4af; }',
    '.ds-teach__sec--gotcha .ds-teach__sec__dot { background: #f43f5e; box-shadow: 0 0 0 3px rgba(244,63,94,0.22); }',
    '.ds-teach__sec--gotcha li::before { color: #f43f5e; }',

    /* 列表样式（不是 border-left 条纹） */
    '.ds-teach__list { padding: 0; margin: 0; list-style: none; }',
    '.ds-teach__list li {',
    '  padding: 4px 0 4px 16px; position: relative;',
    '  color: #d1d5db; font-size: 12px; line-height: 1.5;',
    '}',
    '.ds-teach__list li::before {',
    '  content: "·"; position: absolute; left: 3px; top: 1px;',
    '  font-size: 14px; font-weight: 700;',
    '}',

    /* 命令代码样式 */
    '.ds-teach__list--typed li {',
    '  font-family: inherit; color: #fde68a;',
    '}',

    /* Skill 头信息 row */
    '.ds-teach__skillrow {',
    '  display: grid; grid-template-columns: 1fr auto; gap: 6px 12px;',
    '  padding: 10px 12px;',
    '  border: 1px dashed rgba(255,255,255,0.1);',
    '  border-radius: 8px;',
    '  background: rgba(255,255,255,0.02);',
    '  align-items: baseline;',
    '}',
    '.ds-teach__skillname { color: #a7f3d0; font-weight: 600; font-size: 13px; }',
    '.ds-teach__skillbadge {',
    '  font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase;',
    '  padding: 2px 8px; border-radius: 999px;',
    '  background: rgba(16,185,129,0.14); color: #6ee7b7;',
    '}',
    '.ds-teach__skillpath {',
    '  grid-column: 1 / -1;',
    '  color: #6b7280; font-size: 11px; word-break: break-all;',
    '}',

    /* Settings grid */
    '.ds-teach__settings { display: grid; grid-template-columns: auto 1fr; gap: 4px 12px; }',
    '.ds-teach__settings .sk { color: #6b7280; font-size: 11px; }',
    '.ds-teach__settings .sv { color: #e5e7eb; font-size: 11.5px; }',

    /* 折叠胶囊 */
    '.ds-teach.is-collapsed .ds-teach__card { display: none; }',
    '.ds-teach__chip {',
    '  display: none; align-items: center; gap: 8px;',
    '  padding: 9px 14px; border-radius: 999px;',
    '  background: rgba(15, 17, 21, 0.92);',
    '  backdrop-filter: blur(10px);',
    '  -webkit-backdrop-filter: blur(10px);',
    '  border: 1px solid rgba(255, 255, 255, 0.08);',
    '  color: #e5e7eb; font-size: 11.5px; font-weight: 500;',
    '  letter-spacing: 0.02em; cursor: pointer;',
    '  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.4);',
    '  transition: transform 200ms cubic-bezier(0.16, 1, 0.3, 1);',
    '  font-family: inherit;',
    '}',
    '.ds-teach__chip:hover { transform: translateY(-2px); }',
    '.ds-teach__chip .dot {',
    '  width: 7px; height: 7px; border-radius: 50%; background: #10b981;',
    '  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.25);',
    '}',
    '.ds-teach__chip .v { color: #a7f3d0; font-weight: 600; }',
    '.ds-teach.is-collapsed .ds-teach__chip { display: inline-flex; }',

    /* 提示条 */
    '.ds-teach__hint {',
    '  font-size: 10px; color: #6b7280;',
    '  padding: 8px 14px;',
    '  border-top: 1px solid rgba(255, 255, 255, 0.05);',
    '  display: flex; justify-content: space-between;',
    '}',
    '.ds-teach__hint kbd {',
    '  font-family: inherit; font-size: 10px;',
    '  padding: 1px 5px; background: rgba(255,255,255,0.08);',
    '  border: 1px solid rgba(255,255,255,0.08);',
    '  border-radius: 3px; color: #d1d5db;',
    '}',

    '@media (max-width: 720px) {',
    '  .ds-teach { right: 12px; bottom: 12px; }',
    '  .ds-teach__body { max-height: 50vh; }',
    '}',
    '@media (prefers-reduced-motion: reduce) {',
    '  .ds-teach, .ds-teach__chip { transition: none; }',
    '}'
  ].join('\n');
  document.head.appendChild(style);

  // ---------------- 工具 ----------------
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function sectionHtml(opts) {
    if (!opts.items || !opts.items.length) return '';
    var cls = 'ds-teach__sec ds-teach__sec--' + opts.variant;
    var listCls = 'ds-teach__list' + (opts.variant === 'typed' ? ' ds-teach__list--typed' : '');
    var items = opts.items.map(function (d) { return '<li>' + esc(d) + '</li>'; }).join('');
    return (
      '<section class="' + cls + '">' +
        '<div class="ds-teach__sec__head">' +
          '<span class="ds-teach__sec__dot"></span>' +
          '<span>' + esc(opts.zh) + '</span>' +
          '<span class="ds-teach__sec__en">' + esc(opts.en) + '</span>' +
        '</div>' +
        '<ul class="' + listCls + '">' + items + '</ul>' +
      '</section>'
    );
  }

  // ---------------- 组装 DOM ----------------
  var basedOnHtml = meta.basedOn
    ? '<div class="ds-teach__row"><div class="ds-teach__k">基线 · based on</div><div class="ds-teach__v"><em>' + esc(meta.basedOn) + '</em> 版本</div></div>'
    : '<div class="ds-teach__row"><div class="ds-teach__k">基线 · based on</div><div class="ds-teach__v" style="color:#6b7280;">（本身就是基线版）</div></div>';

  var skillHtml = '';
  if (meta.skill) {
    skillHtml =
      '<div class="ds-teach__row">' +
        '<div class="ds-teach__k">使用的 skill</div>' +
        '<div class="ds-teach__skillrow">' +
          '<span class="ds-teach__skillname">' + esc(meta.skill) + '</span>' +
          '<span class="ds-teach__skillbadge">skill</span>' +
          (meta.skillPath ? '<span class="ds-teach__skillpath">' + esc(meta.skillPath) + '</span>' : '') +
        '</div>' +
      '</div>';
  } else {
    skillHtml =
      '<div class="ds-teach__row">' +
        '<div class="ds-teach__k">使用的 skill</div>' +
        '<div class="ds-teach__v" style="color:#6b7280;">无 —— 没有启用任何 skill（这就是反面教材的意义）</div>' +
      '</div>';
  }

  var settingsHtml = '';
  if (meta.settings) {
    settingsHtml = '<div class="ds-teach__row"><div class="ds-teach__k">Skill 配置 · settings</div><div class="ds-teach__settings">';
    Object.keys(meta.settings).forEach(function (k) {
      settingsHtml += '<span class="sk">' + esc(k) + '</span><span class="sv">' + esc(meta.settings[k]) + '</span>';
    });
    settingsHtml += '</div></div>';
  }

  var typedHtml  = sectionHtml({ variant: 'typed',  zh: '你输入的指令',   en: 'what you typed', items: meta.youTyped });
  var choseHtml  = sectionHtml({ variant: 'chose',  zh: '你做出的判断',   en: 'your own taste', items: meta.youChose });
  var skillSaysHtml = sectionHtml({ variant: 'skill', zh: 'Skill 自带的规则', en: 'what the skill enforced', items: meta.skillSays });
  var outcomeHtml = sectionHtml({ variant: 'out',   zh: '实际呈现',       en: 'on the page', items: meta.outcome });
  var gotchaHtml = sectionHtml({ variant: 'gotcha', zh: '要注意',         en: 'caveat', items: meta.gotcha });

  var wrap = document.createElement('aside');
  wrap.className = 'ds-teach';
  wrap.setAttribute('aria-label', '教学说明');
  wrap.innerHTML =
    '<button class="ds-teach__chip" type="button" aria-label="展开说明">' +
      '<span class="dot"></span>' +
      '教学说明 · <span class="v">' + esc(version) + '</span>' +
    '</button>' +
    '<div class="ds-teach__card" role="region">' +
      '<div class="ds-teach__head">' +
        '<span class="ds-teach__badge">教学说明</span>' +
        '<span class="ds-teach__title">' + esc(version) + ' · ' + esc(meta.styleName) + '</span>' +
        '<button class="ds-teach__min" type="button" aria-label="折叠" title="折叠">' +
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14"/></svg>' +
        '</button>' +
      '</div>' +
      '<div class="ds-teach__body">' +
        '<div class="ds-teach__row">' +
          '<div class="ds-teach__k">设计主张 · rationale</div>' +
          '<div class="ds-teach__rationale">' + esc(meta.rationale) + '</div>' +
        '</div>' +
        basedOnHtml +
        skillHtml +
        settingsHtml +
        typedHtml +
        choseHtml +
        skillSaysHtml +
        outcomeHtml +
        gotchaHtml +
      '</div>' +
      '<div class="ds-teach__hint">' +
        '<span>直播教学素材 · DeepSea 0423</span>' +
        '<span><kbd>?</kbd> 切换</span>' +
      '</div>' +
    '</div>';
  document.body.appendChild(wrap);

  // ---------------- 状态控制 ----------------
  var chip = wrap.querySelector('.ds-teach__chip');
  var minBtn = wrap.querySelector('.ds-teach__min');

  function getStoredState() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var obj = JSON.parse(raw);
      return obj && typeof obj === 'object' ? obj : null;
    } catch (e) { return null; }
  }
  function setStoredState(next) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) {}
  }
  function isNarrow() { return window.matchMedia('(max-width: 720px)').matches; }

  var state = getStoredState() || {};
  var initialCollapsed = (state[version] != null) ? !!state[version] : isNarrow();
  if (initialCollapsed) wrap.classList.add('is-collapsed');

  function toggle(force) {
    var nextCollapsed = typeof force === 'boolean'
      ? force
      : !wrap.classList.contains('is-collapsed');
    wrap.classList.toggle('is-collapsed', nextCollapsed);
    var s = getStoredState() || {};
    s[version] = nextCollapsed;
    setStoredState(s);
  }

  chip.addEventListener('click', function () { toggle(false); });
  minBtn.addEventListener('click', function () { toggle(true); });

  document.addEventListener('keydown', function (e) {
    if (e.target && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
    if (e.target && e.target.isContentEditable) return;
    if (e.key === '?' || e.key === '/' || e.key === 'i' || e.key === 'I') {
      e.preventDefault();
      toggle();
    }
  });
})();
