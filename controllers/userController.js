import User from "../models/userModel.js";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";

const createUser = async (req, res) => {
  try {
    const { username, userId, email, name, password } = req.body;

    if (!username || !email || !password || !userId || !name) {
      throw new Error("This fields are required");
    }

    const existingUser = await User.findOne({
      $or: [{ username: username }, { userId: userId }, { email: email }],
    });

    if (existingUser) {
      throw new Error("User already exist with this cridentials");
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await User.create({
      username,
      name,
      email,
      password: hashedPassword,
      userId,
    });

    res.status(200).send({
      message: "Account created successfully!",
    });
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
};

const test = async (req, res) => {
  res.status(200).send({
    message: "Account created successfully!",
  });
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email: email,
    });

    if (!user) {
      throw new Error(
        "Sorry, the Email or password you entered does not match our records."
      );
    }
    //comparing the user passwords
    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      throw new Error(
        "Sorry, the username or password you entered does not match our records."
      );
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.status(200).send({
      token,
    });
  } catch (error) {
    console.log(error.message);
    res.status(401).send({ message: error.message });
  }
};

export { createUser, loginUser, test };
