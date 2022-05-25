import React from 'react';
// import "../../style/app.scss";
import Helmet, { HelmetData } from 'react-helmet';
import ReactDOMServer from "react-dom/server";

export default class App {
  static Component: () => JSX.Element = () => {
    return <>
        <React.StrictMode>
        <html lang="en">
          {/*@ts-ignore Helmet is valid jsx but something with the package itself is causing an error*/}
          <Helmet>
          <meta charSet="utf-8" />
            <link rel="stylesheet" type="text/css" href="/main.css"></link>
            <link rel="icon" href="/favicon.ico" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#000000" />
            <meta
              name="description"
              content="Web site created using sinda-nodejs-ssr-boilerplate"
            />
            <link rel="apple-touch-icon" href="/logo192.png" />
           
            <link rel="manifest" href="/manifest.json" />
           
            <title>React App</title>
          </Helmet>
          <body>
            <noscript>You need to enable JavaScript to run this app.</noscript>
            <div id="app"> 
              <div>Hello World</div>
          </div>
            <script type="application/javascript" src="/main.js"></script> 
            <script src={`${process.env.BROWSER_REFRESH_URL}`}></script>
         </body>
        </html>
      </React.StrictMode>
    </>
  }
  static ToString: () => string = () => ReactDOMServer.renderToString(<App.Component/>);
  static GetHead: () => HelmetData = () => Helmet.renderStatic();
}