const Sequelize = require('sequelize');
//https://github.com/gayanMadurapperuma/AuthO.git
//127.0.0.1
//root
//root
//testAuth
const db = new Sequelize('testAuth', 'root', 'root', {
    host : '127.0.0.1',
    dialect : 'mysql',
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const user = db.define('user', {
    name : {
        type : Sequelize.STRING,
        allowNull : false,
        validate : {
            notEmpty : true
        }
    },
    username : {
        type : Sequelize.STRING,
        unique : true,
        allowNull : false,
        validate : {
            isEmail : true
        }
    },
    password : {
        type : Sequelize.STRING,
        allowNull : false,
        validate : {
            notEmpty : true
        }
    }
})

//exports module 
module.exports = {
    db : db,
    user : user
}