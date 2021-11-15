const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const attendenceSchema = new Schema({
  branch: {
    type: String,
    required: true
  },
  sem: {
    type: Number,
    required: true
  },
  file:{
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Attendence', attendenceSchema);


