import axios from 'axios';
let API_URL = process.env.REACT_APP_API_URL;

export const getLeagueLeaders = async () => {
    const leaders = await axios.get(`${API_URL}/leaders.json`)
    return leaders;
}

export const getTeams = async () => {
    const teams = await axios.get(`${API_URL}/league-leaders.json`)
    return teams;
}

export const getSchedule = async () => {
    const schedule = await axios.get(`${API_URL}/schedule`)
    return schedule;
}

export const getMembers = async () => {
    const members = await axios.get(`${API_URL}/members`)
    return members;
}

export const getMembersWeek = async () => {
    const members = await axios.get(`${API_URL}/week`)
    return members;
}

