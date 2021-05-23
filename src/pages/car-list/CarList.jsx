import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Empty, Typography } from 'antd';
import CarItem from '../../components/car-item/CarItem';
import Filters from '../../components/filters/Filters';
import cars from '../../resources/cars';
import CarPurchasePopup from '../../components/car-purchase-popup/CarPurchasePopup';

import styles from './styles/carList.module.css';

const { Title } = Typography;

const CarListPage = () => {
  const history = useHistory();
  const [filters, setFilters] = useState({
    brand: undefined,
    model: undefined,
    color: undefined,
    year: undefined,
    price: undefined,
  });
  const [carsList, setCarsList] = useState(cars);
  const [selectedCar, setSelectedCar] = useState(null);

  // FOR FILTERS
  useEffect(() => {
    let currentCars = cars;
    let i;
    const filtersKeys = Object.keys(filters);

    // eslint-disable-next-line no-plusplus
    for (i = 0; i < filtersKeys.length - 1; i++) {
      const currentKey = filtersKeys[i]; // brand

      if (filters[currentKey]) {
        currentCars = currentCars.filter(
          (car) => car[currentKey] === filters[currentKey]
        );
      }
    }

    setCarsList(currentCars);
  }, [filters]);

  return (
    <>
      <Title>Cars list</Title>
      <Filters currentFilters={filters} onApplyFilters={setFilters} />
      {carsList.length > 0 && (
        <div className={styles.carListWrapper}>
          {carsList.map((car) => (
            <CarItem key={car.id} car={car} onCarSelect={setSelectedCar} />
          ))}
        </div>
      )}
      {carsList.length === 0 && <Empty />}
      <CarPurchasePopup
        isVisible={!!selectedCar}
        selectedCar={selectedCar}
        onCancel={() => setSelectedCar(null)}
        onConfirm={() => history.push(`/purchase/${selectedCar.id}`)}
      />
    </>
  );
};

export default CarListPage;
