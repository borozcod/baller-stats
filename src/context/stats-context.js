import { createContext } from 'react'

const StatsContext = createContext({
    stats: [], 
    setStats: () => {},
    teams: [],
    setTeams: () => {}
});

export const StatsContextProvider = StatsContext.Provider
export default StatsContext