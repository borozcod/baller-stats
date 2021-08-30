import React, { Component } from 'react';
import { getLeagueLeaders } from "./../../functions";
import _ from 'lodash';
import './Table.scss';

class Table extends Component {
    constructor(props) {
        super(props);

        this.state = {
            headers: [],
            rows: [],
            value: ''
        }

        this.all_members = [];
        this.prevSort = null;
        this.sortOrder = false;

        this.renderRow = this.renderRow.bind(this)
        this.renderFixRow = this.renderFixRow.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.sortTable = this.sortTable.bind(this)
        this.renderHeaders = this.renderHeaders.bind(this)
    }

    componentDidMount() {
        getLeagueLeaders().then((res) => {
            const headers = _.keys(res.data[0])
            const rows = res.data

            this.setState({
                headers: headers,
                rows: rows
            });
            // this.all_members = res.data.members;
        });
    }

    handleSearch(e) {
        const value = e.target.value;

        this.setState({
            value
        })
        
        const isMatch = (obj) => {
            return obj.first_name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1 || obj.last_name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1  || obj.team_name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1
        }

        const filter_members = this.all_members.filter(isMatch)

        this.setState({
            members: filter_members,
            names: filter_members

        })
    }

    renderFixRow(n, i) {
        return(
            <div className={`row flex justify-between mv2 relative z-2 ${(i%2===0)? 'bg-white':'bg-light-gray'}`} key={i}>
                <span className="row-item first">{n["first_name"]}</span> 
            </div>
        )
    }
    
    renderHeaders(value, i) {
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

    renderRow(row, i) {
        console.log(row);
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

    sortTable(e) {
        const filterBy = e.target.dataset.sortBy;
      
        // Toggle sort
        if(filterBy !== this.prevSort) {
            this.prevSort = filterBy;
            this.sortOrder = false;
        } else {
            this.sortOrder = !this.sortOrder;
        }


        const sortMembers = _.orderBy(this.state.members, filterBy, (this.sortOrder) ? 'asc' : 'desc');
        this.setState({
            members: sortMembers,
            names: sortMembers
        })
    }

    
    render() {
        const {
            headers,
            rows,
            value
        } = this.state
        
        return(
                <div className="mh4-ns mh2 mb5">
                    <div className="table-search">
                        <input type="text" placeholder="Search by Name or Team" value={value} onChange={this.handleSearch} />
                        <i className="fas fa-search search-icon"></i>
                    </div>
                    <div>
                        <table className="table">
                            <tbody>
                                <tr className="blue-background white pv2">
                                    {headers.map(this.renderHeaders)}
                                </tr>
                                { rows.map(this.renderRow) }
                            </tbody>
                        </table>
                    </div>
                </div>
            
        )
    }
}

export default Table