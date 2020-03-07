import React, { Component } from 'react';
import LoadCheck from './../components/hoc/LoadCheck'
import { getTeams, getSchedule } from "./../functions";
import Card  from "./../components/card/Card";
import Table  from "./../components/table/Table";
import WeekTable  from "./../components/table/WeekTable";
import './Home.scss';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teams: [],
            schedule: [],
            load: false,
            toggle: 'schedule'
        }
    }

    componentDidMount() {

        getTeams().then((res) => {
            this.setState({
                teams: res.data.teams
            });
        });

        getSchedule().then((res) => {
            this.setState({
                schedule: res.data.schedule,
                load: true
            });
        });

    }

    render() {
        const {
            teams,
            schedule,
            toggle,
            load
        } = this.state;

        return (
            <div className="home tc">
                <div className="toggle pv3 flex items-center justify-center">
                    <button className={`mh3 db ${(toggle === 'schedule')? 'active': ''}`}
                        onClick={()=>{
                            this.setState({toggle: 'schedule'});
                        }}>Schedule</button>
                    <button className={`mh3 db ${(toggle === 'teams')? 'active': ''}`}
                        onClick={()=>{
                            this.setState({toggle: 'teams'});
                        }}>Teams</button>
                    <button className={`mh3 db ${(toggle === 'players')? 'active': ''}`}
                        onClick={()=>{
                            this.setState({toggle: 'players'});
                        }}>Total Points</button>
                </div>
                <div className={`schedule ${(toggle === 'schedule')? 'db': 'dn'}`}>
                    <LoadCheck load={load}>
                        {
                            schedule.map((s,i) => {
                                const day = Object.keys(s)[0];
                                const today = new Date();
                                const date = new Date(day);
                                const month = date.toLocaleString('en-us', { month: 'long' });
                                const gym = s[day].map((t,i) => {
                                    if(!t.home) {
                                        return('');
                                    }
                                    return(
                                        <>
                                        {(t.open || t.close) && (
                                            <div className="gym">
                                                <div className="open"><span>GYM OPEN:</span> {t.open}</div>
                                                <div className="close"><span>GYM CLOSE:</span> {t.close}</div>
                                            </div>
                                        )}
                                        </>
                                    )
                                });
                                const times = s[day].map((t,i) => {
                                    if(!t.home) {
                                        return('');
                                    }
                                    return(
                                        <div className="f6 bb b--light-silver" key={i}>
                                            {(t.clock || t.stats) && (
                                                <div className="volunteer">
                                                    <div className="clock"><span>CLOCK:</span> {t.clock}</div>
                                                    <div className="stats">{t.stats} <span>:STATS</span></div>
                                                </div>
                                            )}
                                            <div className="play-times">
                                                <span className="time pv3 bw2 pr3 br b--light-silver">{t.time}</span>
                                                <span className="away-team pv3 br  b--light-silver">{t.away}</span>
                                                <span className="home-team pv3 ">{t.home}</span>
                                            </div>
                                        </div>
                                    )
                                });
                                // (NOTE): Bryan
                                // I do the date comparision in the case that we want custom ui for past games. Something like low opacity
                                return (
                                    <Card key={i} className={`${(today.getTime() > date.getTime())? '': ''}`}>
                                        <h1>{month} {date.getDate()}</h1>
                                        {gym}
                                        {times}
                                    </Card>
                                );
                            })
                        }
                    </LoadCheck>
                </div>
                <div className={`teams ${(toggle === 'teams')? 'db': 'dn'}`}>
                    <LoadCheck load={load}>
                    {
                        teams.map((t, i) => {
                            return(
                                <Card key={i}>
                                    <h1 className="mt0">{ t.name }</h1> 
                                    <div className="flex justify-between mw4 mr-auto ml-auto">
                                        <div className="wins tc">
                                            <span className="stat mr3 db f2">{t.wins}</span>
                                            <span className="">WINS</span>
                                        </div>
                                        <div className="slab w2"></div>
                                        <div className="wins tc">
                                            <span className="stat mr3 db f2">{t.loss}</span>
                                            <span className="">LOSS</span>
                                        </div>
                                    </div>
                                </Card>
                            )
                        })
                    }
                    </LoadCheck>
                </div>
                <div className={`players ${(toggle === 'players')? 'db': 'dn'}`}>
                    <Table />
                </div>
                <div className={`week-points ${(toggle === 'week-points')? 'db': 'dn'}`}>
                    <WeekTable />
                </div>
            </div>
        );
    }
}

export default Home;
