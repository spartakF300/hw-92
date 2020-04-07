const express = require('express');
const bcrypt = require("bcrypt");
const axios = require('axios');
const router = express.Router();
const nanoid = require('nanoid');
const multer = require('multer');
const path = require('path');

const User = require('../model/User');
const config = require("../config");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});
const upload = multer({storage});

router.post('/',upload.single('avatar'), async (req, res) => {
    console.log(req.body);
    const userData = new User({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName:req.body.lastName
    });
    if (req.file){
        userData.avatar = req.file.filename
    }

    const user = new User(userData);
    try {
        user.generateToken();
        await user.save();
        return res.send(user)
    } catch (error) {
        return res.status(400).send(error)
    }
});
router.post('/sessions', async (req, res) => {
    const user = await User.findOne({username: req.body.username});
    if (!user) {
        return res.status(400).send({error: 'username or password not correct!!!'})
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
        return res.status(400).send({error: 'username or password not correct!!!'})
    }
    user.generateToken();
    await user.save();
    return res.send(user)
});

router.post('/facebook', async (req, res) => {
    try {
        const inputToken = req.body.accessToken;
        const accessToken = config.facebook.appId + '|' + config.facebook.appSecret;

        const url = `https://graph.facebook.com/debug_token?input_token=${inputToken}& access_token=${accessToken}`;

        const response = await axios.get(url);

        if (response.data.data.error) {
            return res.status(401).send({message: "Facebook token incorrect"})
        }

        if (req.body.id !== response.data.data.user_id) {
            return res.status(401).send({message: "Facebook user id incorrect"})
        }

        let user = await User.findOne({facebookId: req.body.id});

        if (!user) {
            const [firstName, lastName] = req.body.name.split(' ');

            user = new User({
                username: req.body.id,
                password: nanoid(),
                facebookId: req.body.id,
                firstName: firstName,
                lastName: lastName,
                avatar: req.body.picture.data.url
            });
        }
        user.generateToken();
        await user.save();
        return res.send(user);
    } catch (e) {
        return console.log(e)
    }


});

router.delete('/sessions', async (req, res) => {
    const success = {message: 'Success'};
    try {
        const token = req.get('Authorization').split(' ')[1];
        if (!token) return res.send(success);
        const user = await User.findOne({token});
        if (!user) return res.send(success);
        user.generateToken();
        await user.save();
        return res.send(success);
    } catch (e) {
        return res.send(e)
    }
});
module.exports = router;