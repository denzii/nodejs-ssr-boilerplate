import { Router, Request, Response } from 'express';
import { autoInjectable } from 'tsyringe';
import View from '../../view';

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
		.send(View("index"));
}
