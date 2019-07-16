var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const UserSchema = new Schema({
    user_id : { type: Number, required: true },
    songs : [{
      song_id : { type: Number, required: true },
      ranking : { type: String }
    }]
});

// Export model.
module.exports = mongoose.model('User', UserSchema);
