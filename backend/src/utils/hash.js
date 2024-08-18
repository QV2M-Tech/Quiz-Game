import bcrypt from 'bcryptjs';

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};//คล้ายๆ decode hash แต่ใช้ได้แค่เปรียบเทียบ

export { hashPassword, comparePassword };
