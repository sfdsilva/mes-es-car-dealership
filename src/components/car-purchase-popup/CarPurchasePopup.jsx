import { useEffect } from 'react';
import { Alert, Button, Image, Modal, Spin, Typography } from 'antd';
import qs from 'querystringify';
import useFetch from '../../hooks/useFetch';
import { api, fakeIMG, methods } from '../../resources/constants';

import styles from './styles/carPurchasePopup.module.css';

const { Title, Text } = Typography;

const { GET } = methods;

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
  const { response, loading, error, fetchRequest } = useFetch();

  useEffect(() => {
    if (selectedCar) {
      const url =
        api +
        qs.stringify(
          { color: selectedCar.color, model: selectedCar.model },
          true
        );
      fetchRequest(GET, url);
    }
  }, [selectedCar]);

  const isAvailable = response && response.length > 0;

  return (
    <Modal
      centered
      footer={getButtons(isAvailable, onConfirm, onCancel)}
      title={`Do you want to buy ${selectedCar?.model}?`}
      visible={isVisible}
      width={800}>
      {loading && !error && <Spin />}
      {!loading && !error && response && (
        <Alert
          message={getMessage(isAvailable)}
          type={isAvailable === false ? 'error' : 'success'}
        />
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
