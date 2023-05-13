import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../utils/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const getServices = await prisma.service.findMany({
    where: {
      IsActual: true,
    },
    include: {
      ServiceCategory: true,
    },
  });
  return res.json(getServices);
}
