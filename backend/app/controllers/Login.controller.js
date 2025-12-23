const User = require("../models/User.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username: username } });
    if (!user) {
      console.log('User not found');
      return res.status(401).json({ success: false, error: 'Invalid username or password.' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      console.log('Password is correct. User authenticated.');

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.status(200).json({ success: true, token, data: user });
    } else {
      console.log('Incorrect password');
      return res.status(401).json({ success: false, error: 'Invalid username or password.' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ success: false, error: 'Failed to authenticate. Check the server logs for details.' });
  }
};

module.exports = { loginUser };