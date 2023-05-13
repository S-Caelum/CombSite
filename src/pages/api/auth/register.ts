import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../utils/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    firstName,
    lastName,
    patronymic,
    birthDay,
    phoneNumber,
    email,
    genderId,
    password,
  } = req.body;
  const user = await prisma.client.create({
    data: {
      FirstName: firstName,
      LastName: lastName,
      Patronymic: patronymic,
      Birthday: new Date(birthDay).toISOString(),
      RegistrationDate: new Date().toISOString(),
      Phone: phoneNumber,
      GenderId: parseInt(genderId),
      Email: email,
      Password: password,
    },
  });
  return res.status(200).json({ Code: 200, Text: 'Успешная регистрация' });
}
