var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const UserSchema = new Schema({
<<<<<<< Updated upstream
    _id : { type: Schema.Types.ObjectId },
    user_id : { type: Number, required: true },
    song_id : { type: Number, required: true },
    ranking : { type: String }
=======
    _id : Schema.Types.ObjectId,
    user_id : Number,
    song_id : Number,
    ranking : String
>>>>>>> Stashed changes
});

// Export model.
module.exports = mongoose.model('User', UserSchema);
