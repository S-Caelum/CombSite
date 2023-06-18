import { Button, Card, Row, Spacer, Text, Input } from '@nextui-org/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';

const RegistrationThirdStep = ({
  registrationData,
  setRegistrationData,
  registrationStep,
  setRegistrationStep,
  code,
}) => {
  const router = useRouter();
  const schema = Yup.object().shape({
    validationCode: Yup.string()
      .required('Введите код подтверждения')
      .matches(code.code, 'Неверный код подтверждения'),
  });
  const thirdStepHandler = async (data) => {
    await fetch(`/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: registrationData.firstName,
        lastName: registrationData.lastName,
        patronymic: registrationData.patronymic,
        birthDay: new Date(registrationData.dateOfBirth),
        genderId: parseInt(registrationData.gender),
        phoneNumber: registrationData.phone,
        email: registrationData.email,
        password: registrationData.password,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data.Text))
      .then(() => router.push(`/auth/authorization`));
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema), mode: 'onSubmit' });
  return (
    <Card.Body css={{ display: registrationStep.thirdStep }}>
      <form
        onSubmit={handleSubmit(thirdStepHandler)}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Text css={{ fontSize: '$lg', textAlign: 'justify', pr: '2.7rem', pl: '2.7rem' }}>
          На указанный вами адрес электронной почты было отправлено письмо, с кодом. Для завершения
          регистрации введите полученный код в поле ниже.
        </Text>
        <Spacer y={1.3} />
        <Input
          aria-label="Поле для ввода кода"
          id="codeInput"
          {...register('validationCode')}
          css={{ width: '60%', '@sm': { pl: '3rem', pr: '3rem' } }}
        />
        <Text css={{ width: '55%', '@sm': { pl: '5.5rem', pr: '3rem' } }}>
          {errors.validationCode?.message}
        </Text>
        <Spacer y={2} />
        <Row justify="space-around">
          <Button
            color="secondary"
            onPress={() => {
              setRegistrationStep({ ...registrationStep, secondStep: 'flex', thirdStep: 'none' });
            }}
            size="md">
            Назад
          </Button>
          <Button color="secondary" type="submit" size="md">
            Завершить
          </Button>
        </Row>
      </form>
    </Card.Body>
  );
};

export default RegistrationThirdStep;
