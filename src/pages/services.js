import SmallHero from '../components/smallHero';
import { Container, Row, Col, Text } from '@nextui-org/react';

export async function getServerSideProps() {
  const [serviceRes, categoriesRes] = await Promise.all([
    fetch(`${process.env.NEXTAUTH_URL}/api/orders/serviceList`),
    fetch(`${process.env.NEXTAUTH_URL}/api/orders/categoryList`),
  ]);
  const [services, categories] = await Promise.all([
    serviceRes.json(),
    categoriesRes.json(),
  ]);
  return {
    props: {
      services,
      categories,
    },
  };
}

/** @param {import('next').InferGetServerSIdePropsType<typeof getServerSIdeProps> } props */
export default function Services(props) {
  const servicesFiltering = (filterId) => {
    return props.services.filter((service) => {
      return (
        Number(service.ServiceCategory.map((category) => category.CategoryId)) ===
        Number(filterId)
      );
    });
  };

  return (
    <>
      <section>
        <SmallHero header="Услуги" link="Главная / Услуги" />
      </section>
      <section style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
        <Container>
          <Row
            css={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              color="secondary"
              css={{
                textAlign: 'center',
                fontFamily: 'Diana',
                fs: '$2xl',
                '@xs': { fs: '$3xl' },
                '@sm': { fs: '$4xl' },
              }}>
              Наши
            </Text>
            <Text
              color="secondary"
              css={{
                textAlign: 'center',
                fontFamily: 'Manrope',
                fs: '$3xl',
                '@xs': { fs: '$4xl' },
                '@sm': { fs: '$4xl' },
              }}>
              Услуги
            </Text>
          </Row>
          <Row
            css={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1rem',
              paddingTop: '3rem',
              '@sm': { paddingTop: '4rem', flexDirection: 'column', gap: '1rem' },
            }}>
            {props.categories.map((category, id) => (
              <Col key={id} css={{ pt: '0rem', '@sm': { pt: '1rem' } }}>
                <Text
                  color="secondary"
                  css={{
                    textAlign: 'center',
                    fontFamily: 'Diana',
                    fs: '$3xl',
                    '@xs': { fs: '$2xl' },
                    '@sm': { fs: '$3xl' },
                  }}>
                  {category.Name}
                </Text>
                {servicesFiltering(category.Id).map((service, id) => (
                  <Row
                    key={id}
                    css={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      pt: '0.6rem',
                    }}>
                    <Col css={{ width: '70%', '@sm': { width: '25%' } }}>
                      <Text
                        css={{
                          fontFamily: 'Manrope',
                          textAlign: 'left',
                          '@sm': { fs: '$lg' },
                        }}
                        color="black">
                        {service.Name}
                      </Text>
                    </Col>
                    <Col css={{ width: '30%', '@sm': { width: '25%' } }}>
                      <Text
                        css={{
                          fontFamily: 'Manrope',
                          textAlign: 'right',
                          '@sm': { fs: '$lg' },
                        }}
                        color="black">
                        {service.Cost} ₽
                      </Text>
                    </Col>
                  </Row>
                ))}
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
}
