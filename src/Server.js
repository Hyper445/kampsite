const axios = require('axios');
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const XLSX = require('xlsx');
const xslx = require('node-xlsx');
require('dotenv').config();
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const app = express();
app.use(cors());
app.use(bodyParser.json());

dotenv.config({path: '../.env'});


const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });
  
// Set up multer for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const folder = req.params.folder || '';
      console.log(folder);
      cb(null, `design/images/${folder}`);
    },
    filename: function (req, file, cb) {
      cb(null, req.params.name + ".png");
    },
});

const upload = multer({storage: storage});

// Handle file upload
app.post('/upload/:folder/:name', upload.single('file'), (req, res) => {
    res.status(200).send('File uploaded successfully');
});

app.use('/images', express.static(path.join(__dirname, 'images')));

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log(`Connected to database ${process.env.DB_DATABASE}`);
  }
});

app.listen(3001, '0.0.0.0', () => {
    console.log('Server is running on 0.0.0.0:3001');
    console.log(process.env.DB_HOST);
});

app.get('/api/getData', (req, res) => {
    // Use the db connection to query the database
    db.query(`SELECT text
              FROM pageText
              where page = 'home'`, (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            res.status(500).json({error: 'Database error'});
        } else {
            res.json(results);
        }
    });
});

app.get('/api/getContact', (req, res) => {
    // Use the db connection to query the database
    db.query(`SELECT text
              FROM pageText
              where page = 'contact'`, (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            res.status(500).json({error: 'Database error'});
        } else {
            res.json(results);
        }
    });
});

app.get('/api/getTeam/:id', (req, res) => {

    const id = req.params.id;
    console.log(id);

    // Use the db connection to query the database
    db.query(`SELECT *
              FROM teams
              WHERE ID = '${id}'`, (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            res.status(500).json({error: 'Database error'});
        } else {
            res.json(results);
        }
    });
});

app.get('/api/getTeams', (req, res) => {
    // Use the db connection to query the database
    db.query(`SELECT *
              FROM teams
              ORDER BY type, nummer`, (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            res.status(500).json({error: 'Database error'});
        } else {
            res.json(results);
        }
    });
});

app.get('/api/getMembers/:id', (req, res) => {

    const id = req.params.id;

    // Use the db connection to query the database
    db.query(`SELECT *
              FROM leden
              where team_ID = '${id}'`, (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            res.status(500).json({error: 'Database error'});
        } else {
            res.json(results);
        }
    });
});

app.get('/api/getText/:page', (req, res) => {

    const id = req.params.page;

    if (id === 'all') {
        // Use the db connection to query the database
        db.query("SELECT page FROM `pageText`", (err, results) => {
            if (err) {
                console.error('Error querying the database:', err);
                res.status(500).json({error: 'Database error'});
            } else {
                res.json(results);
            }
        });
        return;
    }

    // Use the db connection to query the database
    db.query(`SELECT text
              FROM pageText
              where page = '${id}'`, (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            res.status(500).json({error: 'Database error'});
        } else {
            res.json(results);
        }
    });
});


app.post('/api/setText', (req, res) => {

    const {page, data} = req.body;

    console.log(page);

    if (!page || !data) {
        return res.status(400).json({error: 'Page name and new text are required'});
    }

    // Use parameterized query to prevent SQL injection
    db.query('UPDATE pageText SET text = ? WHERE page = ?', [data, page], (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            res.status(500).json({error: 'Database error'});
        } else {
            res.json({success: true, results});
        }
    });
});

app.post('/api/updateTeam', (req, res) => {

    console.log(req.body);
    const members = req.body.members;
    const quote = req.body.quote;
    const team = req.body.team;

    let query = `UPDATE teams
                 SET quote = '${quote}'
                 WHERE ID = ${team.ID}`;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error updating team:', err);
        } else {
            console.log('Team updated successfully:', results);
        }
    });

    members.forEach((member) => {

        query = 'UPDATE leden SET voornaam = ?, achternaam = ?, positie = ? WHERE ID = ?';

        db.query(query, [member.voornaam, member.achternaam, member.positie, member.ID], (err, results) => {
            if (err) {
                console.error('Error updating member:', err);
            } else {
                console.log('Member updated successfully:', results);
            }
        });
    });
});

