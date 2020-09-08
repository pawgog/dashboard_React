const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema(
  {
    name: {
      type: String,
    },
    tel_number: {
      type: String,
    },
    email: {
      type: String,
    },
    status: {
      type: String,
    },
    date: {
      type: String,
    },
    bid: {
      type: String,
    },
  },
  {
    collection: 'applicants',
  }
);

module.exports = mongoose.model('Applicants', userSchema);
