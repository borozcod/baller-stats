import axios from 'axios';
import { API_URL } from "./config";

export const getTeams = async () => {
    const teams = await axios.get(`${API_URL}/teams`)
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