var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const UserSchema = new Schema({
    _id : Schema.Types.ObjectId,
    playlist : [{
       song : {
         title : String,
         artist : String,
         ranking : String
       }
   }],
   invited : {
     user : Schema.Types.ObjectId
   }
});

// Export model.
module.exports = mongoose.model('User', UserSchema);
