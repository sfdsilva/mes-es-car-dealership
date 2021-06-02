import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Empty, Popover, Result, Typography, Spin } from 'antd';
import qs from 'querystringify';
import CarItem from '../../components/car-item/CarItem';
import Filters from '../../components/filters/Filters';
import useFetch from '../../hooks/useFetch';
import CarPurchasePopup from '../../components/car-purchase-popup/CarPurchasePopup';
import { api, methods } from '../../resources/constants';

import styles from './styles/carList.module.css';

const { Title } = Typography;

const { GET } = methods;

const defaultFilters = {
  brand: undefined,
  color: undefined,
};

const CarListPage = () => {
  const history = useHistory();
  const [filters, setFilters] = useState(defaultFilters);
  const { response, loading, error, fetchRequest } = useFetch();
  // const [carsList, setCarsList] = useState(cars);
  const [filtersPopup, setFiltersPopup] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const fetchCars = () => {
    const url = `${api.CAR}/${qs.stringify(filters, true)}`;
    fetchRequest(GET, url);
  };

  // FOR FILTERS
  useEffect(() => {
    fetchCars();
  }, [filters]);

  const onApplyFilters = (newFilters) => {
    setFilters(newFilters);
    setFiltersPopup(false);
  };

  if (error) {
    return (
      <Result
        extra={[<Button onClick={fetchCars}>Try again</Button>]}
        status="error"
        subTitle="Something went wrong. Try submiting the same request."
        title="Request failed"
      />
    );
  }

  return (
    <>
      <div className={styles.titleWrapper}>
        <Title>Cars list</Title>
        <Popover
          content={
            <Filters currentFilters={filters} onApplyFilters={onApplyFilters} />
          }
          placement="bottomRight"
          title="Filters"
          trigger="click"
          visible={filtersPopup}>
          <Button type="primary" onClick={() => setFiltersPopup(!filtersPopup)}>
            Filters
          </Button>
        </Popover>
      </div>
      {loading && <Spin />}
      {!loading && response && response.length > 0 && (
        <div className={styles.carListWrapper}>
          {response.map((car) => (
            <CarItem key={car.id} car={car} onCarSelect={setSelectedCar} />
          ))}
        </div>
      )}
      {!loading && response.length === 0 && <Empty />}
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
