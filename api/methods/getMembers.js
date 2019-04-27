const {authorize, google} = require('./../auth.js');
const { SHEET_ID } = require('./../variables.js');
const fs = require('fs');

let RANGE = "League Leaders!A1:T";


const getMembers = () => {

    return new Promise(function(resolve, reject){
        fs.readFile('secret.json', (err, content) => {
            if (err) return console.log('Error loading client secret file:', err);
            // Authorize a client with credentials, then call the Google Sheets API.
            authorize(JSON.parse(content), (auth) => {
                const sheets = google.sheets({ version: 'v4', auth });
                sheets.spreadsheets.values.get({
                  spreadsheetId: SHEET_ID,
                  range: RANGE,
                }, (err, res) => {
                  if (err) return console.log('The API returned an error: ' + err);
                  const rows = res.data.values;
                  const data = {
                      members: [],
                      names:[],
                      fields:[]
                  }
                  var member = {};
                  if (rows.length) {
                    rows.map((row, i) => {
                        
                        if(i == 0) {
                            data.fields.push(
                                {value: "last_name", label: row[0]},
                                {value: "points", label: row[2]},
                                {value: "ppg", label: row[3]},
                                {value: "fg_percent", label: row[4]},
                                {value: "3pt_percent", label: row[5]},
                                {value: "ft_percent", label: row[6]},
                                {value: "2pt_made", label: row[7]},
                                {value: "2pt_attempted", label: row[8]},
                                {value: "3pt_made", label: row[9]},
                                {value: "3pt_attempted", label: row[10]},
                                {value: "ft_mades", label: row[11]},
                                {value: "ft_attempted", label: row[12]},
                                {value: "rebounds", label: row[13]},
                                {value: "assists", label: row[14]},
                                {value: "steals", label: row[15]},
                                {value: "blocks", label: row[16]},
                                {value: "fouls", label: row[17]},
                                {value: "games_played", label: row[18]}
                            );
                        } else {

                            data.members.push({
                                "last_name": row[0],
                                "first_name": row[1],
                                "points": parseInt(row[2]),
                                "ppg": parseInt(row[3]),
                                "fg_percent": row[4],
                                "3pt_percent": row[5],
                                "ft_percent": row[6],
                                "2pt_made": parseInt(row[7]),
                                "2pt_attempted": parseInt(row[8]),
                                "3pt_made": parseInt(row[9]),
                                "3pt_attempted": parseInt(row[10]),
                                "ft_mades": parseInt(row[11]),
                                "ft_attempted": parseInt(row[12]),
                                "rebounds": parseInt(row[13]),
                                "assists": parseInt(row[14]),
                                "steals": parseInt(row[15]),
                                "blocks": parseInt(row[16]),
                                "fouls": parseInt(row[17]),
                                "games_played": parseInt(row[18]),
                                "team_name": row[19]
                            });
                        }
                        if(i > 0) {
                            data.names.push({
                                "last_name": row[0],
                                "first_name": row[1]
                            });
                        }
                    });
                  } else {
                    console.log('No data found.');
                  }
                  err ? reject(err) : resolve(data);
                });
            });
        });

    });
}

module.exports = {
    getMembers
};
