import carsList from '../resources/cars'

export default (state = [], action) =>{
    switch (action.type){
          case 'GET_CARS':
            return [
                ...carsList
            ]
        default: 
        return state
    }
  }