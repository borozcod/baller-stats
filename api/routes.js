const { getTeams } = require('./methods/getTeams.js');
const { getTeam } = require('./methods/getTeam.js');
const { getMembers } = require('./methods/getMembers.js');

module.exports = function(app) {
    app.get('/teams', function(req, res) {
        getTeams().then((data) => {
            res.send(data);
        });
    });

    app.get('/members', function(req, res) {
        getMembers().then((data) => {
            res.send(data);
        });
    });

    app.get('/team/:teamID', function(req, res) {
        const ID = req.params.teamID;
        getTeam(ID).then((data) => {
            res.send(data);
        });
    });

};
