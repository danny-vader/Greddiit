const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const registerUser = asyncHandler(async (req, res) => {
  const { fname, lname, uname, email, age, contact, password } = req.body;

  if (!uname || !email || !age || age < 18 || !password) {
    res.status(400).json({
      message: "Please enter all the mandatory fields",
    });
  }

  const emailExists = await User.findOne({ email });
  const unameExists = await User.findOne({ uname });

  if (emailExists || unameExists) {
    res.status(400).json({
      message: "User already exits",
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    fname,
    lname,
    uname,
    email,
    age,
    contact,
    password: hashedPassword,
  });

  res.status(201).json({
    token: generateToken(user.uname),
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { uname, password } = req.body;

  const user = await User.findOne({ uname: uname });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      token: generateToken(user.uname),
    });
  } else {
    res.status(400).json({
      message: "Either email or password is incorrect",
    });
  }
});

const getUserData = asyncHandler(async (req, res) => {
  const user = await User.findOne({ uname: req.user });

  res.status(201).json({ user });
});

const generateToken = (uname) => {
  return jwt.sign({ uname }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const editUserData = asyncHandler(async (req, res) => {
  const { fname, lname, uname, email, age, contact, password } = req.body;

  const user = await User.findOneAndUpdate(
    { uname: req.user },
    { fname: fname, lname: lname, age: age, contact: contact },
    { new: true }
  )
    .lean()
    .exec();

  res.status(201).json(user);
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.deleteOne({ uname: req.user });

  res.status(201).json(user);
});

module.exports = {
  registerUser,
  loginUser,
  getUserData,
  editUserData,
  deleteUser,
};
