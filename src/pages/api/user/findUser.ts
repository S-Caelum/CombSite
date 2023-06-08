import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../utils/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userFirstName, userLastName, userEmail } = req.body;
  var user = await prisma.client.findFirst({
    select: {
      Id: true,
      FirstName: true,
      LastName: true,
    },
    where: {
      FirstName: userFirstName,
      LastName: userLastName,
      Email: userEmail,
    },
  });
}
