import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Game from "./Game";
import {BrowserRouter, Route, Switch} from "react-router-dom";

function NoMatch({ location }) {
    return (
        <div>
            <h3>
                No match for <code>{location.pathname}</code>
            </h3>
        </div>
    );
}

ReactDOM.render(
    <BrowserRouter>
    <div>
        <Switch>
            <Route exact path='/' component={App} />
            <Route path='/java' component={Game} />
            <Route component={NoMatch}/>
        </Switch>
    </div>
    </BrowserRouter>
    ,
    document.getElementById('root'));
serviceWorker.register();
