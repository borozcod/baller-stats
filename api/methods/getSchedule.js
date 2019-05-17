const {authorize, google} = require('./../auth.js');
const { SHEET_ID } = require('./../variables.js');
const fs = require('fs');

let RANGE = 'League Schedule!A2:D';

const getSchedule = () => {
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
                    schedule: []
                  };
                  var day = '';
                  var index = -1;
                  if (rows.length) {
                    rows.map((row) => {
                        // Only apply for set game weeks
                        if(row[2] !== 'No Games') {
                            if(row[0]) {
                                index++;
                                day = row[0];
                                const obj = {};
                                obj[day] = [];
                                data.schedule[index] = obj;
                                data.schedule[index][day] = [];
                                
                            }
                            data.schedule[index][day].push({
                                'time': row[1],
                                'away': row[2],
                                'home': row[3]
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
    getSchedule
};
