import axios from 'axios';
import { API_URL } from "./config";

export const getTeams = async () => {
    const teams = await axios.get(`${API_URL}/teams`)
    return teams;
}

export const getMembers = async () => {
    const members = await axios.get(`${API_URL}/members`)
    return members;
}