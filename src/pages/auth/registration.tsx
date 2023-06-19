import { NextPage } from 'next';
import React, { useState } from 'react';
import FirstStep from '../../components/registration/registrationFirstStep';
import SecondStep from '../../components/registration/registrationSecondStep';
import ThirdStep from '../../components/registration/registrationThirdStep';
import { Container, Text, Spacer, Card, Modal, Button } from '@nextui-org/react';
import Head from 'next/head';

const Registration: NextPage = (props): JSX.Element => {
  const [registrationStep, setRegistrationStep] = useState({
    firstStep: 'flex',
    secondStep: 'none',
    thirdStep: 'none',
  });
  const [registrationData, setRegistrationData] = useState({
    firstName: '',
    lastName: '',
    patronymic: '',
    dateOfBirth: '',
    gender: '',
    email: '',
    phone: '',
    password: '',
  });
  const [code, setCode] = useState({ code: '', time: '' });

  return (
    <>
      <Head>
        <title>Регистрация - Расчёска</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="keywords" content="регистрация, салон, красоты, салонкрасоты, салон красоты" />
        <meta name="description" content="Страница регистрации" />
      </Head>
      <div
        className="Hero"
        style={{
          height: '150vh',
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
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '10px',
            '@md': { ml: '30vw', mr: '30vw' },
          }}>
          <Card css={{ background: 'transparent' }}>
            <Card.Header css={{ textAlign: 'center', justifyContent: 'center' }}>
              <Text size="$3xl" css={{ textAlign: 'center', fontFamily: 'manrope' }}>
                Регистрация
              </Text>
            </Card.Header>
            <FirstStep
              registrationData={registrationData}
              setRegistrationData={setRegistrationData}
              registrationStep={registrationStep}
              setRegistrationStep={setRegistrationStep}
            />
            <SecondStep
              registrationData={registrationData}
              setRegistrationData={setRegistrationData}
              registrationStep={registrationStep}
              setRegistrationStep={setRegistrationStep}
              setCode={setCode}
            />
            <ThirdStep
              registrationData={registrationData}
              setRegistrationData={setRegistrationData}
              registrationStep={registrationStep}
              setRegistrationStep={setRegistrationStep}
              code={code}
            />
          </Card>
          <Spacer y={2.3} />
        </Container>
      </div>
    </>
  );
};

export default Registration;
