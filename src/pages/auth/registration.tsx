import { NextPage } from 'next';
import React, { FormEventHandler, useState } from 'react';
import Image from 'next/image';
import errorMessage from '../../../public/debil.jpg';
import { useRouter } from 'next/router';
import {
  Container,
  Col,
  Text,
  Input,
  Spacer,
  Button,
  Modal,
  Radio,
  Row,
  Card,
} from '@nextui-org/react';
import * as validate from '../../utils/validations';

const Registration: NextPage = (props): JSX.Element => {
  const router = useRouter();
  const [registrationData, setRegistrationData] = useState({
    firstName: '',
    lastName: '',
    patronymic: '',
    birthDay: '',
    gender: '',
    email: '',
    phoneNumber: '',
    password: '',
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [genderChecked, setGenderChecked] = useState('');
  const [validationCode, setValidationCode] = useState({ Code: '', Time: new Date() });
  const [userValidationCode, setUserValidationCode] = useState('');
  const [registrationStep, setRegistrationStep] = useState({
    firstStep: 'block',
    secondStep: 'none',
  });

  const registrationStepChangeHandler = async () => {
    setRegistrationStep({ firstStep: 'block', secondStep: 'none' });
    setValidationCode({ Code: '', Time: new Date() });
    setUserValidationCode('');
  };
  const registrationValidationHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (
      validate.EmailValidation(e.currentTarget.email.value) &&
      validate.BirthDayValidation(e.currentTarget.birthDay.value) == true
    ) {
      setRegistrationData({
        firstName: e.currentTarget.firstName.value,
        lastName: e.currentTarget.lastName.value,
        patronymic: e.currentTarget.patronymic.value,
        birthDay: e.currentTarget.birthDay.value,
        gender: genderChecked,
        email: e.currentTarget.email.value,
        phoneNumber: e.currentTarget.phoneNumber.value,
        password: e.currentTarget.password.value,
      });
      fetch('/api/auth/rvalidation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: e.currentTarget.email.value,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.Code === 400) {
            setModalVisible(true);
          } else {
            setValidationCode({ Code: data.ValidationCode, Time: data.Message });
            setRegistrationStep({ firstStep: 'none', secondStep: 'block' });
          }
        });
    } else {
      setModalVisible(true);
    }
  };
  const registrationHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    var ExpirationDate = new Date(validationCode.Time);
    ExpirationDate.setMinutes(ExpirationDate.getMinutes() + 10);

    if (userValidationCode !== validationCode.Code) {
      setModalVisible(true);
    } else if (new Date() > ExpirationDate) {
      setModalVisible(true);
    } else {
      fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: registrationData.firstName,
          lastName: registrationData.lastName,
          patronymic: registrationData.patronymic,
          birthDay: registrationData.birthDay,
          phoneNumber: registrationData.phoneNumber,
          email: registrationData.email,
          genderId: registrationData.gender,
          password: registrationData.password,
        }),
      })
        .then((res) => res.json())
        .finally(() => router.push('/'));
    }
  };

  return (
    <>
      <Modal
        aria-labelledby="modal-title"
        open={modalVisible}
        onClose={() => setModalVisible(false)}
        css={{
          mb: '20rem',
          height: '30rem',
          width: '30rem',
          borderWidth: '1px',
          borderColor: '$cyan100',
        }}>
        <Modal.Header css={{ pt: '2rem' }}>
          <Text b size="$lg" color="error">
            Ошибка
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Image src={errorMessage} alt="bara" fill />
        </Modal.Body>
        <Modal.Footer justify="center" css={{ pb: '2rem' }}>
          <Button color="error" onPress={() => setModalVisible(false)}>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>

      <div
        className="Hero"
        style={{
          height: '140vh',
          paddingTop: '4rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Container
          css={{
            bgColor: '#424242ab',
            height: 'fit-content',
            pt: '3rem',
            mr: '2rem',
            ml: '2rem',
            borderRadius: '10px',
            '@md': { ml: '30vw', mr: '30vw' },
          }}>
          <Card css={{ bgColor: 'transparent' }}>
            <Card.Header css={{ textAlign: 'center', justifyContent: 'center' }}>
              <Text size="$3xl" css={{ textAlign: 'center', fontFamily: 'manrope' }}>
                Регистрация
              </Text>
              <Spacer y={2.4} />
            </Card.Header>
            <Card.Body css={{ display: `${registrationStep.firstStep}` }}>
              <form onSubmit={(e) => registrationValidationHandler(e)}>
                <Col css={{ display: 'flex', flexDirection: 'column' }}>
                  <Input
                    aria-label="Поле ввода фамилии"
                    name="lastName"
                    id="lastName"
                    size="lg"
                    label="Фамилия"
                    placeholder="Иванов"
                    required
                    css={{ '@sm': { ml: '3rem', mr: '3rem' } }}
                  />
                  <Spacer y={1.3} />
                  <Input
                    aria-label="Поле ввода имени"
                    name="firstName"
                    id="firstName"
                    size="lg"
                    label="Имя"
                    placeholder="Иван"
                    required
                    css={{ '@sm': { ml: '3rem', mr: '3rem' } }}
                  />
                  <Spacer y={1.3} />
                  <Input
                    aria-label="Поле ввода отчества"
                    name="patronymic"
                    id="patronymic"
                    size="lg"
                    label="Отчество"
                    placeholder="Иванович"
                    css={{ '@sm': { ml: '3rem', mr: '3rem' } }}
                  />
                  <Spacer y={1.3} />
                  <Input
                    aria-label="Поле ввода даты рождения"
                    name="birthDay"
                    id="birthDay"
                    size="lg"
                    label="Дата рождения"
                    type="date"
                    required
                    css={{ '@sm': { ml: '3rem', mr: '3rem' } }}
                  />
                  <Spacer y={1.3} />
                  <Radio.Group
                    css={{ '@sm': { ml: '3rem', mr: '3rem' } }}
                    name="gender"
                    id="gender"
                    size="sm"
                    isRequired
                    label="Пол"
                    value={genderChecked}
                    onChange={setGenderChecked}
                    orientation="horizontal">
                    <Radio color="secondary" value="1">
                      Мужской
                    </Radio>
                    <Radio color="secondary" value="2">
                      Женский
                    </Radio>
                  </Radio.Group>
                  <Spacer y={1.3} />
                  <Input
                    aria-label="Поле ввода адреса электронной почты"
                    name="email"
                    id="email"
                    type="email"
                    size="lg"
                    required
                    label="Электонный адрес"
                    placeholder="example@mail.ru"
                    css={{ '@sm': { ml: '3rem', mr: '3rem' } }}
                  />
                  <Spacer y={1.3} />
                  <Input
                    aria-label="Поле ввода номера телефона"
                    name="phoneNumber"
                    id="phoneNumber"
                    size="lg"
                    label="Номер телефона"
                    placeholder="+7(922)312-23-31"
                    required
                    css={{ '@sm': { ml: '3rem', mr: '3rem' } }}
                  />
                  <Spacer y={1.3} />
                  <Input.Password
                    aria-label="Поле ввода пароля"
                    name="password"
                    id="password"
                    size="lg"
                    label="Пароль"
                    required
                    placeholder="***********"
                    css={{ '@sm': { ml: '3rem', mr: '3rem' } }}
                  />
                </Col>
                <Row css={{ pt: '4rem', pb: '0.5rem', justifyContent: 'center' }}>
                  <Button size={'lg'} color="secondary" type="submit">
                    Зарегистрироваться
                  </Button>
                </Row>
              </form>
            </Card.Body>
            <Card.Body css={{ display: `${registrationStep.secondStep}` }}>
              <form onSubmit={(e) => registrationHandler(e)}>
                <Col
                  css={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}>
                  <Text css={{ fontFamily: 'Manrope', fs: '$lg' }}>
                    {' '}
                    На указанный вами адрес электронной почты было отправлено письмо с
                    кодом подтвеждения.{' '}
                  </Text>
                  <Spacer y={1.3} />
                  <Input
                    aria-label="Поле подтверждения почты"
                    name="emailValidationInput"
                    id="emailValidationInput"
                    size="lg"
                    label="Код"
                    required
                    value={userValidationCode}
                    onChange={({ target }) => setUserValidationCode(target.value)}
                    type="text"
                    css={{ '@sm': { ml: '3rem', mr: '3rem' } }}
                  />
                  <Spacer y={1.8} />
                  <Row
                    css={{
                      justifyContent: 'space-around',
                      flexDirection: 'column',
                      '@sm': { flexDirection: 'row' },
                    }}>
                    <Button
                      size={'md'}
                      color="secondary"
                      onPress={registrationStepChangeHandler}>
                      Вернуться
                    </Button>
                    <Button size={'md'} color="secondary" type="submit">
                      Подтвердить
                    </Button>
                  </Row>
                  <Spacer y={1} />
                </Col>
              </form>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default Registration;
