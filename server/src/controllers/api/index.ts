import { Router, Request, Response } from 'express';
import { autoInjectable } from 'tsyringe';

@autoInjectable()
export default class IndexController {
	router: Router;

	constructor() {
		this.router = Router();
	}

	public getRouter = () => {
		this.router.get('/', function (req: Request, res: Response) {
			return res.status(200).send({ Message: 'Welcome to portfolio API w/ express.js' });
		});

		return this.router;
	}
}
