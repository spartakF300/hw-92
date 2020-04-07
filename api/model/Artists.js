const mongoose = require('mongoose');

const ArtistSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    image: String,

    info: String,
    isPublished: {
        type: Boolean,
        default: false,
    }

});
const Artist = mongoose.model('Artist',ArtistSchema);

module.exports = Artist;