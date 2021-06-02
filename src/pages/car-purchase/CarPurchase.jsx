import { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { send } from 'emailjs-com';
import qs from 'querystringify';
import { Button, Card, Form, Input, Spin, Typography } from 'antd';
import useFetch from '../../hooks/useFetch';
import { api, methods } from '../../resources/constants';
import CarInformation from '../../components/car-information/CarInformation';

const { Title, Text } = Typography;

const initialValues = {
  name: '',
  email: '',
};

const { GET } = methods;

const CarPurchase = () => {
  const { id } = useParams();
  const history = useHistory();
  const {
    response: carInfoResponse,
    loading: carInfoLoading,
    error: carInfoError,
    fetchRequest: fetchCarInfo,
  } = useFetch();

  const { fetchRequest: createOrder } = useFetch();

  useEffect(() => {
    const url = `${api.CAR}/${id}`;
    fetchCarInfo(GET, url);
  }, []);

  const purchaseCar = (values) => {
    localStorage.setItem('email', values.email);

    if (carInfoResponse && carInfoResponse[0].state === 'available') {
      const message = `Model: ${carInfoResponse[0].model} and color: ${carInfoResponse[0].color}`;
      const url =
        api.ORDER +
        qs.stringify(
          {
            email: values.email,
            carId: carInfoResponse[0].id,
            brand: carInfoResponse[0].brand,
          },
          true
        );

      // TODO: check catch
      createOrder('POST', url).then(() =>
        send(
          'service_1dwyx5y',
          'template_st319sn',
          {
            from_name: 'Car Dealership',
            to_email: values.email,
            to_name: values.name,
            message,
            reply_to: 'carDealershipEs2021@gmail.com',
          },
          'user_vOw8IWRWZSBTvBjP3rT1f'
        ).then(() => history.push(`/status/${carInfoResponse[0].id}`))
      );
    }
  };

  if (carInfoLoading) {
    return <Spin />;
  }

  return (
    <>
      <Title>Finish your purchase</Title>
      <Title level={2}>Car information</Title>
      {!carInfoError && carInfoResponse && (
        <CarInformation car={carInfoResponse[0]} />
      )}
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
