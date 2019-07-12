import React, {Component} from 'react';
import {
    BrowserRouter as Router, Route, Link
} from 'react-router-dom';

import reactLogo from './images/react.svg';
import playLogo from './images/play.svg';
import javaLogo from './images/java.webp';
import Client from "./Client";

import './App.css';

const Tech = ({match}) => {
    return <div>Current Route: {match.params.technology}</div>
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {title: ''};
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => Client.getDate(summary => {
                this.setState({
                    date: summary.date,
                });
            }),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        return (<Router>
                <div className="App">
                    <h1>Welcome to GaaS Integration Service Console on {this.state.date}!</h1>
                    <nav>
                        <a href="/java">
                            <img width="400" height="400" src={javaLogo} alt="Java Logo"/>
                        </a>
                        <a href="/play">
                            <img width="400" height="400" src={playLogo} alt="Play Framework Logo"/>
                        </a>
                        <a href="react">
                            <img width="400" height="400" src={reactLogo} className="App-logo" alt="React Logo"/>
                        </a>
                    </nav>
                </div>
            </Router>);
    }
}

export default App;
