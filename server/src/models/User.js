import mongoose from 'mongoose';
import { defaultImage } from '../secret.js';

const validateEmail = function (email) {
  let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Minimun length should be 3 characters"],
      maxlength: [50, "Maximun length should be 50 characters"],
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      validate: [validateEmail, "Please enter a valid email address"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Please enter your phone number"],
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Please enter minumum 6 length password"],
    },
    image: {
      type: String,
      default: defaultImage,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

export { User };
