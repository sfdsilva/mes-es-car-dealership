import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk'
import rootReducer from '../reducers/rootReducer'


export default ()=>{
    const configureStore = createStore(
      rootReducer,
      composeWithDevTools(
        applyMiddleware(reduxThunk.withExtraArgument({getFirebase, getFirestore}))
        
        )
    )
    return configureStore
  }