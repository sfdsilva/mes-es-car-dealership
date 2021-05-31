import { useEffect, useState } from 'react';
import { Alert, Button, Image, Modal, Spin, Typography } from 'antd';
import fakeIMG from '../../resources/constants';

import styles from './styles/carPurchasePopup.module.css';
import useFetch from '../../hooks/useFetch';

const { Title, Text } = Typography;

const getButtons = (carAvailability, onConfirm, onCancel) => {
  if (carAvailability === true) {
    return [
      <Button key="cancel" onClick={onCancel}>
        Cancel
      </Button>,
      <Button key="continueBuy" type="primary" onClick={onConfirm}>
        Continue Purchase
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

const getMessage = (isAvailable) => {
  if (isAvailable) {
    return 'Your car is available!';
  }
  if (isAvailable === false) {
    return 'Sorry... it seems this car is not available.';
  }
  return 'Looking for this car availability';
};

const CarPurchasePopup = ({ selectedCar, isVisible, onConfirm, onCancel }) => {
  const [isAvailable, setIsAvailable] = useState();
  const { response, loading, error, fetchRequest } = useFetch(
    'https://thisTest.com',
    'carAvailability'
  );

  // TBC --> on mount effect check car availability
  useEffect(() => {
    if (selectedCar) {
      fetchRequest('GET', { carId: selectedCar.id });
      setIsAvailable(response);
    }
  }, [selectedCar]);

  const isLoading = loading || isAvailable === undefined;

  return (
    <Modal
      centered
      footer={getButtons(isAvailable, onConfirm, onCancel)}
      title={`Do you want to buy ${selectedCar?.model}?`}
      visible={isVisible}
      width={800}>
      {isLoading && (
        <Spin>
          <Alert
            message={getMessage(isAvailable)}
            type={isAvailable === false ? 'error' : 'success'}
          />
        </Spin>
      )}

      {selectedCar && (
        <div className={styles.infoWrapper}>
          <Image src={selectedCar.img || fakeIMG} width={200} />
          <div className={styles.specificInfoWrapper}>
            <Title level={2}>{selectedCar.model}</Title>
            <Text>{selectedCar.price}</Text>
            <Text>{selectedCar.color}</Text>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default CarPurchasePopup;
