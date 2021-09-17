import React, { useState, useEffect } from 'react';
import Home from './containers/Home';
import { getTeams, getLeagueLeaders } from './functions'
import { StatsContextProvider } from './context/stats-context.js';

const App = () => {

    const [stats, setStats] = useState([])
    const [teams, setTeams] = useState([])

    useEffect(() => {
        const loadData = async () => {
            const teamReq = await getTeams();
            const leadersReq = await getLeagueLeaders();

            setTeams(teamReq.data);
            setStats(leadersReq.data);
        }
        loadData();
    }, []);

    const contextData = {
        stats: stats,
        setStats: setStats,
        teams: teams,
        setTeams: setTeams
    }

    return(
        <StatsContextProvider value={contextData}>
            <div className="baller-stats mh4-ns mh2">
                <div className="flex items-center justify-center pa3">
                    <i className="fas fa-basketball-ball mr2 orange f3"></i><span className="f3">Baller Stats</span>
                </div>
                <Home />
            </div>
        </StatsContextProvider>
    )
}

export default App;
