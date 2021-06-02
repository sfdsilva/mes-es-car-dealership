import { Avatar, Card, Typography } from 'antd';
import { fakeIMG } from '../../resources/constants';

import styles from './styles/carInformation.module.css';

const { Title, Text } = Typography;

const CarInformation = ({ car }) => {
  return (
    <Card>
      <div className={styles.carInfo}>
        <Avatar shape="square" size={250} src={car.img || fakeIMG} />
        <div className={styles.carProperties}>
          <Title level={3}>{car.model}</Title>
          <div className={styles.carItem}>
            <Text>Price</Text>
            <Title level={4}>{`${car.price}€`}</Title>
          </div>
          <div className={styles.carItem}>
            <Text>Color</Text>
            <Title level={4}>{car.color}</Title>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CarInformation;
