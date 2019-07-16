const express = require("express");
const bodyParser = require("body-parser");
const api = require("./api/api");
const mongoose = require('mongoose');
// const cors = require("cors");

const app = express();
// app.use(cors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use('/api/v1', api);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-type,Accept,x-access-token,X-Key"
  );
  if (req.method == "OPTIONS") {
    res.status(200).end();
  } else {
    next();
  }
});

const connectDB=() => {
  return mongoose.connect('mongodb+srv://admin:admin@dev-laa9e.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser:true})
    .then((res) => {
      console.log(' ########### Connected to mongoDB ###########');
    })
    .catch((err) => {
      console.log('Error in connecting to mongoDB' + err);
  });
}
connectDB().then(async () => {
  const port = process.env.port || 5000;
  app.listen(port, () => {
    console.log(`Server started on port`, port);
  });

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
})
