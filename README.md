# SleepyHorrorWilliam 小说站

基于 Next.js + Supabase 的中文小说网站。

本项目当前支持：书架浏览、小说目录、按分卷展示章节、正文阅读、阅读参数调整（字号/行距）、版权与同人政策页面。

## 线上与定位

- 代码仓库：`sleepyhorrorwilliam.github.io`
- 推荐部署：Vercel（保留动态路由与 Supabase 实时数据能力）
- 不推荐将当前动态版本直接按 GitHub Pages 纯静态托管

## 功能概览

- 书架页：展示小说列表与封面
- 目录页：按卷分组展示章节（支持无分卷兜底）
- 阅读页：
  - 章节正文阅读
  - 上一章 / 下一章导航
  - 设置面板：可调字号与行距
- 法律页：
  - 版权声明（All Rights Reserved）
  - 同人二创政策（非商业）

## 技术栈

- Next.js 16（App Router）
- React 19
- TypeScript
- Tailwind CSS 4
- Supabase（数据库）

## 主要目录

```txt
app/
  page.tsx                          # 书架页
  novel/[id]/page.tsx               # 小说目录页（按分卷）
  novel/[id]/read/[num]/page.tsx    # 正文阅读页
  copyright/page.tsx                # 版权声明页
  fanworks-policy/page.tsx          # 同人二创政策页
lib/
  supabase.ts                       # Supabase 客户端
```

## 本地开发

### 1) 安装依赖

```bash
npm install
```

### 2) 配置环境变量

复制 `.env.example` 为 `.env.local`，并填入你的 Supabase 公共配置：

```bash
# Windows PowerShell
copy .env.example .env.local
```

`.env.local` 需要至少包含：

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
```

### 3) 启动开发环境

```bash
npm run dev
```

访问 <http://localhost:3000>

### 4) 生产构建检查

```bash
npm run build
```

## Supabase 数据建议

建议使用三张表：

- `novels`：小说信息（含 `cover_url`）
- `volumes`：分卷信息（`novel_id`、`title`、`volume_order`）
- `chapters`：章节信息（`novel_id`、`volume_id`、`chapter_number`、`title`、`content`）

说明：

- 目录页优先按 `volume_id` 分组渲染
- 未绑定卷的章节会归入“未分卷”或兜底目录

## 部署（Vercel）

1. 在 Vercel 导入 GitHub 仓库
2. Root Directory 选择项目根目录（即当前仓库）
3. 配置环境变量：
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
4. 点击 Deploy

后续每次 push 到主分支会自动触发部署。

## 安全说明

- `.env.local`、`.next`、`node_modules` 已在 `.gitignore` 中忽略
- 请勿提交任何 Supabase Secret / service_role 密钥
- 推荐仅在前端使用 publishable key，并结合 RLS 控制数据访问

## 版权与二创

- 默认版权：All Rights Reserved
- 同人规则：允许非商业同人，商业用途需书面授权

详见：

- `LICENSE.txt`
- `FANWORKS_POLICY.md`

---

如果你用于长期连载，建议尽快补充：

- 自动备份策略（Supabase）
- 内容审核与日志策略
- 章节发布工作流（草稿/发布状态）
