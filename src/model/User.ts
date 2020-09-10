import mongoose from 'mongoose';
import { Profile } from 'passport-github';

export interface IUser extends mongoose.Document {
  githubId: string;
  accessToken: string;
  username: string;
  displayName: string;
}

export interface IUserModel extends mongoose.Model<IUser> {
  findOneOrCreate(accessToken: string, profile: Profile): Promise<IUser>;
}

const UserSchema = new mongoose.Schema({
  githubId: String,
  accessToken: String,
  username: String,
  displayName: String,
});

UserSchema.statics.findOneOrCreate = async function findOneOrCreate(
  accessToken: string,
  profile: Profile
) {
  try {
    const user = await this.findOne({ githubId: profile.id });
    if (user) {
      user.accessToken = accessToken;
      return user.save();
    }

    const newUser = new User({
      githubId: profile.id,
      accessToken: accessToken,
      username: profile.username,
      displayName: profile.displayName,
    });
    return newUser.save();
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};

const User = mongoose.model<IUser, IUserModel>('User', UserSchema);
export default User;
