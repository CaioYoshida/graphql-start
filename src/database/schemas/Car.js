const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  model: String,
  brand: String,
  year: Number,
  mileage: Number,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Car', UserSchema);