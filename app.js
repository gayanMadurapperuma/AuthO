const express = require('express');
const bodyParser = require('body-parser');
const user = require('./user/user');
const db = require('./db/db').db;

const app = express();
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.use('/api/user', user);

app.listen(3000, () => {
    console.log('Server start at port 3000');
    db.sync({force : false}).then(msg => {
        console.log('Database sync');
    })
})