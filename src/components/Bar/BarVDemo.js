import React ,{Component, PropTypes} from 'react'
import {Motion, spring} from 'react-motion'
import BarV from './Bar_v'

const springCfg={
  stiffness:60,
  damping:30
}

export default class BarDemoV extends Component {

  constructor(props){
    super(props)
    this.state = {
      isStart: false
    }
  }

  static contextTypes ={
    onEnter: PropTypes.bool
  };

  static defaultProps={
    barWidth: 60,
    height: 200,
    datas:[
      {name:'js',per:0.6, color:'#ff7676'},
      {name:'CSS', per: 0.5},
      {name:'python', per:0.3},
      {name:'React',per:0.1},
      {name:'HTML5',per:0.3}
    ]
  };
  static propTypes ={
    width: PropTypes.number,
    height: PropTypes.number,
    datas: PropTypes.array
  };

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
    const {barWidth, datas, height} =this.props;
    const width = barWidth * datas.length

    return(
      <Motion defaultStyle={{x:0}} 
        style={{x: spring( this.context.onEnter && this.state.isStart ? 1 : 0, springCfg)}}
      >
        {({x}) => 
          <div style={{position:'relative',width,height}}>
            {datas.map((data, i) =>
              <BarV left={i * barWidth} width={barWidth} height={height} data={data} key={i} transition={x}/>
            )}  
          </div>
        }
      </Motion>

    )
  }
}