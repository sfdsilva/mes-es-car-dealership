import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import rootReducer from './Reducers/rootReducer'
import {getCars} from './actions/Cars'
import {setColorFilter, setBrandFilter,setModelFilter, sortByAmount} from './actions/Filters'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css'

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
const jsx=(
  <Provider store={store}>
   <App />
</Provider>)
const state = store.getState()
store.dispatch(getCars(store.cars))
store.dispatch(setColorFilter(state.filters.color))
store.dispatch(setBrandFilter(state.filters.brand))
store.dispatch(setModelFilter(state.filters.model))
store.dispatch(sortByAmount(state.filters.amount))


  if(store.cars){
    ReactDOM.render(
      <div className="animated fadeIn pt-3 text-center">Loading...</div>,
      document.getElementById('root')
      )
  }else{
    ReactDOM.render(
      jsx,
      document.getElementById('root')
      )
  }
;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
