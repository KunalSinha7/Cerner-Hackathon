var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const UserSchema = new Schema({
    _id : { type: Schema.Types.ObjectId },
    user_id : { type: String, required: true },
    songs : [{
      song_id : { type: String, required: true },
      ranking : { type: String }
    }]
});

// Export model.
module.exports = mongoose.model('User', UserSchema);
