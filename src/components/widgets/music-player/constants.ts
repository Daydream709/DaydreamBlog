import type { Song } from "./types";

export const STORAGE_KEY_VOLUME = "music-player-volume";

export const DEFAULT_VOLUME = 0.7;

/**
 * 本地播放列表（仅在 musicConfig.mode = "local" 时使用）
 *
 * 默认留空：本站使用 "meting" 远程 API 模式，不打包本地音频
 * （避免把 mp3 提交进仓库：体积大且涉及音乐版权）。
 *
 * 如需本地播放，把自己的文件放到：
 *   public/assets/music/url/<文件名>.mp3
 *   public/assets/music/cover/<文件名>.webp
 * 然后按下面的格式添加条目（路径不要以 / 开头，运行时会自动补 base 前缀；
 * duration 填 0 表示交给播放器自动读取时长）：
 *   {
 *     id: 1,
 *     title: "曲名",
 *     artist: "艺术家",
 *     cover: "assets/music/cover/example.webp",
 *     url: "assets/music/url/example.mp3",
 *     duration: 0,
 *   },
 */
export const LOCAL_PLAYLIST: Song[] = [];

// 播放器初始状态（歌单加载完成前、或歌单为空时显示的内容）
export const DEFAULT_SONG: Song = {
	title: "Daydream 的歌单",
	artist: "点击播放按钮开始",
	cover: "/favicon/D.ico",
	url: "",
	duration: 0,
	id: 0,
};

export const DEFAULT_METING_API =
	"https://www.bilibili.uno/api?server=:server&type=:type&id=:id&auth=:auth&r=:r";
export const DEFAULT_METING_ID = "14164869977";
export const DEFAULT_METING_SERVER = "netease";
export const DEFAULT_METING_TYPE = "playlist";

export const ERROR_DISPLAY_DURATION = 3000;
export const SKIP_ERROR_DELAY = 1000;
