import React from "react"
import ReactDOM from "react-dom/client";
import { container } from "tsyringe"
import App from "isomorphic/model/view/App"

ReactDOM.hydrateRoot(document, < App.Component/> );