const jwt = require('jsonwebtoken');

module.exports.authenticateToken = (req, resp, next) => {
  const token = req.header('Authorization');
  if (!token) return resp.status(401).json({ error: 'Access denied.' });

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) return resp.status(403).json({ error: 'Invalid token.' });

    req.user = user;
    next();
  });
};
