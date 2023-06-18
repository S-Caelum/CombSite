import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../utils/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.body;
  var user = await prisma.client.findFirst({
    where: {
      Id: id,
    },
    include: {
      ClientService: {
        orderBy: {
          Id: 'desc',
        },
        include: {
          Service: {
            select: {
              Id: true,
              Name: true,
              ServiceCategory: true,
            },
          },
          Employee: {
            select: {
              FirstName: true,
              LastName: true,
              Patronymic: true,
            },
          },
        },
      },
    },
  });
  return res.json(user);
}
