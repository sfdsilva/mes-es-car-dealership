
export default (cars, { brand, sortBy, model, color }) => {
  return cars.filter((car) => {
    const brandMatch = brand ? (brand==car.brand ? true : false) : true
    const modelMatch = model ? (model==car.model ? true : false) : true
    const colorMatch = color ? (color==car.color ? true : false) : true

    return brandMatch && modelMatch && colorMatch

  }).sort((a, b) => {
    if (sortBy === 'date') {
      return a.createdAt < b.createdAt ? 1 : -1;
    } else if (sortBy === 'amount') {
      return a.price < b.price ? 1 : -1;
    }
  });
};
