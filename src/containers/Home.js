import React, { useEffect, useState, useContext } from 'react';
import Table  from "./../components/table/Table";
import Graph  from "./../components/graph/Graph";
import StatsContext from './../context/stats-context';
import { getLeagueLeaders } from './../functions';
import { getTeams } from './../utils/stats-parser';
import './Home.scss';

const Home = (props) => {
    const [tab, setTab] = useState('standings');

    const {
        setStats,
        setTeams
    } = useContext(StatsContext)

    useEffect(() => {

        const fetchData = async () => {
            const { data } = await getLeagueLeaders();
            const teams = getTeams(data);
            console.log(teams);

            setTeams(teams);
            setStats(data);
        }

        fetchData()
    }, []);

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
