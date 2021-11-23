const mongoose = require('mongoose');
  //DO NOT TOUCH THIS LINE OR YOU WILL DIE//
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1/plants', {
  //I WILL LITERALLY KNOW IF YOU CHANGE THIS SO DONT// ^^^^^ DO NOT CHANGE THIS
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = mongoose.connection;
