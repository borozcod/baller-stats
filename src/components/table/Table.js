import React, { useContext, useEffect } from 'react';
import StatsContext from './../../context/stats-context';
import _ from 'lodash';
import './Table.scss';

const Table = () => {

    const {
        stats
    } = useContext(StatsContext);

    const headers = _.keys(stats[0]);
    const rows = stats;

    const renderHeaders = (value, i) => {
        if(!value){
            return;
        }

        if(value.indexOf("-percent") > -1){
            return;
        }

        return(
            <th className="dib" key={i}><span className="db ml2">{value}</span></th>
        );
    }

    const renderRow = (row, i) => {
        const filteredData = _.pickBy(row, (val,key) => !(key.toString().indexOf("-percent") > -1));
        const values = _.map(filteredData);
        return (
            <tr key={`tr-${i}`} className={`pv2 ${(i % 2 === 0) && 'bg-lightest-blue'}`}>
                {
                    values.map((value, i) => {
                        return <td key={`td-${i}`}><span className="db ml2">{value}</span></td>
                    })
                }
            </tr>
        )
    }

    return (
        <div className="mh4-ns mh2 mb5">
            <div className="table-search">
                <input type="text" placeholder="Search by Name or Team" />
                <i className="fas fa-search search-icon"></i>
            </div>
            <div className="relative">
                <table className="table">
                    <tbody>
                        <tr className="blue-background white pv2">
                            { headers.map(renderHeaders) }
                        </tr>
                        { rows.map(renderRow) }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Table;