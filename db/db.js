const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
//https://github.com/gayanMadurapperuma/AuthO.git
//127.0.0.1
//root
//root
//testAuth
const db = new Sequelize('AuthTest', 'root', 'root', {
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

var user = db.define('user', {
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
},{
    getterMethods : {
        fullName : function () {
            return this.name + ' fullName'
        }
    }
    // instanceMethods : {
    //     generateAuthToken : function() {
    //        //user = this;
    //        console.log('Inside the function')
    //        //return 'Hello';
    //        ////console.log('GenerateAuthToken',user); 
    //     }
    // }
});

user.prototype.getAuth = function(){
    //console.log(this.user.);
    const token = jwt.sign({id : this.id, access : 'auth'}, 'abc123');
    // Authentication.create({
    //     access : 'auth',
    //     token : token,
    //     userId : this.id 
    // }.then(auth => {
    //     console.log(auth)
    //     //return auth;
    // }))
    return token;
    //return 
    //return this.id;
}

var school = db.define('school', {
    name : {
        type : Sequelize.STRING,
        allowNull : false,
        validate : {
            notEmpty : true
        }
    },
    courses : {
        type : Sequelize.STRING,
        allowNull : false,
        validate : {
            notEmpty : true
        }
    }
});

var Authentication = db.define('Authentication', {
    access : {
       type : Sequelize.STRING,
       allowNull : false,
       validate : {
           notEmpty : true
       } 
    },
    token : {
       type : Sequelize.STRING,
       allowNull : false,
       validate : {
           notEmpty : true
       } 
    }
}, {
    instanceMethods : {

    },
    classMethods : {

    }
});

//user.belongsToMany(school);
user.hasMany(Authentication);
//Authentication.belongsToMany(user, {through : user});
// user.create({
//     name : 'gayan2',
//     username : 'gayan2@gmail.com',
//     password : '123123'
// });

// school.setuser({schoolId : 1}).then((sc) => {
//     console.log(sc);
// })
//exports module 
module.exports = {
    db : db,
    user : user,
    school : school,
    auth : Authentication
}