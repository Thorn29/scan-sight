const express = require('express');
const router = new express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db/database');
const auth = require('../middleware/auth');

router.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  const hash = bcrypt.hashSync(password, 8);

  db('users').returning('*').insert({ name, email, password: hash })
  .then(response => {
    const { id } = response[0];
    const token = jwt.sign({ id: id }, process.env.JWT_SECRET);
    const userData = { id, name, token };
    res.status(200).send(userData);
  })
  .catch(err => res.status(400).send('Bad request (e-mail must be unique)'));
});

router.post('/signin', (req, res) => {
    db('users').where({ email: req.body.email }).select('*')
    .then(response => {
      if (response.length === 0) reject();

      const { id, name, password } = response[0];
      const isValid = bcrypt.compareSync(req.body.password, password);

      if (!isValid) reject();

        const token = jwt.sign({ id: id }, process.env.JWT_SECRET);
        const userData = { id, name, token };
        return res.status(200).send(userData);
    })
    .catch(err => res.status(404).send('Invalid credentials'));
});

router.get('/user', auth, (req, res) => {
  res.send(req.user);
});

module.exports = router;
