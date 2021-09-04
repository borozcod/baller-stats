import React, { useEffect, useState, useContext } from 'react';
import Table  from "./../components/table/Table";
import Graph  from "./../components/graph/Graph";
import Filters from "./../components/filters/Filters"
import StatsContext from './../context/stats-context';
import { getLeagueLeaders } from './../functions';
import { getTeams } from './../utils/stats-parser';
import './Home.scss';

const Home = () => {
    const [tab, setTab] = useState('graph');

    return (
        <div className="tc">
            <Filters />
            <div className="mv3">
                <button className={`${tab === 'standings' && 'b--light-purple bb'} bw2 mr2`} onClick={() => {setTab('standings')}}>Table</button>
                <button className={`${tab === 'graph' && 'b--light-purple bb'} bw2 ml2`} onClick={() => {setTab('graph')}}>Graph</button>
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
