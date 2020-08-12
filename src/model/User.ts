import mongoose from 'mongoose';

type typeFindOneOrCreate = (accessToken: string, profile: any, cb: any) => any;

export interface IUser extends mongoose.Document {
  githubId: string;
  accessToken: string;
  username: string;
  displayName: string;
}

export interface IUserModel extends mongoose.Model<IUser> {
  findOneOrCreate<T>(accessToken: string, profile: any, cb: T): T;
}

const UserSchema = new mongoose.Schema({
  githubId: String,
  accessToken: String,
  username: String,
  displayName: String,
});

UserSchema.statics.findOneOrCreate = function findOneOrCreate(
  accessToken: string,
  profile: any,
  cb: any
) {
  this.findOne({ githubId: profile.id }, (err: any, user: IUser) => {
    if (err) return cb(err);
    user
      ? (user.accessToken = accessToken)
      : (user = new User({
          githubId: profile.id,
          accessToken: accessToken,
          username: profile.username,
          displayName: profile.displayName,
        }));
    user.save((err) => {
      return cb(err, user);
    });
  });
};

const User = mongoose.model<IUser, IUserModel>('User', UserSchema);
export default User;
