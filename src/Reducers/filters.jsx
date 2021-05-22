// Filters Reducer

const filters = {
  model: '',
  brand:'',
  color:'',
  sortBy: 'amount'
};

export default (state = filters, action) => {
  switch (action.type) {
    case 'SET_BRAND_FILTER':
      return {
        ...state,
        brand: action.brand
      };
      case 'SET_MODEL_FILTER':
      return {
        ...state,
        model: action.model
      };
      case 'SET_COLOR_FILTER':
      return {
        ...state,
        color: action.color
      };
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: 'amount'
      };
    default:
      return state;
  }
};
