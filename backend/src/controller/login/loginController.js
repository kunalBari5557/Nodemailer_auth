const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../../models/createUser');

module.exports.loginUser = async (req, resp) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return resp.status(400).json({ error: 'Please provide valid email and password.' });
    }

    const user = await UserModel.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return resp.status(401).json({ error: 'Invalid email or password.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return resp.status(401).json({ error: 'Invalid email or password.' });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1h' } 
    );

    resp.status(200).json({ message: 'Login successful.',userId: user.id, token });
  } catch (error) {
    resp.status(500).json({ error: 'Internal server error.' });
  }
};
