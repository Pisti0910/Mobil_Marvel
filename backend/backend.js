const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('kepek'));

// Hozz létre egy globális connection változót
var connection;

function kapcsolat() {
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'marvel2024'
    });
}

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/film', (req, res) => {
    kapcsolat(); // Készítsd el a kapcsolatot
    connection.connect()

    connection.query('SELECT * FROM film', (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).send("Hiba");
        } else {
            console.log(rows);
            res.status(200).send(rows);
        }
    });

    // Kapcsolat lezárása az aszinkron lekérdezés után nem jó itt
    connection.end(); 
});
app.post('/szavazatFelvitel', (req, res) => {
    kapcsolat(); // Készítsd el a kapcsolatot
    connection.connect()

    connection.query('insert into szavazat values (null,?)',[req.body.bevitel1], (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).send("Hiba");
        } else {
            console.log(rows);
            res.status(200).send("Sikeres szavazás!");
        }
    });

    // Kapcsolat lezárása az aszinkron lekérdezés után nem jó itt
    connection.end(); 
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});