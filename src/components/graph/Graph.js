import React, { useContext, useState, useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { COLORS } from './../../utils/graph-utils';
import StatsContext from './../../context/stats-context';
import _ from 'lodash'
Chart.register(...registerables);
var chart

const Graph = (props) => {
    const canvasRef = useRef(null);
    const [membersData, setMemebrs] = useState([])

    const {
        teams
    } = useContext(StatsContext)



    useEffect(() => {
        chart = new Chart(canvasRef.current, {
            type: 'radar',
            data: {
                labels: ['ppg', '2pt-made', '2pt-attempted', '3pt-made', '3pt-attempted', 'ft-mades', "ft-attempted" ],
                datasets: membersData
            }
        });
    }, [membersData]);

    const renderOptions = (team, i) => {
        return(
            <option key={`option-${i}`} value={i}>{team.name}</option>
        )
    }

    const handleTeamChange = (e) => {
        const value = e.target.value;
        const chartData = []

        _.forEach(teams[value]['members'], (teamMember, i) => {
            chartData.push(
                {
                    label: `${teamMember['first']} ${teamMember['last']}`,
                    data: [
                        teamMember['ppg'], 
                        teamMember['2pt-made'], 
                        teamMember['2pt-attempted'], 
                        teamMember['3pt-made'], 
                        teamMember['3pt-attempted'], 
                        teamMember['ft-mades'], 
                        teamMember["ft-attempted"] 
                    ],
                    backgroundColor: COLORS[i],
                    opacity: 0.5
                }
            )
        });
        chart.destroy()
        setMemebrs(chartData);
    }

    return (
        <div>
            <div>
                <select onChange={handleTeamChange}>
                    { teams.map(renderOptions) }
                </select>
            </div>
            <div className="mw6 center">
                <canvas ref={canvasRef} id="myChart" height="400"></canvas>
            </div>
        </div>
    )
}

export default Graph
