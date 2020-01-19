const express = require('express');
const bodyParser = require('body-parser');
const { TeamMember } = require('./model');

const app = express();

app.use(bodyParser.json());

app.get('/team', async (req, res, next) => {
  const team = await TeamMember.findAll();

  return res.json(team);
});

app.post('/team', async (req, res, next) => {
  await TeamMember.create({ ...req.body });

  res.send('New member created');
});

module.exports = app;
