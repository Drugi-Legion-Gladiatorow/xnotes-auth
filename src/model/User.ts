import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  githubId: String,
  accessToken: String,
  username: String,
  displayName: String,
});

module.exports = mongoose.model('User', UserSchema);
