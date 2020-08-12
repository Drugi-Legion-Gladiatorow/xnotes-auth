import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  githubId: string;
  accessToken: string;
  username: string;
  displayName: string;
}

const UserSchema = new mongoose.Schema({
  githubId: String,
  accessToken: String,
  username: String,
  displayName: String,
});

const User = mongoose.model<IUser>('User', UserSchema);
export default User;
