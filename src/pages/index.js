import { Container, Col, Row, Text, Card, Grid } from '@nextui-org/react';
import NextLink from 'next/link';

export default function Home() {
  const salonData = [
    {
      id: 1,
      title: 'Центральный район',
      address: 'Центральный район, Оренбург, ​Карагандинская, 32, ​2 этаж',
      link: 'https://2gis.ru/orenburg/firm/70000001031336108?m=55.135182%2C51.791794%2F16',
      phone: '+7 (3532) 90‒17‒75',
    },
    {
      id: 2,
      title: 'Промышленный район',
      address: 'Промышленный район, Оренбург, Пролетарская, 271, ​1 этаж',
      link: 'https://2gis.ru/orenburg/firm/70000001033754500?m=55.093093%2C51.806887%2F16',
      phone: '+7 (3532) 28‒68‒71',
    },
  ];

  return (
    <>
      <section className="Hero" style={{ paddingTop: '5rem' }}>
        <Container
          wrap
          sm
          css={{
            pt: '6rem',
            pb: '4rem',
            '@sm': { pt: '5rem', pb: '10rem' },
            '@md': { pt: '5rem', pb: '14rem' },
            '@lg': { pt: '7rem', pb: '5rem' },
          }}
          display="flex"
          direction="column"
          alignItems="center"
          alignContent="center"
          justify="center">
          <Text
            css={{
              textAlign: 'center',
              fontFamily: 'Diana',
              fs: '$4xl',
              '@xs': { fs: '$5xl' },
            }}>
            Уверенные. Уникальные. Прекрасные
          </Text>
          <Text
            css={{
              textAlign: 'center',
              fontFamily: 'Manrope',
              fs: '14pt',
              mt: '1rem',
              '@xs': { fs: '16pt', mt: '0rem' },
              '@lg': { fs: '20pt', mt: '0rem' },
            }}
            size="$3xl">
            Расчёска
          </Text>

          <Container
            display="flex"
            direction="column"
            alignItems="center"
            justify="center"
            css={{
              mt: '6rem',
              '@xs': { flexDirection: 'row', gap: '6rem', mt: '8rem' },
            }}>
            {salonData.map((salon) => (
              <NextLink href={salon.link} key={salon.id}>
                <Card
                  css={{
                    mw: '380px',
                    mt: '2rem',
                    height: '310px',
                    '@xs': { height: '300px', mt: '0rem' },
                    bgColor: '#424242ab',
                  }}
                  isPressable>
                  <Card.Header>
                    <Row>
                      <Text
                        b
                        css={{
                          fontFamily: 'Manrope',
                          pl: '1rem',
                          pt: '1rem',
                          '@xs': { pt: '1rem', fs: '$xl' },
                        }}>
                        {salon.title}
                      </Text>
                    </Row>
                  </Card.Header>

                  <Card.Body>
                    <Row>
                      <Text
                        css={{
                          fontFamily: 'Manrope',
                          pl: '1rem',
                          pr: '4rem',
                          '@xs': { pt: '1rem', fs: '$lg' },
                        }}>
                        {salon.address}
                      </Text>
                    </Row>
                  </Card.Body>

                  <Card.Divider />

                  <Card.Footer>
                    <Row>
                      <Text
                        css={{
                          fontFamily: 'Manrope',
                          pl: '1rem',
                          mb: '1rem',
                          mt: '1rem',
                          '@xs': { fs: '$lg' },
                        }}>
                        {salon.phone}
                      </Text>
                    </Row>
                  </Card.Footer>
                </Card>
              </NextLink>
            ))}
          </Container>
        </Container>
      </section>
      <section className="InfoRows">
        <Grid.Container>
          <Grid
            className="homeInfoCardOne"
            css={{
              pt: '18rem',
              width: '50%',
              height: '18rem',
              '@xs': { pt: '22rem', height: '22rem' },
            }}></Grid>

          <Grid
            className="homeInfoCard"
            css={{
              pt: '1rem',
              width: '50%',
              height: '16rem',
              '@xs': { pt: '1rem', height: '22rem' },
            }}>
            <Text
              css={{
                fs: '$3xl',
                textAlign: 'center',
                fontFamily: 'Diana',
                pt: '0.5rem',
                '@xs': { fs: '$4xl' },
              }}
              color="secondary">
              Опыт
            </Text>
            <Text
              color="black"
              css={{
                textAlign: 'justify',
                pr: '1.5rem',
                pl: '1.5rem',
                pt: '1rem',
                fontFamily: 'Manrope',
                '@xs': { fs: '$lg' },
                '@sm': { pr: '2.5rem', pl: '2.5rem' },
              }}>
              Опыт наших услуг начинается в тот момент, когда вы входите в один из двух
              наших хорошо оборудованных мест с полным спектром услуг в Оренбурге. Там, в
              теплой, гостеприимной обстановке, мы применяем консультативный подход, чтобы
              узнать больше о вас и о том, как мы можем помочь вам выразить свой личный
              стиль.
            </Text>
          </Grid>
        </Grid.Container>

        <Grid.Container css={{ pt: '1rem', '@xs': { pt: '0rem' } }}>
          <Grid
            className="homeInfoCardTwo"
            css={{
              pt: '18rem',
              width: '50%',
              height: '18rem',
              '@sm': { display: 'none' },
            }}></Grid>
          <Grid
            className="homeInfoCard"
            css={{
              pt: '1rem',
              width: '50%',
              height: '16rem',
              '@xs': { pt: '1rem', height: '22rem' },
            }}>
            <Text
              css={{
                fs: '$3xl',
                textAlign: 'center',
                fontFamily: 'Diana',
                pt: '0.5rem',
                '@xs': { fs: '$4xl' },
              }}
              color="secondary">
              Стилисты
            </Text>
            <Text
              color="black"
              css={{
                textAlign: 'justify',
                pr: '1.5rem',
                pl: '1.5rem',
                pt: '1rem',
                fontFamily: 'Manrope',
                '@xs': { fs: '$lg' },
                '@sm': { pr: '2.5rem', pl: '2.5rem' },
              }}>
              Наши высококвалифицированные стилисты выбраны за их творческий опыт в
              предоставлении персонализированных точных стрижек и модных женских и мужских
              причесок. Постоянное обучение и образование означает, что они могут
              предложить вам последние достижения в области укладки и ухода за волосами.
            </Text>
          </Grid>

          <Grid
            className="homeInfoCardTwoCopy"
            css={{
              pt: '18rem',
              width: '50%',
              height: '18rem',
              '@xs': { pt: '22rem', height: '22rem' },
            }}></Grid>
        </Grid.Container>
      </section>
      <section className="HomeServices">
        <Container css={{ pt: '5rem', mb: '7rem' }}>
          <Col css={{ textAlign: 'center' }}>
            <Text
              color="secondary"
              css={{ fs: '$2xl', fontFamily: 'diana', '@xs': { fs: '$3xl' } }}>
              Наши
            </Text>
            <Text
              color="secondary"
              css={{
                fs: '$3xl',
                fontFamily: 'manrope',
                '@xs': { fs: '$4xl' },
              }}>
              Услуги
            </Text>
          </Col>
          <Row css={{ pt: '2rem', textAlign: 'center' }}>
            <Text
              color="black"
              css={{
                fontFamily: 'manrope',
                '@xs': { fs: '$xl' },
                '@sm': { pl: '6rem', pr: '6rem' },
                '@lg': { pl: '15rem', pr: '15rem' },
              }}>
              Уже более 30 лет наши салоны предлагают непревзойденный уровень оценки
              клиентов. Мы хотим, чтобы вы были полностью удовлетворены своим опытом
              каждый раз, когда вы посещаете нас.
            </Text>
          </Row>
          <Grid.Container css={{ pt: '5rem', '@xs': { gap: '6rem' } }} justify="center">
            <Grid>
              <Col css={{ textAlign: 'center' }}>
                <Text
                  css={{
                    fontFamily: 'manrope',
                    pt: '0.5rem',
                    '@xs': { fs: '$lg' },
                  }}
                  color="black">
                  Окрашивание
                </Text>
                <Text
                  css={{
                    fontFamily: 'manrope',
                    pt: '0.5rem',
                    '@xs': { fs: '$lg' },
                  }}
                  color="black">
                  Стрижки
                </Text>
                <Text
                  css={{
                    fontFamily: 'manrope',
                    pt: '0.5rem',
                    '@xs': { fs: '$lg' },
                  }}
                  color="black">
                  Укладка
                </Text>
              </Col>
            </Grid>
            <Grid>
              <Col css={{ textAlign: 'center' }}>
                <Text
                  css={{
                    fontFamily: 'manrope',
                    pt: '0.5rem',
                    '@xs': { fs: '$lg' },
                  }}
                  color="black">
                  Уход
                </Text>
                <Text
                  css={{
                    fontFamily: 'manrope',
                    pt: '0.5rem',
                    '@xs': { fs: '$lg' },
                  }}
                  color="black">
                  Макияж
                </Text>
                <Text
                  css={{
                    fontFamily: 'manrope',
                    pt: '0.5rem',
                    '@xs': { fs: '$lg' },
                  }}
                  color="black">
                  Мелирование
                </Text>
              </Col>
            </Grid>
          </Grid.Container>
        </Container>
      </section>
    </>
  );
}
