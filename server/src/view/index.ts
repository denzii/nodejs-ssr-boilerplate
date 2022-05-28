import { Helmet, HelmetData } from "react-helmet";
import App from '../../../isomorphic/model/view/App';
import { AppViews } from "../model/appViews";

const View = (key: string, data: any) => {
    const Views: AppViews = {
        index: () => {
            const app : string = App.ToString(data); 
            const head: HelmetData = App.GetHead();
             
            return`
            <!DOCTYPE html> 
                    <head>
                        ${head.title.toString()}
                        ${head.meta.toString()}
                        ${head.link.toString()}
                    </head>
                    ${app}
            `; 
        }
    }

    return Views[key]();
}

export default View;