import React, { useState } from 'react';
import Home from "./containers/Home";
import { StatsContextProvider } from './context/stats-context.js';

const App = () => {

    const [stats, setStats] = useState([])
    const [teams, setTeams] = useState([])

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
