const { getTeams } = require('./methods/getTeams.js');
const { getTeam } = require('./methods/getTeam.js');
const { getMembers } = require('./methods/getMembers.js');
const { getSchedule } = require('./methods/getSchedule.js');
const { getWeek } = require('./methods/getWeek.js');

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

    app.get('/schedule', function(req, res) {
        getSchedule().then((data) => {
            res.send(data);
        });
    });

    app.get('/week', async function(req, res) {

        const teams = [
            "Just Du It",
            "Clay-mores",
            "Kai-ser Rolls",
            "LemMon-ade",
            "The Carroll-ers",
            "Average Joe's"
        ];

        var data = {};
        

        const weekRequest = [];
        // NOTE (bryan): This right here is probably not the best way to do it. I'm making a request to the API for each team.
        for(var i = 0; i < teams.length; i++ ){
            const weekData = await getWeek(teams[i]);
            weekRequest.push(weekData);
        }
        // NOTE (bryan): I combine all of the arrays into one, just so the request is the same as /members
        var newArray = [];
        for(var i = 0; i < weekRequest.length; i++ ){
            newArray = newArray.concat(weekRequest[i]);
        }

        // I know this is just ridiculous now
        const fields = await getMembers();

        data.members = newArray;
        data.fields = fields.fields;
        res.send(data);

    });

};
