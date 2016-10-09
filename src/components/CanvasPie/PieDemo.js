import React, {Component, PropTypes} from 'react'
import CanvasPie from './CanvasPie'
import {Motion, spring} from 'react-motion'

const springCfg={
  stiffness:25,
  damping:10
}

export default class PieDemo extends Component{
 
  constructor(props){
    super(props)
    this.state = {
      isStart: false
    }
  }


  static contextTypes ={
    onEnter: PropTypes.bool
  }

  componentWillMount() {
    const {delay} = this.props;

    if (typeof delay === 'number'){
      setTimeout(() =>{
        this.setState({isStart : true })
      }, delay)
    }else{
      this.setState({isStart: true})
    }

  }

  render(){
    return(
      <Motion
        defaultStyle={{x : 0}}
        style={{x : spring( this.context.onEnter && this.state.isStart ? 1 : 0, springCfg)}}
      >
        {({x})=>
          <CanvasPie transition={x} height={300} width={300} />
        }
      </Motion>
      
    )
  }
}