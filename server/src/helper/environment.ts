import path from "path";

export default class Environment {
	static getFileName: (metaUrl: string) => string = (metaUrl) => path.basename(metaUrl.replace("file:///", ""));
	static getDirname: (metaUrl: string) => string = (metaUrl) =>   path.dirname(metaUrl.replace("file:///", ""));

	static isProd: () => boolean = () => String(process.env.NODE_ENV).toLowerCase() == "production";
	static isDev: () => boolean = () =>  String(process.env.NODE_ENV).toLowerCase() == "development";
	
	static sleep: (ms: number) => Promise<void> = (ms: number) =>  new Promise(resolve => setTimeout(resolve, ms));
	
	// static get NODE_ENVS(): string[]  {
	// 	return ["development", "production", "test"];
	// };
}