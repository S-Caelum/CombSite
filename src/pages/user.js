import { getToken } from "next-auth/jwt";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { prisma } from "./api/prisma";
import * as servicesRequest from "./api/customsRequests";
import Hero from "../components/smallHero";
import { Container, Table, Card, Col, Text, Row, Button } from "@nextui-org/react";
import moment from "moment/moment";
import { useCart } from "react-use-cart";
import { useEffect, useState } from "react";

export async function getServerSideProps(context) {
  const req = context.req;
  const res = context.res;
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )
  const token = await getToken({ req });
  const session = getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/authorization",
        permanent: false,
      },
    };
  }

  const getClientOrders = await prisma.clientService.findMany({
    where: {
      ClientId: token.Id,
    },
    include: {
      Employee: {
        select: {
          Id: true,
          FirstName: true,
          LastName: true,
        },
      },
      Service: {
        select: {
          Id: true,
          Name: true,
          Cost: true,
        },
      },
    },
  });
  const services = servicesRequest.getAllServices;
  const orders = getClientOrders;

  return {
    props: {
      token,
      services,
      orders,
    },
  };
}

/** @param {import('next').InferGetServerSidePropsType<typeof getServerSideProps> } props */
export default function User(props) {

  const { items, emptyCart, removeItem, addItem, inCart, cartTotal, } = useCart();


moment.updateLocale("ru", null);
props.orders.forEach((i) => {
  Object.assign(i, {
    ServiceName: i.Service.Name,
    ServiceCost: i.Service.Cost,
    NewDate: moment(i.Date).format("DD/MM/YY, h:mm:ss"),
    EmployeeFullName: i.Employee.FirstName + " " + i.Employee.LastName,
  });
});
props.services.forEach((i) => {
  Object.assign(i, {
    id: i.Id.toString(),
    price: i.Cost
  });
});

var orderCounter = 0
var cartCounter = 0
props.orders.forEach((item) => {
  orderCounter++
});
items.forEach((item) => {
  cartCounter++
})
var sukaHandler = (service) => {
  if ((orderCounter+cartCounter) % 5 == 0) {
    props.services.forEach((i) => {
      Object.assign(i, {
        id: i.Id.toString(),
        price: i.Cost*0.8
      });
      orderCounter = 0;
      cartCounter = 0;
      console.log(i);
    });
    console.log("пивка бы")
  }
  addItem(service)
}

  const [allItems, setAllItems] = useState([{}]);
  useEffect(() => { setAllItems(JSON.parse(JSON.stringify(items)))}, [items]);

  const [ cartTotalFormatted, setCartTotalFormatted ] = useState(null)
  useEffect(() => {
    setCartTotalFormatted(new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(cartTotal))
})

console.log(orderCounter+cartCounter)

  const columns = [
    {
      key: "NewDate",
      label: "Дата",
    },
    {
      key: "EmployeeFullName",
      label: "Мастер",
    },
    {
      key: "ServiceName",
      label: "Услуга",
    },
    {
      key: "ServiceCost",
      label: "Стоимость",
    },
  ];

  return (
    <>
      <div>
        <Hero
          header={props.token.FirstName + " " + props.token.LastName}
          link=" Главная / Профиль"
        />
      </div>
      <div className="UserOrders">
        <Container css={{pt:"4rem", pr:"17rem", pl:"17rem"}}>
          <Card>
            <Table
              id="Список заказов пользователя"
              aria-label="Example table with dynamic content"
              color="secondary"
              css={{
                height: "auto",
                minWidth: "100%",
              }}
            >
              <Table.Header columns={columns}>
                {(column) => (
                  <Table.Column css={{fs:"$md", color:"$gray800", fontFamily:"Manrope"}} key={column.key}> {column.label} </Table.Column>
                )}
              </Table.Header>
              <Table.Body items={props.orders}>
                {(item) => (
                  <Table.Row key={item.Id}>
                    {(columnKey) => (
                      <Table.Cell> {item[columnKey]} </Table.Cell>
                    )}
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
          </Card>
        </Container>
      </div>
      <div className="UserNewOrder">
        <Container css={{pt:"6rem"}}>
          <Col>
            <Text size="$3xl" color="secondary" css={{ta:"center", fontFamily:"Diana"}}>Новый</Text>
            <Text size="$4xl" color="secondary" css={{ta:"center", fontFamily:"Manrope"}}>Заказ</Text>
          </Col>
          <Container wrap="wrap" css={{pt:"4rem"}} display="flex" direction="row" justify="center">
            {props.services.map((service) => {
                const alreadyAdded = inCart(service.Id);
                if (service.IsActual == true)
                return (
                  <Card key={service.Id} css={{maxWidth:"18rem", height:"20rem", mr:"0.5rem", ml:"0.5rem", mt:"1rem"}}>
                    <Card.Header css={{display:"flex", justifyContent:"center"}}>
                      <Text size="$lg" css={{textAlign:"center"}}> {service.Name} </Text>
                    </Card.Header>
                    <Card.Body>
                      <Text css={{ pr:"0.5rem", pl:"0.5rem" }}> {service.Description} </Text>
                      <Text size="$lg" css={{pt:"2rem", textAlign:"center"}}> {service.price} Руб </Text>
                    </Card.Body>
                    <Card.Divider/>
                    <Card.Footer css={{display:"flex", justifyContent:"center"}}>
                      <Button size="md"
                      color="secondary"
                      onPress={(e) => sukaHandler(service)}>
                        Добавить в корину</Button>
                    </Card.Footer>
                  </Card>
                )
              }
            )}
          </Container>
        </Container>
      </div>
      <div className="UserCart">
        <Container css={{pt:"5rem"}} display="flex" direction="column" alignItems="center" justify="center">
          <Text color="black" size="$3xl" css={{textAlign:"center", fontFamily:"Manrope"}}> Корзина </Text>
          <Card css={{mw:"60%", mt:"4rem", mb:"14rem"}}>
            <Card.Body>
              {allItems.map((item) => (
                <Row css={{pt:"0.5rem", pb:"0.5rem"}} justify="center" key={item.id}>
                  <Col>
                    <Text size="$lg" css={{pl:"4.5rem"}}> {item.Name} </Text>
                  </Col>
                  <Col>
                    <Text size="$lg" css={{pl:"8.5rem"}}> {item.price} </Text>
                  </Col>
                  <Col>
                    <Button onPress={(e) => {removeItem(item.id)}} color="error" size="xs" css={{display: "flex", justifyContent:"center", alignItems:"center", textAlign:"center", ml:"4.5rem", height:"2rem"}}> x </Button>
                  </Col>
                </Row>
              ))}
            </Card.Body>
            <Card.Divider/>
            <Card.Footer>
              <Text> {cartTotalFormatted} </Text>
              <Button onPress={(e) => {}}></Button>
            </Card.Footer>
          </Card>
        </Container>
      </div>
    </>
  );
}
