import fs from "node:fs";
import path from "node:path";

import localBookList from "../data/book";
import I18nKey from "../i18n/i18nKey";
import { i18n } from "../i18n/translation";

export interface BookItem {
	id: number;
	title: string;
	cover: string;
	link: string;
	status: string;
	rating: number;
	progress: number;
	totalPages: number;
	description: string;
	year: string;
	author: string;
	genre: string[];
}

export type BookSourceConfig =
	| { type: "local"; data: BookItem[] }
	| {
			type: "json";
			filename: string;
			fetchOnDev?: boolean;
			emptyDescription?: string;
	  };

export function loadBookData(filename: string): BookItem[] {
	const dataPath = path.join(process.cwd(), `src/data/${filename}`);

	if (!fs.existsSync(dataPath)) {
		console.warn(`[Book] Data file not found: ${dataPath}`);
		return [];
	}

	try {
		const fileContent = fs.readFileSync(dataPath, "utf-8");
		const rawData = JSON.parse(fileContent) as any[];

		return rawData.map((item) => ({
			id: item.id || 0,
			title: item.title || "Unknown",
			cover: item.cover || "",
			link: item.link || "",
			status: item.status || "planned",
			rating: Number(item.rating) || 0,
			progress: Number(item.progress) || 0,
			totalPages: Number(item.totalPages) || 0,
			description: item.description || "",
			year: item.year || "",
			author: item.author || "",
			genre: Array.isArray(item.genre) ? item.genre : [],
		}));
	} catch (error) {
		console.error(`[Book] Failed to parse ${filename}:`, error);
		return [];
	}
}

export function getBookSourceConfigs(): Record<string, BookSourceConfig> {
	return {
		local: {
			type: "local",
			data: localBookList,
		},
		bangumi: {
			type: "json",
			filename: "book-data.json",
			fetchOnDev: true,
			emptyDescription: i18n(I18nKey.bookEmptyBangumi),
		},
	};
}

export function getBookList(
	mode: string,
	sourceConfigs: Record<string, BookSourceConfig>,
): { bookList: BookItem[]; currentConfig: BookSourceConfig | undefined } {
	let bookList: BookItem[] = [];
	const currentConfig = sourceConfigs[mode];

	if (currentConfig) {
		if (currentConfig.type === "local") {
			bookList = currentConfig.data;
		} else if (currentConfig.type === "json") {
			const isDev = import.meta.env.DEV;
			const shouldFetchOnDev = currentConfig.fetchOnDev ?? false;
			const skipLoad = isDev && !shouldFetchOnDev;

			if (skipLoad) {
				console.log(`[Dev] Skipping ${mode} data load (fetchOnDev is off).`);
				bookList = [];
			} else {
				bookList = loadBookData(currentConfig.filename);
			}
		}
	} else {
		console.warn(`[Book] Unknown or unconfigured mode: ${mode}`);
	}

	return { bookList, currentConfig };
}

export function getBookStatusMap(): Record<
	string,
	{ text: string; class: string; icon: string }
> {
	return {
		reading: {
			text: i18n(I18nKey.bookStatusReading),
			class:
				"bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
			icon: "📖",
		},
		completed: {
			text: i18n(I18nKey.bookStatusCompleted),
			class: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
			icon: "✓",
		},
		planned: {
			text: i18n(I18nKey.bookStatusPlanned),
			class:
				"bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
			icon: "❤",
		},
		onhold: {
			text: i18n(I18nKey.bookStatusOnHold),
			class:
				"bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
			icon: "⏸",
		},
		dropped: {
			text: i18n(I18nKey.bookStatusDropped),
			class: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
			icon: "✗",
		},
	};
}
