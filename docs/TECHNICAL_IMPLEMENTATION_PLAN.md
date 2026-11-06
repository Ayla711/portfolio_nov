# Yuanqian(Ayla) Liu 个人作品集网站技术实现规划

> 版本：V2.0 · 更新于 2026-11-02  
> 文档状态：Others 包含两项 coursework、一项 video 与末尾的 LingGou EduBot 设计案例；发布前验收仍待完成，尚未部署。  
> 设计依据：[PORTFOLIO_WEBSITE_PLAN.md](PORTFOLIO_WEBSITE_PLAN.md)  
> 核心要求：易维护、项目可替换、结构清晰、适合 GitHub 管理与静态发布。

## 1. 版本边界与优先级

本版记录本地已实现的 V2 首页，取代旧的“前两个完整案例 + 其余紧凑项目”布局。
本地实现不等于已上线；Others 的两项既往课程作业保留首页卡片与现有 Overview，其后改为原 PDF 正文展示，不再改写为研究项目叙事。第三项 Where Is My Body?（2023）使用同站极简视频详情，不设 Overview 或案例章节。Education 已按 2026-11-02 的要求退出首页和导航。
Phase A–E.1 文件只记录历史，不作为 V2 已验收的证据。

| 部分       | 本地实现                                                             | 尚待处理             |
| ---------- | -------------------------------------------------------------------- | -------------------- |
| 左侧身份栏 | 圆形 headshot + 精确姓名 `Yuanqian(Ayla) Liu`，移除巨型职业标题      | 最终视觉确认         |
| 右侧介绍   | About Me 成为第一节，不重复照片                                      | 文案可继续维护       |
| 项目区     | 统一两列卡片，窄屏单列；五个项目保留                                 | 新内容加入后复核     |
| 主导航     | 顶部 About Me / Projects / Others 三项，首页与详情共享；旧锚点兼容   | 发布前完整无障碍复核 |
| Others     | 两项课程作业、定格动画与末尾的 LingGou 共用卡片和 projects 内容集合  | 新视频内容专项复核   |
| 项目详情   | 原五个案例与 PhageX 视频保留，作业为 Overview + 原文，动画为极简视频 | 新视频详情专项复核   |
| 部署       | `site: "https://yuanqianayla.com"`，已移除 `base`，根路径部署        | 已部署至独立域名     |

### 1.1 已落地与未执行事项

- `BaseLayout` 通过共享 `SiteNavigation` 提供 About Me、Projects、Others 三个首页栏目入口。
- `IdentityRail` 使用用户指定的 headshot 圆形头像，显示完整姓名及 Resume / LinkedIn / Email；姓名旁不再显示猫咪标识，原标识文件改由 `BaseLayout` 用作全站 favicon。
- `AboutPanel` 移至项目区前，照片只在身份栏出现。
- 介绍区移除可见的 About Me 标题，保留 `h2.visually-hidden`、`#about-me`、旧 `#about` 以及顶部导航；正文仍为两个段落。
- `ProjectSummary` 已改为单图卡片；首页不再加载旧的预览播放器。
- Schema 和验证器已解除位置与展示类型强绑定，项目模板同步简化。
- `homeSection` 与 `caseStudyType` 按首页分区和设计 / 研究 / 课程作业 / 视频语义复用同一内容集合、卡片和详情路由；原五份 MDX 默认行为保持不变。
- 未删除旧兼容字段、图片或案例正文，未合并 GitHub 工作流。
- 未注册域名、未推送、未部署。

Education 章节、对应导航入口及其空数据和专用类型已移除；不再要求补充教育数据。
Others 的两项课程作业忠实展示用户提供的既往作业 PDF，不新增发表记录、用户测试或验证声明；保留原文论点不代表独立确认其正确性，也不表示本次验证或正式发布已完成。

## 2. 保留的技术基础

继续沿用已有 Astro 静态网站，不更换框架，不增加后台。

- Astro + TypeScript：静态页面及类型检查。
- Build-time Content Collections：项目读取、状态和字段验证。
- `@astrojs/mdx`：项目正文与共享案例组件。
- Astro Assets：本地图片验证、响应式尺寸与优化。
- `@astrojs/sitemap`：构建时生成 Sitemap。
- CSS Variables + Scoped CSS：统一视觉变量与局部样式。
- 必要时使用少量原生 JavaScript，不引入 SPA 生命周期。
- npm 锁文件、GitHub Actions、GitHub Pages：可复现检查与发布。

不为本轮布局增加 React、CMS、数据库、登录、搜索、筛选或全站状态管理。
静态内容与普通锚点导航无需额外框架。

## 3. 页面结构与导航

### 3.1 路由保持两层

- 首页：`/`，包括身份栏和 About Me、Projects、Others 三个内容章节。
- 详情：`/project/[id]/`，按已发布项目生成。
- 404：基础错误页，不算新增内容层级。
- 不建立独立的 About、Others 页面；Education 已移除，不另建替代页面。
- 当前项目文件名继续作为稳定 ID，不因改显示名称而改 URL。

