import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../utils/prisma';
import nodemailer from 'nodemailer';
import nodemailerInlineCss from 'nodemailer-juice';
import CodeGenerator from '../../../utils/codeGenerator';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.body;
  const exists = await prisma.client.findUnique({
    where: {
      Email: email,
    },
  });
  var transport = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: 'f2351d63934bd9',
      pass: '527bcd96eb2a1a',
    },
  });
  var code = await CodeGenerator(10);
  transport.use('compile', nodemailerInlineCss());
  var mailOptions = {
    from: 'noreply.rascheska56@rascheska.ru',
    to: email,
    subject: 'Подтвердите введённые данные',
    html: `<div> <p> Здравствуйте. </p> <p> Для подтверждения указанной почты используйте следующий высланный вам код: </p> <p> ${code.result} </p> <p>Данный код по всей видимости не может истечь поэтому вы можете бить программиста по голове любым тяжёлым предметом.</p> </div>`,
  };
  if (exists) {
    res.status(400).json({
      Code: 400,
      ValidationCode: 'ERROR',
      Message: 'Пользователь уже существует',
    });
  } else {
    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
    });
    res.status(200).json({ Code: 200, ValidationCode: code.result, Message: code.time });
  }
}
