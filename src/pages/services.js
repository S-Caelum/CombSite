import * as servicesRequest from "./api/customsRequests"
import SmallHero from "../components/smallHero"
import { Container, Row, Col, Text } from "@nextui-org/react";

export async function getServerSideProps(context) {
  const req = context.req;
  const res = context.res;
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=30, stale-while-revalidate=59"
  );
  return {
    props: {
      services: servicesRequest.getServices
    }
  }
}

/** @param {import('next').InferGetServerSIdePropsType<typeof getServerSIdeProps> } props */
export default function Services(props) {

  const servicesFiltering = (filterId) => {
    return props.services.filter((service) => { return Number(service.ServiceCategory.map((category) => category.CategoryId)) === Number(filterId) })
  }

    return (
      <>
      <div>
        <SmallHero header="Услуги" link="Главная / Услуги"/>
      </div>
      <div style={{ paddingTop:"3rem", paddingBottom:"5rem" }}>
        <Container>
          <Row css={{flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
              <Text color="secondary" css={{ textAlign:"center", fontFamily:"Diana", fs:"$2xl", "@xs": { fs:"$3xl" }, "@sm": { fs:"$4xl" } }}> Наши </Text>
              <Text color="secondary" css={{ textAlign:"center", fontFamily:"Manrope", fs:"$3xl", "@xs": { fs:"$4xl" }, "@sm": { fs:"$4xl" }  }}> Услуги </Text>
          </Row>
          <Row css={{ flexDirection:"column", justifyContent:"center", alignItems:"center", gap:"1rem", paddingTop:"3rem", "@sm": { paddingTop:"4rem", flexDirection:"column", gap:"1rem" } }}>
              <Text color="secondary" css={{ textAlign:"center", fontFamily:"Diana", fs:"$3xl", "@xs": { fs:"$2xl" }, "@sm": { fs:"$3xl" } }}> Стрижки </Text>
              <Col css={{pt:"0rem", "@sm": { pt:"1rem" }}}>
                {servicesFiltering(1).map((service) => (
                  <Row css={{ justifyContent:"center", alignItems:"center", pt:"0.6rem" }}>
                    <Col css={{width:"70%", "@sm": { width:"25%" }}}>
                      <Text css={{ fontFamily:"Manrope", textAlign:"left", "@sm": { fs:"$lg" } }} color="black"> {service.Name} </Text>
                    </Col>
                    <Col css={{width:"30%", "@sm": { width:"25%" } }}>
                      <Text css={{ fontFamily:"Manrope", textAlign:"right", "@sm": { fs:"$lg" } }} color="black"> {service.Cost} ₽ </Text>
                    </Col>
                  </Row>
                ))}
              </Col>
              <Text color="secondary" css={{ textAlign:"center", fontFamily:"Diana", pt:"4rem", fs:"$3xl", "@xs": { fs:"$2xl" }, "@sm": { fs:"$3xl" } }}> Окрашивания </Text>
              <Col css={{pt:"0rem", "@sm": { pt:"1rem" }}}>
                {servicesFiltering(2).map((service) => (
                  <Row css={{ justifyContent:"center", alignItems:"center", pt:"0.6rem" }}>
                    <Col css={{width:"70%", "@sm": { width:"25%" }}}>
                      <Text css={{ fontFamily:"Manrope", textAlign:"left", "@sm": { fs:"$lg" } }} color="black"> {service.Name} </Text>
                    </Col>
                    <Col css={{width:"30%", "@sm": { width:"25%" } }}>
                      <Text css={{ fontFamily:"Manrope", textAlign:"right", "@sm": { fs:"$lg" } }} color="black"> {service.Cost} ₽ </Text>
                    </Col>
                  </Row>
                ))}
              </Col>
              <Text color="secondary" css={{ textAlign:"center", fontFamily:"Diana", pt:"4rem", fs:"$3xl", "@xs": { fs:"$2xl" }, "@sm": { fs:"$3xl" } }}> Укладки </Text>
              <Col css={{pt:"0rem", "@sm": { pt:"1rem" }}}>
                {servicesFiltering(3).map((service) => (
                  <Row css={{ justifyContent:"center", alignItems:"center", pt:"0.6rem" }}>
                    <Col css={{width:"70%", "@sm": { width:"25%" }}}>
                      <Text css={{ fontFamily:"Manrope", textAlign:"left", "@sm": { fs:"$lg" } }} color="black"> {service.Name} </Text>
                    </Col>
                    <Col css={{width:"30%", "@sm": { width:"25%" } }}>
                      <Text css={{ fontFamily:"Manrope", textAlign:"right", "@sm": { fs:"$lg" } }} color="black"> {service.Cost} ₽ </Text>
                    </Col>
                  </Row>
                ))}
              </Col>
              <Text color="secondary" css={{ textAlign:"center", fontFamily:"Diana", pt:"4rem", fs:"$3xl", "@xs": { fs:"$2xl" }, "@sm": { fs:"$3xl" } }}> Уходы для волос </Text>
              <Col css={{pt:"0rem", "@sm": { pt:"1rem" }}}>
                {servicesFiltering(4).map((service) => (
                  <Row css={{ justifyContent:"center", alignItems:"center", pt:"0.6rem" }}>
                    <Col css={{width:"70%", "@sm": { width:"25%" }}}>
                      <Text css={{ fontFamily:"Manrope", textAlign:"left", "@sm": { fs:"$lg" } }} color="black"> {service.Name} </Text>
                    </Col>
                    <Col css={{width:"30%", "@sm": { width:"25%" } }}>
                      <Text css={{ fontFamily:"Manrope", textAlign:"right", "@sm": { fs:"$lg" } }} color="black"> {service.Cost} ₽ </Text>
                    </Col>
                  </Row>
                ))}
              </Col>
              <Text color="secondary" css={{ textAlign:"center", fontFamily:"Diana", pt:"4rem", fs:"$3xl", "@xs": { fs:"$2xl" }, "@sm": { fs:"$3xl" } }}> Макияж </Text>
              <Col css={{pt:"0rem", "@sm": { pt:"1rem" }}}>
                {servicesFiltering(5).map((service) => (
                  <Row css={{ justifyContent:"center", alignItems:"center", pt:"0.6rem" }}>
                    <Col css={{width:"70%", "@sm": { width:"25%" }}}>
                      <Text css={{ fontFamily:"Manrope", textAlign:"left", "@sm": { fs:"$lg" } }} color="black"> {service.Name} </Text>
                    </Col>
                    <Col css={{width:"30%", "@sm": { width:"25%" } }}>
                      <Text css={{ fontFamily:"Manrope", textAlign:"right", "@sm": { fs:"$lg" } }} color="black"> {service.Cost} ₽ </Text>
                    </Col>
                  </Row>
                ))}
              </Col>
              <Text color="secondary" css={{ textAlign:"center", fontFamily:"Diana", pt:"4rem", fs:"$3xl", "@xs": { fs:"$2xl" }, "@sm": { fs:"$3xl" } }}> Маникюр </Text>
              <Col css={{pt:"0rem", "@sm": { pt:"1rem" }}}>
                {servicesFiltering(6).map((service) => (
                  <Row css={{ justifyContent:"center", alignItems:"center", pt:"0.6rem" }}>
                    <Col css={{width:"70%", "@sm": { width:"25%" }}}>
                      <Text css={{ fontFamily:"Manrope", textAlign:"left", "@sm": { fs:"$lg" } }} color="black"> {service.Name} </Text>
                    </Col>
                    <Col css={{width:"30%", "@sm": { width:"25%" } }}>
                      <Text css={{ fontFamily:"Manrope", textAlign:"right", "@sm": { fs:"$lg" } }} color="black"> {service.Cost} ₽ </Text>
                    </Col>
                  </Row>
                ))}
              </Col>
          </Row>
        </Container>
      </div>
      </>
    );
  }