### 3.2 当前首页结构

顶部主导航经 `BaseLayout` 渲染，独立于侧栏，详情页也共享同样的三个入口。
导航下方为左侧身份栏与右侧主内容区；右侧按以下顺序排列：

1. About Me
2. Selected Projects
3. Others

“项目两列”指右侧 Projects 与 Others 各自的网格每行并排两个项目，均使用 `ProjectSummary`。
不能误实现为每个项目各自使用“左文字、右图片”的旧式双栏。
前两个项目可继续排在首行，但不再独占整行或保留超大摘要。

### 3.3 导航与旧链接兼容

以下锚点与兼容入口已写入页面：

| 顶部标签 | 目标锚点    | 旧入口兼容                     |
| -------- | ----------- | ------------------------------ |
| About Me | `#about-me` | 旧 `#about` 仍定位到同一介绍区 |
| Projects | `#projects` | 旧 `#work` 仍定位到项目区      |
| Others   | `#others`   | 新增                           |

旧 ID 以同一区域顶部的 `anchor-alias` 保留，不增加路由或跳转脚本。
详情页三导航经 `withBase()` 指向对应的首页锚点；返回链接按项目 `homeSection` 指向首页 `#projects` 或 `#others`，不写成详情页内的本地锚点。
顶栏已使用 sticky，全局 `scroll-padding-top` 为锚点预留顶栏空间。
导航脚本只增强当前章节 `aria-current` 状态，基本链接不依赖 JavaScript。
Others 链接指向两项课程作业、定格动画与末尾的 LingGou EduBot 卡片所在章节，不再显示旧的 Draft section 提示。将来若全部 Others 项目被隐藏，仍保留明确空状态与章节目标。导航不再产生 `#education` 链接。

### 3.4 响应式与阅读顺序

桌面端保留侧栏 + 主内容；Projects 与 Others 默认各自两列。
当主内容宽度不足时改为单列，不为了保住两列缩小到难读。
手机端采用正常文档流：顶部导航、身份信息、About Me、Projects、Others。
卡片 DOM 顺序遵循排序后的逐行顺序，不做会改变阅读顺序的瀑布流。
导航使用可换行 Flex；主布局在 60rem 及以下改为单栏，项目卡片在 38rem 及以下改为单列。
侧栏桌面端 sticky，小高度窗口（45rem 及以下）或主布局变单栏时回到正常文档流。
遮挡、放大文字和横向溢出仍需最终浏览器验收，不能仅凭 CSS 存在判定通过。

## 4. 真实目录与文件职责

下列是已有主要目录，不为匹配旧规划创建空目录：

```text
portfolio/
├── .github/workflows/       # ci.yml、deploy.yml
├── docs/                   # 两份主规划与历史 Phase 验收
├── public/images/          # personal-mark.svg：全站 favicon
├── scripts/                # validate-content.ts
├── src/
│   ├── assets/projects/    # 项目图片及当前头像 profile/headshot.png
│   ├── components/layout/  # SiteNavigation、IdentityRail、AboutPanel
│   ├── components/project/ # 首页摘要、详情与媒体组件
│   ├── content/projects/   # 每个项目一个 MDX
│   ├── content.config.ts   # Collection 与 Schema
│   ├── data/               # site.ts、profile.ts、experience.ts
│   ├── layouts/            # BaseLayout、ProjectLayout
│   ├── pages/              # 首页、404、project/[id].astro
│   ├── services/           # 本地开发图片服务
│   ├── styles/             # tokens、global、typography、utilities
│   └── utils/              # URL、图片版本、个人图标
├── templates/project.mdx
├── tests/
├── astro.config.mjs
├── package.json
├── package-lock.json
└── README.md
```

`public/media/projects/<id>/` 只在实际使用本地视频时创建。
当前简历是 `siteData.resumeUrl` 中的外部链接，不要求创建 `public/files/`。
独立域名已启用。Pages 通过 GitHub Actions 部署，域名由 Pages 设置与 DNS 决定；仓库根目录的 `CNAME` 不参与此部署，无需 `public/CNAME`。
`node_modules/`、`dist/`、`.astro/` 为依赖或生成内容，继续由 Git 忽略。
不删除锁文件、现有测试或图片处理工具来换取表面上的文件数减少。

## 5. 项目内容模型

### 5.1 稳定字段与状态

一个 MDX 是一个项目的内容入口；不要再建立第二份首页项目清单。

