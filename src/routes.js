const express = require('express');
const OngsController = require('./Controllers/OngsController');
const IncidentsController = require('./Controllers/IncidentController');
const ProfileController = require('./Controllers/ProfileController');
const SessionController = require('./Controllers/SessionController');

const app = express.Router();

app.post('/session',SessionController.create);

app.post('/ongs', OngsController.create);
app.get('/ongs', OngsController.select);

app.get('/profile', ProfileController.index);

app.post('/incidents', IncidentsController.create);
app.get('/incidents', IncidentsController.select);
app.delete('/incidents/:id',IncidentsController.remove);
module.exports = app;