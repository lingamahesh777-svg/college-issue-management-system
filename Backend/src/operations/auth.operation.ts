
import jwt from "jsonwebtoken";
import { User } from "../models/User";

export const registerOperation = async (data: any) => {
  const { name, email, password } = data;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const newUser = await User.create({
    name,
    email,
    password,
  });

  return {
    id: newUser._id,
    name: newUser.name,
    email: newUser.email,
  };
};

export const loginOperation = async (data: any) => {
  const { email, password } = data;

  const user = await User.findOne({ email });

  if (!user || user.password !== password) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
    { id: user._id, email: user.email },
    "your_secret_key",
    { expiresIn: "1h" }
  );

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  };
};
