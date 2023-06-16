import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../utils/prisma';
import moment from 'moment';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { clientId, serviceID, requestedDate, requestedEmployee, serviceCost, isCompleted } = req.body;

  var currentDate = Date.now();
  var nearDate = moment(currentDate).add(2, 'hours').toISOString();

  const existingTime = await prisma.clientService.findFirst({
    where: {
      EmployeeId: requestedEmployee,
      Date: new Date(requestedDate).toISOString(),
    },
  });

  if (new Date(requestedDate).toISOString() < new Date(nearDate).toISOString()) {
    res.status(503).send('Введено некорректное значение времени');
  } else if (existingTime) {
    res.status(504).send('На данное время уже есть запись');
  } else {
    const addOrder = await prisma.client.update({
      where: {
        Id: clientId,
      },
      data: {
        ClientService: {
          create: {
            ServiceId: serviceID,
            EmployeeId: requestedEmployee,
            Date: new Date(requestedDate).toISOString(),
            Cost: serviceCost,
            isCompleted: false,
          },
        },
      },
    });
    res.status(200).send('Заказ был успешно создан');
  }
}
