import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Avatar, Button, Card, Form, Input, Spin, Typography } from 'antd';
import useFetch from '../../hooks/useFetch';
import fakeIMG from '../../resources/constants';
import cars from '../../resources/cars.json';

import styles from './styles/carPurchase.module.css';

const { Title, Text } = Typography;

const initialValues = {
  name: '',
  email: '',
};

const requestOptions = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'React POST Request Example' }),
};

const CarPurchase = () => {
  const { id } = useParams();
  const [selectedCar, setSelectedCar] = useState();
  const { response, loading, error, fetchRequest } = useFetch(
    'https://thisTest.com',
    'carPurchase'
  );

  useEffect(() => {
    setSelectedCar(cars.find((car) => car.id === id));
  }, []);

  const purchaseCar = (values) => {
    fetchRequest('POST', { ...values, carId: selectedCar.id });
  };

  if (!selectedCar) {
    return <Spin />;
  }

  return (
    <>
      <Title>Finish your purchase</Title>
      <Title level={2}>Car information</Title>
      <Card>
        <div className={styles.carInfo}>
          <Avatar shape="square" size={250} src={selectedCar.img || fakeIMG} />
          <div className={styles.carProperties}>
            <Title level={3}>{selectedCar.model}</Title>
            <div className={styles.carItem}>
              <Text>Price</Text>
              <Title level={4}>{`${selectedCar.price}€`}</Title>
            </div>
            <div className={styles.carItem}>
              <Text>Color</Text>
              <Title level={4}>{selectedCar.color}</Title>
            </div>
          </div>
        </div>
      </Card>
      <Title level={2}>Personal information</Title>
      <Card>
        <Form
          initialValues={initialValues}
          layout="vertical"
          name="carPurchase"
          onFinish={purchaseCar}>
          <Form.Item
            label="Complete name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please insert a correct name',
                type: 'string',
                min: 10,
              },
            ]}>
            <Input placeholder="Insert your name" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please insert a correct email',
                type: 'email',
              },
            ]}>
            <Input placeholder="Insert your email" />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default CarPurchase;
