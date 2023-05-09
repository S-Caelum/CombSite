import { getToken } from "next-auth/jwt";
import { prisma } from "./api/prisma";
import * as servicesRequest from "./api/customsRequests";
import Hero from "../components/smallHero";
import { Container, Table, Card, Col, Text, Row, Button, Modal } from "@nextui-org/react";
import moment from "moment/moment";
import { useCart } from "react-use-cart";
import { useEffect, useState } from "react";

export async function getServerSideProps(context) {
  const req = context.req;
  const res = context.res;
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );
  const token = await getToken({ req });

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

  return {
    props: {
      token,
      categories: servicesRequest.getCategories,
      services: servicesRequest.getServices,
      orders: getClientOrders,
      employees: servicesRequest.getEmployees
    },
  };
}

/** @param {import('next').InferGetServerSidePropsType<typeof getServerSideProps> } props */
export default function User(props) {

  // Defining delay function for components
  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  // Declaring cart modules
  const { items, emptyCart, removeItem, totalItems, addItem, inCart, cartTotal } =
  useCart();
  
  // Defining columns of user's orders table
  const ordersColumns = [
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
  
  // Changing JSON object properties of user's orders to fit requirements of table
  props.orders.forEach((i) => {
      Object.assign(i, {
        ServiceName: i.Service.Name,
        ServiceCost: i.Cost + " ₽",
        NewDate: moment(i.Date).format("DD/MM/YY, h:mm:ss"),
        EmployeeFullName:
          i.Employee.LastName + " " + i.Employee.FirstName.charAt(0) + ".",
      });
  });
  
  // Changing JSON object properties of list of services to fit requirements of cart module
  props.services.forEach((i) => {
    Object.assign(i, {
      id: i.Id.toString(),
      price: i.Cost
    });
  });

  // Creating filtering functions for "New Order" container
  const [ data, setData ] = useState(props.services);
  const [ selectedCategoryId, setSelectedCategoryId ] = useState([1]);
  const handleSelect = (e) => {
    setSelectedCategoryId(e.target.value)
  }

  // Hook to prevent hydration error while loading cart items
  const [allItems, setAllItems] = useState([{}]);
  useEffect(() => {
    setAllItems(JSON.parse(JSON.stringify(items)));
  }, [items]);


  // Hook for switching context on "Next Order" card
  const [ visible, setVisible ] = useState ({ firstStep: "none", secondStep: "none", lastStep: "none" })
  useEffect(() => {
    if (allItems.length > 0) {
      setVisible({...visible, firstStep:"none", secondStep:"block", lastStep:"none"})
    } else if (allItems.length === 0) {
      setVisible({...visible, firstStep:"block", secondStep:"none", lastStep:"none"})
    }
  }, [allItems])
  async function visibilityHandler(fStep, sStep, lStep) {
    await delay(300)
    setVisible({...visible, firstStep:fStep, secondStep:sStep, lastStep:lStep})
  }

  // Functions that creates discount on every 6th order and on birthday
  var birthdayDate = moment(props.token.Birthday).format("DD/MM");
  var counter = 1;
  const [ discount, setDiscount ] = useState("1");
  props.orders.forEach(() => counter++);
  console.log(discount)

  // New order function handler
  async function newOrderHandler(e) {
    e.preventDefault();
    allItems.forEach((item) => {
      fetch("/api/newOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientId: props.token.Id,
          serviceID: Number(item.id),
          requestedDate: e.currentTarget.date.value,
          requestedEmployee: Number(e.currentTarget.employee.value),
          serviceCost: Number(item.price * parseFloat(discount)),
        })
      }).then((res) => {
        switch(res.status) {
          case 503:
            console.log(res.text())
            break;
          case 504:
            console.log(res.text())
            break;
          case 500:
            console.log("Произошла неизвестная ошибка. Попробуйте снова или свяжитесь со специалистом");
            break;
          case 200:
            emptyCart();
            localStorage.removeItem(item);
            break;
          default:
            alert( "Нет таких значений" );
            break;
        }
      })
    })
  } 

  return (
    <>
      {/* Hero component for header of the page */}
      <div>
        <Hero header={ props.token.FirstName + " " + props.token.LastName } link=" Главная / Профиль"/>
      </div>
      {/* Main Content of the page */}
      <div style={{ height:"100%", paddingBottom:"5rem" }}>
        <Container css={{ width: "100vw", height:"100%", pt:"2rem" }}>
          <Row css={{ width: "100%", flexDirection:"column", alignItems:"center", gap:"2rem", "@md": { flexDirection:"row", alignItems:"start", justifyContent:"center" } }}>
            {/* Orders table */}
            <Col>
              <Card css={{ '@lg': { mw:"100%" } }}>
                <Card.Header css={{ justifyContent:"center", pt:"1.3rem" }}>
                  <Text css={{fontFamily:"Manrope", "@xs": { fs:"$2xl" }, "@lg": { fs:"$3xl" } }} color="secondary" size="$xl"> Ваши заказы </Text>
                </Card.Header>
                <Card.Body>
                  <Table id="Список заказов пользователя" aria-label="Список заказов пользователя" color="secondary">
                    <Table.Header columns={ordersColumns}>
                      {(column) => (
                        <Table.Column css={{ fs:"$md" }} key={column.key}> {column.label} </Table.Column>
                      )}
                    </Table.Header>
                    <Table.Body items={props.orders}>
                      {(item) => (
                        <Table.Row key={item.Id}>
                          {(columnKey) => (
                            <Table.Cell css={{ fs:"$sm", "@sm": { fs:"$md" }, "@lg": { fs:"$lg" } }}> {item[columnKey]} </Table.Cell>
                          )}
                        </Table.Row>
                      )}
                    </Table.Body>
                    <Table.Pagination css={{ mt:"0.5rem" }} noMargin align="center" rowsPerPage={6}/>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
            {/* Form for new order creation */}
            <Col>
              <Card css={{ '@lg': { mw:"100%" } }}>
                <Card.Header css={{ justifyContent:"center", pt:"1.3rem" }}>
                  <Text css={{ fontFamily:"Manrope", "@xs": { fs:"$2xl" }, "@lg": { fs:"$3xl" } }} color="secondary" size="$xl"> Новый заказ </Text>
                </Card.Header>
                <Card.Body css={{ justifyContent:"center" }}>
                  <form onSubmit={(e) => newOrderHandler(e)}>
                    <Card css={{ mw:"100%" }}>
                      <Card.Body css={{ display:`${visible.firstStep}` }}>
                        <select style={{width:"100%", height:"2.3rem", paddingLeft:"0.5rem" }} onChange={handleSelect}>
                          {props.categories.map((category) => {
                            return (
                              <option value={category.Id} key={category.Id}> {category.Name} </option>
                            )
                          })}
                        </select>
                        {data.filter((value) => {return Number(value.ServiceCategory.map((category) => category.CategoryId)) === Number(selectedCategoryId)}).map((item, id) => (
                          <Card key={id} css={{ mt:"1rem", bgColor:"$gray100" }}>
                            <Card.Body>
                              <Row wrap="wrap" justify="space-between" align="center">
                                <Col css={{width:"50%"}}>
                                  <Text css={{"@lg": { ml:"1rem"} }}> {item.Name} </Text>
                                </Col>
                                <Col css={{width:"20%"}}>
                                  <Text> {item.price} ₽ </Text>
                                </Col>
                                <Col css={{width:"20%"}}>
                                  <Button auto color="secondary" onPress={() => {
                                    addItem(item);
                                    if (counter % 6 == 0) setDiscount("0.80")
                                    console.log(discount);
                                    visibilityHandler("none", "block", "none");
                                  }}> + </Button>
                                </Col>
                              </Row>
                            </Card.Body>
                          </Card>
                        ))}
                      </Card.Body>
                      <Card.Body css={{ display:`${visible.secondStep}` }}>
                        {allItems.map((item, id) => (
                          <div key={id}>
                            <Container>
                              <Card css={{mw:"100%", bgColor:"$gray100" }}>
                                <Card.Body>
                                  <Row justify="space-around" align="center">
                                    <Col css={{ width:"80%", textAlign:"center" }}>
                                      <Text css={{ fontFamily:"Manrope", pl:"1rem" }} size="$md"> {item.Name} </Text>
                                    </Col>
                                    <Col css={{textAlign:"center"}}>
                                      <Text css={{ fontFamily:"Manrope" }} size="$md"> - </Text>
                                    </Col>
                                    <Col css={{width:"30%", textAlign:"center"}}>
                                      <Text css={{ fontFamily:"Manrope", pr:"1rem" }} size="$md"> {item.price} ₽ </Text>
                                    </Col>
                                  </Row>
                                </Card.Body>
                              </Card>
                              <Col css={{ pt:"1rem", pl:"0.5rem" }}>
                                <Text css={{ fontFamily:"Manrope" }}> Выберите мастера </Text>
                                <select required id="employee" style={{width:"100%", height:"2rem", paddingLeft:"0.5rem",  fontSize:"1rem"}}>
                                  {props.employees.map((emp) => (
                                    <option  value={emp.Id} key={emp.Id}> {emp.FirstName} {emp.LastName} </option>
                                  ))}
                                </select>
                                <Text css={{ pt:"1rem", fontFamily:"Manrope" }}> Укажите желаемые дату и время </Text>
                                <input required id="date" style={{width:"100%", height:"2rem", paddingLeft:"0.5rem", paddingRight:"0.5rem", fontSize:"1rem"}} onChange={(e) => { if((moment(e.target.value).format("DD/MM") == birthdayDate) && counter != 6 ) setDiscount("0.85") }} type="date"/>
                                <Row css={{ flexDirection:"column", alignItems:"center", gap:"1rem", justifyContent:"space-around", pt:"2rem", "@lg": { flexDirection:"row", alignItems:"center" }, "@xs": { flexDirection:"row", alignItems:"center" } }}>
                                  <Button color="secondary" type="submit"> Оформить </Button>
                                  <Button color="secondary" onPress={() => {
                                    emptyCart();
                                    visibilityHandler("block", "none", "none");
                                  }}> Вернуться </Button>
                                </Row>
                              </Col>
                            </Container>
                          </div>
                        ))}
                      </Card.Body>
                    </Card>
                  </form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
