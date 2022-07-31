import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Before we save, we need to encrypt the password
userSchema.pre('save', async function (next) {
  // if the document is not new, we simply call next and move on
  if (!this.isModified('password')) {
    next();
  }

  // if it's not new, we hash the password
  const salt = await bcrypt.genSalt(10);

  // Pertains to the user we're creating/saving
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;
