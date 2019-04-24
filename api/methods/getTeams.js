const {authorize, google} = require('./../config.js');
const { SHEET_ID } = require('./../variables.js');
const fs = require('fs');

let RANGE = 'League Standings!A2:C7';

const getTeams = () => {
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
                      "teams":[]
                  }
                  if (rows.length) {
                    rows.map((row) => {
                        const team = {
                            'name' : row[0],
                            'wins' : row[1],
                            'loss' : row[2]
                        }
                        data["teams"].push(team);
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
    getTeams
};
