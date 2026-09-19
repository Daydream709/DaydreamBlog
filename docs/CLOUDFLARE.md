# Cloudflare Pages 部署指南

本项目已配置为可直接部署到 Cloudflare Pages（免费计划）。

## 一、部署前必改：站点域名

`src/config/siteConfig.ts` 第 9 行：

```ts
siteURL: "https://daydreamblog.pages.dev/", // 以斜杠结尾
```

该值决定 sitemap、robots.txt、RSS/Atom、OG 图片的绝对地址。Cloudflare Pages 的默认域名是
`<项目名>.pages.dev`，项目名在创建时指定 —— 本仓库建议填 `daydreamblog`，则域名为
`https://daydreamblog.pages.dev/`。
**部署成功后请用真实域名核对这一行**，改完 `git push` 会自动重新部署。

## 二、创建 Pages 项目（Git 集成，推荐）

1. 把代码推送到 GitHub 的 `master` 分支（Pages 从仓库构建，未提交的文件不会生效）。
2. 登录 https://dash.cloudflare.com → 左侧 **Workers & Pages** → **Create** → 选 **Pages** 页签
   → **Connect to Git**。
3. 授权 Cloudflare 访问 GitHub，选择 `DaydreamBlog` 仓库 → **Begin setup**。
4. 填写下面的构建配置（与 Astro 官方预设一致）：

| 配置项 | 值 | 说明 |
| --- | --- | --- |
| Project name | `daydreamblog` | 决定默认域名 `daydreamblog.pages.dev` |
| Production branch | `master` | 本仓库默认分支 |
| Framework preset | `Astro` | 会自动填好构建命令与输出目录 |
| Build command | `pnpm build` | `update-anime → astro build → pagefind`（含站内搜索索引） |
| Build output directory | `dist` | Astro 静态产物目录 |
| Root directory | 留空 | 仓库根目录 |

5. （可选）展开 **Environment variables**，按下表添加。
6. 点 **Save and Deploy**，等待首次构建（约 3–6 分钟）。

之后每次 push 到 `master` 都会自动重新构建并发布；PR 会生成预览部署。

## 三、环境变量（Settings → Environment variables）

| 变量名 | 必填 | 说明 |
| --- | --- | --- |
| `NODE_VERSION` | 否 | 固定 Node 版本，如 `22`。仓库已提供 `.nvmrc`，通常无需设置 |
| `BANGUMI_ACCESS_TOKEN` | 否 | Bangumi 访问令牌（拉取隐藏收藏）。**不要**写进代码仓库 |
| `PNPM_VERSION` | 否 | 固定 pnpm 版本，如 `11.5.3`。默认由 `package.json` 的 `packageManager` 决定 |

Cloudflare 会自动注入 `CI=true`、`CF_PAGES=1`、`CF_PAGES_BRANCH`、`CF_PAGES_COMMIT_SHA`、`CF_PAGES_URL`，无需手动配置。

## 四、Node / pnpm 版本说明（重要）

Cloudflare Pages 的 **v3 构建镜像**默认 Node.js `22.16.0`、pnpm `10.11.1`，并且 **不读取 `package.json` 的 `engines` 字段**（官方限制列表明确列出）。
因此：

- Node 版本靠 **`.nvmrc`**（仓库中已添加，内容为 `22`）或 `NODE_VERSION` 环境变量指定；
- pnpm 版本靠 `package.json` 的 `packageManager` 字段 + `.npmrc` 中的 `manage-package-manager-versions = true` 自动切换；
- `.nvmrc` 内容为 `22`，满足 Astro 7 的 `node >= 22.12.0` 要求。

## 五、`public/_headers` 已生效（无需额外配置）

Cloudflare Pages 会解析构建输出目录中的 `_headers` 文件并应用到静态资源响应上，本项目的 `public/_headers` 会被复制到 `dist/`，因此自动生效：

- `/_astro/*`、`/*.woff2`：`max-age=31536000, immutable`（文件名带内容哈希）
- 其它路径：`max-age=3600, must-revalidate` + `X-Frame-Options` / `X-Content-Type-Options` / `Referrer-Policy`
- `/rss.xml`、`/atom.xml`：开放 CORS，方便阅读器订阅

> `/assets/*`、`/images/*` 里的文件**不带哈希**（如横幅图），所以刻意不设 `immutable`，否则你换图后访客浏览器会长期读旧图。

另外，Cloudflare Pages 对 `*.pages.dev` 预览地址会自动加 `X-Robots-Tag: noindex`，预览站不会被搜索引擎收录。

## 六、绑定自定义域名（可选）

Pages 项目 → **Custom domains** → **Set up a custom domain**：

- 子域名（`blog.example.com`）：DNS 添加 `CNAME → <项目名>.pages.dev`
- 裸域名（`example.com`）：DNS 托管在 Cloudflare 时可直接添加，会自动生成记录

绑定后同样要修改 `siteURL` 并重新部署。

## 七、免费额度与限制（2026-09 官方数据）

| 项目 | 免费额度 |
| --- | --- |
| 构建次数 | 500 次/月，同时仅 1 个构建，单次超时 20 分钟 |
| 文件数 | 20,000 个/站点（当前约 470 个） |
| 单文件大小 | 25 MiB（当前最大约 10.5 MB） |
| 自定义域名 | 100 个/项目 |
| 带宽 | 静态资源不计流量费 |
| 预览部署 | 不限数量 |

## 八、常见问题

**构建失败：Node 版本不符**
确认 `.nvmrc` 已提交，或在 Pages 项目里加环境变量 `NODE_VERSION=22`。

**构建失败：lockfile 不同步**
CI 下 pnpm 默认使用 `--frozen-lockfile`。若你改过 `package.json` 的依赖，本地先跑一次 `pnpm install` 并提交 `pnpm-lock.yaml`。

**番剧/书籍页变空**
`scripts/update-bangumi.mjs` 已有保护：拉不到 Bangumi 数据时不会覆盖 `src/data/bangumi-data.json`，而是沿用仓库数据并打印警告。若日志出现该警告且页面为空，说明仓库里的 JSON 本身是空的，需要本地联网跑一次 `pnpm update-anime`。

**构建时间过长**
把 Build command 改为跳过数据拉取（使用仓库中已有数据）：
```
pnpm exec astro build && pnpm exec pagefind --site dist
```

**换了图片/横幅但访客看到旧图**
到 Cloudflare 控制台对应域名 → Caching → Configuration → **Purge Everything**。

**想回滚**
Pages 项目 → **Deployments** → 选择历史部署 → **Rollback**。

## 附：命令行直接上传（不接 Git 时可用的备用方案）

```bash
pnpm build
pnpm dlx wrangler pages deploy dist --project-name=daydreamblog
```

## 附：GitHub Actions

`.github/workflows/deploy.yml`（GitHub Pages）已改为仅手动触发，避免与 Cloudflare Pages 重复构建；
`.github/workflows/lint.yml` 仍会在 push 时执行 Biome 检查、`astro check` 与构建验证。