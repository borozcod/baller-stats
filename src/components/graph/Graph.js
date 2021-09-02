import React, { useContext, useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { COLORS } from './../../utils/graph-utils';
import StatsContext from './../../context/stats-context';
import _ from 'lodash'
Chart.register(...registerables);
var chart =  new Chart();

const Graph = () => {
    const canvasRef = useRef(null);

    const {
        stats
    } = useContext(StatsContext);

    useEffect(() => {

        chart.destroy()
        const chartData = [];
        _.forEach(stats, (teamMember, i) => {
            chartData.push(
                {
                    label: `${teamMember['first']} ${teamMember['last']}`,
                    data: [
                        teamMember['ppg'] || teamMember['points'], 
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

        chart = new Chart(canvasRef.current, {
            type: 'radar',
            data: {
                labels: ['ppg', '2pt-made', '2pt-attempted', '3pt-made', '3pt-attempted', 'ft-mades', "ft-attempted" ],
                datasets: chartData
            }
        });
    })

    return (
        <div>
            <div className="mw6 center">
                <canvas ref={canvasRef} id="myChart" height="400"></canvas>
            </div>
        </div>
    );
}

export default Graph;
