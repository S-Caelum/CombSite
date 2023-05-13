import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../utils/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;
  const user = await prisma.client.findUnique({
    where: {
      Email: email,
    },
  });
  if (!user) {
    res.status(401).json('Неверные данные авторизации');
  } else if (user.Password == password) {
    res.status(200).json(user);
  }
}
