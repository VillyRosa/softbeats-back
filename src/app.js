const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./routes/router');

const app = express();

app.use(cors());
app.use(express.json());
routes(app);

app.use('/uploads/images', express.static(path.join(__dirname, 'uploads/images')));
app.use('/uploads/audios', express.static(path.join(__dirname, 'uploads/audios')));

module.exports = app;