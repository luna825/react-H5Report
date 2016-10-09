import React, {Component, PropTypes} from 'react'
import CanvasRadar from './CanvasRadar'
import {Motion, spring} from 'react-motion'

const springCfg={
  stiffness:60,
  damping:30
}

export default class RadarDemo extends Component{
 
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
      <Motion defaultStyle={{x : 0}} 
        style={{x : spring( (this.context.onEnter && this.state.isStart) ? 1 : 0, springCfg)}}
      >
        {({x}) => 
          <CanvasRadar width={400} height={400} transition={x} />
        }
      </Motion>
    )
  }
}