import './Filters.scss';
import _ from 'lodash';
import { getTeams, getTeam, getLeagueLeaders } from './../../functions.js'
import React, { useEffect, useState, useContext } from 'react';
import StatsContext from './../../context/stats-context';

const Filters = () => {

    const [teamSelect, setTeamSelect] = useState('all');
    const [gameSelect, setGameSelect] = useState('none');
    const [teamData, setTeamData] = useState([]);

    // Idealy this should be part of the api
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
        teams,
        setTeams
    } = useContext(StatsContext);

    useEffect( () => {

        const fetchData = async () => {
            const teamReq = await getTeams();
            const leadersReq = await getLeagueLeaders();

            setTeams(teamReq.data);
            setStats(leadersReq.data);
        }

        fetchData()
    }, [])

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
        const teamID = e.target.value.match(/\d+/)[0];

        setTeamSelect(`${teamID}`);
        setGameSelect('total');

        if(teamID === 'all') {
            const allTeams = await getLeagueLeaders();
            setStats(allTeams.data);
            return;
        }

        const { data } = await getTeam(teamID);
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