| 字段                                        | 职责                                                                                                                          |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `title`、`summary`                          | 名称与简短产品定义；卡片直接使用                                                                                              |
| `year`、`role`、`team`、`duration`          | 项目事实；不是每项都必须在卡片显示                                                                                            |
| `platforms`、`capabilities`、`technologies` | 平台、能力、工具信息                                                                                                          |
| `cover`、`coverAlt`                         | 卡片图片及准确替代文字                                                                                                        |
| `status`                                    | `draft` / `published` / `archived`                                                                                            |
| `featuredOrder`                             | 可选首页排序值，不显示为作品编号                                                                                              |
| `homeSection`                               | `projects` / `others`，默认 `projects`，决定首页分区及详情返回位置                                                            |
| `caseStudyType`                             | `design` / `research` / `coursework` / `video` / `pdf`，默认 `design`，决定详情章节契约与元信息标签；`pdf` 见设计规划 7.1–7.2 |
| `detailPage`                                | 是否生成详情页                                                                                                                |
| `heroVideo`                                 | 详情页 YouTube 视频，和首页媒体独立；`video` 类型必填，其他类型可选                                                           |

首页读取：`status === "published"` 且存在 `featuredOrder`，按 `homeSection` 分到 Projects / Others 后各自按排序值升序排列。排序值仍在所有项目间全局唯一，不因分区而允许重复。
详情读取：`status === "published"` 且 `detailPage === true`。
移除 `featuredOrder` 只退出首页，不自动删除公开详情页。
设为 draft 或 archived 时，同时移除首页排序；生产环境不生成该项目页面。
草稿或归档仍可保留 `detailPage: true` 作为日后恢复意图。
`homeSection` 与 `caseStudyType` 独立：详情类型不隐式决定分区。Selected Projects 顺序为 PhageX、EchoBloom、The Reading Pensieve、Tutela，保留 design 详情语义。LingGou EduBot 设置 `homeSection: others` 与 `featuredOrder: 90`，保留 design 详情语义和完整正文。Others 的两项作业使用 coursework，定格动画使用 video；research 模式仍可用，但不是当前两项作业的类型。

### 5.2 当前卡片内容

卡片直接复用基础字段，不新增重复的 cardTitle / cardSummary：

- 一张 `cover` 横图与准确的 `coverAlt`。
- `title`、`year`、`summary` 和个人 `role`。
- `capabilities` 中的前两个标签。
- 有详情时显示 View project，整张卡片为一个明确命名的链接。
- 无详情时使用非链接容器，不生成假入口。

首页不渲染 Challenge / My contribution / Outcome、四格事实表、第二张图或视频。
详情正文和媒体保留；卡片正文不靠 Hover 才出现，也不自动截断摘要。
标题使用 h3，Selected Projects 与 Others 章节使用 h2，姓名使用 h1；两个分区共用相同 16:9 封面、摘要、角色、前两个能力标签和详情入口布局。

### 5.3 已完成的旧字段兼容迁移

`presentation`、`home`、`homeSecondary` 仍为可选历史字段。
填写时仍检查合法类型与结构，但不再是首页必填项，也不决定卡片面积。
验证器已取消第一项 hero、第二项 standard、其余 compact 及唯一 hero 的要求。

当前可直接改变 `featuredOrder` 排序，不必同步改 `presentation`。
项目模板已同步；新增项目不再需要旧式双图完整摘要。
既有 MDX 的历史字段尚未删除，图片与正文也保留，后续清理需独立确认。

`homeSecondary` 图片仍可能被详情引用，不能只因首页不用就删除。
`previewPoster` / `previewVideo` 继续保留兼容校验，首页卡片不读取或播放它们。
旧 `ProjectPreview` 源文件暂留，但当前首页不导入；它和详情 `heroVideo` 相互独立。

### 5.4 保留内容质量保护

继续保留以下验证，不因首页变简单而取消：

- 必填字段、有效年份、合法 status、非空标题和摘要；capabilities 仍要求 3–5 项，卡片只显示前两项。
- 图片使用 Schema 的 `image()` 验证，替代文字非空。
- 排序在 Projects / Others 间全局不得重复；非 published 项目不进入任何首页网格。
- published 且既无首页入口又无详情的不可达状态报错。
- YouTube provider、11 位视频 ID 与无障碍 title 校验。
- 如保留本地预览视频，必须有 Poster，路径相对 public 且文件真实存在。
- 路径不得逃逸 public；图片和视频 URL 不以临时绝对本地路径发布。
- design / research 详情正文须具备五类章节和对应锚点；research 可使用独立可见章节名称，不要求捏造设计原型。
- coursework 详情不套用五章节要求，改为必须有 `CaseSection` Overview（`id="overview"`）和 `CourseworkContent`（`id="original"`）；原文标题与段落不强拆为设计章节。
- video 类型必须有通过 provider、视频 ID 与 title 校验的 `heroVideo`，不要求 MDX 正文或章节；视频页不渲染 Overview 和案例章节导航。

`src/content.config.ts` 负责字段和条件校验；
`scripts/validate-content.ts` 负责重复顺序、可达性、章节和媒体文件检查。
脚本已导出 `validateProjectRecords()` 供测试传入记录，导入时不自动读取工作区。
两者分工互补，新测试覆盖不同项目数量和重排序，不建设新的大型通用内容框架。

