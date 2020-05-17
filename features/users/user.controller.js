const express = require('express');
const router = express.Router();

const userService = require('./user.service');

// routes
router.post('/authenticate', authenticate);
router.post('/registration', register);
router.get('/forgot', forgot);
router.get('/', getAll);
router.put('/update', update);
router.delete('/:id', _delete);

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ?
            res.status(200).json({
                token: user.token,
                expires: user.expires
            }) :
            res.status(400).json({
                message: 'Email or password is incorrect'
            }))
        .catch(err => {
            console.log({ err })
            res.status(403).json({
                message: "You can't"
            })
        });
}

function register(req, res, next) {
    userService.create(req.body)
        .then(() =>
            res.status(201).json({
                message: "Registration success",
                result: req.body
            }))
        .catch(err => {
            console.log({ err })
            res.status(400).json({
                message: "Registration error"
            })
        });
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => {
            res.status(200).json({
                message: "Users found",
                result: users
            })
        })
        .catch(err =>{
            console.log({ err })
            res.status(404).json({
                message: "Users not found"
            })}
        );
}

function update(req, res, next) {
    userService.update(req.body)
        .then(() => res.status(400).json({ message: "User updated" }))
        .catch(err => {
            console.log({ err })
            res.status(400).json({
                message: "User not updated"
            })
        }
        );
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.status(200).json({
            message: "User deleted"
        }))
        .catch(err => res.status(400).json({
            message: "Fail to delete user"
        }));
}

function forgot(req, res, next) {
    userService.recoverPassword(req.query.email)
        .then(user => user ? res.status(200).json({ token: user.token }) : res.status(400).json({ message: 'User not found.' }))
        .catch(err => next(err));
}

module.exports = router;