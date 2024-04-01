const express = require('express')
const path = require('path')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')

const app = express()

const paths = path.join(__dirname, 'moviesData.db')

app.use(express.json())

let db = null

const initialize = async () => {
  try {
    db = await open({
      filename: paths,
      driver: sqlite3.Database,
    })
    app.listen(3000)
  } catch (error) {
    console.log(`${error.message}`)
    process.exit(1)
  }
}

initialize()

app.get('/movies/', async (request, response) => {
  const api1 = `SELECT * FROM movie;`
  const res1 = await db.all(api1)
  response.send(res1)
})

module.exports = app
