import React, {Component} from 'react';
import {
    BrowserRouter as Router, Route, Link
} from 'react-router-dom';

import reactLogo from './images/react.svg';
import playLogo from './images/play.svg';
import javaLogo from './images/java.webp';
import Client from "./Client";
import Game from './Game';

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
        Client.getSummary(summary => {
            this.setState({
                title: summary.content,
            });
        });

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
                    <h1>Welcome to {this.state.title} on {this.state.date}!</h1>
                    <nav>
                        <a href="java">
                            <img width="400" height="400" src={javaLogo} alt="Java Logo"/>
                        </a>
                        <Link to="play">
                            <img width="400" height="400" src={playLogo} alt="Play Framework Logo"/>
                        </Link>
                        <Link to="react">
                            <img width="400" height="400" src={reactLogo} className="App-logo" alt="React Logo"/>
                        </Link>
                    </nav>
                    {/*<Route path="/java" component={Game}/>*/}
                    {/*<Route path="/:technology" component={Tech} />*/}
                    <div>
                        <h2>Check out the project on GitHub for more information</h2>
                        <h3>
                            <a target="_blank" rel="noopener noreferrer"
                               href="https://github.com/yohangz/java-play-react-seed">
                                java-play-react-seed
                            </a>
                        </h3>
                    </div>
                </div>
            </Router>);
    }
}

export default App;
