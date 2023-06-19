import { Button, Card, Col, Input, Row, Spacer, Text } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputMask from 'react-input-mask';
import generateCode from '../../utils/codeGenerator';
import React from 'react';

const RegistrationSecondStep = ({
  registrationData,
  setRegistrationData,
  registrationStep,
  setRegistrationStep,
  setCode,
}) => {
  const schema = Yup.object().shape({
    email: Yup.string()
      .required('Заполните поле')
      .matches(
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
        'Введите корректный адрес электронной почты'
      ),
    phone: Yup.string()
      .required('Заполните поле')
      .matches(/^[+][0-9]\s[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, 'Введите корректный номер телефона'),
    password: Yup.string().required('Заполните поле').min(6, 'Пароль должен состоять минимум из 6 символов'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
      .required('Заполните поле'),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const sendMail = async (email) => {
    var validationInfo = generateCode(6);
    setCode({ code: validationInfo.result, time: validationInfo.time });
    const sender = fetch(`/api/emailSender`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        code: validationInfo.result,
      }),
    }).finally(setRegistrationStep({ ...registrationStep, secondStep: 'none', thirdStep: 'flex' }));
  };
  const secondStepHandler = (data) => {
    console.log(data);
    setRegistrationData({
      ...registrationData,
      email: data.email,
      phone: data.phone,
      password: data.confirmPassword,
    });
    sendMail(data.email);
  };
  return (
    <Card.Body css={{ display: registrationStep.secondStep, background: 'transparent' }}>
      <form
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        onSubmit={handleSubmit(secondStepHandler)}>
        <Input
          {...register('email')}
          id="emailInput"
          aria-label="Поле ввода электронной почты"
          label="Адрес электронной почты"
          size="lg"
          placeholder="ivanivanov@example.ru"
          css={{ width: '85%', '@sm': { pl: '3rem', pr: '3rem' } }}
        />
        <Text css={{ width: '80%', '@sm': { pl: '4rem', pr: '3rem' } }}>{errors.email?.message}</Text>
        <Spacer y={1.3} />
        <InputMask
          mask={'+7 (999) 999-99-99'}
          aria-label="Поле ввода номера телефона"
          id="phone"
          required={false}
          disabled={false}
          {...register('phone')}
          readOnly={false}>
          {(inputProps) => (
            <Input
              {...inputProps}
              label="Номер телефона"
              placeholder="+7 (999) 999-99-99"
              size="lg"
              css={{ width: '85%', '@sm': { pl: '3rem', pr: '3rem' } }}
            />
          )}
        </InputMask>
        <Text css={{ width: '80%', '@sm': { pl: '4rem', pr: '3rem' } }}>{errors.phone?.message}</Text>
        <Spacer y={1.7} />
        <Row
          css={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            '@sm': { pl: '3rem', pr: '3rem', flexDirection: 'row' },
          }}>
          <Row
            css={{ display: 'flex', flexDirection: 'column', alignItems: 'center', '@sm': { pr: '1rem' } }}>
            <Input
              {...register('password')}
              id="password"
              aria-label="Поле ввода пароля"
              label="Пароль"
              size="lg"
              type="password"
              placeholder="**********"
              css={{ width: '85%' }}
            />
            <Text css={{ width: '80%', '@sm': { pl: '2rem' } }}>{errors.password?.message}</Text>
          </Row>
          <Spacer y={1} css={{ display: 'inline-block', '@sm': { display: 'none' } }} />
          <Row
            css={{ display: 'flex', flexDirection: 'column', alignItems: 'center', '@sm': { pl: '1rem' } }}>
            <Input
              {...register('confirmPassword')}
              id="confirmPassword"
              aria-label="Поле ввода подтверждения пароля"
              label="Подтверждение"
              size="lg"
              type="password"
              placeholder="**********"
              css={{ width: '85%' }}
            />
            <Text css={{ width: '80%', '@sm': { pl: '2rem' } }}>{errors.confirmPassword?.message}</Text>
          </Row>
        </Row>
        <Spacer y={2} />
        <Row
          justify="space-around"
          css={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'transparent',
            '@xs': {
              flexDirection: 'row',
              alignItems: 'center',
            },
          }}>
          <Button
            color="secondary"
            size="md"
            onPress={() => {
              setRegistrationStep({ ...registrationStep, secondStep: 'none', firstStep: 'flex' });
            }}>
            Назад
          </Button>
          <Spacer y={1.2} />
          <Button color="secondary" type="submit" size="md">
            Далее
          </Button>
        </Row>
      </form>
    </Card.Body>
  );
};

export default RegistrationSecondStep;
