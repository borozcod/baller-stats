import React, { useContext, useState } from 'react';
import StatsContext from './../../context/stats-context';
import Filters from './../filters/Filters';
import _ from 'lodash';
import './Table.css';

const Table = () => {

    const {
        stats,
        setStats
    } = useContext(StatsContext);

    const [sortBy, setSortBy] = useState('last');
    const [order, setOrder] = useState('desc');

    const headers = _.keys(stats[0]);
    const rows = stats;

    let stringFields = [
        "first",
        "last"
    ]

    let percentFields = [
        "fg%",
        "3pt%",
        "ft%"
    ]

    const sortTable = (sortByKey) => {

        var orderBy;

        // change filter
        if( sortByKey !== sortBy ) {
            orderBy = "desc";
        } else {
            var orderBy = (order == "asc") ? "desc" : "asc";
        }

        setOrder(orderBy)
        setSortBy(sortByKey);

        if(_.indexOf(stringFields, sortByKey) > -1) {
            const sortedStringTable = _.orderBy(stats, [function(o) { return o[sortByKey]; }], orderBy);
            setStats(sortedStringTable);
            return;
        }

        if(_.indexOf(percentFields, sortByKey) > -1) {
            const sortField =  sortByKey.replace(/%/g,"-percent")
            const sortedStringTable = _.orderBy(stats, [function(o) { return parseFloat(o[sortField]); }], orderBy);
            setStats(sortedStringTable);
            return;
        }

        const sortedTable = _.orderBy(stats, [function(o) { return parseFloat(o[sortByKey]); }], orderBy);
        setStats(sortedTable);
        return;
    }

    const renderHeaders = (value, i) => {
        if(!value){
            return;
        }

        if(value.indexOf("-percent") > -1){
            return;
        }

        return(
            <th className="dib" key={i}>
                <button className="button ml0" onClick={() => sortTable(value)}>
                    <span className="db ml2 white">{value}<span className={`ml2 dib ${(order == 'asc' && sortBy == value) && 'rotate-180 pb1'} ${sortBy !== value && 'o-50'}`}><i className="fas fa-sort-down"></i></span></span>
                </button>
            </th>
        );
    }

    const renderRow = (row, i) => {
        const filteredData = _.pickBy(row, (val,key) => !(key.toString().indexOf("-percent") > -1));
        const values = _.map(filteredData);
        return <tr key={`tr-${i}`} className={`pv2 ${(i % 2 === 0) && 'bg-lightest-blue'}`}>{
                    values.map((value, i) => {
                        return <td key={`td-${i}`}><span className="db ml2 black">{value}</span></td>
                    })
                }</tr>
    }

    return (
        <div className="mh4-ns mh2 mb5">
            <div className="relative">
                <Filters />
                <table className="table">
                    <tbody>
                        <tr className="black pv2"><td>Scroll to see more ---></td></tr>
                        <tr className="blue-background white pv2">{ headers.map(renderHeaders) }</tr>
                        { rows.map(renderRow) }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Table;