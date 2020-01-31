const router = require('express').Router();

const Users = require('./users-model');
const authenticate = require('../auth/authenticate-middleware');

router.get('/', authenticate, (req, res) => {
    Users.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => res.send(err));
});

module.exports = router;