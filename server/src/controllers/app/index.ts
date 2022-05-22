import { Router, Request, Response } from 'express';
import { autoInjectable } from 'tsyringe';
import ReactDOMServer from 'react-dom/server';
import App from '../../models/View/App';

@autoInjectable()
export default class IndexController {
	router: Router;

	constructor() {
		this.router = Router();
	}

	public getRouter = () => {
		this.router.get('/', function (req: Request, res: Response) {
			res.send(ReactDOMServer.renderToString(App.Component()));  
		});

		return this.router;
	}
}
