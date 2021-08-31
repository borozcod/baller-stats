import _ from 'lodash';

/**
 * Represents a book.
 * @name getTeams
 * @function
 * @description Loop through the league standings api and return the list of teams.
 * @returns {object}
 */
export const getTeams = (teams) => {

    const teamList = [];
    const teamData = [];

    _.forEach(teams, function(team) {

        if(!(_.indexOf(teamList, team['team-name']) > -1)) {
            teamList.push(team['team-name']);
            teamData.push({
                "name": team['team-name'],
                "members": []
            });
        }

        const teamMemberIndex = _.indexOf(teamList, team['team-name']);
        if(team['first'] !== 'blank') {
            teamData[teamMemberIndex]['members'].push(team);
        }
    });

    return teamData;
}
