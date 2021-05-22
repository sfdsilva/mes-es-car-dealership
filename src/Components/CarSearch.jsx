import React from 'react'
import {connect} from 'react-redux'

import { 
Card,
Row,
Col,
Select,
Button
} from 'antd'

import {setBrandFilter, setModelFilter, setColorFilter} from '../actions/Filters' 


let Brand, Color, Model


function onSearch(val) {
  console.log('search:', val);
}





class CarSearch extends React.Component{
  constructor(props){
    super(props)
    this.state={
      filter:'',
      filtermodel:'',
      brand:'',
      model:'',
      color:'',
    }
     Brand  = this.props.cars.map((car,i)=>{
      return car.brand  
    })

     Color  = this.props.cars.map((car,i)=>{
      return car.color
    })

  }
  
   
  

  componentDidMount(){
    this.setState({
      filter:Brand.filter((val,id,array) => array.indexOf(val) == id)
    })
    
  }
  componentDidUpdate(prevProps, prevState) {


    if (prevState.brand !== this.state.brand) {
      Model  = this.props.cars.map((car,i)=>{
    
        if(this.state.brand == car.brand){
          return car.model
        }
      })
      this.setState({
        filtermodel:Model.filter((val,id,array)=> array.indexOf(val)== id && val != undefined),
        filtercolor:'',
        model:''
      }
      )
      this.props.dispatch(setModelFilter(""))
      
    }
    if (prevState.model !== this.state.model) {
      Color  = this.props.cars.map((car,i)=>{
    
        if(this.state.model == car.model){
          return car.color
        }
      })
      this.setState({
        filtercolor:Color.filter((val,id,array)=> array.indexOf(val)== id && val != undefined),
        color:''
      })
      this.props.dispatch(setColorFilter(""))
      
    }
  }
  render(){
    return(
<Row gutter={24} style={{margin:"1em"}}>
      <Col span={24}>
      <Card style={{borderRadius:"0.5em"}}>
      {this.state.filter &&(<>
        <span>Choose Brand</span>
      <Select
    showSearch
    style={{ width: "100%" }}
    placeholder="Choose Brand"
    value={this.state.brand || "Choose Brand"}
    optionFilterProp="children"
    onChange={this.onChange=(e)=> {
      this.setState({
        brand:e,
      })
      this.props.dispatch(setBrandFilter(e))
    }}
    onSearch={onSearch}
    filterOption={(input, option) =>
      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
  >
    {this.state.filter.map((car,i)=>{
    return   (
      <Brand value={this.state.filter[i]} key={i}>{car}</Brand>
    )
  })}
  </Select>
      </>)}
 
 {this.state.brand && (
 <>
    <span>Choose Model</span>
  <Select
    showSearch
    style={{ width: "100%" }}
    optionFilterProp="children"
    value={this.state.model || "Pick Model"}
    onChange={
      this.onChange=(e)=> {
        this.setState({
          model:e,
        })
        this.props.dispatch(setModelFilter(e))
      }
        
    }
    onSearch={onSearch}
    filterOption={(input, option) =>
      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
  >
    {this.state.filtermodel &&(this.state.filtermodel.map((car,i)=>{
    return   (
      <Model value={this.state.filtermodel[i]} key={i}>{car}</Model>
    )
  }))}
  </Select>
  </>
 )}
  {this.state.model && (
    <>
    <span>Choose Color</span>
    <Select
      showSearch
      style={{ width: "100%" }}
      placeholder="Choose Color"
      optionFilterProp="children"
      value={this.state.color || "Choose Color"}
      onChange={this.onChange=(e)=> {
        this.setState({
          color:e,
        })
        this.props.dispatch(setColorFilter(e))
      }}
      onSearch={onSearch}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {this.state.filtercolor &&(this.state.filtercolor.map((car,i)=>{
    return   (
      <Model value={this.state.filtercolor[i]} key={i}>{car}</Model>
    )
  }))}
    </Select>
    </>
  )}

      <Row gutter={24}>
        <Col span={4} style={{marginTop:"0.5em", borderRadius:"1em"}}>
        {this.state.brand && (
    <Button
    onClick={()=>{
      this.setState({
        brand:'',
        color:'',
        model:'',
        filtermodel:'',
        filtercolor:''
      })
      this.props.dispatch(setBrandFilter(""))
      this.props.dispatch(setModelFilter(""))
      this.props.dispatch(setColorFilter(""))
    }}
    >Reset Filters</Button>
    )}
  
        </Col>
      </Row>
      </Card>

      </Col>
      
    </Row>
    )
  }
}









  const mapStateToProps = (state) => {
    return {
      filters: state.filters
    };
  };

  export default connect(mapStateToProps)(CarSearch);

  //component
  //reducer
  //action