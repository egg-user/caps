const jwt = require('jsonwebtoken');

const secretKey = 'your_secret_key'; // Ganti dengan kunci rahasia yang kuat

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(403).json({
      message: 'Akses ditolak. Token tidak disertakan.',
    });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: 'Token tidak valid.',
      });
    }

    // Token valid, lanjutkan ke endpoint berikutnya
    req.user = decoded.user;
    next();
  });
};

module.exports = verifyToken;
