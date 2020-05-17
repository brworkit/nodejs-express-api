const config = require('../../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../../shared/db');
const User = db.User;
const TOKEN_EXPIRE_MILLISECONDS = 18000;

module.exports = {
    authenticate,
    getAll,
    create,
    update,
    getById,
    recoverPassword,
    delete: _delete
};
 
async function authenticate({ email, password }) {
    const user = await User.findOne({ email });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: TOKEN_EXPIRE_MILLISECONDS });
        return {
            ...userWithoutHash,
            token
        };
    }
}

async function getAll() {
    return await User.find().select('-hash');
}

async function getById(id) {
    return await User.findById(id).select('-hash');
}

async function create(userParam) {
    // validate
    if (await User.findOne({ username: userParam.email })) {
        throw 'Email "' + userParam.email + '" is already taken';
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();
}

function isMatchOfPassword(user) {
    return user.password === user.confirmPassword;
}

async function update(userParam) {
    // console.log({userParam});

    const user = await User.findOne({ email: userParam.email });

    // validate
    if (!user) throw 'User not found';
    
    if(!isMatchOfPassword(userParam)) {
        throw 'Typed passwords do not match';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}
 
async function _delete(id) {
    await User.findByIdAndRemove(id);
}

async function recoverPassword(email) {
    const user = await User.findOne({ email: email });
 
    if (user) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: TOKEN_EXPIRE_MILLISECONDS });
        return {
            ...userWithoutHash,
            token
        };
    } 
}

