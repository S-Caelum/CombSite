import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../utils/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const getEmployees = await prisma.employee.findMany({
    select: {
      Id: true,
      FirstName: true,
      LastName: true,
      Patronymic: true,
    },
  });
  return res.json(getEmployees);
}
