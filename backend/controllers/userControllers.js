import User from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";

function createToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET);
}

export const login = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new Error("Please fill out all required fields.");

  const user = await User.findOne({ email });

  if (!user) throw new Error("Invalid email!");

  if (!(await bcrypt.compare(password, user.password)))
    throw new Error("Incorrect Password!");

  const userInfo = {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email,
  };

  // send the user info and a token as a response
  res.status(200).json({ user: { ...userInfo, token: createToken(userInfo) } });
});

export const signup = expressAsyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password)
    throw new Error("Please fill out all required fields.");

  if (!validator.isEmail(email)) throw new Error("Invalid email!");
  if (await User.findOne({ email })) throw new Error("Email already in use!");

  if (!validator.isStrongPassword(password))
    throw new Error("Password not strong enough!");

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPass,
  });

  if (!user) throw new Error("Error while creating user! Please try again.");

  const userInfo = { _id: user._id, firstName, lastName, email };

  // send the user info and a token as a response
  res.status(200).json({ user: { ...userInfo, token: createToken(userInfo) } });
});
