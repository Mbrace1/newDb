const {User} = require('./User')
const {Show} = require('./Show')

//  here you would do belongsTo etc for table relationships
User.belongsToMany(Show, {through: "showsWatched"});
Show.belongsToMany(User, {through: "showsWatched"});

module.exports = {
    User, Show
};