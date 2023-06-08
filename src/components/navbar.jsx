import { Button, Col, Link, Navbar, Row, Text } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import NextLink from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import Logo from '../../public/logo.png';
import NextNProgress from 'nextjs-progressbar';

const Nav = () => {
  const router = useRouter();
  const collapseItems = [
    { id: 1, name: 'Главная', link: '/' },
    { id: 2, name: 'Контакты', link: '/contacts' },
    { id: 3, name: 'Услуги', link: '/services' },
  ];

  const { data: session, status } = useSession();

  return (
    <Navbar
      css={{
        $$navbarBackgroundColor: '#5757575d',
        $$navbarBlurBackgroundColor: '#5757575d',
        backgroundColor: '#5757575d',
        position: 'absolute',
        left: 0,
        right: 0,
      }}
      containerCss={{
        justifyContent: 'space-around',
      }}
      maxWidth="fluid">
      <NextNProgress color="#5dab" />
      {/* Common used */}
      <Navbar.Brand css={{ gap: '1rem' }}>
        <Navbar.Toggle showIn="sm" />
        <NextLink href="/" style={{ display: 'flex', gap: '1rem' }} passHref legacyBehavior>
          <a style={{ color: 'white', display: 'flex', gap: '1rem' }}>
            <Image src={Logo} width={35} height={35} alt="Logos" />
            <Text css={{ fontFamily: 'Manrope' }} color="white" hideIn="xs">
              Расчёска
            </Text>
          </a>
        </NextLink>
      </Navbar.Brand>

      {/* Desktop/Tablet */}
      <Navbar.Content hideIn="sm" gap="8rem">
        {collapseItems.map((item) => (
          <NextLink key={item.id} style={{ color: 'white' }} href={item.link} passHref legacyBehavior>
            <a style={{ color: 'white' }}>{item.name}</a>
          </NextLink>
        ))}
      </Navbar.Content>

      <Navbar.Content hideIn="xs">
        {session ? (
          <Row align="center" css={{ gap: '1rem' }}>
            <NextLink
              style={{ fontFamily: 'Manrope', color: 'white' }}
              href={`/user/${session.user.Id}`}
              legacyBehavior>
              <a style={{ color: 'white' }}>
                {session.user.FirstName} {session.user.LastName}
              </a>
            </NextLink>
            <Button color="secondary" auto onPress={signOut}>
              Выйти
            </Button>
          </Row>
        ) : (
          <Row align="center" css={{ gap: '1rem' }}>
            <NextLink style={{ color: 'white' }} href="" legacyBehavior>
              <a style={{ color: 'white' }} onClick={signIn}>
                Авторизация
              </a>
            </NextLink>
            <Button color="secondary" auto onClick={() => router.push('/auth/registration')}>
              Регистрация
            </Button>
          </Row>
        )}
      </Navbar.Content>

      <Navbar.Content showIn="xs">
        <NextLink style={{ color: 'white' }} href="/auth/authorization">
          Авторизация
        </NextLink>
      </Navbar.Content>

      {/* Mobile */}
      <Navbar.Collapse>
        {session ? (
          <Navbar.CollapseItem css={{ pt: '0.5rem', flexDirection: 'column' }}>
            <Link
              css={{
                minWidth: '100%',
                display: 'flex',
                justifyContent: 'center',
                color: 'white',
              }}
              href="/user">
              {session.user.FirstName} {session.user.LastName}
            </Link>
            <Link
              css={{
                minWidth: '100%',
                display: 'flex',
                justifyContent: 'center',
                color: 'white',
                pt: '0.4rem',
              }}
              href=""
              onClick={signOut}>
              Выйти
            </Link>
          </Navbar.CollapseItem>
        ) : (
          <Navbar.CollapseItem css={{ pt: '0.5rem', flexDirection: 'column' }}>
            <NextLink style={{ color: 'white' }} href="" passHref legacyBehavior>
              <a onClick={signIn}>Авторизация</a>
            </NextLink>
            <NextLink style={{ color: 'white', paddingTop: '1rem' }} href="/auth/registration">
              Регистрация
            </NextLink>
          </Navbar.CollapseItem>
        )}
        {collapseItems.map((item) => (
          <Navbar.CollapseItem key={item.id} css={{ pt: '0.5rem' }}>
            <Link
              href={item.link}
              css={{
                minWidth: '100%',
                display: 'flex',
                justifyContent: 'center',
                color: 'white',
              }}>
              {item.name}
            </Link>
          </Navbar.CollapseItem>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Nav;
