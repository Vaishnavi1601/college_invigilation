const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const universitySchema = new Schema({
  title: {
    type: String,
    required: true
  },
  file: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('UniversityExam', universitySchema);
