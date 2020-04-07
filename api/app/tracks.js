const express = require('express');
const router = express.Router();
const Albums = require('../model/Album');
const checkUser = require('../middleware/checkUser');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');
const Track = require('../model/Track');


router.get('/', checkUser, async (req, res) => {
    let trackConfig = {isPublished: true};
    if (req.user && req.user.role === 'admin') {
        delete trackConfig.isPublished
    }

    if (req.query.album) {
        trackConfig.album = req.query.album
    }

    try {
        const tracks = await Track
            .find(trackConfig)
            .sort('number');

        return res.send(tracks);
    } catch (e) {
        return res.status(404).send(e);
    }

});

router.post('/', auth, async (req, res) => {

    try {
        const tracks = await Track.find();
        req.body.number = tracks.length + 1;
        const track = new Track(req.body);
        track.save();
        res.send({_id: track._id})
    } catch (e) {
        res.status(404).send(e);
    }

});
router.delete('/:id', [auth, permit('admin')], async (req, res) => {
    try {
        await Track.deleteOne({_id: req.params.id});
        return res.status(200).send({message: 'delete'});
    } catch {
        return res.status(400).send({message: 'error'});
    }
});
router.post('/:id/publish', [auth, permit('admin')], async (req, res) => {
    try {
        const track = await Track.findById(req.params.id);

        if (!track) {
            return res.status(404).send({message: 'error'});
        }

        track.isPublished = !track.isPublished;
        await track.save();

        return res.send(track);
    } catch {
        return res.status(400).send({message: 'error'});
        ;
    }
});


module.exports = router;