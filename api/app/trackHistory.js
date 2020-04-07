const express = require('express');
const router = express.Router();
const TrackHistory = require('../model/TrackHistory');
const auth = require('../middleware/auth');

router.get('/',auth,async (req,res)=>{
   try{
       const trackData = await TrackHistory.find({user:req.user._id}).sort({datetime:-1}).populate({
           path: 'track',
           populate:{
               path:'album',
               populate:{
                 path: 'artist'
               }

           }
       });
       res.send(trackData)
   }catch (error) {
       res.status(500).send({error: error})
   }

});

router.post('/',auth, async (req, res) => {

    const trackData = req.body;
    trackData.user = req.user._id;
    try {
        const trackHistory = new TrackHistory(trackData);
        await trackHistory.save();
        return  res.send({id:trackHistory._id})
    } catch (error) {
        return res.status(400).send({error: error})
    }
    
    
});
module.exports = router;