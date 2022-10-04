import * as bcrypt from 'bcrypt';

export async function hashPassword(password) {
  const saltOrRounds = 10;
  return await bcrypt.hash(password, saltOrRounds);
}

export async function validatePassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}
