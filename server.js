const express = require('express');
const path = require('path');
const db = require("./db/db.json");

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', (req, res) => res.json(db));

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received`);
    const { title, text } = req.body;
    if (title && text) {
        const newNote = {
            title,
            text
        };
        const response = {
            status: 'succes',
            body: newNote,
        };

        console.log(response)
        res.status(201).json(response);
    } else {
        res.status(500).json('Error in posting new note');
    }
});


app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);