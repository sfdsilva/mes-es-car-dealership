import {Component} from 'react'
import 
{Card,
Row,
Col,
Button} 
from 'antd'
import {connect} from 'react-redux'



const fakeIMG = "https://i.pinimg.com/originals/23/bf/c6/23bfc60e70a75dce0d340ef16076e717.png"
  class CarItem extends Component{
    constructor(props){
      super(props)
      this.state={
      cars:this.props.cars
      }
    }
    render(){

      return(
            (<Row gutter={24}style={{margin:"1em"}}>
              <Col span={24} >
              <Card title={`${this.props.car.brand} : ${this.props.car.model} (${this.props.car.year})`}style={{borderRadius:"0.5em"}} >
                <Row style={{marginBottom:"0.5em"}}>
                  <Col span={6} style={{marginRight:"1em", minHeight:"200px", minWidth:"320px"}}>
                    <div style={{height:"100%",borderRadius:"0.5em"}}>
                    <img
                        alt={`${this.props.car.brand} ${this.props.car.model} ${this.props.car.year}`}
                        style={{width:"320px", height:"200px", borderRadius:"0.5em", position:"absolute", float:"left"}}
                        src={this.props.car.img ? this.props.car.img : fakeIMG}  />
                    </div>
                  </Col>
                  <Col>
                      <Row gutter={18}>
                      <Col  style={{width:"100%"}}>
                      <p>Year: {this.props.car.year}</p>
                      <p>Color: {this.props.car.color}</p>
                      <p>Price: {this.props.car.price} €</p>
                      </Col>
                      </Row>
                  </Col>             
                </Row>
                
                <Row>
                <Button 
                type="primary" 
                style={{float:"right", width:"100%",borderRadius:"0.5em"}}
                onClick={e=>console.log(`I wanna buy that shit. ${this.props.car.brand} ${this.props.car.model} is my favourite piece of steel shit`)}
                >Purchase Now</Button>
           
                </Row>
                
      
          </Card>
              </Col>
              
          </Row>
          )
          )
      
        
     
      
    }
  }
  
  
 
  
  export default  connect()(CarItem)
  