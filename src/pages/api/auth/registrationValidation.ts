import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../utils/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.body;
  const exists = await prisma.client.findUnique({
    where: {
      Email: email,
    },
  });
}
