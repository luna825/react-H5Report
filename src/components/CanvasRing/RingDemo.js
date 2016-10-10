import React, {Component, PropTypes} from 'react'
import CanvasRing from './CanvasRing'
import {Motion, spring} from 'react-motion'

const springCfg={
  stiffness:30,
  damping:10
}

export default class RingDemo extends Component{
 
  constructor(props){
    super(props)
    this.state = {
      isStart: false
    }
  }

  static propTypes ={
    width:PropTypes.number,
    height:PropTypes.number,
    data: PropTypes.object
  };

  static defaultProps ={
    width:300,
    height:300,
    data:{name:'总课程',per:0.7, color:'#ff7676'}
  };



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
    const {width, height, data} = this.props;
    return(
      <Motion
        defaultStyle={{x : 0}}
        style={{x : spring( this.context.onEnter && this.state.isStart ? 1 : 0, springCfg)}}
      >
        {({x})=>
          <CanvasRing transition={x} height={height} width={width} data={data} />
        }
      </Motion>
    )
  }
}