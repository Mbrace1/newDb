const { db} = require('.')
const {userData} = require('./seedData');
const {User} = require('../models')

let populateDataBase = async () => {
      await db.sync({ force: true });
      await Promise.all(userData.map((c) => {User.create(c)}))
  };
  
  let buildDB = async () => {
        await populateDataBase()
  }
  buildDB()

  module.exports = {buildDB}