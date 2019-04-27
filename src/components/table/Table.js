import React, { Component } from 'react';
import LoadCheck from './../hoc/LoadCheck'
import { getMembers } from "./../../functions";
import _ from 'lodash';
import './Table.scss';

class Table extends Component {
    constructor(props) {
        super(props);

        this.state = {
            members: [],
            names: [],
            fields: [],
            load: false,
            value: ''
        }

        this.all_members = [];
        this.prevSort = null;
        this.sortOrder = false;

        this.renderRow = this.renderRow.bind(this)
        this.renderFixRow = this.renderFixRow.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.sortTable = this.sortTable.bind(this)
        this.renderField = this.renderField.bind(this)
    }

    componentDidMount() {
        getMembers().then((res) => {
            this.setState({
                members: res.data.members,
                names: res.data.names,
                fields: res.data.fields,
                load: true
            });
            this.all_members = res.data.members;
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
    
    renderField(f, i) {
        return(
            <span className="row-item" key={i}>
                <button onClick={this.sortTable} data-sort-by={f.value} >{f.label}<i className={` ${(this.prevSort == f.value && this.sortOrder) && 'rotate-180' } ${(this.prevSort == f.value)? '': 'o-10'} fas fa-sort-down ml2 trans`}></i> </button>
            </span>
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

    renderRow(m, i) {
        return(
            <div className={` row scroll-row flex justify-between mv2 relative z-1 ${(i%2===0)? 'bg-white':'bg-light-gray'} `} key={i}>
                <span className="row-item">{m["last_name"]}</span>
                <span className="row-item">{m["points"]}</span>
                <span className="row-item">{m["ppg"]}</span>
                <span className="row-item">{m["fg_percent"]}</span>
                <span className="row-item">{m["3pt_percent"]}</span>
                <span className="row-item">{m["ft_percent"]}</span>
                <span className="row-item">{m["2pt_made"]}</span>
                <span className="row-item">{m["2pt_attempted"]}</span>
                <span className="row-item">{m["3pt_made"]}</span>
                <span className="row-item">{m["3pt_attempted"]}</span>
                <span className="row-item">{m["ft_mades"]}</span>
                <span className="row-item">{m["ft_attempted"]}</span>
                <span className="row-item">{m["rebounds"]}</span>
                <span className="row-item">{m["assists"]}</span>
                <span className="row-item">{m["steals"]}</span>
                <span className="row-item">{m["blocks"]}</span>
                <span className="row-item">{m["fouls"]}</span>
                <span className="row-item">{m["games_played"]}</span>
            </div>
        )
    }
    
    render() {
        const {
            members,
            names,
            fields,
            load,
            value
        } = this.state
        
        return(
            <LoadCheck load={load}>
                <div className="mh4-ns mh2 mb5">
                    <div className="table-search">
                        <input type="text" placeholder="Search by Name or Team" value={value} onChange={this.handleSearch} />
                        <i className="fas fa-search search-icon"></i>
                    </div>
                    <div className="Table">
                        
                            <div className="table-inner">
                            <div className="fixed-table">
                                <div className="row flex justify-between mv2 relative z-2 fw7 f6 top-bar">
                                    <span className="row-item first">First</span>
                                </div>
                                {names.map(this.renderFixRow)}
                            </div>
                            <div className="fw7 f6 row scroll-row flex justify-between mv2 relative z-1 fw7 f6 top-bar">
                                {fields.map(this.renderField)}
                            </div>
                            {members.map(this.renderRow)}
                        </div>
                    </div>
                </div>
            </LoadCheck>
        )
    }
}

export default Table