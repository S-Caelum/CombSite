import React from 'react';
import { NextApiResponse, NextApiRequest } from 'next';

export default async function EmailSender(req: NextApiRequest, res: NextApiResponse) {
  var { email, code } = req.body;
  const nodemailer = require('nodemailer');
  let transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      type: 'OAuth2',
      user: String(process.env.MAIL_USERNAME) || '',
      pass: String(process.env.MAIL_PASSWORD) || '',
      clientId: String(process.env.OAUTH_CLIENTID) || '',
      clientSecret: String(process.env.OAUTH_CLIENT_SECRET) || '',
      refreshToken: String(process.env.OAUTH_REFRESH_TOKEN) || '',
    },
  });
  var mailOptions = {
    from: 'noreply.rascheska56@rascheska.ru',
    to: email,
    subject: 'Подтвердите введённые данные',
    html: `<div> <p> Здравствуйте. </p> <p> Для подтверждения указанной почты используйте следующий высланный вам код: </p> <p> ${code} </p> 
    <p>Данный код истекает через 10 минут после отправки.</p> </div>`,
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
