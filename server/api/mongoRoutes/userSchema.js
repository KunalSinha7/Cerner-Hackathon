const Schema = mongoose.Schema;
const userSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    playlist : [{
       song : {
         title : String,
         artist : String,
         ranking : String
       }
   }],
   invited : {
     user : mongoose.Schema.Types.ObjectId
   }
});
module.exports = mongoose.model('User', userSchema);
