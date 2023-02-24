const users_data = require('../../utils/users_data.js')
const {User} = require('../../db.js')

const saveUsersData = () => {
    users_data.forEach(d=>{
        User.findOrCreate({
            where: {username: d.username, password: d.password}
        })
    })
}

module.exports = {saveUsersData}