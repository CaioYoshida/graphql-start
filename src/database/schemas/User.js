const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  cars: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Car' }
  ]
});

module.exports = mongoose.model('User', UserSchema);