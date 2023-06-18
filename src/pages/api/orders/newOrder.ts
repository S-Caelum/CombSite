import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../utils/prisma';
import moment from 'moment';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { clientId, serviceID, requestedDate, requestedEmployee, serviceCost, isCompleted } = req.body;
  const existingTime = await prisma.clientService.findFirst({
    where: {
      EmployeeId: requestedEmployee,
      Date: new Date(requestedDate).toISOString(),
    },
  });
  if (existingTime) {
    return res.status(418).send('ERROR');
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
            Date: requestedDate,
            Cost: serviceCost,
            isCompleted: false,
          },
        },
      },
    });
    return res.status(200).send('Заказ был успешно создан');
  }
}
