import fs from "fs/promises";
import path from "path";
import https from "https";
import { fileURLToPath } from "url";
import { SocksProxyAgent } from "socks-proxy-agent";

const API_BASE = "https://api.bgm.tv";
const SOCKS_PROXY = process.env.SOCKS_PROXY || "";

let socksAgent = null;
if (SOCKS_PROXY) {
	socksAgent = new SocksProxyAgent(SOCKS_PROXY);
	console.log(`Using proxy: ${SOCKS_PROXY}`);
}

function httpsFetch(url, options = {}) {
	return new Promise((resolve, reject) => {
		const req = https.get(
			url,
			{
				agent: socksAgent,
				headers: {
					"User-Agent": "Mizuki-Blog/1.0 (https://github.com/LyraVoid/Mizuki)",
					"Content-Type": "application/json",
					...options.headers,
				},
			},
			(res) => {
				res.setEncoding("utf-8");
				const chunks = [];
				res.on("data", (chunk) => chunks.push(chunk));
				res.on("end", () => {
					const data = chunks.join("");
					if (!res.statusCode || res.statusCode >= 400) {
						reject(new Error(`API Error ${res.statusCode}: ${data.substring(0, 200)}`));
					} else {
						try {
							resolve(JSON.parse(data));
						} catch {
							resolve(data);
						}
					}
				});
			},
		);
		req.on("error", reject);
	});
}

const CONFIG_PATH = path.join(
	path.dirname(fileURLToPath(import.meta.url)),
	"../src/config/siteConfig.ts",
);
const OUTPUT_FILE = path.join(
	path.dirname(fileURLToPath(import.meta.url)),
	"../src/data/bangumi-data.json",
);

