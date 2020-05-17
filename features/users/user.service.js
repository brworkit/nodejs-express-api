const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const config = require('../../config.json');
const db = require('../../shared/db');

const User = db.User;

module.exports = {
    authenticate,
    getAll,
    create,
    update,
    getByEmail,
    delete: _delete
};
 
async function authenticate({ email, password }) {
    
    const user = await User.findOne({ email: email });
    console.info({user})

    if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.email }, config.secret, { expiresIn: config.JWTTokenExpiresIn });
        const expires = config.JWTTokenExpiresIn;
        return {
            ...userWithoutHash,
            token,
            expires
        };
    }
}

async function getAll() {    
    return await User.find().select('-hash -__v');
}

async function getByEmail(email) {
    return await User.findOne({email: email}).select('-hash');
}

async function create(userParam) {
    console.info({userParam})
    // validate
    if (await User.findOne({ username: userParam.email })) {
        throw 'Email "' + userParam.email + '" is already taken';
    }

    const user = new User(userParam);

    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();
}

async function update(userParam) {
    // console.log({userParam});
    const user = await User.findOne({ email: userParam.email });

    // validate
    if (!user) throw 'User not found';
    
    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}
 
async function _delete(id) {
    await User.findByIdAndDelete(id);
}
