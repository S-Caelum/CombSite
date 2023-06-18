import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import Hero from '../../components/smallHero';
import { Container, Row } from '@nextui-org/react';
import OrdersTable from '../../components/user/ordersTable';
import NewOrderForm from '../../components/user/newOrderForm/newOrderForm';
import React from 'react';
import Head from 'next/head';

export async function getServerSideProps(context) {
  var user;
  const { id } = context.params;
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session) {
    return {
      redirect: {
        destination: '/auth/authorization?callbackUrl=/protected/server',
        permanent: false,
      },
    };
  } else if (Number(session.user.Id) !== Number(id)) {
    return {
      redirect: {
        destination: `/user/${session.user.Id}`,
        permanent: false,
      },
    };
  }
  var [categoriesRes, servicesRes, employeesRes, usersRes] = await Promise.all([
    fetch(`${process.env.APP_DOMAIN}/api/orders/categoryList`),
    fetch(`${process.env.APP_DOMAIN}/api/orders/serviceList`),
    fetch(`${process.env.APP_DOMAIN}/api/orders/employeeList`),
  ]);
  var userData = await fetch(`${process.env.APP_DOMAIN}/api/user/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: Number(id),
    }),
  })
    .then((res) => res.json())
    .then((data) => (user = data));
  var [categories, services, employees] = await Promise.all([
    await categoriesRes.json(),
    await servicesRes.json(),
    await employeesRes.json(),
  ]);
  return {
    props: {
      user,
      categories,
      services,
      employees,
    },
  };
}

/** @param {import('next').InferGetServerSidePropsType<typeof getServerSideProps> } props */
export default function User({ user, categories, services, employees }) {
  const [counter, setCounter] = React.useState(1);
  return (
    <>
      <Head>
        <title>
          {user.FirstName} {user.LastName} - Расчёска
        </title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="keywords" content="Профиль пользователя" />
        <meta name="description" content="Профиль пользователя веб-приложения" />
      </Head>
      <header>
        <Hero header={user.FirstName + ' ' + user.LastName} link="Главная / Профиль" />
      </header>
      <main style={{ height: '100%', paddingBottom: '5rem' }}>
        <Container css={{ width: '100vw', height: '100%', pt: '2rem' }}>
          <Row
            css={{
              width: '100%',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2rem',
              '@md': {
                flexDirection: 'row',
                alignItems: 'start',
                justifyContent: 'center',
              },
            }}>
            <OrdersTable orders={user.ClientService} setCounter={setCounter} />
            <NewOrderForm
              categories={categories}
              services={services}
              employees={employees}
              user={user}
              counter={counter}
            />
          </Row>
        </Container>
      </main>
    </>
  );
}
