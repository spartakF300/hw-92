const User = require('../model/User');
const checkUser = async (req, res, next) => {

    const header = req.get('Authorization');
    if (!header) {
        return next();
    }
    const [type, token] = header.split(' ');
    if (type !== 'Token' || !token) {
        return next()
    }
    const user = await User.findOne({token});

    if (!user) {
        return next();
    }
    req.user = user;
    next();
};
module.exports = checkUser;