## 6. 个人资料与 Others

### 6.1 统一身份信息

`profile.ts` 集中维护姓名、介绍和照片。
当前姓名为 `Yuanqian(Ayla) Liu`，身份栏、首页标题、详情署名与页脚统一读取。
左栏已无巨型职业标题；求职方向仍由 About 原有介绍表达。
未显示的 role、approach 等历史数据未在本轮擅自删除。

介绍区首段读取 `about.heading` 与 `statement`：前者以 `<strong>` 显示 `Hi, I’m Yuanqian(Ayla).`，后者保持原文不变。第二段只读取 `about.body`，当前全文为：My interests span human–computer interaction (HCI), design engineering, and data visualization, with a focus on helping people understand complex information and make informed decisions.
旧 `about.introduction` 已因不再使用而删除，不再拼接旧第二段。`AboutPanel` 保留 `aria-labelledby="about-title"` 和仅供屏幕阅读器读取的 `h2#about-title`，去掉可见标题不会移除章节语义或改变导航目标；不联动修改其他布局。

当前照片为 `src/assets/projects/profile/headshot.png`，由 `profile.ts` 导入后通过 `profileData.about.portrait` 提供给侧栏；原 `ayla.jpg` 文件保留，不再作为当前头像显示。
容器采用 `aspect-ratio: 1 / 1` 与 `border-radius: 50%`，图片继续居中 `object-fit: cover`，无需新增圆形裁切文件或复制资产。
头像显示宽度为桌面最大 11.25rem（默认 180 px），中等屏幕 7.5rem（120 px），手机 5rem（80 px）。
桌面照片、姓名和按内容宽度排列的辅助链接组共用居中轴，姓名居中并允许自然换行。窄屏保留左图右文的原结构，链接组在姓名下方的文字列内整体居中，不将整块身份区强行改为单列。
`portraitAlt` 与 `portraitPosition` 继续在原数据对象维护，无照片时使用姓名缩写降级。
右侧 About 已是纯文字，不再重复显示照片。

`site.ts` 集中保存 Email、LinkedIn、Resume 与 SEO 文案。
侧栏辅助入口保持 Resume / LinkedIn / Email 顺序与原链接目标，始终纵向三行；组内图标列和文字起点左对齐，链接组按内容宽度整体居中，而非每条链接各自居中。文字前分别显示文档、LinkedIn 和信封图标，颜色共用 `--color-accent` 蓝紫色。不新增 Google Scholar，也不修改链接目的地；外部链接不经过 `withBase()`。
顶部只有 About Me、Projects、Others 三个主栏目，不混入其他目录。

### 6.2 Others：共用项目集合

Others 不再读取网站级 `others` 数组，而是读取同一 Astro `projects` 集合中 `homeSection: others` 的已发布首页项目，复用 `ProjectSummary` 和 `/project/[id]/`。

| MDX 文件                                              | 名称                           | year | featuredOrder | 类型                                                |
| ----------------------------------------------------- | ------------------------------ | ---- | ------------- | --------------------------------------------------- |
| `src/content/projects/following-to-discovery.mdx`     | From Following to Discovery    | 2025 | 60            | `homeSection: others` / `caseStudyType: coursework` |
| `src/content/projects/evolution-of-commemoration.mdx` | The Evolution of Commemoration | 2026 | 70            | `homeSection: others` / `caseStudyType: coursework` |
| `src/content/projects/where-is-my-body.mdx`           | Where Is My Body?              | 2023 | 80            | `homeSection: others` / `caseStudyType: video`      |
| `src/content/projects/linggou-edubot.mdx`             | LingGou EduBot                 | 2024 | 90            | `homeSection: others` / 默认 design 详情语义        |

`experience.ts` 中已无空 `others` 数组与 `OtherEntry` 类型，仅保留原有空 experience / awards 数据；不创建第二套作业清单或内容集合。当前四项已提供，不显示 Draft section；全部隐藏时保留中性空状态。

两项 coursework 详情保留现有 Overview；其后通过 `CourseworkContent.astro` 以居中单栏展示原作业完整题目、标题、段落、原图及参考文献。页面章节导航仅保留 Overview（`#overview`）和 Original coursework（`#original`），Hero badge 为 Coursework。
coursework 与 research 的 Hero 元信息继续将 Team、Duration、Platform 分别显示为 Format、Document date、Methods/tools，复用 team、duration、platforms 等基础字段。Others 四项（含 LingGou）的返回入口指向 Others，Selected Projects 四项返回 Projects。

research 模式继续支持 Overview、Research approach、Analysis、Findings、Reflection 五个可见标题和 overview、insight、decisions、prototype、reflection 锚点；当前两项作业不再使用该模式。`caseStudyType` 不会改写 MDX 正文，维护时需同时采用对应结构，而不是仅切换字段。

