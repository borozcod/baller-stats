import './Filters.css';
import _ from 'lodash';
import { getTeams, getTeam, getLeagueLeaders } from './../../functions.js'
import React, { useEffect, useState, useContext } from 'react';
import StatsContext from './../../context/stats-context';

const Filters = () => {

    const [teamSelect, setTeamSelect] = useState('all');
    const [gameSelect, setGameSelect] = useState('none');
    const [teamData, setTeamData] = useState([]);

    // Ideally this should be part of the api
    const games = [
        "Game 1",
        "Game 2",
        "Game 3",
        "Game 4",
        "Game 5",
        "Game 6",
        "Game 7",
        "Game 8",
        "Game 9",
        "Game 10"
    ]

    const {
        setStats,
        teams
    } = useContext(StatsContext);

    const renderTeams = (thisTeam, i) => {
        return(
            <option key={`team-${i}`} value={thisTeam.team}>{thisTeam.name}</option>
        )
    }

    const renderGames = (thisGame, i) => {
        return(
            <option key={`game-${i}`} value={i}>{thisGame}</option>
        )
    }

    const handleTeamChange = async (e) => {
        const teamID = e.target.value
        setGameSelect('total');

        if(teamID === 'all') {
            const allTeams = await getLeagueLeaders();
            setStats(allTeams.data);
            setTeamSelect('all');
            return;
        }

        setTeamSelect(teamID);
        const { data } = await getTeam(teamID);

        // Todo (bryan): the api should drop the first row from totals
        // Alternatively we can remove that row from the csv
        const totalStats = data['total']['stats'];
        setStats(totalStats)
        setTeamData(data)
    }

    const handleGameChange = (e) => {
        const gameID = e.target.value;
        
        setGameSelect(e.target.value)

        if(gameID === "total") {
            setStats(teamData['total']['stats'])
        } else {
            setStats(teamData['events'][gameID]['stats'])
        }
    }

    return (
        <div>
            <select className="mr2" value={teamSelect} onChange={handleTeamChange}>
                <option value="all">All teams</option>
                {teams.map(renderTeams)}
            </select>
            {
                
                ( teamSelect !== 'all' ) && (
                    <select value={gameSelect} onChange={handleGameChange}>
                        <option value="total">Total</option>
                        {games.map(renderGames)}
                    </select>
                )
            }
        </div>
    )
}

export default Filters
