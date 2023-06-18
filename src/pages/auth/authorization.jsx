import { Button, Col, Container, Input, Link, Spacer, Text } from '@nextui-org/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';

const Authorization = () => {
  const router = useRouter();
  const schema = Yup.object().shape({
    login: Yup.string()
      .required('Заполните поле')
      .matches(
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
        'Введите корректный адрес электронной почты'
      ),
    password: Yup.string().required('Заполните поле'),
  });
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const submitHandler = async (data) => {
    console.log(data);
    const res = await signIn('email-login', {
      email: data.login,
      password: data.password,
      redirect: false,
    }).then(({ ok, error }) => {
      if (ok) {
        clearErrors();
        router.push('/');
      } else if (error) {
        setError('login', { type: 'custom', message: error });
        setError('password', { type: 'custom', message: error });
      }
    });
  };
  return (
    <>
      <Head>
        <title>Авторизация - Расчёска</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="keywords" content="авторизация, салон, красоты, салонкрасоты, салон красоты" />
        <meta name="description" content="Страница авторизации" />
      </Head>
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
          <form onSubmit={handleSubmit(submitHandler)}>
            <Col css={{ display: 'flex', flexDirection: 'column' }}>
              <Text size="$3xl" css={{ textAlign: 'center', fontFamily: 'manrope' }}>
                Авторизация
              </Text>
              <Spacer y={2.4} />
              <Input
                {...register('login')}
                aria-label="Поле ввода электронной почты"
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
              />
              <Text css={{ width: '80%', '@sm': { pl: '4rem', pr: '1rem' } }}>{errors.login?.message}</Text>
              <Spacer y={1.3} />
              <Input.Password
                {...register('password')}
                aria-label="Поле ввода пароля"
                size="lg"
                label="Пароль"
                placeholder="**********"
                css={{
                  '@sm': {
                    ml: '3rem',
                    mr: '3rem',
                  },
                }}
              />
              <Text css={{ width: '80%', '@sm': { pl: '4rem', pr: '1rem' } }}>
                {errors.password?.message}
              </Text>
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
