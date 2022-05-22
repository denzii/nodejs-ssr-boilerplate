"use strict";
import "reflect-metadata";
import Program from "./program";

const program = new Program()
.registerMiddleware()
.registerStaticAssets();

program.registerRoutes()
	   .registerAppEvents()
	   .StartServer();
