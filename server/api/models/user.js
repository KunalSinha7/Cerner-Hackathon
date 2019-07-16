var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const UserSchema = new Schema({
    _id : { type: Schema.Types.ObjectId },
    user_id : { type: Number, required: true },
    song_id : { type: Number, required: true },
    ranking : { type: String }
});

// Export model.
module.exports = mongoose.model('User', UserSchema);
