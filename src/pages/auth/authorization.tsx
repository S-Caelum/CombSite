import { NextPage } from 'next';
import React, { FormEventHandler, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Container, Col, Text, Input, Spacer, Button, Modal } from '@nextui-org/react';
import { signIn } from 'next-auth/react';

const Authorization: NextPage = (props): JSX.Element => {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [accountData, setAccountData] = useState({ email: '', password: '' });
  const [errorData, setErrorData] = useState({ errorDesc: '' });
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
  };
  const submitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const res = await signIn('email-login', {
      email: accountData.email,
      password: accountData.password,
      redirect: false,
    }).then(({ ok, error }) => {
      if (ok) {
        router.push('/');
      } else if (error) {
        setErrorData({ ...errorData, errorDesc: error });
        handler();
      }
    });
  };
  return (
    <>
      <Modal
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
        css={{ mb: '30rem', borderWidth: '1px', borderColor: '$cyan100' }}>
        <Modal.Header css={{ pt: '2rem' }}>
          <Text b size="$lg" color="error">
            Ошибка
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text css={{ textAlign: 'center' }}>{errorData.errorDesc}</Text>
        </Modal.Body>
        <Modal.Footer justify="center" css={{ pb: '2rem' }}>
          <Button color="error" onPress={closeHandler}>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>
      <div
        className="Hero"
        style={{
          height: '100vh',
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
          <form onSubmit={submitHandler}>
            <Col css={{ display: 'flex', flexDirection: 'column' }}>
              <Text size="$3xl" css={{ textAlign: 'center', fontFamily: 'manrope' }}>
                Авторизация
              </Text>
              <Spacer y={2.4} />
              <Input
                aria-label="Поле ввода электронной почты"
                name="lgInput"
                size="lg"
                label="Электронная почта"
                placeholder="example@mail.ru"
                type="text"
                css={{
                  '@sm': {
                    ml: '3rem',
                    mr: '3rem',
                  },
                }}
                onChange={({ target }) => setAccountData({ ...accountData, email: target.value })}
              />
              <Spacer y={1.3} />
              <Input.Password
                aria-label="Поле ввода пароля"
                name="pwInput"
                size="lg"
                label="Пароль"
                placeholder="**********"
                css={{
                  '@sm': {
                    ml: '3rem',
                    mr: '3rem',
                  },
                }}
                onChange={({ target }) => setAccountData({ ...accountData, password: target.value })}
              />
              <Spacer y={1.6} />
              <Link
                href={`/auth/registration`}
                style={{ color: 'white', textDecoration: 'underline', alignSelf: 'center' }}>
                Не зарегистрированы?
              </Link>
              <Spacer y={0.6} />
              <Button
                color="secondary"
                aria-label="Войти в профиль"
                name="authSubmit"
                css={{
                  textAlign: 'center',
                  mb: '3rem',
                  '@sm': {
                    ml: '7rem',
                    mr: '7rem',
                  },
                }}
                size="lg"
                type="submit">
                Войти
              </Button>
            </Col>
          </form>
        </Container>
      </div>
    </>
  );
};

export default Authorization;
