const {authorize, google} = require('./../auth.js');
const { SHEET_ID } = require('./../variables.js');
const fs = require('fs');




const getWeek = (team) => {

    // The range is spesific to our google sheet

    let RANGE = `${team}!A2:R`;

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
                    const data = [];
                    var week = '';
                    if (rows.length) {
                      rows.map((row, i) => {
                          // Only apply for set game weeks
                              if(row[0]) {
                                  week = row[0];
                              }
                              if(row[15]) {
                                  // At this point I want to quit my career as a programer
                                  if(week !== "Totals") {
                                    data.push({
                                        "last_name": row[1],
                                        "first_name": row[2],
                                        "fg_percent": row[3],
                                        "3pt_percent": row[4],
                                        "ft_percent": row[5],
                                        "points": parseInt(row[6]),
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
                                        "ppg": "NA",
                                        "game_week": week,
                                        "games_played": "NA",
                                        "team_name": team
                                    });
                                  }
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
    getWeek
};
