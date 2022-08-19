const {DataTypes, db} = require('../db');

const Show = db.define('show', {
  name: DataTypes.STRING,
  status: DataTypes.BOOLEAN,
  rating: DataTypes.INTEGER,
  genre: DataTypes.STRING,
});

module.exports = {Show};