import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../utils/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;
  const user = await prisma.client.findUnique({
    where: {
      Email: email,
    },
  });
  if (!user) {
    return res.status(401);
  } else if (user.Password == password) {
    return res.status(200).json(user);
  } else {
    return res.status(401);
  }
}
