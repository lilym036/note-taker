const express = require('express');
const path = require('path');
const db = require("./db/db.json");
const fs = require('fs');
const uuid = require('./helpers/uuid');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', (req, res) => res.json(db));

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received`);
    const saveNote = db;
    const { title, text } = req.body;
    const newNote = {
        title,
        text,
        id: uuid(),
    };
    saveNote.push(newNote);
    fs.writeFileSync(`./db/db.json`, JSON.stringify(saveNote, null, 3));
    res.json(saveNote);
})

app.delete('/api/notes/:id', (req, res) => {
    const saveNote= db;
    const noteId= req.params.id;
    for (i=0; i< saveNote.length; i++) {
        if (saveNote[i].id === noteId) {
            saveNote.splice(i, 1)
        }
    }
    fs.writeFileSync(`./db/db.json`, JSON.stringify(saveNote));
    res.json(saveNote);
})



app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);