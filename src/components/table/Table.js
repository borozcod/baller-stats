import React, { Component } from 'react';
import { getMembers } from "./../../functions";
import './Table.scss';

class Table extends Component {
    constructor(props) {
        super(props);

        this.state = {
            members: [],
            names: [],
            value: ''
        }

        this.all_members = [];

        this.renderRow = this.renderRow.bind(this)
        this.renderFixRow = this.renderFixRow.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
    }

    componentDidMount() {
        getMembers().then((res) => {
            this.setState({
                members: res.data.members,
                names: res.data.names
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
            <div className={`row flex justify-between mv2 relative z-2 ${(i%2===0)? 'bg-light-gray':'bg-white'}`} key={i}>
                <span className="row-item first">{n["first_name"]}</span>
            </div>
        )
    }

    renderRow(m, i) {
        return(
            <div className={` row scroll-row flex justify-between mv2 relative z-1 ${(i%2===0)? 'bg-light-gray':'bg-white'} `} key={i}>
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
            value
        } = this.state
        
        return(
            <div className="mh4-ns mh2">
                <div className="table-search">
                    <input type="text" placeholder="Search by Name or Team" value={value} onChange={this.handleSearch} />
                    <i className="fas fa-search search-icon"></i>
                </div>
                <div className="Table">
                    
                        <div className="table-inner">
                        <div className="fixed-table">
                            <div className="row flex justify-between mv2 relative z-2 bg-light-gray fw7 f6 blue">
                                <span className="row-item first">First</span>
                            </div>
                            {names.map(this.renderFixRow)}
                        </div>
                        <div className="fw7 f6 blue row scroll-row flex justify-between mv2 relative z-1 bg-light-gray fw7 f6">
                                <span className="row-item">Last</span>
                                <span className="row-item">Points</span>
                                <span className="row-item">PPG</span>
                                <span className="row-item">FG%</span>
                                <span className="row-item">3PT%</span>
                                <span className="row-item">FT%</span>
                                <span className="row-item">2pt Made</span>
                                <span className="row-item">2pt Attempted</span>
                                <span className="row-item">3pt Made</span>
                                <span className="row-item">3pt Attempted</span>
                                <span className="row-item">FT mades</span>
                                <span className="row-item">FT Attempted</span>
                                <span className="row-item">Rebounds</span>
                                <span className="row-item">Assists</span>
                                <span className="row-item">Steals</span>
                                <span className="row-item">Blocks</span>
                                <span className="row-item">Fouls</span>
                                <span className="row-item">Games Played</span>
                        </div>
                        {members.map(this.renderRow)}
                    </div>
                </div>
            </div>
        )
    }
}

export default Table