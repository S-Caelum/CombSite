import { Button, Card, Col, Row, Text } from '@nextui-org/react';
import React from 'react';

const ServiceSelector = ({
  categories,
  services,
  confirmationStep,
  setConfirmationStep,
  addItem,
  setDiscount,
  counter,
}) => {
  const [data, setData] = React.useState(services);
  const [selectedCategoryId, setSelectedCategoryId] = React.useState([1]);
  services.forEach((i) => {
    Object.assign(i, {
      id: i.Id.toString(),
      price: i.Cost,
    });
  });
  const selectionHandler = (e) => {
    setSelectedCategoryId(e.target.value);
  };
  const firstStepHandler = (item) => {
    addItem(item);
    if (counter % 6 == 0) setDiscount('0.80');
    setConfirmationStep({ ...confirmationStep, firstStep: 'none', secondStep: 'flex' });
  };

  return (
    <Card.Body css={{ display: `${confirmationStep.firstStep}` }}>
      <select
        style={{
          width: '100%',
          height: '2.3rem',
          paddingLeft: '0.5rem',
        }}
        onChange={(e) => selectionHandler(e)}>
        {categories.map((category) => {
          return (
            <option value={category.Id} key={category.Id}>
              {category.Name}
            </option>
          );
        })}
      </select>
      {data
        .filter((value) => {
          return (
            Number(value.ServiceCategory.map((category) => category.CategoryId)) ===
            Number(selectedCategoryId)
          );
        })
        .map((item, id) => (
          <Card key={id} css={{ mt: '1rem', bgColor: '$gray100' }}>
            <Card.Body>
              <Row wrap="wrap" justify="space-between" align="center">
                <Col css={{ width: '50%' }}>
                  <Text css={{ '@lg': { ml: '1rem' } }}>{item.Name}</Text>
                </Col>
                <Col css={{ width: '20%' }}>
                  <Text> {item.Cost} ₽ </Text>
                </Col>
                <Col css={{ width: '20%' }}>
                  <Button auto color="secondary" onPress={() => firstStepHandler(item)}>
                    +
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))}
    </Card.Body>
  );
};

export default ServiceSelector;
