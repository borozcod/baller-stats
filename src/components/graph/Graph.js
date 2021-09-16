import React, { useContext } from 'react';
import { getColor } from './../../utils/graph-utils';
import StatsContext from './../../context/stats-context';
import _ from 'lodash'
import { Radar } from 'react-chartjs-2';

let fields = [
    '2pt-made',
    '3pt-made',
    'rebounds',
    'assists',
    'steals',
    'blocks',
]

const Graph = () => {

    const {
        stats
    } = useContext(StatsContext);

    const chartDataset = [];

    _.forEach(stats, (teamMember, i) => {
        const pickData = _.pick(teamMember, fields);
        const pickDataValues = _.values(pickData);
        chartDataset.push({
            label: `${teamMember['first']} ${teamMember['last']}`,
            data: pickDataValues,
            backgroundColor: getColor(i)
        });
    });

    const chartData = {
        labels: fields,
        datasets: chartDataset
    }

    return (
        <div>
            <div className="mw6 center">
                <Radar data={chartData}/>
            </div>
        </div>
    );
}

export default Graph;
