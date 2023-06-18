import { Card, Col, Text } from '@nextui-org/react';
import React from 'react';
import { useCart } from 'react-use-cart';
import ServiceSelector from './serviceSelector';
import OrderDataForm from './orderDataForm';

const NewOrderForm = ({ categories, services, employees, user, counter }) => {
  const [confirmationStep, setConfirmationStep] = React.useState({
    firstStep: 'flex',
    secondStep: 'none',
    thirdStep: 'none',
  });
  const [discount, setDiscount] = React.useState(1);
  const { items, addItem, emptyCart } = useCart();
  const [allItems, setAllItems] = React.useState([{}]);
  React.useEffect(() => {
    setAllItems(JSON.parse(JSON.stringify(items)));
  }, [items]);
  React.useEffect(() => {
    if (allItems.length > 0) {
      setConfirmationStep({
        ...confirmationStep,
        firstStep: 'none',
        secondStep: 'flex',
      });
    } else if (allItems.length === 0) {
      setConfirmationStep({
        ...confirmationStep,
        firstStep: 'flex',
        secondStep: 'none',
      });
    }
  }, [allItems]);

  return (
    <Col css={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Card css={{ '@lg': { mw: '100%', ml: '3rem' } }}>
        <Card.Header css={{ justifyContent: 'center', pt: '1.3rem' }}>
          <Text
            css={{
              fontFamily: 'Manrope',
              '@xs': { fs: '$2xl' },
              '@lg': { fs: '$3xl' },
            }}
            color="secondary"
            size="$xl">
            Новый заказ
          </Text>
        </Card.Header>
        <Card.Body css={{ justifyContent: 'center' }}>
          <ServiceSelector
            categories={categories}
            services={services}
            confirmationStep={confirmationStep}
            setConfirmationStep={setConfirmationStep}
            addItem={addItem}
            counter={counter}
            setDiscount={setDiscount}
          />
          <OrderDataForm
            allItems={allItems}
            employees={employees}
            emptyCart={emptyCart}
            confirmationStep={confirmationStep}
            setConfirmationStep={setConfirmationStep}
            discount={discount}
            user={user}
          />
        </Card.Body>
      </Card>
    </Col>
  );
};

export default NewOrderForm;
