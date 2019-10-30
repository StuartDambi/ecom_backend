import jwt from 'jsonwebtoken';

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.verify(token, process.env.JWT);
    req.userData = decode;
    next();
  } catch (error) {
    return res.status(401).json({
      status: res.statusCode,
      message: 'Unauthenticated user',
    });
  }
};
