import React, { Component } from 'react';
import Home from "./containers/Home";
class App extends Component {
    render() {
        return (
            <div className="baller-stats mh4-ns mh2">
                <div className="flex items-center justify-center pa3 o-80">
                    <i className="fas fa-basketball-ball mr2 orange f3"></i><span className="f3">Baller Stats</span>
                </div>
                <Home />
            </div>
        );
    }
} 

export default App;
