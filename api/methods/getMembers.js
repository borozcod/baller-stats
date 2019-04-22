const {authorize, google} = require('./../config.js');
const fs = require('fs');

let SHEET_ID = "1ZH0iP01IQQHFsQy4LUyOQkMVICQIXtZLaVxt3rBOmb0";
let RANGE = "League Leaders!A1:S";


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
                            "ft_mades": row[10],
                            "ft_attempted": row[11],
                            "rebounds": row[12],
                            "assists": row[13],
                            "steals": row[14],
                            "blocks": row[15],
                            "fouls": row[16],
                            "games_played": row[17]
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
