import { Schema, model, Document } from 'mongoose'
import { createHash } from '../helpers'

interface User extends Document{
  fullName: string
  email: string
  password: string
  refreshToken?: string
}

const UserSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    index: { unique: true }
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  refreshToken: {
    type: String,
  },
  updatedAt: { type: Date }
})

UserSchema.pre('save', function(next) {
  this.updatedAt = Date.now()
  if (this.isNew) {
    this.password = createHash(this.password)
  }
  next();
});

UserSchema.set(
  'toObject',
  {
    virtuals: true,
    versionKey: false,
    flattenMaps: true,
    transform: function(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.password;
    }
  }
);

const UserModel = model<User>('User', UserSchema)

export default UserModel
export type { User };
