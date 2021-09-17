import React, { useState } from 'react';
import Table  from "./../components/table/Table";
import Graph  from "./../components/graph/Graph";
import './Home.css';

const Home = () => {
    const [tab, setTab] = useState('table');

    return (
        <div className="tc">
            <div className="mv3">
                <button className={`${tab === 'table' && 'b--light-purple bb'} bw2 mr2`} onClick={() => {setTab('table')}}>Table</button>
                <button className={`${tab === 'graph' && 'b--light-purple bb'} bw2 ml2`} onClick={() => {setTab('graph')}}>Graph</button>
            </div>
            <div className={`${(tab === 'table')? 'db': 'dn'}`}>
                <Table />
            </div>
            <div className={`${(tab === 'graph')? 'db': 'dn'}`}>
                <Graph />
            </div>
        </div>
    )
}

export default Home;
