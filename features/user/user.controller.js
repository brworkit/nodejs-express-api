const express = require('express');
const router = express.Router();
const userService = require('./user.service');
 
// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/forgot', forgot);
router.get('/', getAll);
router.put('/update', update);
router.delete('/:id', _delete);
  
function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username/email or password is incorrect' }))
        .catch(err => next(err));
}

function register(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function update(req, res, next) {
    userService.update(req.body)
        .then(() => res.json({message: "Password updated!"}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function forgot(req, res, next) {
    userService.recoverPassword(req.query.email)
    .then(user => user ? res.status(200).json({ token: user.token }) : res.status(400).json({ message: 'User not found.' }))
    .catch(err => next(err));
}

module.exports = router;