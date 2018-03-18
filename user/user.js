const express = require('express');
const router = express.Router();
const {user,school,auth} = require('../db/db');

router.get('/', (req, res) => {
    user.findAll().then(users => {
        // if (err) 
        //    return res.status(400).send('Something went wrong');
        return res.send(users);
    }).catch(e => {
       return res.status(400).send('Something went wring')
    })
});

router.post('/add', (req,res) => {
    user.create(req.body).then(sv => {
        res.send(sv);
    }).catch(e => {
        res.status(400).send('bad request ' + e);
    })
})

router.post('/school', (req, res) => {
    school.create(req.body).then(sch => {
        res.send(sch);
    }).catch(e => {
        res.status(400).send('bad request ' + e);
    }) 
})

router.put('/:id/school', (req,res) => {
    user.findById(req.params.id).then(fountUser => {
        if (!fountUser){
            return res.status(404);
        }
        return fountUser.setschool(req.body.schoolId)
        //console.log(JSON.stringify(fountUser,undefined,2))})
    }).then(console.log(JSON.stringify(res,undefined,2)))
    // }).then(res.send(res)).catch(e => {
    //     res.status(400).send('bad request ' + e);
    // })
})

router.get('/:id', (req, res) => {
    user.findById(req.params.id).then(foundUser => {
        if (!foundUser)
            return res.status(404).send();
        //console.log(foundUser);
        console.log('GenAuth',foundUser.getAuth());
        auth.create({
            access : 'auth',
            token : foundUser.getAuth(),
            userId : foundUser.id 
        }).then(token => {
            return res.header('x-auth', token.token).send(foundUser);
        })     
    }).catch(e => {
        console.log(e);
        return res.status(400).send(e);
    })
})

router.get('/get', (req,res) => {
    //console.log('authGet');
    auth.findAll().then(auths => {
        if (!auths)
            return res.status(404).send('not found auth')
        return res.send(auths);
    }).catch(e => {
        res.status(400).send(e);
    })
    // auth.findAll().then(getAuth => {
    //     return res.send(getAuth);
    // }).catch(e => {
    //     console.log(e);
    //     res.status(400).send();
    // })
    
})

router.post('/auth', (req,res)=> {
    auth.create({
                access : 'auth',
                token : 'this' 
    }).then(token => {
        res.send(token);
    }).catch(e => {
        res.status(400).send();
    })
    // auth.create({
    //     access : 'auth',
    //     token : 'this' 
    // }.then(token => {
    //     return res.send(token);
    // }));
})

router.post('/login', (req,res) => {
    
});

module.exports = router;