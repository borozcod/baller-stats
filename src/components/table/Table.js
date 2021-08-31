import React, { Component, useState, useEffect } from 'react';
import { getLeagueLeaders } from "./../../functions";
import _ from 'lodash';
import './Table.scss';

const Table = () => {

    const [headers, setHeaders] = useState([]);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        getLeagueLeaders().then((res) => {
            const headers = _.keys(res.data[0])
            const rows = res.data
            setHeaders(headers)
            setRows(rows)
        });
    }, []);

    const renderHeaders = (value, i) => {
        if(!value){
            return;
        }

        if(value.indexOf("-percent") > -1){
            return;
        }

        return(
            <th className="dib" key={i}><span className="db ml2">{value}</span></th>
        )
    }

    const renderRow = (row, i) => {

        const filteredData = _.pickBy(row, (val,key) => !(key.toString().indexOf("-percent") > -1));
        const values = _.map(filteredData);
        return (
            <tr key={`tr-${i}`} className={`pv2 ${(i % 2 == 0) && 'bg-lightest-blue'}`}>
                {
                    // row.map((value, key) => {
                    //     return <td key={`td-${key}`}><span className="db ml2">{value}</span></td>
                    // })
                    values.map((value, i)=> {
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
            <div>
                <table className="table">
                    <tbody>
                        <tr className="blue-background white pv2">
                            {headers.map(renderHeaders)}
                        </tr>
                        { rows.map(renderRow) }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Table