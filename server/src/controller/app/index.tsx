import { PrismaClient } from '@prisma/client';
import { Router, Request, Response } from 'express';
import { autoInjectable } from 'tsyringe';
import View from '../../view';

@autoInjectable()
export default class IndexController {
	router: Router;

	constructor() {
		this.router = Router();
	}

	public Router = async() => {

		this.router.get('/', await this.index);
		
		return this.router;
	}

	private index = async(req: Request, res: Response) => {
		const prisma = new PrismaClient();

		res.status(200)
		.send(View("index", await prisma.author.findMany()));
	}
}
