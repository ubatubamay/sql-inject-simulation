const express = require('express');
const router = express.Router();
const db = require('../models/database')
const path = require('path');

router.get('/', (req, res, next) => {
  res.sendFile(path.join(
    __dirname, '..', '..', 'client', 'views', 'index.html'));
});

router.post('/api/v1/login', (req, res, next) => {
  // [INSECURE MODE] do not treat inputs
  const username = req.body.username
  const password = req.body.password

  // [SAFE MODE] add input validation to avoid injection text
  // const username = removeInsecureCharacters(req.body.username)
  // const password = removeInsecureCharacters(req.body.password)

  // [INSECURE MODE] build query concatenating variables
  const query = {
    text: "SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "'"
  }

  // [SAFE MODE] build query using pre-defined libary feature
  // const query = {
  //   text: 'SELECT * FROM users WHERE username = $1 AND password = $2',
  //   values: [username, password],
  // }

  db.query(query)
    .then(response => {
      console.log("QUERY SUCCESSFULLY")
      let row = response.rows[0];
      if (row) {
        return res.status(200).json({ message: "SUCCESS" });
      } else {
        return res.status(404).json({ message: "USER NOT FOUND" })
      }
      
    })
    .catch(e => console.error("LOGIN ERROR", e.stack))
});

function removeInsecureCharacters(text) {
  return password.replace(/[^a-z0-9]/gi,'');
}

module.exports = router;
