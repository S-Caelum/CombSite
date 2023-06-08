import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../utils/prisma';
import { userSchema } from '../../../validations/userValidation';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { firstName, lastName, patronymic, birthDay, genderId, email, phoneNumber, password } = req.body;
  try {
    await userSchema.validate(req.body);
    await prisma.client.create({
      data: {
        FirstName: firstName,
        LastName: lastName,
        Patronymic: patronymic,
        Birthday: birthDay,
        RegistrationDate: new Date().toISOString(),
        Phone: phoneNumber,
        GenderId: genderId,
        Email: email,
        Password: password,
      },
    });
  } catch (error) {
    return res.status(400).send(error);
  }

  return res.status(200).json({ Text: 'Успешная регистрация' });
}
