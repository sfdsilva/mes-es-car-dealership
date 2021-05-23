import { useEffect, useState } from 'react';
import { Alert, Button, Image, Modal, Typography } from 'antd';

import styles from './styles/carPurchasePopup.module.css';

const { Title, Text } = Typography;

const fakeIMG =
  'https://aeroclub-issoire.fr/wp-content/uploads/2020/05/image-not-found.jpg';

const getButtons = (carAvailability, onConfirm, onCancel) => {
  if (carAvailability === true) {
    return [
      <Button key="continueBuy" onClick={onConfirm}>
        Continue Purchase
      </Button>,
      <Button key="cancel" onClick={onCancel}>
        Cancel
      </Button>,
    ];
  }

  if (carAvailability === false) {
    return [
      <Button key="cancel" onClick={onCancel}>
        Cancel
      </Button>,
    ];
  }

  return null;
};

const CarPurchasePopup = ({ selectedCar, isVisible, onConfirm, onCancel }) => {
  // const { img, model, price, color } = selectedCar;
  const [isAvailable, setIsAvailable] = useState(true);

  // TBC --> on mount effect check car availability
  // useEffect(() => {}, []);

  const message = isAvailable
    ? 'Your car is available! Continue with the purchase...'
    : 'Sorry... it seems this car is not available.';

  return (
    <Modal
      footer={getButtons(isAvailable, onConfirm, onCancel)}
      title={`Do you want to buy ${selectedCar?.model}?`}
      visible={isVisible}>
      <Alert message={message} type={isAvailable ? 'success' : 'error'} />
      <div className={styles.carInfo}>
        <Image src={selectedCar?.img || fakeIMG} width={200} />
        <Title level={2}>{selectedCar?.model}</Title>
        <Text>{selectedCar?.price}</Text>
        <Text>{selectedCar?.color}</Text>
      </div>
    </Modal>
  );
};

export default CarPurchasePopup;
