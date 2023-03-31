import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
  const exists = await prisma.client.findFirst({
    where: {
      Phone: phoneNumber,
    },
  });
  if (exists) {
    res.status(400).send("Пользователь уже существует");
  } else {
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
    res.status(200).json(user);
  }
}
