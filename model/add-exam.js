const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const examSchema = new Schema({
  examTitle: {
    type: String,
    required: true
  },
  branch:{
    type: String,
    required: true
  },
  sem:{
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  slot: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Exam', examSchema);
