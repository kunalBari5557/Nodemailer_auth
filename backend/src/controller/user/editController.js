const bcrypt = require('bcrypt');
const UserModel = require("../../models/createUser");

module.exports.editUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const updatedUserData = req.body;

    if ('password' in updatedUserData) {
      delete updatedUserData.password;
    }

    const user = await UserModel.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const existingHashedPassword = user.password;

    await user.update({
      ...updatedUserData,
      password: existingHashedPassword,
    });

    const updatedUser = await UserModel.findByPk(userId);

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
