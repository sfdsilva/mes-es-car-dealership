import { useState } from 'react';
import { Button, Form, Select } from 'antd';
import cars from '../../resources/cars.json';

import styles from './styles/filters.module.css';

const { Option } = Select;

const availableModels = [...new Set(cars.map((car) => car.model))].sort();
const availableYears = [...new Set(cars.map((car) => car.year))].sort();
const availablePrices = [...new Set(cars.map((car) => car.price))].sort();
const availableColors = [...new Set(cars.map((car) => car.color))].sort();
const availableBrands = [...new Set(cars.map((car) => car.brand))].sort();

const retrieveAssociatedModels = (brand) => {
  if (brand === '') {
    return availableModels;
  }

  return [
    ...new Set(
      cars.filter((car) => car.brand === brand).map((car) => car.model)
    ),
  ];
};

const Filters = ({ currentFilters, onApplyFilters }) => {
  const [newFilters, setNewFilters] = useState(currentFilters);

  return (
    <div className={styles.wrapper}>
      <Form
        initialValues={currentFilters}
        name="carFilter"
        onFinish={() => {
          onApplyFilters(newFilters);
        }}>
        <Form.Item>
          <Select
            allowClear
            showSearch
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            placeholder="Choose brand"
            onChange={(value) =>
              setNewFilters({
                ...newFilters,
                brand: value,
              })
            }>
            {availableBrands.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Select
            allowClear
            showSearch
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            placeholder="Choose model"
            onChange={(value) =>
              setNewFilters({
                ...newFilters,
                model: value,
              })
            }>
            {retrieveAssociatedModels(newFilters.brand).map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Select
            allowClear
            showSearch
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            placeholder="Choose color"
            onChange={(value) =>
              setNewFilters({
                ...newFilters,
                color: value,
              })
            }>
            {availableColors.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Select
            allowClear
            showSearch
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            placeholder="Choose year"
            onChange={(value) =>
              setNewFilters({
                ...newFilters,
                year: value,
              })
            }>
            {availableYears.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Select
            allowClear
            showSearch
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            placeholder="Choose price"
            onChange={(value) =>
              setNewFilters({
                ...newFilters,
                price: value,
              })
            }>
            {availablePrices.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Filters;
