import React, { useState } from 'react';
import Table  from './../components/table/Table';
import Graph  from './../components/graph/Graph';
import Filters from './../components/filters/Filters'
import './Home.scss';

const Home = () => {
    const [tab, setTab] = useState('graph');

    return (
        <div className="tc">
            <Filters />
            <div className="mb3">
                <button className="mr2" onClick={() => {setTab('standings')}}>Standings</button>
                <button className="ml2" onClick={() => {setTab('graph')}}>Graph</button>
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
