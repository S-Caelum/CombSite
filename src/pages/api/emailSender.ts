import React from 'react';
import nodemailer from 'nodemailer';
import { NextApiResponse, NextApiRequest } from 'next';

export default async function EmailSender(req: NextApiRequest, res: NextApiResponse) {
  var { email, code } = req.body;
  var transport = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: 'f2351d63934bd9',
      pass: '527bcd96eb2a1a',
    },
  });
  var mailOptions = {
    from: 'noreply.rascheska56@rascheska.ru',
    to: email,
    subject: 'Подтвердите введённые данные',
    html: `<div> <p> Здравствуйте. </p> <p> Для подтверждения указанной почты используйте следующий высланный вам код: </p> <p> ${code} </p> <p>Данный код по всей видимости не может истечь поэтому вы можете бить программиста по голове любым тяжёлым предметом.</p> </div>`,
  };
  return new Promise((resolve, reject) => {
    transport.sendMail(mailOptions);
  }).then(
    (result) => {
      console.log(result);
    },
    function (error) {
      console.log(error);
    }
  );
}