app.post('/api/saveTeam', (req, res) => {
    const team = req.body;
    console.log(team);

    const query = 'INSERT INTO teams (nummer, type, klasse) VALUES (?, ?, ?)';

    db.query(query, [team.nummer, team.type, team.klasse], (err, results) => {
        if (err) {
            console.error('Error inserting team:', err);
            res.status(500).json({error: 'Internal Server Error'});
        } else {
            console.log('Team inserted successfully:', results);
            res.status(200).json({success: true});
        }
    });
});

app.post('/api/addMember', (req, res) => {
    const member = req.body;
    console.log(member);

    const query = 'INSERT INTO leden (team_ID, voornaam, achternaam, positie) VALUES (?, ?, ?, ?)';

    db.query(query, [member.team_ID, member.voornaam, member.achternaam, member.positie], (err, results) => {
        if (err) {
            console.error('Error inserting team:', err);
            res.status(500).json({error: 'Internal Server Error'});
        } else {
            console.log('Team inserted successfully:', results);
            res.status(200).json({success: true});
        }
    });
});

app.delete('/api/deleteMember/:id', (req, res) => {
    const playerId = req.params.id;

    const query = 'DELETE FROM leden WHERE ID = ?';

    db.query(query, [playerId], (err, results) => {
        if (err) {
            console.error('Error deleting player:', err);
            res.status(500).json({error: 'Internal Server Error'});
        } else {
            console.log('Player deleted successfully:', results);
            res.status(200).json({success: true});
        }
    });
});

app.get('/api/getFeed/:team', (req, res) => {

    var id;
    var backendUrl;

    var gender;

    if (req.params.team !== "all") {

        id = req.params.team;
        if (id[0] === "H") gender = "heren"; else gender = "dames";
        backendUrl = `https://api.nevobo.nl/export/team/CKL7K23/${gender}/${id[1]}/resultaten.xlsx`;
    } else {
        backendUrl = "https://api.nevobo.nl/export/vereniging/CKL7K23/programma.xlsx";
    }

    // Use the db connection to query the database
    axios.get(backendUrl, {responseType: 'arraybuffer'})

        .then(response => {
            const excelData = response.data;

            const buffer = Buffer.from(excelData, 'binary');

            const workbook = XLSX.read(buffer, {type: 'buffer'});
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            const rows = XLSX.utils.sheet_to_json(sheet, {header: 1});

            res.send(rows);

        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });


});

app.get('/api/getSchedule', (req, res) => {
    const {week, day} = req.query;

    // Use the db connection to query the database
    db.query(`SELECT *
              FROM training
              WHERE even_week = ?
                AND dag = ?`, [week, day], (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            res.status(500).json({error: 'Database error'});
        } else {
            res.json(results);
        }
    });
});

app.post('/api/saveSchedule', (req, res) => {
    const {tableData, even, day} = req.body;

    tableData.forEach((row) => {

        for (let i = 1; i < 5; i++) {

            const query = "UPDATE training SET team = ? WHERE even_week = ? AND dag = ? AND tijd = ? AND veld = ?";

            // const query = 'INSERT INTO training (even_week, tijd, dag, team, veld) VALUES (?, ?, ?, ?, ?)';

            db.query(query, [row['field' + i], even, day, row.time, i], (err, results) => {
                if (err) {
                    console.error('Error updating member:', err);
                } else {
                    console.log('Member updated successfully:', results);
                }
            });
        }


    });

});

app.get('/api/getActivities', (req, res) => {

    // Use the db connection to query the database
    db.query(`SELECT *
              FROM agenda
              WHERE datum < curdate()
              ORDER BY datum DESC LIMIT 20`, (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            res.status(500).json({error: 'Database error'});
        } else {
            res.json(results);
        }
    });
});

app.get('/api/getCredentials', (req, res) => {

    // Use the db connection to query the database
    db.query(`SELECT *
              FROM inlog`, (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            res.status(500).json({error: 'Database error'});
        } else {
            res.json(results);
        }
    });
});

