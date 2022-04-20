const mongoose = require("mongoose");

const connect = () => {
  return mongoose.connect(
    "mongodb+srv://anjuman:anjuman@cluster0.jn3ct.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );
};

module.exports = connect;

  // OR

// const mongoDB = "mongodb://localhost:27017/apartmentmanagement";
// module.exports = () => mongoose.connect(mongoDB)