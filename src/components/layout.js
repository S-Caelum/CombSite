import React from "react";
import { Button, Container, Link, Navbar, Text, User } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import NextLink from "next/link";
import { signOut, useSession } from 'next-auth/react'

import Logo from "../../public/logo.png";

function GuestUserPanel(props) {
  const router = useRouter();
  const collapseItems = [
    { id:1, name: "Главная", link: "/" },
    { id:2, name: "Контакты", link: "contacts" },
    { id:3, name: "Услуги", link: "services" },
  ];

  const { data: session, status } = useSession();
  if (status === 'unauthenticated' ) {
    return (
      <Navbar
        css={{
          $$navbarBackgroundColor: "#5757575d",
          $$navbarBlurBackgroundColor: "#5757575d",
          backgroundColor: "#5757575d",
          position: "absolute",
          left: 0,
          right: 0,
        }}
        containerCss={{
          justifyContent:"space-around",
        }}
        maxWidth="fluid">

          <Navbar.Brand css={{gap: '1rem'}}>
            <Navbar.Toggle showIn='sm'/>
            <NextLink href="/" style={{display: "flex", gap: "1rem"}}>
            <Image src={Logo} width={30} height={30} alt="Logos"/>
            <Text css={{fontFamily: 'Manrope'}} color="white" hideIn='xs'> Расчёска </Text>
            </NextLink>            
          </Navbar.Brand>
          
          <Navbar.Content hideIn='sm' gap="8rem">
            <NextLink style={{color: "white"}} href='/'> Главная </NextLink>
            <NextLink style={{color: "white"}} href='/contacts'> Контакты </NextLink>
            <NextLink style={{color: "white"}} href='/services'> Услуги </NextLink>
          </Navbar.Content>

          <Navbar.Content hideIn='xs'>
            <NextLink style={{color: "white"}} href='/auth/authorization'> Авторизация </NextLink>
            <Button color='secondary' auto href='/register' onClick={(e) => router.push("/auth/registration")}> Регистрация </Button>
          </Navbar.Content>

          <Navbar.Content showIn='xs'>
            <NextLink style={{color: "white"}} href='/auth/authorization'> Авторизация </NextLink>
          </Navbar.Content>

          <Navbar.Collapse>
            {collapseItems.map((item) => (
              <Navbar.CollapseItem key={item.id} css={{pt:"0.5rem"}}>
                <Link href={item.link} css={{ minWidth: "100%", display: "flex", justifyContent:'center', color: "white" }}> {item.name} </Link>
              </Navbar.CollapseItem>
            ))}
          </Navbar.Collapse>

      </Navbar>
    )
  } else if (status === 'authenticated') {
    return (
      <Navbar
        css={{
          $$navbarBackgroundColor: "#5757575d",
          $$navbarBlurBackgroundColor: "#5757575d",
          backgroundColor: "#5757575d",
          position: "absolute",
          left: 0,
          right: 0,
        }}
        containerCss={{
          justifyContent:"space-around",
        }}
        maxWidth="fluid">

          <Navbar.Brand css={{gap: '1rem'}}>
            <Navbar.Toggle showIn='sm'/>
            <NextLink href="/" style={{display: "flex", gap: "1rem"}}>
            <Image src={Logo} width={30} height={30} alt="Logos"/>
            <Text css={{fontFamily: 'Manrope'}} color="white" hideIn='xs'> Расчёска </Text>
            </NextLink>            
          </Navbar.Brand>
          
          <Navbar.Content hideIn='sm' gap="8rem">
            <NextLink style={{color: "white"}} href='/'> Главная </NextLink>
            <NextLink style={{color: "white"}} href='/contacts'> Контакты </NextLink>
            <NextLink style={{color: "white"}} href='/services'> Услуги </NextLink>
          </Navbar.Content>

          <Navbar.Content hideIn='xs'>
            <NextLink style={{color: "white"}} href='/user'> {session.user.FirstName} {session.user.LastName} </NextLink>
            <Button color='secondary' auto href='/register' onClick={() => signOut({ callbackUrl: "/" })}> Выйти </Button>
          </Navbar.Content>

          <Navbar.Content showIn='xs'>
            <NextLink style={{color: "white"}} href='/auth/authorization'> Авторизация </NextLink>
          </Navbar.Content>

          <Navbar.Collapse>
            {collapseItems.map((item) => (
              <Navbar.CollapseItem key={item.id} css={{pt:"0.5rem"}}>
                <Link href={item.link} css={{ minWidth: "100%", display: "flex", justifyContent:'center', color: "white" }}> {item.name} </Link>
              </Navbar.CollapseItem>
            ))}
          </Navbar.Collapse>

      </Navbar>
    )
  }
}

export default function layout({ children }) {
  return (
    <>
      <GuestUserPanel/>
      <main>{children}</main>
    </>
  );
}
