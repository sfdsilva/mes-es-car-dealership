import {Component} from 'react'
import CarItem from './CarItem'
import {connect} from 'react-redux'
import LiveViewCars from '../actions/LiveViewCars'

class List extends Component{
  constructor(props){
    super(props)
    this.state={
      cars:this.props.cars
    }
  }
  componentDidUpdate(prevProps, prevState) {


    if (prevProps.cars !== this.props.cars) {
     this.setState({cars:this.props.cars})
      
    }
   
    }
  
  render(){
    console.log(this.state)
    return(<>
      {this.state.cars && this.state.cars.map((car,i)=>{
        return(
          <CarItem car={car} key={i}/>
        )
      })}
    </>
      
   
    )
  }
}


const mapStateToProps = state =>{

  return{
    cars:LiveViewCars(state.cars, state.filters)
  }
}

export default  connect(mapStateToProps)(List)
