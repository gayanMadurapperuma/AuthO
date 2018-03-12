const express = require('express');
const router = express.Router();
const {user} = require('../db/db');

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

module.exports = router;