当前 Document date 分别为 December 2025、January 2026，依据 PDF 导出元数据，不代表已确认的项目持续时间、完成日期或论文发表日期。

Where Is My Body? 使用 `heroVideo` 的 YouTube ID `uyxzaYrkF1g`，首页与详情播放器初始封面复用 `src/assets/projects/where-is-my-body/cover.jpg`，与用户提供的封面一致。播放器提供无障碍 Play 按钮，激活后才加载既有 `youtube-nocookie.com` iframe。用户已确认播放正常，此次补充缺失预览，不将早前本地浏览器结果作为普遍播放阻塞的结论。卡片进入带站点 base 的 `/project/where-is-my-body/`，不直接跳转 YouTube；详情只呈现影片标题、播放器、返回 Others 的入口与 Watch on YouTube 备用链接。年份和简介只在首页卡片展示；详情不增加 Overview、案例正文或章节导航。`summary` 保留用户提供的完整文本：

> A collaborative stop-motion animation created in London in summer 2023, following a bodyless dragon's whimsical journey through the city in search of his missing parts, only to discover he had been whole all along.

### 6.3 Education 移除范围

2026-11-02，按用户要求移除首页 Education section、共享导航中的 Education 入口，以及 `experience.ts` 中未填内容的 `education` 数组和 `EducationEntry` 类型。仅供教育条目使用的样式随之移除，不删除 Others、现有五个项目或其他数据，也不生成替代教育页。

## 7. 当前组件与样式职责

| 现有位置                        | 已实现职责                                                                           |
| ------------------------------- | ------------------------------------------------------------------------------------ |
| `BaseLayout` / `SiteNavigation` | 首页、详情与错误页共享三个顶部入口                                                   |
| `index.astro`                   | 三章节顺序、按 homeSection 分区的两个项目网格与页脚                                  |
| `IdentityRail`                  | 圆形 headshot、姓名与辅助链接，不再显示姓名旁图标                                    |
| `AboutPanel`                    | 右侧首节纯文字介绍，保留旧 about 锚点                                                |
| `ProjectSummary`                | Projects / Others 共用单图卡片与条件详情链接                                         |
| `ProjectPreview`                | 旧组件暂留，当前首页不使用                                                           |
| 详情模板与案例组件              | design / research / coursework / video 语义、保留视频，按分区返回 Projects 或 Others |
| `CourseworkContent`             | `id="original"` 原文区，完整作业标题与居中单栏阅读样式                               |

项目区使用 CSS Grid 两列，奇数项最后一张仍保持单卡宽度。
图片比例和卡片间距统一，不用超大固定高度撑齐内容。
字号适配姓名、章节与卡片，不再和已删除的巨型职业标题比较。

颜色和字体仍来自原 tokens，About 保留浅色背景与柔和渐变。
猫咪个人标识不再作为 `IdentityRail` 中的图片；该组件移除相应导入、图片节点与样式。
`BaseLayout` 使用已有 `getPersonalMarkPath()` 与 `withBase()` 输出共享的 `rel="icon"`，覆盖首页、项目详情与错误页。复用 `public/images/personal-mark.svg`，不新增副本或转换格式；SVG 优先、PNG 备用，两者都不存在时不输出自定义 favicon 链接。当前 SVG 为 200 × 200 方形画布，`viewBox="0 -12 200 172"`、`preserveAspectRatio="none"`，保留原路径和配色，纵向光学放大约 16%，不裁切耳朵。
文件内容版本与子路径兼容机制保持不变；替换文件后刷新，浏览器仍缓存旧标签页图标时可关闭并重新打开标签页。线上更新仍需重新构建部署。未恢复 CSS 三条信号线，未删除个人标识资产或缓存版本工具。

详情路由仍有 `compact={project.id === "phagex"}` 判断，以保留原详情视觉。
该耦合是后续可配置化候选，本轮未变更；不能声称详情已消除所有项目名判断。

## 8. 媒体与详情内容

首页卡片图使用 16:9 比例，源图仍保存在 `src/assets/projects/<id>/`，由 Astro Assets 优化。
卡片 widths / sizes 已按单列、双列和侧栏布局更新，卡片图片使用 lazy loading。
身份照片使用 eager loading 和独立 sizes，不继续沿用旧 About 大图的加载估算。

现有 `image-service.ts` 与 `dev-image-version.ts` 解决同名替换的本地缓存问题。
它们有实际用途，不作为“文件过多”直接删除；线上更新仍需重新构建。
保留文件内容版本、图片 alt、纵横比和非首屏 lazy loading 保护。

