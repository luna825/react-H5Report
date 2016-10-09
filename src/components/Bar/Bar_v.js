import React ,{Component, PropTypes} from 'react'

export default class BarV extends Component {

  constructor(props){
    super(props)
  }
  static defaultProps={
    width: 200,
    height: 15,
    data:{name:'java', per:.9,color:'#ff7676'},
    transition:1
  }


  render(){
    const {width, height, data, top, left, transition} =this.props;
    return(
      <div style={{...style, width:width, height:height, top, left}}>
        <div className="bar-text-v">{data.name}</div>
        <div className="bar-process-v">
          <div className="process-v"
            style={{
              top:(1 - transition * data.per ) * 100 + '%',
              backgroundColor:data.color ||'#99c0ff'
          }}></div> 
        </div>
        <div className="bar-rate-v" style={{opacity: transition ,top: (1-transition * data.per )  * 100  - 6 + '%'}}>
            { (transition * data.per) * 100 >> 0 }%
          </div>
      </div>
    )
  }
}

const style={
  position: 'absolute'
}