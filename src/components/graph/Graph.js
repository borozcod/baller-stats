import React, { useContext, useEffect, useState } from 'react';
import { getColor } from './../../utils/graph-utils';
import StatsContext from './../../context/stats-context';
import { getLeagueLeaders } from './../../functions';
import _ from 'lodash'
import { Radar } from 'react-chartjs-2';

let fields = [
    'aggressiveness',
    'offensive-efficiency',
    'defensive-rating',
    'rebounding',
    'playmaking',
]

const formatGraphData = (apiData) => {
    const chartDataset = [];
    _.forEach(apiData, (teamMember, i) => {
        const pickData = _.pick(teamMember, fields);
        const pickDataValues = _.values(pickData);
        chartDataset.push({
            label: `${teamMember['first']} ${teamMember['last']}`,
            data: pickDataValues,
            backgroundColor: getColor(i)
        });
    });

    const chartDataFormatted = {
        labels: fields,
        datasets: chartDataset
    }

    return chartDataFormatted;
}

const Graph = () => {

    const {
        stats,
        teams
    } = useContext(StatsContext);

    const [leagueLeaders, setLeagueLeaders] = useState([]);
    const [graphData, setGraphData] = useState([]);
    const [teamSelect, setTeamSelect] = useState('all');

    useEffect(() => {
        const loadData = async () => {
            const { data } = await getLeagueLeaders();
            setLeagueLeaders(data);
            setGraphData(data);
        }
        loadData();
    }, [])

    const handleTeamChange = async (e) => {
        const teamName = e.target.value;
        setTeamSelect(teamName);

        if(teamName == 'all') {
            const { data } = await getLeagueLeaders();
            setGraphData(data);

            return;
        }

        const teamData = _.filter(leagueLeaders, ['team-name', teamName]);
        setGraphData(teamData);
    }

    const renderTeams = (thisTeam, i) => {
        return(
            <option key={`team-${i}`} value={thisTeam.name}>{thisTeam.name}</option>
        )
    }

    const chartData = formatGraphData(graphData);

    return (
        <div>
            <select className="mr2" value={teamSelect} onChange={handleTeamChange}>
                <option value="all">All teams</option>
                {teams.map(renderTeams)}
            </select>
            <div className="mw6 center">
                <Radar data={chartData}/>
            </div>
        </div>
    );
}

export default Graph;
