"use strict";

import portfinder from "portfinder";
import stoppable from "stoppable";
import http from 'http';

export default class ServerHelper {
	static ensurePortFreeAsync: (port: number) => Promise<boolean> = 
	async (port: number): Promise<boolean> => {
		try {
			const availablePort = await portfinder.getPortPromise({port: port, host: process.env.HOST});

			return availablePort != undefined && availablePort == port;
		} catch(e: any){
			return false;
		};
	};
	
	static adjustPortAsync: (port: number) =>  Promise<number> = async(port) => { 
		 const isFree = await this.ensurePortFreeAsync(port);

		if (!isFree) {
			return port + 1;
		} else{
			return port;
		}
	}
	static connect = (server: stoppable.WithStop & http.Server, port: number, hostname: string) => {
		console.info("Attempting to listen on port: " + String(port));
		server.on('error', error => ServerHelper.serverOnError.bind(this, error, port));
		server.on('listening', ServerHelper.serverOnListen.bind(this, port));
		
		server.listen(port, hostname, () => {
			process.send 
			&& process.send({event:"online" }) 
			&& console.info("Browser refresh server is online and listening on port: " + port); 
			require('lasso/browser-refresh')
			.enable('*.css *.less *.styl *.scss *.sass *.png *.jpeg *.jpg *.gif *.webp *.svg');
		});
	}

	static serverOnError: (error: NodeJS.ErrnoException, port: number) => void =
	(error: NodeJS.ErrnoException, port: number) => {
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
		console.log('Express server is now ready and Listening on port ' + String(port));
	}
}
