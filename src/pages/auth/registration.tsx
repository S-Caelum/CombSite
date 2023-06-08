import { NextPage } from 'next';
import React, { useState } from 'react';
import FirstStep from '../../components/registration/registrationFirstStep';
import SecondStep from '../../components/registration/registrationSecondStep';
import ThirdStep from '../../components/registration/registrationThirdStep';
import { Container, Text, Spacer, Card, Modal, Button } from '@nextui-org/react';

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
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const [code, setCode] = useState({ code: '', time: '' });

  return (
    <>
      <div
        className="Hero"
        style={{
          height: '150vh',
          paddingTop: '4rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Modal open={visible} css={{ mb: '30rem', borderWidth: '1px', borderColor: '$cyan100' }}>
          <Modal.Header>
            <Text b size="$lg" color="error">
              Ошибка
            </Text>
          </Modal.Header>
          <Modal.Body>
            <Text css={{ textAlign: 'center' }}>{message}</Text>
          </Modal.Body>
          <Modal.Footer justify="center" css={{ pb: '2rem' }}>
            <Button color="error" onPress={() => setVisible(false)}>
              Закрыть
            </Button>
          </Modal.Footer>
        </Modal>
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
          <Card css={{ bgColor: 'transparent' }}>
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
