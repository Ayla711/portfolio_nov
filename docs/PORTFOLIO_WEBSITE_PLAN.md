# Yuanqian(Ayla) Liu 个人作品集网站设计规划

> 版本：V2.0 · 更新于 2026-11-05  
> 状态：已部署于 https://yuanqianayla.com/；五个设计项目详情页正按第 7.1 节逐个改为基于 PDF 的版本  
> 方向：Software Product、UX Design、Design Engineering  
> 核心结构：顶部导航 + 左侧照片与姓名 + 右侧个人介绍与双列项目卡片

## 0. 文档职责与状态

本文是当前设计要求的唯一入口。技术实现、内容字段与部署约束见 [技术规划](TECHNICAL_IMPLEMENTATION_PLAN.md)，现行操作见 [README](../README.md)。

状态含义：

- **本地已实现**：代码已经落实的布局或内容机制，不等于已经发布或完成全部验收。
- **建议**：后续文案与视觉调整参考，不覆盖当前实现事实。
- **待验收**：需要最终自动检查或浏览器检查确认的表现。
- **待补内容**：不能通过猜测个人经历或复制参考站内容补齐。

本轮已实现首页结构、导航和项目卡片，并同步内容校验、模板与测试。现有项目详情、媒体和历史记录保留；域名、远程仓库、部署与 DNS 未改动（历史记录：网站现已部署于 https://yuanqianayla.com/）。本轮检查结果见第 11 节，不等于真实内容或发布配置已经齐备。

### 0.1 四项已确认变更

| 区域         | V2 要求                                                                                 | 状态       |
| ------------ | --------------------------------------------------------------------------------------- | ---------- |
| 左侧身份栏   | 删除大字号“UX Designer & Design Engineer”，以个人图片和姓名 `Yuanqian(Ayla) Liu` 为核心 | 本地已实现 |
| 右侧首个章节 | 将原本位于项目末尾的 About Me 移到右侧内容最前                                          | 本地已实现 |
| 项目区       | 改成两列项目卡片，明显缩减单个项目占用面积                                              | 本地已实现 |
| 顶部导航     | 按顺序展示 About Me、Projects、Others 三个目录；Education 已按最新要求移除              | 本地已实现 |

**“两列”指右侧区域每行两个项目，不是每个项目内部继续左文右图。**

### 0.2 替代的旧规则

以下 V1 规则不再作为新首页的实施目标：

- 前两个项目必须大面积完整展开，其余三个才使用紧凑模块。
- 首页前两项必须展示两张横图及 Challenge / My contribution / Outcome。
- About 只能位于页尾。
- 项目标题必须小于左侧巨型职业标题——该职业标题已被移除。
- 左侧 Work / Resume / LinkedIn / Contact 兼任主要章节导航。

当前代码已从旧版两级项目流切换为统一卡片，但没有上线。旧的具体字号、行距和分割线修补不继续约束新卡片；项目详情页不因首页更新而自动重排。

### 0.3 保留的长期原则

- 不使用 01–05 等永久作品编号，不将网站绑在当前项目数量上。
- 首页提供足够信息；最多进入项目详情这一层，不新增多级目录。
- 求职方向仍偏软件、UX 与设计工程；删除职业大标题不等于改变职业方向。
- 项目排序可更换，Tutela 不因采用同类卡片就变成首页主推。
- 真实呈现个人贡献、验证范围与局限，不虚构结果或经历。
- 先记录确认要求，再实施和验收；未补齐真实内容与发布检查前，不宣称可以正式上线。

## 1. 参考网站：借鉴范围

2026-11-01 已通过浏览器查看以下页面：

