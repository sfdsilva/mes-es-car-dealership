import { Avatar, Button, Card, Typography } from 'antd';
import fakeIMG from '../../resources/constants';
import styles from './styles/carItem.module.css';

const { Text } = Typography;

const CarItem = ({ car, onCarSelect }) => {
  const { brand, img, model, year, price } = car;

  return (
    <>
      <Card className={styles.carWrapper} title={brand}>
        <div className={styles.carContent}>
          <Avatar shape="square" size={250} src={img || fakeIMG} />
          <div className={styles.carDetails}>
            <div className={styles.carInfo}>
              <Text type="secondary">Model:</Text>
              <Text strong>{model}</Text>
              <Text type="secondary">Price:</Text>
              <Text strong>{price}€</Text>
              <Text type="secondary">Year:</Text>
              <Text strong>{year}</Text>
            </div>
            <Button onClick={() => onCarSelect(car)}>Buy this car</Button>
          </div>
        </div>
      </Card>
    </>
  );
};

export default CarItem;
