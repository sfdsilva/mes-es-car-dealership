import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Progress, Spin, Typography } from 'antd';
import { send } from 'emailjs-com';
import qs from 'querystringify';
// import { QRCode } from 'react-qr-svg';
import useFetch from '../../hooks/useFetch';
import { api, methods } from '../../resources/constants';
import CarInformation from '../../components/car-information/CarInformation';

const { GET, POST } = methods;
const { Title, Text } = Typography;

const retrievePercentage = (state) => {
  if (state === 'waiting to be delivered') {
    return 20;
  }

  if (state === 'ready to be delivered') {
    return 60;
  }

  return 100;
};

const CarStatus = () => {
  const { carId } = useParams();
  const email = localStorage.getItem('email');

  const {
    response: orderResponse,
    loading: orderLoading,
    error: orderError,
    fetchRequest: fetchOrder,
  } = useFetch();

  const {
    response: carInfoResponse,
    loading: carInfoLoading,
    error: carInfoError,
    fetchRequest: fetchCarInfo,
  } = useFetch();

  const showQRcode =
    orderResponse && orderResponse?.vin && orderResponse?.licencePlate;

  useEffect(() => {
    const orderUrl = api.STATUS + qs.stringify({ carId, email }, true);
    const carInfoUrl = `${api.CAR}/${carId}`;

    fetchOrder(GET, orderUrl).then(() => fetchCarInfo(GET, carInfoUrl));
  }, []);

  useEffect(() => {
    if (orderResponse && orderResponse.length > 0) {
      send(
        'service_1dwyx5y',
        'template_3dyclqd',
        {
          from_name: 'Car Dealership',
          to_email: email,
          vin: orderResponse[0].vin,
          licence_plate: orderResponse[0].licencePlate,
          qrcode: `https://api.qrserver.com/v1/create-qr-code/?data=${email},${carId}&amp;size=100x100`,
          reply_to: 'carDealershipEs2021@gmail.com',
        },
        'user_vOw8IWRWZSBTvBjP3rT1f'
      );
    }
  }, [orderResponse]);

  if (orderLoading || carInfoLoading) {
    return <Spin />;
  }

  if (orderError || carInfoError) {
    return <p>There was an error</p>;
  }

  return (
    <>
      <Title>My current purchase</Title>
      <Card>
        <Title level={3}>Current status</Title>
        <Text>{orderResponse[0].state}</Text>
        <Progress
          percent={retrievePercentage(orderResponse[0].state)}
          strokeLinecap="square"
        />
      </Card>
      {carInfoResponse && carInfoResponse.length > 0 && (
        <CarInformation car={carInfoResponse[0]} />
      )}
      {showQRcode && (
        <Card>
          <Title level={3}>Confirmation QR code</Title>(
          <img
            alt=""
            src={`https://api.qrserver.com/v1/create-qr-code/?data=${email},${carId}&amp;size=100x100`}
            title="QR Code"
          />
        </Card>
      )}
    </>
  );
};

export default CarStatus;
