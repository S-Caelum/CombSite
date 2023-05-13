import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../utils/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.body;
  const getClientOrders = await prisma.clientService.findMany({
    where: {
      ClientId: id,
    },
    include: {
      Employee: {
        select: {
          Id: true,
          FirstName: true,
          LastName: true,
        },
      },
      Service: {
        select: {
          Id: true,
          Name: true,
          Cost: true,
        },
      },
    },
  });
  return res.status(200).json(getClientOrders);
}
