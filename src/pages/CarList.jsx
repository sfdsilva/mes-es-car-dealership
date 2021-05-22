import React from 'react'
import CarSearch from "../Components/CarSearch"
import List from "../Components/List"
import {connect} from 'react-redux'
import cars from '../resources/cars'

class CarList extends React.Component {
  constructor(props){
    super(props)
    this.state={
      cars,

    }
  }
  render(){return(

<div>
  <CarSearch cars={this.props.cars}/>
    <List filters={this.props.filters}/>
    
  </div>
  )

  }
}
const mapStateToProps = state =>{
  return{
    cars:state.cars,
    filters:state.filters
  }
}

  export default  connect(mapStateToProps)(CarList)