async function getUserIdFromConfig() {
	try {
		const configContent = await fs.readFile(CONFIG_PATH, "utf-8");
		const match = configContent.match(
			/bangumi:\s*\{[\s\S]*?userId:\s*["']([^"']+)["']/,
		);

		if (match && match[1]) {
			const userId = match[1];
			if (
				userId === "your-bangumi-id" ||
				userId === "your-user-id" ||
				!userId
			) {
				console.warn(
					"Warning: userId in src/config/siteConfig.ts appears to be a default value.",
				);
				return userId;
			}
			return userId;
		}
		throw new Error("Could not find bangumi.userId in config/siteConfig.ts");
	} catch (error) {
		console.error("✘ Failed to read Bangumi ID from config/siteConfig.ts");
		throw error;
	}
}

async function getAnimeModeFromConfig() {
	try {
		const configContent = await fs.readFile(CONFIG_PATH, "utf-8");
		const match = configContent.match(
			/anime:\s*\{[\s\S]*?mode:\s*["']([^"']+)["']/,
		);

		if (match && match[1]) {
			return match[1];
		}
		return "bangumi";
	} catch (error) {
		return "bangumi";
	}
}

async function getAccessTokenFromConfig() {
	// 优先读取环境变量，避免把 Access Token 明文提交到仓库
	if (process.env.BANGUMI_ACCESS_TOKEN) {
		return process.env.BANGUMI_ACCESS_TOKEN;
	}
	try {
		const configContent = await fs.readFile(CONFIG_PATH, "utf-8");
		const match = configContent.match(
			/bangumi:\s*\{[\s\S]*?accessToken:\s*["']([^"']*)["']/,
		);

		if (match && match[1]) {
			return match[1];
		}
		return "";
	} catch (error) {
		return "";
	}
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchSubjectDetail(subjectId, accessToken) {
	try {
		const headers = {};
		if (accessToken) {
			headers["Authorization"] = `Bearer ${accessToken}`;
		}
		return await httpsFetch(`${API_BASE}/v0/subjects/${subjectId}`, { headers });
	} catch (error) {
		return null;
	}
}

function getStudioFromInfobox(infobox) {
	if (!Array.isArray(infobox)) return "Unknown";

	const targetKeys = ["动画制作", "制作", "製作", "开发"];

	for (const key of targetKeys) {
		const item = infobox.find((i) => i.key === key);
		if (item) {
			if (typeof item.value === "string") {
				return item.value;
			}
			if (Array.isArray(item.value)) {
				const validItem = item.value.find((v) => v.v);
				if (validItem) return validItem.v;
			}
		}
	}
	return "Unknown";
}

async function fetchCollection(userId, type, accessToken) {
	let allData = [];
	let offset = 0;
	const limit = 50;
	let hasMore = true;

	console.log(`Fetching type: ${type}...`);

	while (hasMore) {
		const url = `${API_BASE}/v0/users/${userId}/collections?subject_type=2&type=${type}&limit=${limit}&offset=${offset}`;
		try {
			const headers = {};
			if (accessToken) {
				headers["Authorization"] = `Bearer ${accessToken}`;
			}

			const data = await httpsFetch(url, { headers });

			if (data.data && data.data.length > 0) {
				allData = [...allData, ...data.data];
				process.stdout.write(
					`   Fetched ${allData.length} records...\r`,
				);
			}

			if (!data.data || data.data.length < limit) {
				hasMore = false;
			} else {
				offset += limit;
				await delay(300);
			}
		} catch (e) {
			console.log(`\n  ${e.message}`);
			hasMore = false;
		}
	}
	console.log("");
	return allData;
}

async function processData(items, status, accessToken) {
	const results = [];
	let count = 0;
	const total = items.length;

	for (const item of items) {
		count++;
		process.stdout.write(
			`[${status}] Processing progress: ${count}/${total} (${item.subject_id})\r`,
		);

		const subjectDetail = await fetchSubjectDetail(
			item.subject_id,
			accessToken,
		);
		await delay(150);

		const year = item.subject?.date
			? item.subject.date.slice(0, 4)
			: "Unknown";

		const rating = item.rate
			? Number.parseFloat(item.rate.toFixed(1))
			: item.subject?.score
				? Number.parseFloat(item.subject.score.toFixed(1))
				: 0;

		const progress = item.ep_status || 0;
		const totalEpisodes = item.subject?.eps || progress;

		const studio = subjectDetail
			? getStudioFromInfobox(subjectDetail.infobox)
			: "Unknown";

		const description = (
			subjectDetail?.summary ||
			item.subject?.short_summary ||
			item.subject?.name_cn ||
			""
		).trimStart();

		results.push({
			id: item.subject?.id || 0,
			title:
				item.subject?.name_cn || item.subject?.name || "Unknown Title",
			status: status,
			rating: rating,
			cover: item.subject?.images?.medium || "/assets/anime/default.webp",
			description: description,
			episodes: `${totalEpisodes} episodes`,
			year: year,
			genre: item.tags ? item.tags : ["Unknown"],
			studio: studio,
			link: item.subject?.id
				? `https://bgm.tv/subject/${item.subject.id}`
				: "#",
			progress: progress,
			totalEpisodes: totalEpisodes,
			startDate: item.subject?.date || "",
			endDate: item.subject?.date || "",
			comment: item.comment || "",
		});
	}
	console.log(`\n✓ Completed ${status} list processing`);
	return results;
}

async function main() {
	console.log("Initializing Bangumi data update script...");

	const animeMode = await getAnimeModeFromConfig();
	if (animeMode !== "bangumi") {
		console.log(
			`Detected current anime mode is "${animeMode}", skipping Bangumi data update.`,
		);
		return;
	}

	const USER_ID = await getUserIdFromConfig();
	const ACCESS_TOKEN = await getAccessTokenFromConfig();
	console.log(`Read User ID: ${USER_ID}`);
	if (ACCESS_TOKEN) {
		console.log(`Access Token: ${ACCESS_TOKEN.substring(0, 10)}...`);
	} else {
		console.log(`No Access Token configured, using public API only.`);
	}

	const collections = [
		{ type: 3, status: "watching" },
		{ type: 1, status: "planned" },
		{ type: 2, status: "completed" },
		{ type: 4, status: "onhold" },
		{ type: 5, status: "dropped" },
	];

	let finalAnimeList = [];

	for (const c of collections) {
		const rawData = await fetchCollection(USER_ID, c.type, ACCESS_TOKEN);
		if (rawData.length > 0) {
			const processed = await processData(
				rawData,
				c.status,
				ACCESS_TOKEN,
			);
			finalAnimeList = [...finalAnimeList, ...processed];
		}
	}

	const dir = path.dirname(OUTPUT_FILE);
	try {
		await fs.access(dir);
	} catch {
		await fs.mkdir(dir, { recursive: true });
	}

	// 云构建（Vercel/CI）网络受限时 fetchCollection 会静默失败并返回空数组，
	// 此时保留仓库里已有的数据文件，避免把番剧/书籍页清空。
	if (finalAnimeList.length === 0) {
		let hasExistingData = false;
		try {
			const existing = JSON.parse(await fs.readFile(OUTPUT_FILE, "utf-8"));
			hasExistingData = Array.isArray(existing) && existing.length > 0;
		} catch {
			hasExistingData = false;
		}
		if (hasExistingData) {
			console.warn(
				"⚠ No data fetched (network blocked or API error). Keeping existing bangumi-data.json unchanged.",
			);
			return;
		}
	}

	await fs.writeFile(OUTPUT_FILE, JSON.stringify(finalAnimeList, null, 2));
	console.log(`\nUpdate complete! Data saved to: ${OUTPUT_FILE}`);
	console.log(`Total collected: ${finalAnimeList.length} anime series`);
}

main().catch((err) => {
	console.error("\n✘ Script execution error:");
	console.error(err);
	process.exit(1);
});