项目详情仍使用统一 `[id].astro`；案例正文通过 `render(entry)` 与共享 MDX 组件呈现，video 分支不要求或展示案例正文。
design / research 既有锚点为 overview、insight、decisions、prototype、reflection，研究项目可以改变可见标题而保留这些稳定 ID。coursework 使用 overview 与 original 两个章节目标，完整原文不再强行拆成五个设计阶段。video 使用有效的 `heroVideo`，不设 Overview 或章节导航。
原五份案例正文和详情路由保留；两项课程作业与一项视频继续使用同一集合和路由，不创建第三层或专门的页面体系。
PhageX 的 YouTube 视频 ID `rArbDeBju0M` 保持不变，使用现有隐私增强域嵌入和响应式容器。
详情视频不因首页卡片改为静态图片而被恢复成封面。

本地视频只按实际需要保存在 public；长视频优先沿用外部嵌入。
不把原始作品集 PDF、未压缩视频、设计工程和整套拆页放进发布仓库。
图片体积目标不是硬性删除条件，优先保留可读性并检查优化后的输出。

### 8.1 本次课程作业原文与素材边界

- `src/assets/projects/following-to-discovery/`：`cover.svg`、`explore-2015.jpg`、`explore-comparison.jpg`；两张截图来自第一份 PDF 的原图。
- `src/assets/projects/evolution-of-commemoration/`：保留 `cover.svg`、`cooccurrence.jpg`（原图 6）、`crosstab.jpg`（原图 8）；补充 figure-1 至 figure-5、figure-7、figure-9、figure-10、figure-11-1 至 figure-11-7、figure-12、figure-13 对应素材，按原作业顺序展示全部 19 张图。
- 两份 `cover.svg` 均为原图的 16:9 展示组合，不生成虚构研究结果。保留源图可读性，排除 PDF 页眉和学生学号。
- 首页卡片和现有 Overview 均不变；后续完整恢复原文。第一篇约 2,050 词、11 条参考文献、2 张图；第二篇对应原 13 页、19 张图、2 条参考文献。保留原始标题层级、段落、图片顺序与引用，不用改写叙事替代原文。
- 原 PDF 不复制进公开站点、不提供下载链接。只清理 PDF 提取造成的空格与段落断行，并移除页眉、学号；不做编辑性改写、纠正或删减原论点。
- 按用户最新要求恢复原文的统计数字及 Formulaicity Index / H2 等结论，替代此前不重新发布 FI 数值的处理规则。页面明确是既往课程作业原文；忠实呈现不等于独立验证数值有效性或因果推论，不新增已发表、原创用户测试或新验证声明。

## 9. URL、SEO 与两阶段发布

`astro.config.mjs` 是域名与 base 的唯一来源：

- `withBase(path)`：站内路由、资源与首页锚点。
- `absoluteUrl(path, Astro.site)`：Canonical 与社交分享绝对 URL。
- 外部 Resume / LinkedIn / YouTube 不添加站点 base。
- 锚点改名不应造成旧分享链接或详情页返回链接失效。
- Canonical 保持页面级 URL，不把不同首页锚点作为独立页面。

当前配置为 `site: "https://yuanqianayla.com"`，已移除 `base`，网站从独立域名根路径提供。

部署方式：推送到 `main` 后由 `.github/workflows/deploy.yml` 构建并发布到 GitHub Pages（仓库 `Ayla711/portfolio_nov`）。

1. 自定义域名由 Pages 设置（Settings → Pages → Custom domain，启用 Enforce HTTPS）与 DNS 决定；仓库根目录的 `CNAME` 文件不参与 Actions 部署。
2. 更换域名时，同步修改 `site`、Pages 设置与 DNS，然后重新构建。
3. 每次 URL 变更重新构建，核查 Canonical、OG URL、Sitemap、图片与导航。
4. 页面链接测试从生成首页的 Canonical 读取 base，不固定断言 `/portfolio/`；`tests/dev-image-version.test.ts` 中的 `/portfolio/...` 仅为路径示例数据，不代表站点 base。
   首页标题已读取姓名 + Portfolio，详情标题读取项目名 + 姓名，可访问名称同步。
   分享图片仍需真实配置；Sitemap 不包含 draft、archived 或无详情页的项目路由。

## 10. 日常维护与自动检查

### 10.1 当前可用命令

```sh
npm ci
npm run dev
npm run ci
```

本地入口为根路径 `http://localhost:4321/`。
`npm run ci` 当前依次执行 Astro 检查、内容验证、格式检查、构建和测试。
测试包含读取 dist 的页面断言，因此不能在未构建的全新目录里只跑测试并期待完整通过。
Node 版本继续由 `.nvmrc` 与工作流统一，提交 `package-lock.json`，不随本轮布局升级依赖。

### 10.2 当前项目维护方式

1. 从更新后的 MDX 模板建立项目和同 ID 图片目录。
2. 填基础信息、一张卡片图、可选详情正文。
3. 通过 status、featuredOrder、detailPage 管理可见性、全局唯一排序及详情；homeSection 选择 Projects 或 Others。
4. caseStudyType 选择 design、research、coursework、video 或 pdf 详情语义（pdf 为按项目 PDF 重建的详情，结构、样式与验收方法见设计规划 7.2）；课程作业复制现有 coursework MDX 以保留 Overview + CourseworkContent 结构，类型字段不会自动改写正文。视频可复制 where-is-my-body.mdx，只需有效 heroVideo，不要求 MDX 章节。不再手动同步 hero / standard / compact 层级来适配位置。
5. 运行完整检查，预览手机与桌面，再由用户决定提交发布。

