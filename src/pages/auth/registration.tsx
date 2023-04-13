import { NextPage } from "next";
import React, { FormEventHandler, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
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
} from "@nextui-org/react";
import { signIn } from "next-auth/react";

const Registration: NextPage = (props): JSX.Element => {
  const router = useRouter();
  const [ checked, setChecked ] = React.useState('');
  const submitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: e.currentTarget.firstNameInput.value,
        lastName: e.currentTarget.lastNameInput.value,
        patronymic: e.currentTarget.patronymicInput.value,
        birthDay: e.currentTarget.bDayInput.value,
        email: e.currentTarget.emailInput.value,
        phoneNumber: e.currentTarget.phoneInput.value,
        genderId: checked,
        password: e.currentTarget.passwordInput.value,
      })
    }).then(async (res) => {
      if (res.status === 200) {
        console.log("Учётная запись была успешно создана!");
      } else {
        alert("Пользователь с такими данными уже существует!");
      }
    })
  }

  return (
    <>
      <div
        className="Hero"
        style={{
          height: "140vh",
          paddingTop: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container
          css={{
            bgColor: "#424242ab",
            height: "fit-content",
            pt: "3rem",
            mr: "2rem",
            ml: "2rem",
            borderRadius: "10px",
            "@md": { ml: "30vw", mr: "30vw" },
          }}
        >
          <form onSubmit={(e) => submitHandler(e)}>
            <Col css={{ display: "flex", flexDirection: "column" }}>
              <Text
                size="$3xl"
                css={{ textAlign: "center", fontFamily: "manrope" }}
              >
                Регистрация
              </Text>
              <Spacer y={2.4} />
              <Input
                aria-label="Поле ввода фамилии"
                name="lastNameInput"
                id="lastNameInput"
                size="lg"
                label="Фамилия"
                placeholder="Иванов"
                required
                type="text"
                css={{ '@sm': { ml: "3rem", mr: "3rem" } }}
              />
              <Spacer y={1.3} />
              <Input
                aria-label="Поле ввода имени"
                name="lgInput"
                id="firstNameInput"
                size="lg"
                label="Имя"
                placeholder="Иван"
                required
                type="text"
                css={{ '@sm': { ml: "3rem", mr: "3rem" } }}
              />
              <Spacer y={1.3} />
              <Input
                aria-label="Поле ввода отчества"
                name="patronymicInput"
                id="patronymicInput"
                size="lg"
                label="Отчество"
                placeholder="Иванович"
                type="text"
                css={{ '@sm': { ml: "3rem", mr: "3rem" } }}
              />
              <Spacer y={1.3} />
              <Input
                aria-label="Поле ввода даты рождения"
                name="bDayInput"
                id="bDayInput"
                size="lg"
                label="Дата рождения"
                type="datetime-local"
                css={{ '@sm': { ml: "3rem", mr: "3rem" } }}
              />
              <Spacer y={1.3} />
              <Radio.Group css={{ '@sm': { ml: "3rem", mr: "3rem" } }} size="sm" id="genderInput" label="Пол" value={checked} onChange={setChecked} orientation="horizontal">
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
                name="emailInput"
                id="emailInput"
                size="lg"
                label="Электонный адрес"
                placeholder="example@mail.ru"
                type="text"
                css={{ '@sm': { ml: "3rem", mr: "3rem" } }}
              />
              <Spacer y={1.3} />
              <Input
                aria-label="Поле ввода адреса электронной почты"
                name="phoneInput"
                id="phoneInput"
                size="lg"
                label="Номер телефона"
                placeholder="+7(922)312-23-31"
                type="text"
                css={{ '@sm': { ml: "3rem", mr: "3rem" } }}
              />
              <Spacer y={1.3} />
              <Input
                aria-label="Поле ввода пароля"
                name="passwordInput"
                id="passwordInput"
                size="lg"
                label="Пароль"
                placeholder="***********"
                type="password"
                css={{ '@sm': { ml: "3rem", mr: "3rem" } }}
              />
            </Col>
            <Row css={{pt:"2rem", pb:"2rem", justifyContent:"center"}}>
              <Button auto color="secondary" type="submit">
                Зарегистрироваться
              </Button>
            </Row>
          </form>
        </Container>
      </div>
    </>
  )
};

export default Registration
