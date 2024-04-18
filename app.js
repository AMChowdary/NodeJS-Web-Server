const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const { validatePassword } = require('./passwordValidator');
const app = express();
const PORT = 8080;

app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.post('/createFile', (req, res) => {
    const { filename, content, password } = req.body;

    if (!filename || !content) {
        return res.status(400).json({ error: 'Both filename and content are required.' });
    }

    if (!validatePassword(password)) {
        return res.status(400).json({ error: 'Invalid password.' });
    }

    fs.writeFile(filename, content, (err) => {
        if (err) {
            console.error(`Error creating file: ${err.message}`);
            return res.status(500).json({ error: 'Error creating file.' });
        }
        res.status(200).json({ message: 'File created successfully.' });
    });
});

app.get('/getFiles', (req, res) => {
    fs.readdir(__dirname, (err, files) => {
        if (err) {
            console.error(`Error reading directory: ${err.message}`);
            return res.status(500).json({ error: 'Error reading directory.' });
        }
        res.status(200).json({ files });
    });
});

app.get('/getFile/:filename', (req, res) => {
    const filename = req.params.filename;
    const password = req.query.password;
    if (!validatePassword(password)) {
        return res.status(400).json({ error: 'Invalid password.' });
    }

    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading file: ${err.message}`);
            return res.status(400).json({ error: 'File not found.' });
        }
        res.status(200).json({ content: data });
    });
});

app.put('/modifyFile/:filename', (req, res) => {
    const filename = req.params.filename;
    const { content, password } = req.body;
    if (!validatePassword(password)) {
        return res.status(400).json({ error: 'Invalid password.' });
    }

    fs.writeFile(filename, content, (err) => {
        if (err) {
            console.error(`Error modifying file: ${err.message}`);
            return res.status(500).json({ error: 'Error modifying file.' });
        }
        res.status(200).json({ message: 'File modified successfully.' });
    });
});

app.delete('/deleteFile/:filename', (req, res) => {
    const filename = req.params.filename;
    const password = req.query.password;

    if (!validatePassword(password)) {
        return res.status(400).json({ error: 'Invalid password.' });
    }

    fs.unlink(filename, (err) => {
        if (err) {
            console.error(`Error deleting file: ${err.message}`);
            return res.status(400).json({ error: 'File not found or unable to delete.' });
        }
        res.status(200).json({ message: 'File deleted successfully.' });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