| 参考                                                     | 观察到的结构                                                             | 本站借鉴范围                               |
| -------------------------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------ |
| [Xin Ye · Projects](https://xinyepsy.com/projects/)      | 左侧照片与个人资料，右侧双列项目卡片；卡片为图片、简短元信息、标题和介绍 | 项目区密度、每行两个独立项目、统一图文节奏 |
| [Xin Ye · Homepage](https://xinyepsy.com/)               | 顶部横向导航、侧栏身份信息、右侧个人介绍与章节                           | 身份栏与正文分工、清晰的顶部章节入口       |
| [Rongqi Bei · About Me](https://rongqibei.com/#about-me) | 顶部右侧横向导航，左侧照片与姓名，右侧介绍                               | 个人身份优先、首屏先介绍本人、简洁导航     |

只参考信息布局，不复制头像、文字、学术身份或研究成果。参考站包含的 News、Publications、Teaching 等栏目不自动加入本站；顶部目录以用户最新保留的 About Me、Projects、Others 三项为准。

参考站部分导航会打开独立页面。本站默认仍使用首页内章节跳转，以维持已有“最多两层”的要求；不照搬其 URL 层级。

## 2. 首页信息架构

### 2.1 桌面结构

以下是布局关系示意，不是最终像素稿：

```text
┌────────────────────────────────────────────────────────────────┐
│                       About Me   Projects   Others             │
├──────────────────┬─────────────────────────────────────────────┤
│                  │ 开篇个人介绍（不显示 About Me 标题）         │
│  个人图片        │ 简短个人介绍、关注方向、工作方式              │
│                  │                                             │
│  Yuanqian(Ayla)   ├─────────────────────────────────────────────┤
│  Liu             │ Selected Projects                           │
│                  │ ┌──────────────────┐ ┌──────────────────┐   │
│  简历 / 联系入口 │ │ 项目 A · 横图    │ │ 项目 B · 横图    │   │
│  简洁辅助链接    │ │ 标题 + 简短说明  │ │ 标题 + 简短说明  │   │
│                  │ └──────────────────┘ └──────────────────┘   │
│                  │ ┌──────────────────┐ ┌──────────────────┐   │
│                  │ │ 项目 C          │ │ 项目 D          │   │
│                  │ └──────────────────┘ └──────────────────┘   │
│                  ├─────────────────────────────────────────────┤
│                  │ Others                                      │
│                  │ ┌──────────────────┐ ┌──────────────────┐   │
│                  │ │ 课程作业 F       │ │ 课程作业 G       │   │
│                  │ │ 同款横图与卡片   │ │ 同款横图与卡片   │   │
│                  │ └──────────────────┘ └──────────────────┘   │
│                  │ ┌──────────────────┐ ┌──────────────────┐   │
│                  │ │ 定格动画 H       │ │ LingGou EduBot   │   │
│                  │ └──────────────────┘ └──────────────────┘   │
└──────────────────┴─────────────────────────────────────────────┘
```

- 右侧顺序：About Me → Selected Projects → Others。
- 左侧是身份区域，右侧才是正文；不要形成“侧栏 + 单项目左文 + 单项目右图”的三窄栏。
- 页面统一纵向滚动，不建立左右各自滚动的窗口。
- 照片、介绍、卡片都不设置整屏最小高度，不用巨大留白撑满首屏。
- Selected Projects 按 PhageX、EchoBloom、The Reading Pensieve、Tutela 排列；Others 按两项课程作业、定格动画、LingGou EduBot 排列，所有卡片保持正常宽度，不横跨两列。

### 2.2 顶部导航

导航文字与顺序固定为：

```text
About Me     Projects     Others
```

当前已实现的锚点：

| 导航     | 首页目标    | 说明                                             |
| -------- | ----------- | ------------------------------------------------ |
| About Me | `#about-me` | 右侧首段个人介绍                                 |
| Projects | `#projects` | 标题可显示为 Selected Projects                   |
| Others   | `#others`   | 两项既往课程作业、定格动画与 LingGou EduBot 卡片 |

- 三项是同一首页的章节入口，不新增三个中间页面。
- 在项目详情页点击导航，应直接返回首页对应章节。
- 原 `#about`、`#work` 已通过同区旧 ID 锚点兼容到新章节，避免旧链接失效。
- 顶部导航位于全站横向吸顶页眉，桌面与内容右边界对齐；首页和详情页共用。
- 章节跳转留出页眉高度；当前章节除文字颜色外还以下划线标识，浏览器验收需确认跳转和焦点不被遮挡。
- 手机端保持三项可发现、可点击；优先简洁换行，不新增多层菜单。

## 3. 左侧：图片与姓名

### 3.1 已确认内容

- 完整显示名为 **Yuanqian(Ayla) Liu**，括号内外的拼写保持用户提供形式。
- 删除原大字号职业标题，不用另一条大字号职业称谓替代。
- 图片与姓名成为侧栏的主要识别元素。
- 姓名居中并允许自然换行，但不能截断或省略。

### 3.2 当前实现

- 个人照片使用用户指定的 `src/assets/projects/profile/headshot.png`，继续从 `profileData.about.portrait` 读取；原 `ayla.jpg` 保留，不再作为当前头像显示。
- 桌面照片位于姓名上方，使用 1:1 容器与 50% 圆角形成圆形头像，居中 cover 裁切。头像适当缩小为桌面 180 px（11.25rem）、中等屏幕 120 px（7.5rem）、手机 80 px（5rem），不新增单独裁切文件。
- 桌面照片、姓名与辅助链接组共享同一中心轴；姓名居中并可自然换行，链接组按内容宽度整体居中。窄屏保留照片在左、文字在右的排列，链接组在姓名下方的文字列内整体居中。
- 右侧 About Me 不再重复展示个人照片。
- Resume、LinkedIn 和 Email 始终纵向排列为三行，组内图标列与文字起点左对齐，不逐行居中。各自在文字前显示文档、LinkedIn 和信封图标，图标沿用网站 `--color-accent` 蓝紫色。顺序及链接目标保持不变，不新增 Google Scholar；主章节导航由顶栏承担。
- 原 statement 移入 About Me，旧 Research–Design–Build 侧栏标签不再显示；已有个人信息数据未批量删除。
- 姓名旁不再显示猫咪 Logo；同一 `public/images/personal-mark.svg` 改作全站浏览器标签页图标（favicon）。方形画布让猫咪纵向视觉占比增加约 16%，保留路径和配色、不裁耳朵；不扩大浏览器自身的图标槽，不恢复旧 CSS 三条信号线。
- 桌面侧栏在高度足够时 sticky；窗口较矮或宽度不超过 60rem 时恢复正常文档流，避免独立滚动窗口。

## 4. 右侧首段：About Me

About Me 必须先于项目出现，不再作为页尾内容。

当前不显示独立的“About Me”视觉标题；保留仅供屏幕阅读器读取的同名 `h2`、原章节标识和顶部 About Me 导航，不影响页面语义与锚点跳转。

正文固定为两个短段落，均集中在 `profile.ts`：

1. 首段以加粗的 **Hi, I’m Yuanqian(Ayla).** 开头（`about.heading`），随后接原有 `statement`，其文字保持不变：I design and prototype research-driven software experiences that make emerging technologies understandable, useful, and human.
2. 第二段仅使用 `about.body`，整段替换为：My interests span human–computer interaction (HCI), design engineering, and data visualization, with a focus on helping people understand complex information and make informed decisions.

原第二段不再保留或拼接；未使用的 `about.introduction` 字段已删除。介绍不设固定高度，不添加未经提供的院校、学位、身份或工作经历。本次只调整可见标题与文案，其他布局保持不变。

图片移至侧栏后，About Me 以正文为主，使用浅薄荷与淡紫的轻量局部渐变，没有将原大幅页尾背景原样搬到首屏。Email 辅助入口留在侧栏和页尾，不在 About 重复列出全部外链。

在常见桌面视口中尽量让 About Me 后能看到 Projects 标题或首排卡片的一部分，但不牺牲正文可读性，不承诺所有屏幕固定“完整一屏”。

## 5. Selected Projects：紧凑双列

### 5.1 已确认结构

- 桌面端在右侧内容区形成两列项目列表。
- 每张卡片代表一个项目，单项面积明显小于 V1 长篇模块。
- 原“前两项完整、后三项紧凑”的面积分级被本轮要求替代。
- PhageX 与 EchoBloom 暂保留前两个位置，通过首排位置突出，不再自动跨列或占据超大高度。
- 所有项目可替换；不按项目名写固定宽度或专属首页模板。

### 5.2 当前卡片结构

Selected Projects 与 Others 的所有首页项目均使用同一 `ProjectSummary` 卡片结构：

```text
单张横向封面（16:9）
项目名称 + 年份
一句核心介绍
精简个人角色 + 最多两个能力关键词
项目详情入口（启用详情时）
```

- 项目名称和一句说明优先；年份作为轻量辅助信息。
- 介绍建议 15–25 个英文单词，尽量控制在 2–3 行，不用截断掩盖关键信息。
- 每卡只出现一份精简角色信息，避免角色、平台和能力标签重复表达。
- 首页不再展开 Challenge / My contribution / Outcome，也不保留四格事实表和工具长列表。
- 这些研究、贡献、结果与媒体仍保留在已有项目详情中，不因首页精简而删除。
- 默认统一使用静态封面；本轮不新增首页自动播放、轮播或悬停切换。
- 启用详情的项目采用整卡链接，卡内不再嵌套链接或按钮；“View project”为可见入口提示。
- 详情未启用的项目不能显示通往不存在页面的 View project。

### 5.3 当前密度与对齐

- 卡片采用上图下文，不继续在每张半宽卡内套左右布局。
- 两列等宽，行内顶部对齐；统一媒体比例和内边距即可，不要求所有行强行同高。
- 当前列间距 1.5rem（默认 24 px）、行间距 1.75rem（默认 28 px），正文内边距桌面约 18 px、手机 16 px。
- 长标题允许两行；不为了保持格子高度缩成难读小字。
- 当前项目标题响应式约 20–24 px，摘要 16 px，辅助信息约 12–14 px。
- 不保留旧版 45–72 px 项目大标题，也不沿用每项目数十像素的大段上下留白。
- 不用瀑布流打乱阅读顺序；视觉顺序、键盘顺序与内容排序一致。

以上是当前代码的初始值，仍以真实图片、标题长度和最终响应式验收为准；后续调整应同步记录，不把像素值当作不可修改的内容契约。

### 5.4 当前项目与叙事重点

| 当前顺序 | 项目                 | 卡片应让人快速理解的重点                                 |
| -------- | -------------------- | -------------------------------------------------------- |
| 1        | PhageX               | 跨智能眼镜与手机的防诈骗交互概念；明确概念与模拟验证边界 |
| 2        | EchoBloom            | 声音输入到音乐与动态视觉的交互原型，体现构建能力         |
| 3        | The Reading Pensieve | 为实体阅读补充投影注释与记忆提示的体验概念               |
| 4        | Tutela               | 隐蔽的可穿戴交互与实体原型研究，作为补充而非主推         |

本表序号仅用于规划排序，不显示为网站永久编号。新增或下线项目不得要求重新修改导航；首页不是固定五格模板。

## 6. Others 与已移除栏目

### 6.1 Others：两项既往课程作业、定格动画与 LingGou EduBot

Others 的前两项内容是用户提供的两份 PDF 对应的既往课程作业，不是重新包装的研究项目。首页两张作业卡片及现有 Overview 均保持不变；Overview 后展示原 PDF 正文，而不是概括改写的项目叙事。第三项是 Where Is My Body?（2023）定格动画，进入同站极简视频详情页。LingGou EduBot 移至 Others 末尾（`featuredOrder: 90`），保留完整既有设计案例详情。不再显示 `Draft section` 待补提示；Tutela 保留在 Selected Projects。

| 展示名称                       | 内容 ID                      | 年份 / 文档日期      | 叙事重点                                                                    |
| ------------------------------ | ---------------------------- | -------------------- | --------------------------------------------------------------------------- |
| From Following to Discovery    | `following-to-discovery`     | 2025 / December 2025 | 以小红书发现页为例，讨论推荐机制、可见性、社会比较与用户管理受众的策略      |
| The Evolution of Commemoration | `evolution-of-commemoration` | 2026 / January 2026  | 苏格兰墓碑铭文的文本挖掘与可视化，关注程式化语言、家庭关系及女性文本可见性  |
| Where Is My Body?              | `where-is-my-body`           | 2023                 | 2023 年夏在伦敦协作制作的定格动画，以无身体的龙寻找缺失部件的城市旅程为故事 |

两项课程作业的文档日期来自源 PDF 导出元数据，只表示 Document date，不将它们写为研究开展周期、完成时间或发表日期。

Where Is My Body? 使用用户指定的完整简介，不截短或改写：

> A collaborative stop-motion animation created in London in summer 2023, following a bodyless dragon's whimsical journey through the city in search of his missing parts, only to discover he had been whole all along.

### 6.2 布局、内容与素材边界

- Others 与 Selected Projects 共用同款卡片：一张 16:9 横图、标题、年份、简介、角色、前两个能力标签与详情入口；桌面每行两项，手机单列。
- 使用同一 Astro projects 内容集合，首页通过 `homeSection` 分区，不另建一份网站级作业清单。两项作业使用 `caseStudyType: coursework`，定格动画使用 `caseStudyType: video`，LingGou 保留 design 详情语义；四项均使用既有 `/project/[id]/` 层级的详情页，不增加第三层。
- 两项课程作业的首页简介与现有 Overview 不改；其后用居中单栏忠实呈现原文完整题目、标题层级、段落、原图及参考文献。第一篇约 2,050 词、11 条参考文献、2 张图；第二篇对应原 13 页、19 张图、2 条参考文献，图文顺序与原作业一致。
- 定格动画排在两项作业之后（`featuredOrder: 80`），封面使用视频公开缩略图的本地文件 `src/assets/projects/where-is-my-body/cover.jpg`；点击卡片进入同站视频详情，不直接跳转 YouTube。
- 原图从 PDF 中提取，移除页眉和学号，不直接展示整页报告。封面可用原图组合，不生成不存在的实验、界面或结果。
- 原文措辞、论点、统计数字及 Formulaicity Index / H2 等原有结论按用户要求完整恢复，不做编辑性改写或纠正；只处理 PDF 提取造成的空格、断行与段落换行，并移除页眉和学号。此前省略有疑义 FI 数字的规则不再适用于这两篇原文展示。
- 页面明确属于既往课程作业；忠实转载不表示本站独立确认了原文的数值、因果关系或验证结果，也不新增发表、用户测试或产品原型声明。
- 原 PDF 不复制到网站目录，也不提供公开下载链接。
- 当前四项内容已提供，不再要求用户填 Others 空数组；若将来全部隐藏，保留明确的空状态和有效章节目标，而不是伪造内容。

### 6.3 Education 已移除

2026-11-02，按用户最新要求移除首页 Education 模块及其顶部导航入口，不再保留空白章节或要求补充教育数据。此调整不影响 Others、现有五个项目、详情页、简历与其他个人资料。

### 6.4 页脚（2026-11-06）

参考 ruocanpeng.com 的页脚结构，但保持本站浅色：

- 三段式：左侧一句"现在在做什么"的状态，中间小字 “Say hello ↗”（mailto），右侧安娜堡实时时间 “hh:mm:ss AM / Ann Arbor, MI”（`America/Detroit`，每秒刷新，访客在哪里看都是安娜堡时间）。不再显示版权行，也不重复左栏已有的 Resume / LinkedIn / Email 链接。
- 状态句按安娜堡当前小时切换，文案和时段都在 `src/data/site.ts` 的 `footerStatuses`（`from` 为起始小时，取最后一个满足 `hour >= from` 的条目）。人设：会很多技能、设计和工程都感兴趣、不断扩展 skillset、夜猫子、点子多。当前文案：
  - 0:00 Night owl mode: shipping one more idea
  - 2:00 Recharging; ideas queued for the morning
  - 7:00 Probably on my first coffee
  - 9:00 Probably vibe-coding
  - 12:00 Probably sketching ideas over lunch
  - 14:00 Probably bouncing between Figma and the terminal
  - 18:00 Probably learning a new skill, just because
  - 21:00 Probably collecting fun facts for no reason
- 文案要像状态不像 slogan（用户反馈 “Pair-programming with an AI agent”“Designing it, then engineering it” 像 slogan，已改）；不写泛泛的 “out for lunch” 之类。
- 站点联系邮箱改为 aylaliu@umich.edu（`site.ts` 一处，左栏 Email 与页脚 Say hello 共用）。
- 窄屏（≤48rem）三段改为居中竖排。无 JS 时显示第一条状态和地名。

## 7. 项目详情页与两层结构

Others 的两项课程作业保留原文展示，第三项定格动画使用极简视频详情；原五个设计项目中，PhageX、EchoBloom、Tutela 的详情正文按第 7.1 节逐个改为基于 PDF 的版本，URL 保持不变；The Reading Pensieve 和 LingGou EduBot 不再有站内详情页，卡片外链到 PDF（见 7.1 外链项目）。

原五个设计项目在改版前使用以下模板章节（某项目按第 7.1 节改版后，这五章不再约束该项目）：

1. Overview：产品、问题、角色、团队、周期、平台。
2. Key Insight：影响方向的关键洞察。
3. Design Decisions：方案选择与取舍。
4. Prototype & Experience：流程、界面、原型、测试或视频。
5. Outcome & Reflection：证据、结果、限制与下一步。

两项作业仍复用详情模板，Hero 标识为 Coursework；章节导航只显示 Overview（`#overview`）和 Original coursework（`#original`）。现有 Overview 后由 `CourseworkContent` 展示完整原文，单栏居中阅读，不再拆成 Research approach / Analysis / Findings / Reflection。元信息标签保留 Format、Document date、Methods/tools，不把文档日期当作 Duration。`research` 仍是可选的五章节详情模式，但当前两项作业不使用它。

Where Is My Body? 的详情路由为 `/project/where-is-my-body/`（带站点配置的 base），仅展示影片标题、YouTube 视频 `uyxzaYrkF1g` 播放器、返回 Others 入口与 Watch on YouTube 备用链接。播放器初始复用与用户提供封面一致的本地 `cover.jpg`，提供可通过键盘操作的 Play 按钮，激活后才加载 `youtube-nocookie.com` iframe。用户已确认可以播放，本轮处理的是缺少预览，不将此前本地浏览器结果视为普遍播放故障。年份和简介只在首页卡片展示；详情不显示 Overview、案例章节或章节导航，也不要求编写 MDX 章节。

PhageX 已有的 YouTube 头部视频（`rArbDeBju0M`）、播放器行为及局部紧凑排版维持现状，不因首页卡片统一而回退为图片。其他项目的详情头图也不受本轮影响。

案例详情页保留上一项 / 下一项、返回所在首页分区、简历或联系入口；视频页保持极简并提供返回 Others 的入口。Selected Projects 四项返回 Projects，Others 四项（含 LingGou）返回 Others。允许未来项目仅在首页展示，但不能为其制造无效详情链接。顶栏仍只有 About Me、Projects、Others 三项。

### 7.1 五个设计项目详情页：基于 PDF 重建（2026-11-05 确认）

**目标**：PhageX、EchoBloom、Tutela 三个项目的详情页（The Reading Pensieve、LingGou EduBot 于 2026-11-06 改为外链 PDF，见下方“外链项目”）（`/project/<id>/`）各有一份对应 PDF，PDF 包含项目的实际内容和视觉风格。直接基于 PDF 把项目转化为网页，覆盖现有强行套用五章节模板的版本。

**范围**

- 只改这五个详情页。首页卡片（标题、年份、简介、角色、能力标签、封面）、顶栏导航、URL、Others 其余项目保持不变，除非用户另行要求。
- PhageX 详情页开头的 YouTube 视频（`heroVideo` `rArbDeBju0M`）、播放器行为和位置不动，只替换视频之后的内容。
- 用户逐个发送 PDF，逐个项目修改；一个项目经用户确认后再做下一个。

**内容规则**

1. PDF 是唯一的内容来源。保留 PDF 的章节顺序、标题、正文、数据、图片和图注；不补写 PDF 里没有的内容，不臆造结果、指标或经历。
2. 现有 MDX 正文（Overview / Key Insight / Design Decisions / Prototype & Experience / Outcome & Reflection 模板叙事）整体替换；不保留 PDF 中没有或与 PDF 冲突的旧文字。页面头部已经展示的内容（如 PhageX 头部的 YouTube 视频）不在正文中重复，例如正文不再放 Video Demo 标题和视频链接（2026-11-05 用户确认）。
3. 保留原文表述，只做网页化处理：分页改为连续滚动，修复 PDF 断行与多余空格，去掉页眉、页脚和页码。明显的错别字和语法错误（主谓一致、冠词、单复数、大小写等）可以修正，不改原意，交付时逐条列出。
4. 普通段落、列表、引用来源和说明框用可选中的 HTML 文本呈现，不把整页 PDF 截图当正文。
5. **设计好的组合图完整呈现，不拆分、不重画**（2026-11-05 用户确认）：插图与配文、对话气泡与图表、Persona 与利益相关者地图、SWOT、流程图、界面截图，以及深色背景上整块排好的高保真界面面板（如 PhageX 的 Smart Glasses 面板，2026-11-05 用户要求按其提供的 c-6 整块呈现）等，按 PDF 中的完整范围作为一张图放入，图中的文字保留在图里，并在 alt 中写出图中文字。只去掉与网页标题重复的图内标题，且只在不会切到图形时才去掉；用户截图标出的范围以截图为准。
6. 用户提供的透明底或更干净的原图优先于从 PDF 裁切的版本；背景混乱时先请用户提供原图。
7. PDF 中的项目信息（年份、时间、角色、团队）与首页卡片不一致时，先告诉用户并由用户决定，不擅自改卡片。

**视觉规则**

1. 详情页的配色、强调色、版式节奏、图文排列和图形元素跟随该项目 PDF 的风格。
2. 字体优先使用站点现有字体或接近 PDF 气质的系统字体；需要引入新字体时先征得用户同意。
3. 项目专属样式只作用于该项目的详情页，不影响首页、其他项目和全站共享部分。
4. 全站共享部分保持统一：顶栏导航、上一项 / 下一项、返回所在首页分区、Resume 与联系入口。
5. 版面要适配桌面与手机：PDF 的多栏版式在窄屏改为单列，375 px 宽度下无横向溢出。
6. 文字颜色对比度满足 WCAG AA（正文 4.5:1）；PDF 原配色达不到时微调文字颜色并告知用户。

**版式规则**（2026-11-05 用户确认，五个项目共用，样式在 `src/pages/project/[id].astro` 的 `.pdf-case` 中）

1. 头部（标题、副标题、视频或封面、项目信息、章节导航）与所有章节共用同一个居中内容栏（64rem），两侧至少留 4rem（窄屏 1.25rem）空白，左边缘完全对齐。
2. 标题层级按 PDF 中标题的大小对应（2026-11-05 用户要求 Persona 与 Stakeholder Map 同级后确认）：PDF 中的大标题都是章节（h2），包括全大写的 BACKGROUND、PERSONA 等，以及同样大小的 Stakeholder Map、User Journey Map、Are Smart Glasses the Ideal Solution?、Designing PhageX、How PhageX Works；带竖线（|）或箭头（»）的标题是小节（h3）；更小的标签是 h4。相邻两级标题必须同时在字号和颜色上拉开差距（2026-11-05 用户确认）：章节标题为深蓝灰大写（约 34px）；竖线小节标题为中蓝 `#3962c0`；箭头标题沿用 PDF 的浅蓝 `#628ecb`、粗体、比竖线标题小一号（≥1.2rem 以满足大字号对比度），箭头符号用更浅的 `#a3bbec`；章节标题旁的副标题（如 Victim’s POV）用浅蓝并缩小到 0.8 倍。章节导航由左侧 rail 承担（7.2.8），头部不列章节。标题、正文、卡片、网格一律左对齐到内容栏左边缘。
3. 图片不孤立地居中漂在空白里（2026-11-05 用户确认）：图片总是填满它所在的格子（整栏或分栏），由分栏宽度决定图片大小；过高的图（如信息架构树）放进分栏，不单独占一整行。
4. 信息密度参照 PDF 的分栏排布（2026-11-05 用户确认）：PDF 中左右并排的内容在网页上也左右并排（`.pdf-row`，栏宽用 `--split` 调整），标题旁的说明（如 Storyboard 旁的 Design Pivot、Desk Research 旁的引言）放在同一行。两栏的顶部和底部都对齐：文字栏较短时把多出的空间分到各小块（`pdf-block`）之间；相差过大时先调整栏宽，仍不平衡就按 PDF 的排布重新分组（例如把信息架构树放在 Problem/Solution 与交互系统图旁边）。同类内容（卡片、截图、照片、手机）用等宽网格，图片统一尺寸。
   - 并排两栏靠调整栏宽（`--split`）达到自然等高，而不是靠拉开中间的空白：分到小块之间的空白应控制在约 1.5rem 以内（2026-11-05 用户反馈 Methodology 与 Why would people… 之间空白过大）。底边对齐到最后一行文字或图形的底部，图片裁切时不留多余的底部留白。
   - 测量时要考虑字体：用户的 Mac 使用 Avenir Next，宽度介于 Inter 与 Liberation Sans 之间，调栏宽时两种字体都要检查。
   - 较短的两个同级章节可以并排放在一行（`.pdf-chapter-row`），各自保留 h2 和锚点，例如 Persona 与 Stakeholder Map。
   - 组合图里彼此独立的单元（如三张 Persona 卡片、四个 Avatar 状态）可以按排版需要拆成单张重新排列，但每个单元保持完整，并在交付时告诉用户；图文一体的设计（插图配引语、对话气泡配图表等）仍整体呈现。
5. 全页一套紧凑间距：块与块之间 1.25rem，新小节前 2.5rem，章节上下各 3rem 并用细线分隔；不额外使用深色区块。PDF 中自带底色的区域可以用同色浅色面板还原（如 PhageX 的 Visual Guide 使用 PDF 的浅蓝底色 `#e4f2fd`，2026-11-05 用户要求）。
6. 章节与小节的先后顺序和 PDF 一致；同一主题的不同保真度（如低保真场景图与高保真界面）分开呈现，不交错排列。PDF 跨页时网页上需要的分隔标题（如 High-Fidelity Design）可以添加，但交付时告诉用户。

**外链项目**（2026-11-06）：不在站内重建详情页的项目，frontmatter 设 `detailPage: false` 加 `externalUrl`，首页卡片改为在新标签打开该链接，按钮文字为 “View PDF ↗”；不生成 `/project/<id>/`，上一项 / 下一项导航自动跳过它。The Reading Pensieve 和 LingGou EduBot 用此方式指向 Google Drive 的 PDF。

**文件规则**

1. 能改原有文件就不新建文件：正文写在现有 `src/content/projects/<id>.mdx`，图片放现有 `src/assets/projects/<id>/`；同一张图的新版本直接覆盖同名文件并检查引用。
2. 优先复用现有组件（`MediaFigure`、`ProjectImage`、`ImageComparison`、`ProcessGallery` 等）；需要新版式时先扩展现有组件、`ProjectHero.astro` 或 `src/pages/project/[id].astro`。确实无法复用才新增组件，并在新增前说明理由。
3. 五章节固定 ID（overview、insight、decisions、prototype、reflection）不再约束已改版的项目；章节和章节导航以 PDF 自身结构为准。相应修改现有的 `src/content.config.ts`、`scripts/validate-content.ts` 和 `tests/`，不另建校验文件。
4. 从 PDF 提取的图片使用原始分辨率或足够清晰的导出，裁掉页眉页脚；每张图写准确描述图片内容的 alt。
5. PDF 原件不放进网站，也不提交到 Git；临时提取文件放在已被 Git 忽略的 `tmp/`。
6. 改版后不再使用的旧图片先列出，经用户同意再删除。

**每个项目的流程**

1. 用户发送该项目的 PDF。
2. 通读 PDF，列出章节结构、图片清单，以及与首页卡片信息不一致之处；有冲突先问用户。
3. 提取图片，改写该项目的 MDX 与专属样式。
4. 检查：对照 7.2.6 的检查项自查；格式检查、内容校验、测试；用户在 Mac 上运行 `npm run ci`，并在本地预览（`npx astro dev --force`，http://localhost:4321/）中确认桌面与手机宽度显示、图片清晰度、上一项 / 下一项与返回链接。
5. 用户确认后更新下方进度表，再开始下一个项目。五个项目全部确认后再部署。

**进度**

| 项目                 | 详情页                | 状态                                                                                                         |
| -------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------ |
| PhageX               | `/project/phagex/`    | 已验收（2026-11-05）：视觉布局和内容都已通过；共用做法见 7.2，内容改动见 7.2.7                               |
| EchoBloom            | `/project/echobloom/` | 已验收（2026-11-06）：PDF 海报 + 线上互动 demo 两条分支，头图与 App Concept 图换为用户提供的高清图，见 7.2.7 |
| The Reading Pensieve | （无详情页）          | 2026-11-06 用户决定：删除站内详情页，首页卡片直接在新标签打开 Google Drive 上的 PDF（`externalUrl`）         |
| Tutela               | `/project/tutela/`    | 已验收（2026-11-06）：布局、内容、左侧导航都已通过                                                           |
| LingGou EduBot       | （无详情页）          | 2026-11-06 用户决定：同 The Reading Pensieve，卡片外链到 Google Drive 的 PDF（`externalUrl`）                |

### 7.2 PDF 详情页的共用做法（PhageX 已验收，2026-11-05）

本节记录 PhageX 改版中已经验证、其余四个项目可以直接复用的结构、样式、素材流程和验收方法。7.1 是规则，本节是做法；两者冲突时以 7.1 为准。

#### 7.2.1 数据与页面骨架

- frontmatter 设 `caseStudyType: pdf`，并加 `pdfPage`：
  - `tagline`：头部副标题，用 PDF 封面的副标题。
  - `hideHeroMedia: true`：不在头部显示封面图或视频（首页卡片仍用 `cover`）。Tutela 的封面图在头部效果不好，用户要求拿掉（2026-11-05）。
    - 没有首图时头部会显得空（用户反馈信息分散、空白无效），`ProjectHero.astro` 用 `project-hero--no-media` 收紧：标题、项目信息表、章节导航之间的间距缩小一档（gap 1.25rem），信息表格子的上下内边距减半，头部底部留白减小；正文第一章（At a glance）的上内边距减到 1.5rem，紧接头部。
  - 头部封面默认用 `cover`；如果首页卡片的裁切不适合头部，frontmatter 加顶层 `heroCover`（只用于详情页头部，首页卡片仍用 `cover`）。EchoBloom 的 `cover.png` 是放大裁切，头部改用用户提供的完整构图 `cover-hero.jpg`（2026-11-06）。同时修了头图被放大的 bug：Astro `<Image>` 输出的 `height` 属性让图片保持原像素高度、`object-fit: cover` 只露出中间一块；`ProjectHero.astro` 给 `.hero-media img` 加 `height: auto`，compact 布局下图片头图的框改为 16:10（`:has(img)`），视频仍为 16:9。
  - `facts`：3–4 组 `label` / `value`（如 Project、Timeline、Scope），替代默认的 Role / Team / Duration / Platform。
  - `rail`：左侧章节导航的 4–6 个站点（见 7.2.8）；每个 `id` 必须在正文中有对应的 `<section id="…">`，否则内容校验失败。头部不再显示章节 chips。
- 首页卡片字段（title、summary、year、role、capabilities、cover）不变；`pdf` 详情头部不显示 capabilities；`heroVideo` 等头部媒体保持原样。
- 正文：PDF 中每个大标题是一个 `<section id="kebab-id" class="pdf-chapter">`，第一行写 `## 标题`。两个较短的同级章节并排时，用 `<div class="pdf-chapter-row" style="--split: …">` 包住两个 section。
- MDX 写法注意：
  - HTML 块里写 Markdown 时，前后各空一行。
  - 列表后面的闭合标签（`</div>`、`</li>`）顶格写，否则会被当作列表内容。
  - 段落外层用 `<div class="pdf-lead">` 这类 div，不要用 `<p>` 包 Markdown，否则会产生嵌套段落。
  - 图片一律用 `ProjectImage`，写准确的 `alt` 和与显示宽度相符的 `sizes`；原图窄于 480px 时显式给 `widths`。

#### 7.2.2 共用样式（`src/pages/project/[id].astro` 的 `.pdf-case`）

| 类名 / 变量                                               | 用途                                                                                                                                                                                                                                                                                                                                                                           |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `.pdf-row`（`--split`，如 `minmax(0, 1fr) 19rem`）        | 按 PDF 的分栏左右并排，各栏顶部和底部对齐；56rem 以下自动变为单栏                                                                                                                                                                                                                                                                                                              |
| `.pdf-col`、`.pdf-block`                                  | 栏内纵向排列；`.pdf-block` 是一组相关内容，栏较高时多出的空间平均分到各组之间                                                                                                                                                                                                                                                                                                  |
| `.pdf-grid`（`--cols`）                                   | 等宽网格：卡片、截图、照片                                                                                                                                                                                                                                                                                                                                                     |
| `.pdf-strip`（每个 `li` 设 `--r` = 图片宽高比）           | 一行等高的图片，宽度按比例分配                                                                                                                                                                                                                                                                                                                                                 |
| `.pdf-chapter-row`                                        | 两个较短的同级章节并排，各自保留 h2 和锚点                                                                                                                                                                                                                                                                                                                                     |
| `.pdf-headline`                                           | 标题与说明放在同一行（如 Storyboard 与 Design Pivot）                                                                                                                                                                                                                                                                                                                          |
| `.pdf-lead`、`.pdf-key`、`.pdf-hl`、`.pdf-source`         | 引导句（1.1 倍字号）、蓝色强调、红色高亮数字、来源小字                                                                                                                                                                                                                                                                                                                         |
| `ul.pdf-two-col`、`.pdf-points`                           | 两列列表、带圆形序号的列表                                                                                                                                                                                                                                                                                                                                                     |
| `.pdf-glance`（At a glance）、`--pdf-panel`               | 页面开头的摘要面板。面板底色要和正文卡片同色系但区分得开：Tutela 用比正文卡片略浅的淡紫（用户要求偏浅不偏深）（Problem / Research / Design / Testing），每项一行：左侧小号大写标签，右侧一句话，行间用细线分隔；窄屏时标签移到句子上方。每句控制在约 95 个字符内，桌面宽度下保持一行。`--pdf-panel` 是面板底色，项目可设为 PDF 的底色。摘要不属于 PDF 原文，只有用户确认后才加 |
| `.pdf-card`、`--dashed`、`--callout`                      | 浅蓝卡片、虚线框、结论 / 重点卡片                                                                                                                                                                                                                                                                                                                                              |
| `figure`、`a.pdf-zoom`、`figcaption`                      | 图片填满所在格子；大图（地图、流程图）外包 `a.pdf-zoom` 链接原图供放大；图注小字                                                                                                                                                                                                                                                                                               |
| `h2`、`h3`、`.pdf-chevron`、`h4`、`.pdf-h2-sub`           | 章节（深蓝灰大写）、竖线小节（中蓝）、箭头标题（浅蓝粗体，小一号）、小标签、章节副标题（浅蓝 0.8 倍）                                                                                                                                                                                                                                                                          |
| `--pdf-ink`、`--pdf-heading`、`--pdf-blue` 等颜色变量     | 在 `.pdf-case` 定义；新项目在 `.pdf-case--<id>` 中按 PDF 取色覆盖，文字颜色须满足 7.1 的对比度要求                                                                                                                                                                                                                                                                             |
| `--pdf-space`、`--pdf-space-lg`、`--pdf-gap`、`--pdf-col` | 块间 1.25rem、新小节前 2.5rem、栏间 2rem、内容栏宽 64rem                                                                                                                                                                                                                                                                                                                       |

#### 7.2.8 左侧章节导航（`ChapterRail.astro`，2026-11-05 用户要求）

页面太长、调研部分尤其多，读者需要随时定位并能跳过调研。参考 ruocanpeng.com 的项目页：纯文字列表，固定在视口左侧，和标题同高，当前项变深色。

- 数据：`pdfPage.rail`（必填），4–6 个阅读站点，每个 `id` 必须有对应的 `<section id>`（校验脚本检查）。原来的 `pdfPage.chapters` 和头部章节 chips 已移除（用户决定，2026-11-05）：两套导航功能重叠，pdf 页面只用 rail。
- 命名：按叙事而不是按方法命名，不用 Research / Ideation / Testing 这类作业式名字。固定用 Overview → Challenge → (Opportunity) → Solution → Validation；Overview 指 At a glance。一个站点覆盖一个阶段（Challenge 覆盖背景、调研、访谈、persona 等所有章节），未列出的章节滚到时高亮它前面的站点。
- 样式（2026-11-05 用户反馈等宽大写与页面风格不符后改）：和站点导航同一体系的无衬线字，0.9rem，中等字重，正常大小写；未激活 `#5f6b7f`（灰，AA 达标），激活深色、半粗并在左侧加 2px 项目色短线（`--pdf-heading`）；无背景无边框；宽 8rem，`top: 7rem` sticky。
- 布局（2026-11-05 用户反馈头部、正文、rail 三个左边缘不一致后改）：有 rail 的页面（≥74rem）把头部（标题、副标题、信息表）和正文放进同一个 52rem 居中栏，从标题到每一章只有一条左边缘；rail 绝对定位在页面左边距（距窗口 2rem，宽 8rem），顶部与标题同高，列表 sticky 在 5.25rem；<74rem 隐藏 rail，恢复 64rem 栏。栏宽用 `--pdf-col` 变量，按 rem 写死的 `--split` 在 52rem 下要重新测量。
- 定位规则（2026-11-05 用户追问“点 Overview 到底停在哪”后实测校准）：
  - 点击：章节标题停在顶栏下方 72px（全局 `scroll-padding-top` 的 1.5rem + 章节 3rem 上内边距）。章节不再自带 `scroll-margin-top`，否则和全局留白叠加会停到 112px。
  - 吸顶：导航列表 `position: sticky`，`top` 由脚本按运行时测到的 `.site-header` 真实高度 + 72px 设置（`--rail-top`），所以高亮行和章节标题齐平；顶栏高度随窗口变化时重算。
  - 高亮：滚动时以“顶栏底 + 40px”为判定线，section 顶部越过这条线即为当前章，映射到所属站点；点击时立即高亮目标站点；滚到页底时高亮最后一站。最后一章（Testing）因页面长度不够，点击后标题停不到 72px，属正常。
  - 预览环境要模拟 sticky 顶栏再测，否则测不出吸顶位置的问题。
- 不做：分组、阅读进度条、缩略图。

#### 7.2.3 可以提升为共用的 PhageX 样式

以下样式目前写在 `.pdf-case--phagex` 下。其他项目第一次需要同类版式时，把它改名为共用的 `.pdf-*` 类并移到共用区，同时确认 PhageX 的显示不变：

- 编号结论卡片（`phagex-takeaways`）
- 使用 PDF 底色的浅色面板（`phagex-guide`），以及其中“说明文字 + 图”的小组（`phagex-guide-avatar`）
- 浅色底带上的人物卡片（`phagex-personas`）
- 截图下方的说明卡片（`phagex-shots`）
- 大号数据 + 说明（`phagex-stat`）
- 人物信息卡（`phagex-people`）
- 方案对比卡片与选中高亮（`phagex-solutions`），以及选中方案的 “Selected” 标签（`phagex-selected`，与人物卡标签同样式）
- 状态色块（`phagex-swatch`，颜色取自对应的头像或插图）
- 多台手机组合（`phagex-phones`，透明底手机图）
- 对话气泡式术语框（`phagex-term`）

#### 7.2.4 素材处理流程

1. 先查 PDF 结构（`pdfimages -list`）。PhageX 每页是一张整页高清图（7324 × 4120），因此按 PDF 坐标 × 缩放比例从内嵌原图裁切，而不是从低分辨率的渲染图裁切。
2. 裁切清单写成 JSON（文件名 → 页、范围、最大宽度、需要涂白的区域），批量裁切后拼成对照表逐张检查边界：不切到图形或文字，也不带入相邻内容。
3. 用户标出的完整范围、组合图、深色背景面板整块保留；只有彼此独立的单元（如 Persona 卡片、头像状态）在排版需要时才拆分，并告知用户。
4. 背景杂乱时先请用户提供透明底或干净的原图，用户提供的版本优先。手机外框可按圆角轮廓抠成透明 PNG。
5. 输出：照片和插画用 JPG（质量 88），图表和透明图用 PNG（过大时量化到 256 色）；宽度一般 1800–2400px；同名覆盖以保留引用；不再使用的图先列出，经用户同意再删除。
6. 图内标题与网页标题重复时，只在背景是平滑渐变、涂掉后不留痕迹时才涂掉。

#### 7.2.5 交付前的版式验收方法

- 宽度：390、760、1024、1160、1440 px。用户浏览器窗口在 1152px 以上，内容栏为 1024px，以 1160 和 1440 为主要检查宽度。
- 字体：用户 Mac 上是 Avenir Next；云端预览用 Inter（偏宽）和 Liberation Sans（偏窄）两种字体夹住它，两种都要测。
- 每个 `.pdf-row` 都测量各栏的自然高度并调整 `--split`，使两栏高度差在约 15px 以内；文字栏被拉开的空白不超过约 1.5rem，否则改栏宽或重新分组。
- 检查：无横向溢出、所有图片加载、文字对比度达标、相邻两级标题的字号和颜色都有差距、组内间距小于组间间距。
- 对比度用脚本逐个文字节点实测（前景色叠加实际背景，含渐变面板的平均色），不靠目测；Tutela 曾有 Persona 名称和表头两处不达标（2026-11-05 修复）。
- 运行格式检查、内容校验、测试，并确认 MDX 能编译；最终的 `npm run ci` 由用户在 Mac 上运行。

#### 7.2.6 PhageX 反馈总结的检查项

- 信息密度：照 PDF 的分栏排布；不让图片孤立居中，不留大块空白，一个章节不只放一张大图。
- 对齐：并排内容顶部和底部都对齐；同一行的图片等高。
- 分组：相关内容的间距要小于不相关内容（如 Avatar 文字与头像图近，与 Status、Logo 远）。
- 层级：相邻两级标题同时用字号和颜色区分；头部只突出 2–3 个章节。
- 不重复：头部已展示的视频、标题不在正文再次出现。
- 面板：PDF 中带底色的区域用同色的浅色面板还原，面板内容居中、左右留足边距。
- 图片尺寸：保持在 PDF 中的相对大小，不为填满栏宽而放大；用户要求缩小时整组一起缩小。
- 新写的文案（摘要、标签等）：短句、具体、可以用第一人称；不用破折号、格言式结论（如 “awareness alone doesn’t protect people”）和排比堆砌，避免 AI 腔。
- 概括 PDF 里的数据时不引申：先和用户确认数字背后的事实再写进摘要（PhageX 的 “40% Direct Impact” 指参与者经历过其他诈骗，不是杀猪盘）。
- 表情符号（2026-11-05 用户更正）：PDF 里当图标用的表情符号要保留，不能轻易去掉；只有 PhageX 按之前的批准去掉了，不再改动。后续项目照 PDF 原样保留图标，用 `aria-hidden="true"` 包住。
- 每个模块要让读者一眼看懂它想传达什么：并排的标签和数值如果其实是理由或结论，用标题点明（如 PhageX 方案对比下方的 “Why Smart Glasses”），不要让读者自己猜。
- 修正 PDF 原文的语法、拼写和大小写错误（如主谓一致、缺冠词或复数、“in real-time” 作状语时应为 “in real time”、陈述句标题不加问号），不改原意；图片里的文字改不了，需要时向用户说明。

- 加导航后内容栏变为 52rem，PhageX 重新排版（2026-11-06 用户反馈）：
  - 受访者卡片改为头像在上、文字在下，避免文字溢出卡片。
  - Interview：焦点小组的统计（100% / 40%）作为浅色横条紧跟在受访者卡片和化名说明之后（用户要求结论跟在受访人介绍后面），再往下是 Methodology / Why would people… 与右侧 “What do they say?” 并排（右栏 22rem）。“Close-contact victim” 标签缩短为 “Close contact”。
  - How PhageX Works：右侧 External Devices 栏宽改为与左侧三列中每列等宽（`calc((100% - gap - 2×space) / 4)`），四列图片等高，两行卡片的顶部、图注和底部都对齐。
  - High-Fidelity Design：按 PDF 保持眼镜面板为主（右栏 10.5rem，面板约占 4/5 宽），三部手机 2+1 叠放；两栏顶部对齐，底部不强求等高（用户明确不要手机排成一排、不要缩小面板）。
  - Research / Desk Research：标题和引导句（Young adults…）提到整行，两栏里只剩要点卡片与来源对年龄分布图；要点改单列，右栏 33rem，两栏高度差 ≤ 25px。
  - Designing 右栏 18rem，User Testing 改为 1.6fr / 1fr。
  - 栏宽都按有导航时的 52rem 栏测量；窗口小于 74rem 时恢复 64rem 栏，这些比例仍可用但未逐一调到 15px 内。

#### 7.2.7 内容例外（用户逐项确认后才做）

7.1 规定 PDF 是唯一的内容来源。为了让作品集更适合求职，用户可以逐项批准超出 PDF 的改动；批准的改动记录在这里，未批准的不做。

- PhageX（2026-11-05 批准“首屏”一组改动）：
  - 头部副标题改为与首页卡片一致的 “A smart-glasses and mobile concept that flags manipulation and intervenes before a scam escalates.”
  - 头部信息改为 Role（Solo designer — research, interaction & visual design, prototyping, testing）、Type（Self-initiated concept）、Timeline（Jan–Apr 2025）、Methods（Desk research, focus group (n=5), journey mapping, experience prototyping）。
  - 在 Background 前新增 At a glance（Problem / Research / Design / Testing），每项一句短话，只概括 PDF 已有的信息，不新增数据（用户反馈初稿字多、AI 腔重后改写）。用户又反馈 2×2 布局不清、层级不好看，改为每项一行的表格式（见 7.2.2）。
  - Research 一句按用户说明更正：5 名参与者都知道这种骗局；其中 2 人有其他诈骗的经历（1 人亲身遭遇，1 人的朋友被骗），不是杀猪盘。现为 “All 5 participants knew of the scam; 2 had firsthand or secondhand experience with other scams.”，不要写成受杀猪盘影响。
  - 使用规范的方法名并写明测试边界（2026-11-05 批准）：At a glance 的 Testing 按用户要求精简为 “Tested user reactions with a Google Cardboard experience prototype.”，测试边界只写在 User Testing 的 Methodology 里，具体反馈也留在该章节；User Testing 的 Methodology 前加 “Experience prototyping.”，句末加 “Detection accuracy and hardware feasibility were not tested.”，PDF 原句保持不变。预录的第一人称视频属于 experience prototype（video prototype），不是 Wizard-of-Oz（后者指测试时由人在背后实时操控系统），不要混用。
  - 去掉正文表情符号（2026-11-05 批准）：方案评价的 ☹️😐🙂 改为 Solution 3 标题旁的 “Selected” 标签；对比栏的 ✅ 一度改为 “Decision: Smart Glasses”，用户反馈看不懂这一栏要传达什么，改为标题 “Why Smart Glasses” 加三个理由（First-person view、Real-time response、On-device AI，对应 PDF 的 POV、Response、Edge 三项）；Status 的 🟢🔴🌸 改为取自头像的色块（问候气泡的绿、警报火焰的橙黄、治愈爱心的粉）；“Why Pig Butchering Scam?” 列表的表情和两张小图标统一换成蓝色圆点，并改为单栏以与右侧结论卡片等高；其余表情（💡⚠️👓✅❤️🔒）直接删除。
  - 改掉说过头的话（2026-11-05 批准）：“privacy-compliant” 改为 “designed for on-device processing”；Conclusion 改为 “Testing supported the core interaction; always-on camera privacy is the main open risk.”；“actively audit reality” 改为 “scan chats, voices and faces for scam cues”。系统图（AI 生成）里的 “Privacy-compliant” 和 SWOT 图里的 “ensures no data leaves the hardware” 是图片文字，等重画图时再改。
  - 修正 PDF 原文的语法和用词（2026-11-05 批准）：Scam cause → causes；detect scam → scams；familiar with pig butchering scam → scams；prone to investments → prone to investing；and finally financial loss → and finally to financial loss；GA-SO → GASO；25-35 → 25–35；Victim’s pov → POV；Design Pivot- → Design Pivot –；How PhageX Works? → How PhageX Works（章节导航同步）；Human Intuition is Failing → Is；in real-time → in real time（2 处）；Scam warning → Scam Warning；Multimodal AI、Deepfake detection、Video Post-processing 改为小写；期刊引用改为 “No. 4, 2021, covering all scams in China from Jan to Aug 2019”；补齐列表和图注的句号或统一去掉。
  - 受访者信息（2026-11-05 用户说明）：名字本来就是化名，头像也不是本人照片，因此不改成 P1–P5，在受访者卡片下方加注 “(Names are pseudonyms; avatars are not photos of the participants.)”。
  - 验收时保留未改（用户未要求修改）：Avatar 的 “Biological Virus Hunter”（噬菌体本身是病毒，猎杀的是细菌）；Interview 的 “40% Direct Impact” 未注明是其他诈骗；系统图和 SWOT 图中的图片文字。
- Tutela（2026-11-05，按 PhageX 的首屏做法）：
  - 头部副标题沿用首页卡片；头部信息为 Role / Type / Timeline / Methods；新增 At a glance，只概括 PDF 内容。
  - At a glance 标题下加一句名字释义（用户提供）：“The name Tutela comes from Latin, meaning protection, care, and guardianship.”，用共用的 `.pdf-glance-note`。
  - Video Demo（YouTube JR25iHxkywU）按用户选择嵌在 Prototyping 章节，头部保留封面图。
  - 访谈者 Sunny、Grace D 为化名，卡片下方加注 “(Names are pseudonyms.)”；面对面访谈照片经用户确认可公开。
  - 图标按 PDF 保留（用户要求）：Treatment 列表、Persona 列表、Clinical proof 的 ✅ 都保留；Monitoring Technology 的选中方案用共用的 `.pdf-selected` 标签。
  - 语法与拼写修正：Approaches& → Approaches &；avoid trigger food 保留；temprature → temperature；Ideation 图内 “reliefs” 用同字体重绘为 “relieves”（图片文字，已告知）；表格单元统一首字母大写与标点。
  - Background 按用户反馈重排（2026-11-05）：两张文字卡片各自与自己的图并排成两行（卡片 1 配症状图和词云，卡片 2 配 15% 与 39% 两张图表和来源；学生插画按用户要求移到 Persona 面板作为人物像），两行各自顶底对齐，不再把四张图全部堆在右栏。
  - 2026-11-05 第二轮反馈：Treatment 卡片内容收紧并与左图对齐；数据分析的两张图底部对齐；Interview 改为 用户 | 专家 | 照片 三栏，四张发现卡片的正文底部对齐；Persona 的插画移出紫色面板放在左侧，面板内三列列表和 Insight 卡片收紧。
  - MDX 注意：列表项里的图标和文字被 Prettier 拆行后，MDX 会把每段包成 `<p>`，导致图标独占一行；用 CSS 把这些 `li p` 设为 inline（见 `.tutela-treatment`、`.tutela-persona-lists`），后续项目同样处理。
  - 2026-11-05 第三轮反馈：Ideation 思维导图、Survey of Patch Designs、按摩示意图、Basic Structure、User Flow 的图都按用户要求缩小（手绘图和表格类图不撑满栏宽，放在浅色面板里限宽 36–46rem；User Flow 图统一 9.5rem 高居中）。
  - 对比表格改为可横向滚动的 HTML 表格（手机上滚动查看），产品图与品牌标签放表头。
  - 其余建议（Key decisions、更完整的测试反馈、Persona 卡片、重画系统图、可运行的小切片、项目排序）尚未批准。

- EchoBloom（2026-11-06，按 PhageX / Tutela 的首屏做法）：
  - 项目有两条分支：PDF 海报（app 原型）和线上互动网页 https://ayla711.github.io/EchoBloom/（p5.js + ml5 Teachable Machine，四种状态 荡漾 Sway / 雀跃 Leap / 律动 Pulse / 放空 Drift）。页面以 PDF 为主体，末尾加 Live demo 章节（用户批准）。
  - 头部副标题改为 “Teaching an app to hear the commute and play it back as music.”，首页卡片 summary 同步改为提到 app 概念和线上 demo 两条分支的版本（2026-11-06 用户选定）；头部信息为 Role / Type / Timeline / Tools；头部封面用 `heroCover: cover-hero.jpg`（用户提供的完整构图，首页卡片仍用放大裁切的 cover.png）；新增 At a glance（Problem / Idea / Build / Outcome），只概括 PDF 与 demo 已有的信息。
  - 左侧导航：Overview / Challenge / Approach / Process / App concept / Live demo（“Approach” 经用户批准）。
  - 海报图标按 PDF 保留（💡、👀、😩、✨ 等）；Prototyping Process 第 5 步改写为 “Tested the rough prototype to decide which functions and UI to design next”（用户批准）；海报上的两个 p5 编辑器链接保留为小标签（Functional Prototype、Visual Prototype）。
  - Live demo 章节：一段说明 + 四种状态图 + “Open live demo ↗” 按钮（新标签打开）+ “Needs a microphone; works best in Chrome.” + 展览照片（用户提供，图注只写画面里的 Pulse 状态）。四种状态图取自 demo 仓库的 webm（自带 alpha 通道，无需抠绿幕），各选一帧导出透明 PNG，放在 demo 自身的背景色上（sketch.js 的 bgColorFor）。
  - 海报图裁切：组合图整体保留；被海报自身元素（箭头、步骤数字、链接文字、说明文字）压到的边缘用背景色涂掉或裁掉；Teachable Machine 图在窗口底边裁切。
  - 资源：`src/assets/projects/echobloom/` 新增 11 张海报图、4 张状态 PNG、exhibition.jpg；`interface-states.png` 删除；App Concept 三屏图用用户提供的高清图 `app-concept.jpg`（海报裁切的 app-screens.jpg 太糊，已删）；`build-process.png` 仍供首页 homeSecondary 使用。

## 8. 视觉与响应式

### 8.1 保留的视觉基础

- 浅色底、深色正文、克制的浅色分隔与个人强调色。
- 个人辨识度由照片、真实介绍和精选项目建立，不靠巨型职业字样。
- 不照搬参考站全部字体、圆角、学术标签或链接下划线。
- 首页统一卡片视觉；项目自身差异主要通过图片与内容表达。
- 禁止大面积深蓝黑背景重新占据首页。
- 无必要不增加动效、3D、滚动劫持或隐藏核心信息的交互。

### 8.2 当前宽度

首页最大宽度为 90rem（默认 1440 px），左侧身份栏为 15rem（默认 240 px），左右区域间距为 3rem（默认 48 px）。这些首页数值不强制重排项目详情页。

空间不足时先将身份栏移到正文上方，再让项目区切成单列，而不是持续缩小文字维持旧宽侧栏。

### 8.3 各屏幕行为

| 场景     | 身份区                     | 内容与导航                                                 |
| -------- | -------------------------- | ---------------------------------------------------------- |
| 宽桌面   | 左侧图片与姓名             | 顶部三导航；右侧 About Me + 两列项目 + Others              |
| 中等屏幕 | 缩窄侧栏或移至正文上方     | 只在卡片仍可读时保留两列，不造成横向溢出                   |
| 手机     | 图片与姓名在上方，正常滚动 | 三导航可访问；About Me 在项目之前；项目单列，随后为 Others |

当前在 60rem 以下将身份区移到正文上方，在 38rem 以下将项目区切换为单列。最终浏览器验收仍需覆盖断点附近与长文本；主体文字保持可读，重要信息不依赖 hover。

### 8.4 图片与可访问性

- 首屏个人图片按新侧栏尺寸生成合适版本，不直接下载大图作为背景。
- 卡片图片优先展示能说明体验的界面或场景，不依靠整张 PDF 分析板里的小字解释项目。
- 图片替代文字与真实内容一致；封面裁切不能切掉关键界面信息。
- 可点击区域支持键盘焦点，当前导航状态不能仅靠颜色表达。
- 合理的标题层级与跳转目标；减少动效设置下内容仍完整。
- 不自动播放声音，详情视频保留控制。

## 9. 更新与维护原则

- 个人名字、图片、介绍与链接从明确的数据入口维护，不在多个组件各写一份。
- Selected Projects 与 Others 都由独立项目 MDX 管理，排序和上下线不依赖手动复制网页。
- `homeSection` 决定进入 projects 或 others，默认 projects；LingGou 设置为 others 并以 `featuredOrder: 90` 排在末尾。`caseStudyType` 决定 design、research、coursework 或 video 详情语义，默认 design，LingGou 保留此默认值和完整详情。Others 的两项作业使用 coursework，定格动画使用 video；video 必须配置有效的 `heroVideo`，不要求 MDX 章节，其他类型字段不会自动改写正文。
- V2 已使用统一卡片，改 `featuredOrder` 即可在各分区内重排，排序值在两个分区间仍全局唯一，不再为每次排序同步两套布局等级。
- **展示与校验迁移已完成**：`presentation`、`home`、`homeSecondary` 兼容保留为可选数据，不再决定卡片面积或被首页强制要求。已有字段和图片没有因此批量删除。
- 删除首页展示不等于删除素材。后三个项目的旧第二图仍可能用于详情正文，清理前必须检查引用。
- 不引入 CMS、客户端路由或新的大型组件系统来完成本次排版调整。
- 简历仍是外部链接，不增加 Resume 中间页面。
- 先使用 GitHub Pages 子路径、后迁移独立域名的计划已完成：网站现直接部署于独立域名 https://yuanqianayla.com/，不再使用 `/portfolio` 子路径。

## 10. 自查清单的处理边界

上一轮已核实的冗余与维护风险保留为待办，不视为已批准的批量清理：

| 项目                         | 本轮处理 / 后续方向                                                           |
| ---------------------------- | ----------------------------------------------------------------------------- |
| 规划中旧新规则重复           | 本文整合为 V2 目标，旧版本只保留简短历史索引                                  |
| 标题数据与组件重复写死       | 首页姓名、可访问名称与页面标题已共用个人资料；继续避免重复来源                |
| Others 数据                  | 已改用项目 MDX 与共用卡片；移除空 others 数组及类型，experience / awards 暂留 |
| 不显示的首页长摘要与二图字段 | 已迁移展示与校验，历史字段暂保留；清理仍需核查详情引用                        |
| 未使用的首页视频功能         | 新卡片直接使用静态图片，不加载旧首页预览组件；旧文件未删除                    |
| PhageX 项目名专属样式判断    | 后续可改为受控设置；不在本轮擅改详情样式                                      |
| 重复 CI 构建                 | 后续合并为完整校验通过后发布，本轮只记录                                      |
| LingGou 重复图片及说明不符   | 核对 `cover.png` / `team.png`；不能把分析板描述为团队合照                     |
| 六份 Phase 验收记录          | 保留为历史记录，不当作 V2 的验收证明，也不删除                                |

## 11. V2 最终验收标准

2026-11-01，本轮完整 `npm run ci` 通过：39 个 Astro 文件零错误、零警告；五个项目内容校验通过；生成七个页面；21 项测试全部通过。浏览器检查覆盖 320、390、768、1024、1280、1440 px，以及 1024 × 600 小高度窗口，无横向溢出；检查了四导航、新旧锚点、详情返回与一个键盘焦点路径。PhageX 嵌入播放器已加载，但未将视频完整播放作为本轮验收内容。项目 MDX、原图片、个人标识和部署配置的文件校验和与修改前一致。

以上保留 2026-11-01 历史验收记录，其中四导航是当时状态，不覆盖 2026-11-02 的 Education 移除。以下清单按当前三导航规范更新：

2026-11-02 移除 Education 后重新运行完整 `npm run ci`：39 个 Astro 文件零错误、零警告，五个项目内容校验通过，生成七个页面，23 项测试全部通过。浏览器确认当前仅保留 About Me、Projects、Others 三个章节且导航目标均存在，五个项目卡片完整；本次未重复全部断点与无障碍发布验收。

上述为研究项目加入前的历史记录。以下 Others 研究改写版结果也属于课程作业原文恢复前的历史验收，不覆盖当前修改：2026-11-02 后续 Others 内容扩展在 MDX、图片对比组件及最后研究头图与手机标题样式调整后已通过最终完整 CI：39 个 Astro 文件零错误、零警告、零提示；七个项目内容校验通过；生成九个页面；24 项测试全部通过。

当时浏览器专项检查确认：1280 与 936 px 下两项 Others 使用与原五项一致的卡片，原五项保持完整；320 px 下首页单列、两项研究详情均无横向溢出。两项研究各五个章节目标均存在；第一项对比区域的两张具名插槽图片、第二项 Findings 图表均实际加载；顶部 Others 与详情返回 Others 已点击验证。

检查中修复了研究 SVG 头图被固有 900 px 高度撑高的问题，恢复真实 16:9 比例；研究详情标题在 320 px 下改用最低 32 px 的窄屏响应式字号，复核页面宽度与视口均为 320 px。上述最后样式修复后的最终 CI 已通过；构建产物也独立确认图片对比组件包含两张实际图片。完整发布前无障碍与正式地址检查仍待完成。

- [x] 左侧不再显示原巨大职业标题，准确显示图片与 `Yuanqian(Ayla) Liu`。
- [x] About Me 是右侧第一个内容章节，项目之后不再重复同一模块。
- [ ] 顶部 About Me、Projects、Others 三项文字、顺序与跳转正确，无残留 Education 入口；旧 about / work 锚点仍兼容。
- [x] 桌面项目区每行两张独立卡片，五个项目均未意外消失。
- [x] PhageX 与 EchoBloom 保留首排顺序，但不延续旧长篇首页模块。
- [x] 现有卡片主要信息直接可见，现有长标题在已测宽度下不溢出。
- [x] 320 px 首页单列且无横向滚动；旧研究版详情无溢出的历史结果不替代当前作业页检查。
- [x] Others 两张卡片与原项目同款，无旧 Draft section 提示；本轮不改变首页卡片。
- [x] 本轮课程作业恢复通过完整 `npm run ci`：40 个 Astro 文件零错误、零警告、零提示，七项内容校验、九页构建、25/25 测试通过。浏览器确认两篇均为 Overview 后接 Original coursework，分别 2 / 19 张图；320 与 1280 px 下 document scrollWidth 均等于视口，无横向溢出。独立复核确认原文无遗漏、21 张图的 SHA-256 与源 PDF 内嵌图逐一一致，渲染 HTML 中无学号。
- [ ] 作业来源、日期说明及原文归属准确；无学号、页眉或公开原 PDF，不把忠实转载等同于独立验证原文的统计或因果结论。
- [x] 五个项目详情及 PhageX 视频均保留，返回链接到正确的 Projects 区域。
- [x] 卡片与导航使用动态内容；测试覆盖不同项目数量、重排、可见性及同名换图。
- [ ] 图片说明、键盘访问、减少动效、根路径（https://yuanqianayla.com/）部署链接通过检查。
- [ ] 仅在实际验收完成且真实内容补齐后，才将整体状态改为“可正式发布”。

## 12. 尚待用户补充与下一步

本轮四项结构要求已经落实，不需要重新确认。当前主要任务是按第 7.1 节逐个把五个设计项目详情页改为基于 PDF 的版本。其余下一步：

1. 对照两份 PDF 核对 Others 的原文完整性，保留现有 Overview，不再改写作业论点；Others 不再是待填空栏目，Education 不恢复。
2. 根据本地预览反馈调整照片裁切、About 文案或卡片密度；不把这些调整误写成四项布局尚未实施。
3. 按第 11 节检查原文单栏阅读、两个章节入口、图片顺序与返回 Others，再完成发布前完整键盘与减少动效复核。
4. 当前版本检查结果已记录；继续复核图片说明与真实发布配置，再由用户决定正式发布。

在真实内容、页面检查和部署配置完成前，本地布局实现不等于发布就绪。

## 13. 版本与历史

| 时间                         | 状态                                                                                                                             | 说明                                                                                                                                                                                                                                                                                |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-08，V1.1–V1.8           | 历史已实施                                                                                                                       | 从统一大模块演进为前二完整、后三紧凑；修复标题、图片和分割线等问题                                                                                                                                                                                                                  |
| 2026-10                      | 现状记录                                                                                                                         | 加入个人照片、姓名旁自选图标、页尾 About 与外部简历；PhageX 详情使用视频                                                                                                                                                                                                            |
| 2026-11-01，V2.0             | 本轮本地检查通过，真实内容待补                                                                                                   | 照片姓名身份栏、About Me 前置、双列项目、四项顶部导航；保留全部详情与旧锚点                                                                                                                                                                                                         |
| 2026-11-02，V2.0 更新        | 按用户要求调整                                                                                                                   | 移除 Education 模块与导航，当前顺序为 About Me、Projects、Others；保留五个项目与详情，待补内容仅 Others                                                                                                                                                                             |
| 2026-11-02，Others 内容扩展  | 最后样式修复后最终本地 CI 与浏览器专项检查通过                                                                                   | 从两份 PDF 整理研究项目，共用原卡片与详情层级；原五个 Selected Projects 不变，Others 不再是待填栏目                                                                                                                                                                                 |
| 2026-11-02，课程作业原文恢复 | 按用户最新要求调整，验收见第 11 节                                                                                               | 首页卡片和 Overview 不变；改用 coursework，后续忠实展示原文、全部原图与参考文献，不再使用研究项目改写叙事                                                                                                                                                                           |
| 2026-11-05，详情页 PDF 改版  | PhageX 已验收（视觉布局和内容），共用做法记录于 7.2；其余四个项目按 7.1 逐个进行                                                 | 五个设计项目详情页按 PDF 内容与视觉风格重建，覆盖五章节模板版；PhageX 头部视频不变；规则见第 7.1 节                                                                                                                                                                                 |
| 2026-11-06，全站检查         | 干净 Linux 副本中 `npm run ci` 全部通过；浏览器检查 7 个页面 × 4 个宽度（1440/1024/768/390）无横向溢出、坏图、死锚点、控制台错误 | 修复：PDF 页章节 `<section id>` 与同名标题自动 id 重复（新增 `src/plugins/rehype-section-heading-ids.mjs`，标题改为 `<id>-title`）；`--color-muted` 改为 #5f6b7f 以过 AA；About Me 手机端学位行换行；项目页底部有上一个和下一个时 “Back to …” 占满整行；清理 astro check 的两条提示 |

详细阶段证据仍保留在现有 `PHASE_A_VERIFICATION.md` 至 `PHASE_E_1_VERIFICATION.md` 中。它们证明的是当时版本，不覆盖本轮新方案。
