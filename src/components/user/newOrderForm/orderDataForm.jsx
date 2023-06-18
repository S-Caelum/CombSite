import { Button, Card, Col, Container, Row, Text } from '@nextui-org/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';

const OrderDataForm = ({
  allItems,
  emptyCart,
  employees,
  confirmationStep,
  setConfirmationStep,
  user,
  discount,
}) => {
  var userBirthDay = user.Birthday;
  var today = new Date();
  var todayFormatted = moment(today).add(2, 'hours').toISOString();
  var schema = Yup.object().shape({
    dateOfCompletionStart: Yup.date()
      .required('Заполните это поле')
      .min(todayFormatted, 'Укажите дату не ранее, чем спустя 2 часа от текущего момента')
      .typeError('Введите корректную дату'),
    employee: Yup.string().required('Заполните это поле'),
  });
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  async function dateSelectionHandler(e) {
    if (moment(e.target.value).format('DD/MM') == userBirthDay && counter != 6) setDiscount('0.85');
  }
  const onSubmit = (data) => {
    allItems.forEach((item) => {
      fetch(`http://localhost:3000/api/orders/newOrder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientId: user.Id,
          serviceID: Number(item.id),
          requestedDate: new Date(data.dateOfCompletionStart).toISOString(),
          requestedEmployee: Number(data.employee),
          serviceCost: Number(item.price * parseFloat(discount)),
        }),
      }).then((res) => {
        switch (res.status) {
          case 200:
            emptyCart();
            window.location.reload();
            break;
          case 418:
            setError('dateOfCompletionStart', { type: 'custom', message: 'На данное время уже есть запись' });
            break;
        }
      });
    });
  };
  return (
    <Card.Body css={{ display: `${confirmationStep.secondStep}` }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {allItems.map((item, id) => (
          <Container key={id}>
            <Card css={{ mw: '100%', bgColor: '$gray100' }}>
              <Card.Body>
                <Row justify="space-between">
                  <Col css={{ textAlign: 'center' }}>{item.Name}</Col>
                  <Col css={{ textAlign: 'center' }}>{item.price} ₽</Col>
                </Row>
              </Card.Body>
            </Card>
          </Container>
        ))}
        <Col css={{ pt: '1rem', pl: '0.5rem' }}>
          <Text css={{ fontFamily: 'Manrope' }}>Выберите мастера</Text>
          <select
            {...register('employee')}
            id="employee"
            style={{
              width: '100%',
              height: '2rem',
              paddingLeft: '0.5rem',
              fontSize: '1rem',
            }}>
            {employees.map((emp) => (
              <option value={emp.Id} key={emp.Id}>
                {emp.FirstName} {emp.LastName}
              </option>
            ))}
          </select>
          <Text css={{ width: '80%', '@sm': { pl: '1rem', pr: '1rem' } }}>{errors.employee?.message}</Text>
          <Text css={{ pt: '1rem', fontFamily: 'Manrope' }}>Укажите желаемую дату</Text>
          <input
            {...register('dateOfCompletionStart')}
            id="date"
            style={{
              width: '100%',
              height: '2rem',
              paddingLeft: '0.5rem',
              paddingRight: '0.5rem',
              fontSize: '1rem',
            }}
            onChange={(e) => dateSelectionHandler(e)}
            type="datetime-local"
          />
          <Text css={{ width: '80%', '@sm': { pl: '1rem', pr: '1rem' } }}>
            {errors.dateOfCompletionStart?.message}
          </Text>
          <Row
            css={{
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
              justifyContent: 'space-around',
              pt: '2rem',
              '@lg': {
                flexDirection: 'row',
                alignItems: 'center',
              },
              '@xs': {
                flexDirection: 'row',
                alignItems: 'center',
              },
            }}>
            <Button color="secondary" type="submit">
              Оформить
            </Button>
            <Button
              color="secondary"
              onPress={() => {
                emptyCart();
              }}>
              Вернуться
            </Button>
          </Row>
        </Col>
      </form>
    </Card.Body>
  );
};

export default OrderDataForm;
