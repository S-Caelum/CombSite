import { Card, Col, Table, Text } from '@nextui-org/react';
import React from 'react';
import moment from 'moment';

const OrdersTable = ({ orders, setCounter }) => {
  var counter = 1;
  orders.forEach((order) => {
    counter++;
  });
  React.useEffect(() => setCounter(counter), [counter]);
  const ordersColumns = [
    {
      key: 'NewDate',
      label: 'Дата',
    },
    {
      key: 'EmployeeFullName',
      label: 'Мастер',
    },
    {
      key: 'ServiceName',
      label: 'Услуга',
    },
    {
      key: 'ServiceCost',
      label: 'Стоимость',
    },
  ];
  orders.forEach((i) => {
    Object.assign(i, {
      ServiceName: i.Service.Name,
      ServiceCost: i.Cost + ' ₽',
      NewDate: moment(i.Date).format('DD/MM/YY, h:mm:ss'),
      EmployeeFullName: i.Employee.LastName + ' ' + i.Employee.FirstName.charAt(0) + '.',
    });
  });
  return (
    <Col css={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Card css={{ '@lg': { mw: '90%' } }}>
        <Card.Header css={{ justifyContent: 'center', pt: '1.3rem' }}>
          <Text
            css={{
              fontFamily: 'Manrope',
              '@xs': { fs: '$2xl' },
              '@lg': { fs: '$3xl' },
            }}
            color="secondary"
            size="$xl">
            Ваши заказы
          </Text>
        </Card.Header>
        <Card.Body>
          <Table id="Список заказов пользователя" aria-label="Список заказов пользователя" color="secondary">
            <Table.Header columns={ordersColumns}>
              {(column) => (
                <Table.Column css={{ fs: '$md' }} key={column.key}>
                  {column.label}
                </Table.Column>
              )}
            </Table.Header>
            <Table.Body items={orders}>
              {(item) => (
                <Table.Row key={item.Id}>
                  {(columnKey) => (
                    <Table.Cell
                      css={{
                        fs: '$sm',
                        '@sm': { fs: '$md' },
                        '@lg': { fs: '$lg' },
                      }}>
                      {item[columnKey]}
                    </Table.Cell>
                  )}
                </Table.Row>
              )}
            </Table.Body>
            <Table.Pagination css={{ mt: '0.5rem' }} noMargin align="center" rowsPerPage={6} />
          </Table>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default OrdersTable;
