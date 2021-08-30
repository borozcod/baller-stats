import React, { Component } from 'react';

// import Card  from "./../components/card/Card";
import Table  from "./../components/table/Table";
import Graph  from "./../components/graph/Graph";
// import WeekTable  from "./../components/table/WeekTable";
import './Home.scss';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teams: [],
            schedule: [],
            load: false,
            toggle: 'players'
        }
    }

    render() {
        const {
            toggle,
        } = this.state;

        return (
            <div className="home tc">
                <div className={`players ${(toggle === 'players')? 'db': 'dn'}`}>
                    <Graph />
                </div>
                <div className={`week-points ${(toggle === 'week-points')? 'db': 'dn'}`}>
                    {/* <WeekTable /> */}
                </div>
            </div>
        );
    }
}

export default Home;
