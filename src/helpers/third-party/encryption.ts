import { genSaltSync, hashSync, compareSync } from 'bcryptjs';

function createHash(password: string, saltRounds: number = 10) {
  const salt = genSaltSync(saltRounds);
  const hash = hashSync(String(password), salt);

  return { salt, hash };
}

function checkHash(password: string, hashData: string) {
  const isPasswordValid = compareSync(password, hashData);
  return isPasswordValid;
}

export { createHash, checkHash };
