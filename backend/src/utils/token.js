import jwt from 'jsonwebtoken';

const sign = (payload) => {
  console.log('Sign Token', process.env.JWT_SECRET);
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
};//encode

const verify = (token) => {
  console.log('Verify Token', process.env.JWT_SECRET);
  return jwt.verify(token, process.env.JWT_SECRET);
};//decode

export { sign, verify };