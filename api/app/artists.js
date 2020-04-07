const express = require('express');
const router = express.Router();
const Artists = require('../model/Artists');
const path = require('path');
const multer = require("multer");
const config = require("../config");
const nanoid = require('nanoid');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');
const checkUser = require('../middleware/checkUser');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});
const upload = multer({storage});

router.get('/',checkUser, async (req, res) => {
let artistData = {isPublished:true};
    if (req.user && req.user.role === "admin"){

    artistData = null
}
    const artists = await Artists.find(artistData);

    return res.send(artists);
});


router.post('/',[auth, upload.single('image')], async (req, res) => {

    const artistData = req.body;
    if (req.file) {
        artistData.image = req.file.filename
    }
    const artist = new Artists(artistData);
    try {
        await artist.save();
        return res.send({id: artist._id})
    } catch (e) {
        return res.status(400).send(e);
    }
});
router.post('/:id/publish', [auth, permit('admin')], async (req, res) => {
    try {
        const artist = await Artists.findById(req.params.id);

        if(!artist) {
            return res.sendStatus(404);
        }

        artist.isPublished = !artist.isPublished;
        await artist.save();

        return res.send(artist);
    } catch {
        return res.status(400).send({message:'error'});
    }
});
router.delete('/:id', [auth, permit('admin')], async (req, res) => {
    try {
        await Artists.deleteOne({_id: req.params.id});
        return res.status(200).send({message:'delete'});
    } catch {
        return res.status(400).send({message:'error'});
    }
});

module.exports = router;




