const { db} = require('.')
const {userData, showData} = require('./seedData');
const {User, Show} = require('../models')

let populateDataBase = async () => {
      await db.sync({ force: true });
      await Promise.all(userData.map((c) => {User.create(c)}))
      await Promise.all(showData.map((c) => {Show.create(c)}))

      const allUsers = await User.findAll()
      const allShows = await Show.findAll()
      await allUsers[0].addShow(allShows[1])    
      await allUsers[1].addShow(allShows[1])
      await allUsers[1].addShow(allShows[2])
      await allUsers[2].addShow(allShows[0])
      await allUsers[3].addShow(allShows[0])
      await allUsers[3].addShow(allShows[1])
      await allUsers[3].addShow(allShows[2])
      await allUsers[3].addShow(allShows[3])
  };
  
  let buildDB = async () => {
        await populateDataBase()
  }

  module.exports = {buildDB}