首页已不受旧展示类型限制；兼容字段可暂留，清理原则见第 5.3 节。
替换照片时覆盖现有文件；改文件名才修改 import，不重复保留两套维护教程。
修改详情文件名会改变 URL，已有公开链接需另行评估兼容。

### 10.3 工作流精简建议，未执行

当前 ci.yml 与 deploy.yml 都监听 main 推送，重复安装、校验和构建。
部署流程未明确等待另一流程里的完整测试结果。
建议后续整理为检查成功后再部署，尽可能复用一次构建产物；PR 只检查不发布。
本次布局实施没有合并工作流或改变发布触发行为。

## 11. V2 验证状态与发布前待办

### 11.1 2026-11-01 历史验收与自动检查范围

本节保留当时的验证记录，其中四导航为旧状态，不覆盖 2026-11-02 的 Education 移除；最新检查结果与发布待办见第 11.2 节。

本地已完成顶栏、身份栏、About 前置、双列卡片、数据入口、旧锚点及内容模型调整。
2026-11-01 完整 `npm run ci` 通过：39 个 Astro 文件零错误、零警告；五个项目内容校验、格式检查通过；七个页面构建成功；21 项测试全部通过。
浏览器实测 320、390、768、1024、1280、1440 px，无横向溢出；1024 × 600 时身份栏正常回到文档流。已检查双列 / 单列、五张卡片、四导航、新旧锚点、详情返回和键盘焦点。PhageX 视频播放器已加载，未测试完整播放。
本地首页 HTTP 返回 200；重启旧开发服务后排除了旧组件样式缓存。项目 MDX、原图片、个人标识、Astro 配置及工作流的校验和与修改前一致。这不是部署完成声明。

新增或更新的保护：

- `tests/content-validation.test.ts`：不同项目数量、重排序、重复 ID / 顺序、不可达状态、章节、草稿 / 归档和媒体路径。
- `tests/portfolio-links.test.ts`：四导航、精确姓名、照片、章节顺序、旧锚点、单图卡片、待补栏目和全部公开详情。
- 原有 PhageX 视频、图片版本和个人标识测试继续保留。
- 页面测试读取真实构建产物，不只检查组件源码。

### 11.2 发布前必须完成

2026-11-02：Education 移除后完整 `npm run ci` 通过，39 个 Astro 文件零错误、零警告，五个项目校验通过，生成七页，23 项测试全部通过。更新后的测试覆盖三导航、Education 章节及入口移除、全部详情导航与原有锚点。浏览器确认三个章节目标均存在、Education 已移除、五个项目卡片仍在；未重复所有断点和完整键盘路径。

以上是 Others 研究项目加入前的历史结果。以下研究改写版结果同样属于课程作业原文恢复前的历史记录，不覆盖当前修改：后续在新 MDX、ImageComparison 及最后研究头图与手机标题 CSS 调整后执行的最终完整 CI 已通过：39 个 Astro 文件零错误、零警告、零提示，七个项目校验通过，生成九页，24 项测试全部通过。

Others 研究改写版当时的浏览器专项结果：

- 1280 与 936 px：两项 Others 与原五项使用相同卡片布局，原五个 Selected Projects 保留。
- 320 px：首页单列，首页及两项新研究详情均无横向溢出。
- 两项研究各五个章节目标存在；第一项 ImageComparison 的两张具名插槽图片和第二项 Findings 图表均实际加载。
- 顶部 Others 与两项研究返回 Others 的入口已实际点击验证。
- 修复研究 SVG 头图固有 900 px 高度导致的比例失真：研究头图使用自动高度，恢复 16:9；研究详情标题增加仅 research 生效的窄屏 clamp（最低 32 px），320 px 视口下页面宽度复核为 320 px。

最后 CSS 修复后的最终完整 CI 已通过，构建产物也独立确认 ImageComparison 包含两张实际图片。当时尚未部署（历史记录：网站现已部署于 https://yuanqianayla.com/）；完整无障碍与更多放大文字场景仍需检查。

