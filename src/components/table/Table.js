import React, { Component } from 'react';
import './Table.scss';

class Table extends Component {
    constructor(props) {
        super(props);

        this.renderRow = this.renderRow.bind(this)
        this.renderFixRow = this.renderFixRow.bind(this)
    }

    renderFixRow(n, i) {
        return(
            <div className={`row flex justify-between mv2 relative z-2 ${(i%2===0)? 'bg-light-gray':'bg-white'} ${(i===0)&&'fw7 f6 blue'}`}>
                <span className="row-item first">{n["first_name"]}</span>
            </div>
        )
    }

    renderRow(m, i) {
        return(
            <div className={`${(i===0)&&'fw7 f6 blue'} row scroll-row flex justify-between mv2 relative z-1 ${(i%2===0)? 'bg-light-gray':'bg-white'} ${(i===0)&&'fw7 f6'}`}>
                <span className="row-item">{m["last_name"]}</span>
                <span className="row-item">{m["points"]}</span>
                <span className="row-item">{m["ppg"]}</span>
                <span className="row-item">{m["fg_percent"]}</span>
                <span className="row-item">{m["3pt_percent"]}</span>
                <span className="row-item">{m["ft_percent"]}</span>
                <span className="row-item">{m["2pt_made"]}</span>
                <span className="row-item">{m["2pt_attempted"]}</span>
                <span className="row-item">{m["3pt_made"]}</span>
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
            names
        } = this.props
        
        return(
            <div className="Table">
                <div className="table-inner">
                    <div className="fixed-table">
                        {names.map(this.renderFixRow)}
                    </div>
                    {members.map(this.renderRow)}
                </div>
            </div>
        )
    }
}

export default Table