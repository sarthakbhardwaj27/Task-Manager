const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/taskDB', {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connect('mongodb://localhost:27017/taskDB');

const taskSchema = mongoose.Schema({
  title: String,
  details: String,
}, {timstamps: true});

module.exports = mongoose.model('Task', taskSchema);