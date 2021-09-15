import React, { useContext, useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { getColor } from './../../utils/graph-utils';
import StatsContext from './../../context/stats-context';
import _ from 'lodash'
Chart.register(...registerables);
var chart =  new Chart();
let fields = [
    '2pt-made',
    '2pt-attempted' ,
    '3pt-made',
    'ft-mades',
    'ft-attempted',
    'rebounds',
    'steals',
    'assists',
    'blocks',
    'points',
]

const Graph = () => {
    const canvasRef = useRef(null);

    const {
        stats
    } = useContext(StatsContext);

    useEffect(() => {

        chart.destroy()
        const chartData = [];

        _.forEach(stats, (teamMember, i) => {
            const pickData = _.pick(teamMember, fields);
            const pickDataValues = _.values(pickData);
            chartData.push({
                label: `${teamMember['first']} ${teamMember['last']}`,
                data: pickDataValues,
                backgroundColor: getColor(i)
            });
        });

        chart = new Chart(canvasRef.current, {
            type: 'radar',
            data: {
                labels: fields,
                datasets: chartData

            }
        });
    })

    return (
        <div>
            <div className="mw6 center">
                <canvas ref={canvasRef} id="graph" height="400"></canvas>
            </div>
        </div>
    );
}

export default Graph;
