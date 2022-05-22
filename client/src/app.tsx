import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

export default class App {
  
  static AppComponent: () => JSX.Element = () => {
    return (
      <React.StrictMode>
         <Router>     
            <Header/>
            <Switch>
                <Route exact path="/">
                    <GlobalNavigation/>
                    <HeroSection/>
                    <SectionSeparator/>
                    <About/>
                    <Skills/>
                    <Work/>
                    <Contact/>
                </Route>
                <Route exact path="/admin">
                    <Admin/>
                </Route>
            </Switch>
            <Footer/>
        </Router>
      </React.StrictMode>
      )
  }
}

