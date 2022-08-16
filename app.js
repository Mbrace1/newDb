const {buildDB} = require('./db/addSeedData')
const express = require('express')
const { User } = require('./models')
const app = express()

app.get('/', async (req, res) => {
    res.send("test")
})


const port = 3000
app.listen(port, () => {
    console.log(`server listening at http://localhost:${port}`)
})
