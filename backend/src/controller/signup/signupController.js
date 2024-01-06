const bcrypt = require('bcrypt');
const UserModel = require("../../models/createUser");

module.exports.registerUser = async (req, resp) => {
  try {
    const { username, mobileNumber, email, password } = req.body;

    if (!username || !mobileNumber || !email || !password) {
      return resp.status(400).json({ error: 'Please fill in all fields.' });
    }

    const existingUser = await UserModel.findOne({
      where: {
        email,
      },
    });
    if (existingUser) {
      return resp.status(400).json({ error: 'Email is already registered.' });
    }

    // Hash and salt the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const newUser = await UserModel.create({
      username,
      mobileNumber,
      email,
      password: hashedPassword,
    });

    resp.status(200).json({ message: 'User registered successfully.', userId: newUser.id });
  } catch (error) {
    resp.status(500).json({ error: 'Internal server error.' });
  }
};
