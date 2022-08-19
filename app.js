const {buildDB} = require('./db/addSeedData')
const express = require('express')
const { User, Show } = require('./models')
const app = express()
buildDB()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/', async (req, res) => {
    res.send("homepage")
})

//  find all users
app.get('/users/', async (req,res) => {
    const allUsers = await User.findAll()
    res.send(allUsers)
})

// find one user when provided user name, spaces must be -
app.get('/users/:user', async (req, res) => {
    // two names so Jonah%20West is instead jonah-west
    // api will only work with - separation
    const name = req.params.user.toString()
    const nameSplit = name.split('-')
    const firstName = nameSplit[0].charAt(0).toUpperCase() + nameSplit[0].slice(1);
    const lastName = nameSplit[1].charAt(0).toUpperCase() + nameSplit[1].slice(1);

    const combinedName = firstName + " " + lastName
    const userData = await User.findOne({where: {name: combinedName}})

    if (userData) {
        res.send(userData)
    } else {
        res.send("resource not found")
    }
})

//  find the shows a user has watched
app.get('/shows-watched/:user', async (req, res) => {
    const name = req.params.user.toString()
    const nameSplit = name.split('-')
    const firstName = nameSplit[0].charAt(0).toUpperCase() + nameSplit[0].slice(1);
    const lastName = nameSplit[1].charAt(0).toUpperCase() + nameSplit[1].slice(1);

    const combinedName = firstName + " " + lastName
    const userData = await User.findOne({where: {name: combinedName}})
    const userShows = await userData.getShows()
    if (userShows) {
        res.send(userShows)
    } else {
        res.send("resource not found")
    }
})

// find all shows
app.get('/shows/', async (req, res) => {
    const allShows = await Show.findAll();
    res.send(allShows)
})

// find one show when provided show name, spaces must be -
app.get('/shows/:show', async (req, res) => {
    const name = req.params.show.toString()
    const nameSplit = name.split('-')
    const databaseName = nameSplit.reduce((a,b) =>
     a.charAt(0).toUpperCase() + a.slice(1) + " " 
     + b.charAt(0).toUpperCase() + b.slice(1))

    const show = await Show.findOne({where: {name: databaseName}});

    if (show) {
        res.send(show)
    } else {
        res.send("resource not found")
    }
})

//  find all shows with same genre
app.get('/shows-with-genre/:genre', async (req, res) => {
    const genre = req.params.genre.toString().toLowerCase()
    const shows = await Show.findAll({where: {genre: genre}});
    res.send(shows)
})

//  update a show
app.put('/shows/:id', async (req,res) => {
    const newShowStatus = await Show.update(
        req.body,
        {where: {id: req.params.id}}
    )
    const shows = await Show.findAll();
    res.send(shows)
})

//  delete a show
app.delete('/shows/:id', async (req,res) => {
    const deletedShow = await Show.destroy(
        {where: {id: req.params.id}}
    )
    const shows = await Show.findAll();
    res.send(shows)
})


//  add a new show
app.post('/shows/', async (req,res) => {
    await Show.create(req.body)
    const shows = await Show.findAll();
    res.send(shows)
})

//  add a new user
app.post('/users/', async (req,res) => {
    await User.create(req.body)
    const users = await User.findAll();
    res.send(users)
})

const port = 3000
app.listen(port, () => {
    console.log(`server listening at http://localhost:${port}`)
})
