const {buildDB} = require('./db/addSeedData')
const express = require('express')
const { User } = require('./models')
const app = express()

app.get('/', async (req, res) => {
    res.send("test")
})

app.get('/users/:user', async (req, res) => {
    // two names so Jonah%20West is instead jonah-west
    // api will only work with - separation
    const name = req.params.user.toString()
    const nameSplit = name.split('-')
    const firstName = nameSplit[0].charAt(0).toUpperCase() + nameSplit[0].slice(1);
    const lastName = nameSplit[1].charAt(0).toUpperCase() + nameSplit[1].slice(1);

    const combinedName = firstName + " " + lastName
    console.log(combinedName)
    const userData = await User.findOne({where: {name: combinedName}})

    if (userData) {
        res.send(userData)
    } else {
        res.send("resource not found")
    }
})

const port = 3000
app.listen(port, () => {
    console.log(`server listening at http://localhost:${port}`)
})
