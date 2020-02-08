const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const jwtSign = (userId, email) => {
  const token = jwt.sign({ userId, email }, "secretkey", { expiresIn: "1h" });
  return {
    token,
    userId,
    email
  };
};

module.exports = {
  login: async ({ email, password }) => {
    try {
      const user = await User.findOne({ email });
      if (!user) throw new Error("No user exists");
      const passwordEqual = await bcrypt.compare(password, user.password);
      if (!passwordEqual) throw new Error("Incorrect password");
      return jwtSign(user.id, user.email);
    } catch (err) {
      throw err;
    }
  },
  createUser: async ({ email, password }) => {
    try {
      const userExists = await User.findOne({ email });
      if (userExists) throw new Error("Email already used");
      const hash = await bcrypt.hash(password, 12);
      const newUser = new User({ email, password: hash });
      const user = await newUser.save();
      return jwtSign(user.id, user.email);
    } catch (err) {
      throw err;
    }
  }
};