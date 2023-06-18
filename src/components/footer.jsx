import { Row, Text } from '@nextui-org/react';

const Footer = (props) => {
  return (
    <Row
      style={{
        display: 'flex',
        backgroundColor: '#16181A',
        height: '5rem',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text> ИП &quot;Новикова С. А.&quot; - 2023 </Text>
    </Row>
  );
};

export default Footer;
