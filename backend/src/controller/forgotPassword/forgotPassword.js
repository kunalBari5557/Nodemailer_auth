const User = require('../../models/createUser');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { Sequelize } = require('sequelize'); 

function generateResetToken() {
  const token = crypto.randomBytes(20).toString('hex');
  return token;
}
  
  async function sendEmail(to, subject, html) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'demo.ebizzinfotech@gmail.com',
        pass: 'lsec enbg ncgf elkd',
      },
    });
  
    const mailOptions = {
      from: 'demo.ebizzinfotech@gmail.com',
      to,
      subject,
      html,
    };
  
    await transporter.sendMail(mailOptions);
  }

module.exports.sendEmail = async (req, res) => {
    const { email } = req.body;

    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const resetToken = generateResetToken();
      const resetTokenExpiration = new Date(Date.now() + 3600000);
  
      await user.update({
        resetToken,
        resetTokenExpiration,
      });
  
      const resetLink = `http://localhost:3000/createNewPassword?token=${resetToken}&email=${email}`;
      const emailMessage = `
        <p>Welcome!</p>
        <p>You have requested to reset your app password through our forgotten password recovery service. Press the button to change your password.</p>
        <a href="${resetLink}">Change Password</a>
      `;
  
      await sendEmail(email, 'Password Reset Request', emailMessage);
  
      return res.status(200).json({ email:email,resetToken:resetToken,message: 'Password reset initiated. Check your email for further instructions.' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports.resetPasswordUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        email,
        resetTokenExpiration: {
          [Sequelize.Op.gt]: new Date(),
        },
      },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await user.update({
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiration: null,
    });

    return res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};