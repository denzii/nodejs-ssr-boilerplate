import { Router, Request, Response } from 'express';
import { autoInjectable } from 'tsyringe';

@autoInjectable()
export default class IndexController {
	router: Router;

	constructor() {
		this.router = Router();
	}

	public Router = () => {
		this.router.get('/', this.index);

		return this.router;
	}

	private index = (req: Request, res: Response) => res
		.status(200)
		.send({ Message: 'Welcome to Express API w/ express.js' });
}
