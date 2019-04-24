const {authorize, google} = require('./../config.js');
const { SHEET_ID } = require('./../variables.js');
const fs = require('fs');

const range = {
    "1": "Just Du It!A2:S",
    "2": "Clay-mores!A2:C7",
    "3": "Kai-ser Rolls!A2:C7",
    "4": "LemMon-ade!A2:C7",
    "5": "The Carroll-ers!A2:C7",
    "6": "Average Joe's!A2:C7"
};

const getTeam = (teamID) => {

    return new Promise(function(resolve, reject){
        fs.readFile('secret.json', (err, content) => {
            if (err) return console.log('Error loading client secret file:', err);
            // Authorize a client with credentials, then call the Google Sheets API.
            authorize(JSON.parse(content), (auth) => {
                const sheets = google.sheets({ version: 'v4', auth });
                sheets.spreadsheets.values.get({
                  spreadsheetId: SHEET_ID,
                  range: range[teamID],
                }, (err, res) => {
                  if (err) return console.log('The API returned an error: ' + err);
                  const rows = res.data.values;
                  const data = {}
                  if (rows.length) {
                    rows.map((row) => {
                        // const team = {
                        //     row[0] : row[0]
                        // }
                        data[row[0] + row[1]] = {
                            first_name: row[0],
                            last_name: row[1]
                        }
                        //data["teams"].push(team);
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
    getTeam
};
