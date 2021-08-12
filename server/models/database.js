const { Client } = require("pg")
const dbConfig = {
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "123456789",
  port: 5432
}

const client = new Client(dbConfig)
client.connect()
  .then(() => console.log('DB CONNECTED'))
  .catch(err => console.error('DB CONNECTION ERROR', err.stack))

const query = `CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY, 
  username VARCHAR(40) not null, 
  "password" VARCHAR(40) not null)`
client.query(query)
  .then(response => {
    if (response.rows.length === 0) 
      return console.log("TABLE users ALREADY EXISTS")
    return console.log("TABLE users CREATED") 
  })
  .catch(e => console.error("ERROR ON CREATE users TABLE", e.stack))

module.exports = client
