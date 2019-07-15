const User = require('mongo/blogSchema');
exports.createUser = (req, res, next) => {
  const user = new User({
    _id : new mongoose.Types.ObjectId,
    playlist : [{
       song : {
         title : 'Fun fun fun',
         artist : 'Fun people',
         ranking : 'A'
       },
       song : {
         title : 'Fun fun nope',
         artist : 'Less fun people',
         ranking : 'C'
       }
    }],
    invited : {
      user : new mongoose.Schema.Types.ObjectId
    }
  });
}
