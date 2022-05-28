"use strict";
import "reflect-metadata";
import Program from "./program";

const program = new Program()
.registerMiddleware()
.registerStaticAssets();

(await program.registerRoutes())
			  .registerAppEvents()
	   		  .MigrateDatabase()
	   		  .StartServer();
