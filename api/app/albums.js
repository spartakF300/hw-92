const express = require('express');
const router = express.Router();
const multer = require('multer');
const nanoid = require('nanoid');
const path = require('path');

const config = require('../config');
const Albums = require('../model/Album');
const checkUser = require('../middleware/checkUser');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');

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
    let albumsConfig = {isPublished: true};
    if (req.user && req.user.role === 'admin') {
        delete albumsConfig.isPublished
    }
    if (req.query.artist) {
        albumsConfig.artist = req.query.artist
    }

    try {
        const albums = await Albums.find(albumsConfig).populate('artist').sort({year: -1});
        res.send(albums)
    } catch (e) {
        res.status(404).send({message: 'Not found'});
    }

});

router.get('/:id',checkUser, async (req, res) => {
    let albumsConfig = {isPublished: true,_id:req.params.id};
    if (req.user && req.user.role === 'admin') {
        delete albumsConfig.isPublished
    }
    try {
        const albums = await Albums.findById(albumsConfig).populate('artist');
        res.send(albums)
    } catch (e) {
        res.status(404).send({message: 'Not found'});
    }

});

router.post('/',[auth, upload.single('image')], async (req, res) => {
    console.log(req.body);
    const albumData = req.body;

    if (req.file) {
        albumData.image = req.file.filename;
    }
    const album = new Albums(albumData);

    try {

        await album.save();
        return res.send({id: album._id})

    } catch (e) {

        return res.status(404).send(e);
    }

});
router.delete('/:id', [auth, permit('admin')], async (req, res) => {
    try {
        await Albums.deleteOne({_id: req.params.id});
        return res.status(200).send({message:'delete'});
    } catch {
        return res.status(400).send({message:'error'});
    }
});

router.post('/:id/publish', [auth, permit('admin')], async (req, res) => {
    try {
        const album = await Albums.findById(req.params.id);

        if(!album) {
            return res.status(404).send({message:'error'});;
        }

        album.isPublished = !album.isPublished;
        await album.save();

        return res.send(album);
    } catch {
        return res.status(400).send({message:'error'});
    }
});





module.exports = router;