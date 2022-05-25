import "reflect-metadata";
import express, { Application as ExpressApplication } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import {  container, Lifecycle, scoped } from "tsyringe";
import http from 'http';
import stoppable from "stoppable"

import ApiIndexController from "./controller/api/index";
import IndexController from "./controller/app/index";
import Environment from "./helper/environment";
import ServerHelper from "./helper/server";
import { Socket } from "net";

interface IProgram {
	__dirname: string;
	clientBundlePath: string;
	asseticPath: string;
	server: stoppable.WithStop & http.Server;
	app: ExpressApplication;
	env: string;
	sockets: Set<Socket>;
}

@scoped(Lifecycle.ResolutionScoped)
export default class Program implements IProgram {
	public __dirname: string;
	public clientBundlePath: string;
	public asseticPath: string;
	public server: stoppable.WithStop & http.Server;
	readonly app: ExpressApplication;
	readonly env: string;
	readonly sockets: Set<Socket>;	

	constructor() {
		this.__dirname = Environment.getDirname(import.meta.url);
		this.clientBundlePath =  path.join(this.__dirname, '../www');
		this.asseticPath = path.join(this.__dirname, "../public");
		this.app = express();
		this.server = stoppable(http.createServer(this.app));
		this.env = String(process.env.NODE_ENV).toLowerCase();
		this.sockets = new Set<Socket>();
	}

	registerMiddleware: () => Program = () => {
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: false }));
		this.app.use(cookieParser());
		this.app.use(cors());
		
		return this;
	}

	registerStaticAssets: () => Program = () => {
		const serveOptions = {
			dotfiles: 'ignore',
			etag: false,
			extensions: ["html, htm"],
			index: false,
			redirect: false,
			setHeaders: (res: any, path: any, stat: any) => {
				res.set("X-Content-Type-Options", "nosniff");
				res.set('Cache-Control', 'no-store');
			}
		}

		this.app.use(express.static("www", serveOptions));
		this.app.use(express.static("public", serveOptions));
		this.app.disable("view cache");

		console.log(`All assets registered using paths: ${this.clientBundlePath} & ${this.asseticPath}`);

		return this;
	}

	registerRoutes: () => Program = () => {
		// api endpoints
		this.app.use("/api", container.resolve(ApiIndexController).Router());

		// render root
		this.app.use("/", container.resolve(IndexController).Router());
		
		console.log(`Registered All routes.`);

		return this;
	}

	registerAppEvents: () => Program = () => {
		//unhandled promise rejections notifier
		process.on('unhandledRejection', (reason, p) => {
			console.error('Unhandled Rejection at: ', p, 'reason:', reason);
			throw new Error();
		});

		//teardown connections on ctrl+c
		process.on('SIGINT', () => {
			if (this.server.listening) {
				this.EnvTeardown();
			}
		});

		this.server.on('connection', (socket) => {
			this.sockets.add(socket);
		
			this.server.once('close', () => {
				console.log("Closing all connected sockets");
				this.sockets.forEach(function(value) {
					value.destroy();
				})			
			});
		});

		return this;
	}

	async StartServer() {
		// express server setup. ?????????????
		const port: number = Number(process.env.PORT);
		const hostname: string = String(process.env.HOST);
		
		if(!await ServerHelper.ensurePortFree(port)){
			throw new Error("supplied port is already in use.");
		}

		this.server.on('error', error => ServerHelper.serverOnError.bind(this, error, port));
		this.server.on('listening', ServerHelper.serverOnListen.bind(this, port));
		
		this.server = this.server.listen(port, hostname, () => {
			process.send && process.send({event:"online" }) && console.log("Browser refresh server is online and listening on port: " + port); 
			var patterns = '*.css *.less *.styl *.scss *.sass *.png *.jpeg *.jpg *.gif *.webp *.svg';
			require('lasso/browser-refresh').enable(patterns);
		});
	}

	async EnvTeardown() {
		try {

			this.server.close();
			this.server.stop();
			
			console.log("All active handles have (hopefully) been killed. Gracefully exiting in 2 seconds.");
			await Environment.sleep(2000);

		} catch (e: any) {
			console.error(`things went wrong tearing down the app. here is your exception: ${e}`);
		}
	}
}


