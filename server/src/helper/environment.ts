import path from "path";

export default class Environment {

	static getFileName: (metaUrl: string) => string = 
	(metaUrl) => {
		return path.basename(metaUrl.replace("file:///", ""));
	}

	static getDirname: (metaUrl: string) => string = 
	(metaUrl) => {
		return  path.dirname(metaUrl.replace("file:///", ""));
	}

	static get NODE_ENVS(): string[]  {
		return ["development", "production", "test"];
	};

	static isProd: () => boolean = 
	() => {
		return String(process.env.NODE_ENV).toLowerCase() == "production";
	}

	static isDev: () => boolean = 
	() => {
		return String(process.env.NODE_ENV).toLowerCase() == "development";
	}

	static sleep: (ms: number) => Promise<void> = 
	(ms: number) => {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
}