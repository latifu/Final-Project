const Parent = require("../models/Parent");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  registrationValidator,
  loginValidator,
} = require("../utils/validations");

const register = async (req, res) => {
  try {
    const result = await registrationValidator.validateAsync(req.body);
    const { email, password } = result;

    //check for email in database
    const parentExists = await Parent.findOne({ email });
    if (parentExists) {
      throw new Error("Email already exists.");
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    //creating parent
    const parent = await Parent.create({
      ...result,
      password: hashedPassword,
    });

    //generate token
    const token = jwt.sign({ id: parent._id }, "123123", { expiresIn: "2h" });

    res.status(201).json({ token });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const result = await loginValidator.validateAsync(req.body);
    const { email, password } = result;

    //check for parent in DB
    let parent = await Parent.findOne({ email });
    if (!parent) {
      throw new Error("Invalid Credentials");
    }

    //compare password
    const isMatch = await bcrypt.compare(password, parent.password);
    if (!isMatch) {
      throw new Error("Invalid Credentials");
    }

    //generate token
    const token = jwt.sign({ id: parent._id }, "123123", { expiresIn: "2h" });

    //return token
    res.status(200).json({ token });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token) {
    return res.status(401), json({ message: "Not Authorized" });
  }

  token = token.split(" ")[1];
  try {
    let parent = jwt.verify(token, "123123");
    req.parent = parent.id;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = {
  register,
  login,
  verifyToken,
};
