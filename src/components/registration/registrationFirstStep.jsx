import { Button, Card, Input, Radio, Spacer, Text } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import React from 'react';
import Link from 'next/link';
const RegistrationFirstStep = ({
  registrationData,
  setRegistrationData,
  registrationStep,
  setRegistrationStep,
}) => {
  const [checked, setChecked] = React.useState('1');
  const onSubmit = (data) => {
    setRegistrationData({
      ...registrationData,
      firstName: data.firstName,
      lastName: data.lastName,
      patronymic: data.patronymic,
      dateOfBirth: data.dob,
      gender: checked,
    });
    setRegistrationStep({ ...registrationStep, firstStep: 'none', secondStep: 'flex' });
  };
  const schema = Yup.object().shape({
    firstName: Yup.string().required('Заполните поле'),
    lastName: Yup.string().required('Заполните поле'),
    patronymic: Yup.string(),
    dob: Yup.date()
      .required('Заполните поле')
      .max(new Date(), 'Выбранная дата не должна превышать текущую')
      .min(new Date('1900-01-01'), 'Выбранная дата не должная быть меньше 1900 года'),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  return (
    <Card.Body css={{ display: registrationStep.firstStep }}>
      <form
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register('firstName')}
          id="firstNameInput"
          aria-label="Поле ввода имени"
          label="Имя"
          size="lg"
          placeholder="Иван"
          css={{ width: '85%', '@sm': { pl: '3rem', pr: '3rem' } }}
        />
        <Text css={{ width: '80%', '@sm': { pl: '4rem', pr: '3rem' } }}>{errors.firstName?.message}</Text>
        <Spacer y={1.3} />
        <Input
          {...register('lastName')}
          id="lastNameInput"
          aria-label="Поле ввода фамилии"
          label="Фамилия"
          size="lg"
          placeholder="Иванов"
          css={{ width: '85%', '@sm': { pl: '3rem', pr: '3rem' } }}
        />
        <Text css={{ width: '80%', '@sm': { pl: '4rem', pr: '3rem' } }}>{errors.lastName?.message}</Text>
        <Spacer y={1.3} />
        <Input
          {...register('patronymic')}
          id="patronymicInput"
          aria-label="Поле ввода отчества"
          label="Отчество"
          size="lg"
          placeholder="Иванович"
          css={{ width: '85%', '@sm': { pl: '3rem', pr: '3rem' } }}
        />
        <Text css={{ width: '80%', '@sm': { pl: '4rem', pr: '3rem' } }}>{errors.patronymic?.message}</Text>
        <Spacer y={1.3} />
        <Input
          {...register('dob')}
          id="birthdayInput"
          aria-label="Поле ввода даты рождения"
          label="Дата рождения"
          size="lg"
          type="date"
          css={{ width: '85%', '@sm': { pl: '3rem', pr: '3rem' } }}
        />
        <Text css={{ width: '80%', '@sm': { pl: '4rem', pr: '3rem' } }}>{errors.dob?.message}</Text>
        <Spacer y={1.3} />
        <Radio.Group
          aria-label="Выбор пола"
          label="Пол"
          value={checked}
          name="gender"
          onChange={setChecked}
          orientation="horizontal"
          size="sm"
          css={{
            width: '85%',
            display: 'flex',
            alignItems: 'center',
            '@sm': { pl: '3rem', pr: '3rem' },
          }}>
          <Radio value="1" color="secondary" css={{ pr: '2rem' }}>
            Мужской
          </Radio>
          <Radio value="2" color="secondary">
            Женский
          </Radio>
        </Radio.Group>
        <Spacer y={2.3} />
        <Link
          href={`${process.env.APP_DOMAIN}/auth/authorization`}
          style={{ color: 'white', textDecoration: 'underline', alignSelf: 'center' }}>
          Уже зарегистрированы?
        </Link>
        <Spacer y={0.6} />
        <Button color="secondary" type="submit" size="lg" css={{ width: '6rem', alignSelf: 'center' }}>
          Далее
        </Button>
      </form>
    </Card.Body>
  );
};

export default RegistrationFirstStep;
