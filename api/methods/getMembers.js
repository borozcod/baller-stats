const {authorize, google} = require('./../auth.js');
const { SHEET_ID } = require('./../variables.js');
const fs = require('fs');

let RANGE = "League Leaders!A2:T";


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
                      names:[]
                  }

                  if (rows.length) {
                    rows.map((row) => {

                        const member = {
                            "last_name": row[0],
                            "first_name": row[1],
                            "points": row[2],
                            "ppg": row[3],
                            "fg_percent": row[4],
                            "3pt_percent": row[5],
                            "ft_percent": row[6],
                            "2pt_made": row[7],
                            "2pt_attempted": row[8],
                            "3pt_made": row[9],
                            "3pt_attempted": row[10],
                            "ft_mades": row[11],
                            "ft_attempted": row[12],
                            "rebounds": row[13],
                            "assists": row[14],
                            "steals": row[15],
                            "blocks": row[16],
                            "fouls": row[17],
                            "games_played": row[18],
                            "team_name": row[19]
                        }

                        const name = {
                            "last_name": row[0],
                            "first_name": row[1]
                        }
                        data.members.push(member);
                        data.names.push(name);
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
