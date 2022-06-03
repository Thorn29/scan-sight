const db = require('../db/database.js');
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const rawToken = req.header('Authorization');
  if (!rawToken) return res.status(400).send('Not authenticated');

  const token = rawToken.replace('Bearer ', '');
  const data = jwt.verify(token, process.env.JWT_SECRET);
  if (!data.id) return res.status(400).send('Invalid user')

    db('users').where({ id: data.id }).select('id', 'name')
    .then(response => {
      req.user = response[0];
      next();
    }).catch(err => res.status(500).send('Invalid user'));
}

module.exports = authMiddleware;
