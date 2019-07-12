import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Game from "./Game";
import EnhancedTable from "./Table";
import GaaSMonitoringFlowTable from "./GaaSMonitoringFlowTable"
import {BrowserRouter, Route, Switch} from "react-router-dom";
import GaaSMonitoringJobTable from "./GaaSMonitoringJobTable";

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
            <Route path='/play' component={GaaSMonitoringFlowTable} />
            <Route path='/react' component={EnhancedTable} />
            <Route path='/:flowGroup/:flowName/:flowExecId' component={JobTable} />
            <Route component={NoMatch}/>
        </Switch>
    </div>
    </BrowserRouter>
    ,
    document.getElementById('root'));
serviceWorker.register();


function JobTable({match}) {
    return (
        <GaaSMonitoringJobTable flowGroup={match.params.flowGroup} flowName={match.params.flowName}
                                flowExecId={match.params.flowExecId}/>
    );
}
