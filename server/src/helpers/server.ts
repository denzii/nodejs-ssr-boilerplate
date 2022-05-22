"use strict";

import portfinder from "portfinder";

export default class ServerHelper {
	static ensurePortFree: (port: number) => Promise<boolean> = 
	async (port: number): Promise<boolean> => {
		try {
			console.log("Attempting to listen on port: " + String(port));
			const availablePort = await portfinder.getPortPromise({port: port, host: process.env.HOST});

			return availablePort != undefined && availablePort == port;
		} catch(e: any){
			console.error(`Port ${port} is busy.`);

			return false;
		};
	};

	static serverOnError: (error: NodeJS.ErrnoException, port: number) => void = (error: NodeJS.ErrnoException, port: number) => {
		if (error.syscall !== 'listen') {
			throw error;
		}
		// handle specific listen errors with friendly messages
		switch (error.code) {
			case 'EACCES':
				console.error(`port ${String(port)} requires elevated privileges`);
				process.exit(1);
			case 'EADDRINUSE':
				console.error(`port ${String(port)} is already in use`);
				process.exit(1);
			default:
				throw error;
		}
	};

	static serverOnListen: (port: number) => void = (port) => {
		console.log('Now Listening on port ' + String(port));
	}
}
