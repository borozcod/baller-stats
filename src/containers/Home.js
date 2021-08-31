import React, { Component, useState } from 'react';
import Table  from "./../components/table/Table";
import Graph  from "./../components/graph/Graph";
import './Home.scss';

const Home = (props) => {
    const [tab, setTab] = useState('standings');
    
    return (
        <div className="tc">
            <div>
                <button onClick={() => {setTab('standings')}}>Standings</button>
                <button onClick={() => {setTab('graph')}}>Graph</button>
            </div>
            <div className={`${(tab === 'standings')? 'db': 'dn'}`}>
                <Table />
            </div>
            <div className={`${(tab === 'graph')? 'db': 'dn'}`}>
                <Graph />
            </div>
        </div>
    )
}

export default Home;
