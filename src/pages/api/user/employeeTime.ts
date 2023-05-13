import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../utils/prisma';
import moment from 'moment';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const date = req.body;
}
