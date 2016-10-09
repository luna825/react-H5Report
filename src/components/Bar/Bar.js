import React ,{Component, PropTypes} from 'react'

export default class Bar extends Component {

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
      <div style={{...style, width, height, top, left}}>
        <div className="bar-text">{data.name}</div>
        <div className="bar-process">
          <div className="process"
            style={{
              top:0,
              left:-(1 - transition * data.per) * 100 + '%',
              backgroundColor:data.color ||'#99c0ff'
          }}></div> 
        </div>
        <div className="bar-rate" style={{opacity: transition ,left: transition * 100 * data.per + 3 + '%'}}>
            { (transition * data.per) * 100 >> 0 }%
          </div>
      </div>
    )
  }
}

const style={
  position: 'absolute'
}