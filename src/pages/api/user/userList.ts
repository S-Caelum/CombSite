import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../utils/prisma';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  var AllUsers = prisma.client.findMany({
    include: {
      ClientService: true,
    },
  });
}
