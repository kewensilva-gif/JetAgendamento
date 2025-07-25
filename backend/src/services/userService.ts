import { prisma } from '../database/prismaClient';
import bcrypt from 'bcryptjs';

interface ICreateUserData {
  name: string;
  email: string;
  password: string;
}

export const create = async ({ name, email, password }: ICreateUserData) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    throw new Error('Email já cadastrado');
  }

  const hashPassword = await bcrypt.hash(password, 8);

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashPassword,
    },
    select: {
      id: true,
      name: true,
      email: true
    }
  });

  return newUser;
};