- [x] Education 移除后重新执行完整 `npm run ci` 并记录结果；不以 2026-11-01 的通过记录替代本次验证。
- [x] 原研究改写版与 ImageComparison 调整后完整 CI 通过，七项目、九页面、24 测试历史结果已记录。
- [x] 原研究改写版头图与手机标题 CSS 修复后的完整 CI 通过，历史结果已记录。
- [x] 桌面确认右侧两列、五个项目与最后单卡宽度。
- [ ] 手机、平板、小高度窗口和放大文字下无溢出或遮挡。
- [ ] 实测键盘焦点、当前三导航、新旧 about / work 锚点、详情返回及减少动效，确认无残留 Education 入口。
- [ ] 所有详情与 PhageX 视频可访问，图片内容和 alt 对应。
- [x] Others 两张卡片与原五项使用相同响应式布局，无 Draft section；本轮保留首页卡片不变。
- [x] 本轮 coursework 恢复通过完整 `npm run ci`：40 个 Astro 文件零错误、零警告、零提示，七项内容校验、九页构建、25/25 测试通过。两篇详情浏览器检查均确认 Overview 后接 Original coursework，分别加载 2 / 19 张图；320 与 1280 px 下 document scrollWidth 均等于视口，无横向溢出。独立复核通过，原文无遗漏，21 张图的 SHA-256 与源 PDF 内嵌图逐一一致，渲染 HTML 无学号。
- [ ] 核对 Coursework 标识、元信息标签、PDF 导出日期及既往作业说明；不公开学号或原 PDF，不将原文统计 / FI / H2 结论当作本站独立验证。
- [x] 检查原素材与正文未误删，草稿内容未被当成正式信息。
- [ ] 发布前填写真实 site，复核 Canonical、Sitemap 和分享信息。
- [ ] 用户确认发布；本地服务器可访问不代表网站已上线。

### 11.3 后续清理

新增、排序、隐藏和归档已走独立内容路径，不必逐个改组件。
旧 home / homeSecondary 数据、旧预览组件和 PhageX 详情专属样式仍保留。
这些可在布局稳定后另行处理，不混入当前验收或擅自删除媒体。

## 12. 自查清单与历史记录

文档重复和首页布局已整理；下列清理项仍需按状态分别处理：

| 候选                         | 当前状态与处理原则                                                           |
| ---------------------------- | ---------------------------------------------------------------------------- |
| 两份主规划重复说明           | 已分工整理并同步本地实现状态                                                 |
| README 照片维护说明          | 与真实路径同步，不再保留两套首次添加教程                                     |
| Others 数据                  | 两项课程作业与一项视频保留在 projects 集合；移除空数组和专用类型，保留空状态 |
| 旧 home / homeSecondary 数据 | 已解除必填但保留内容；不删除详情媒体                                         |
| 旧首页视频预览               | 新首页不再加载；源文件保留，是否删除另行确认                                 |
| PhageX ID 专属样式           | 保留原详情行为，配置化留待后续                                               |
| LingGou 重复图片与合照说明   | 先确认用途再决定合并或替换，未执行                                           |
| 重复构建流程                 | 尚未整理，不减少必要测试                                                     |
| 依赖、锁文件、图片版本工具   | 保留，不把本地体积当成线上页面体积                                           |

文档职责：

- [设计规划](PORTFOLIO_WEBSITE_PLAN.md)：唯一视觉与信息架构基准。
- 本文件：实现边界、内容模型、迁移、维护与发布契约。
- [README](../README.md)：简短上手入口，明确本地实现状态和发布前待办。
- [Phase A](PHASE_A_VERIFICATION.md)、[Phase B](PHASE_B_VERIFICATION.md)、[Phase C](PHASE_C_VERIFICATION.md)、[Phase D](PHASE_D_VERIFICATION.md)、[Phase E](PHASE_E_VERIFICATION.md)、[Phase E.1](PHASE_E_1_VERIFICATION.md)：历史快照，本轮保留原文件，不作为 V2 验收结果。

2026-11-01：先依据四项新要求重整规划，再同步本地 V2 实现。
保留静态内容架构、既有详情及 URL 兼容；本轮本地检查通过，Education / Others 与发布检查待完成，未部署。

2026-11-02：按用户要求移除 Education 模块、导航入口、空数据及专用类型和样式；当前保留 About Me、Projects、Others 三个栏目。五个项目、所有详情及其他数据继续保留，待补内容只剩 Others；本次完整 CI 和浏览器专项检查通过，发布前完整验收仍待完成，未部署。

2026-11-02，后续内容扩展：Others 接入 From Following to Discovery 与 The Evolution of Commemoration，原五个 Selected Projects 不变。新增 homeSection / caseStudyType、研究详情语义和按分区返回机制，提取必要原图而不公开源 PDF；Others 不再是待补栏目。MDX、ImageComparison 与最后样式修复后的最终 CI 以及本地浏览器专项检查通过，未部署。

2026-11-02，课程作业原文恢复：用户明确两项内容是既往作业，要求保留 Overview 并在后续呈现原 PDF 内容。新增 coursework 类型与 CourseworkContent 原文单栏，两项 MDX 切换类型，保留首页卡片、路由及元信息；恢复原文论点、统计、全部原图和参考文献，仅整理提取空格 / 段落并去掉学号页眉。research 模式仍可用，原有验证结果保留为历史；本轮状态集中记录于第 11.2 节，未部署。
