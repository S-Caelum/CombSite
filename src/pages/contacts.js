import { Card, Container, Link, Row, Text, Col } from "@nextui-org/react";
import SmallHero from "../components/smallHero"

export default function Contacts() {

    const salonPointsData = [
      { 
        id: 1,
        header: "Центральный район",
        phoneNumber: "+7 (3532) 90‒17‒75",
        address: "Центральный район, Оренбург, ​Карагандинская, 32, ​2 этаж",
        mapLink: "https://2gis.ru/orenburg/firm/70000001031336108?m=55.135182%2C51.791794%2F16",
        workingHours: "10:00 - 18:00"
      },
      {
        id: 2,
        header: "Промышленный район",
        phoneNumber: "+7 (3532) 28‒68‒71",
        address: "Промышленный район, Оренбург, Пролетарская, 271, ​1 этаж",
        mapLink: "https://2gis.ru/orenburg/firm/70000001033754500?m=55.093093%2C51.806887%2F16",
        workingHours: "09:00 - 21:00"
      }
    ]

    return (
      <>
        <div>
          <SmallHero header="Контакты" link="Главная / Контакты"/>
        </div>
        <div style={{ paddingTop:"3rem", paddingBottom:"5rem" }}>
          <Container>
            <Row css={{flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
              <Text color="secondary" css={{ textAlign:"center", fontFamily:"Diana", fs:"$2xl", "@xs": { fs:"$3xl" }, "@sm": { fs:"$4xl" } }}> Наши </Text>
              <Text color="secondary" css={{ textAlign:"center", fontFamily:"Manrope", fs:"$3xl", "@xs": { fs:"$4xl" }, "@sm": { fs:"$4xl" }  }}> Контакты </Text>
            </Row>
            <Row css={{ flexDirection:"column", justifyContent:"center", alignItems:"center", gap:"3rem", paddingTop:"3rem", "@sm": { paddingTop:"4rem", flexDirection:"row", gap:"8rem" } }}>
              {salonPointsData.map((point) => (
                <Card key={point.id} css={{mw:"100%", height:"360px", "@sm": { width:"30%", height:"380px" }}}>
                  <Card.Header>
                    <Text css={{ fs:"$lg", pt:"0.5rem", pl:"0.5rem", "@sm": { fs:"$2xl" }}}> {point.header} </Text>
                  </Card.Header>
                  <Card.Body css={{"@xs": {pr:"2rem"}}}>
                    <Text css={{ fs:"$md", pl:"0.5rem", "@sm": { fs:"$lg" } }}> {point.phoneNumber} </Text>
                    <Text css={{ fs:"$md", pl:"0.5rem", "@sm": { fs:"$lg" } }}> {point.address} </Text>
                    <Link color="secondary" css={{ fs:"$md", pt:"2rem", pl:"0.5rem", "@sm": { fs:"$lg" } }} href={point.mapLink}> Смотреть на 2Гис </Link>
                  </Card.Body>
                  <Card.Divider/>
                  <Card.Footer>
                    <Col>
                      <Text css={{ fs:"$md", pt:"0.3rem", pb:"0.3rem", pl:"0.5rem", "@sm": { fs:"$lg" } }}> Время работы: {point.workingHours} </Text>
                      <Text css={{ fs:"$md", mb:"0.6rem", pl:"0.5rem", "@sm": { fs:"$lg" } }}> По предвартельной записи </Text>
                    </Col>
                  </Card.Footer>
                </Card>
              ))}
            </Row>
          </Container>
        </div>
      </>
    );
  }