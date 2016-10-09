import React ,{Component, PropTypes} from 'react'
import {Motion, spring} from 'react-motion'
import Bar from './Bar'

const springCfg={
  stiffness:60,
  damping:30
}

export default class BarDemo extends Component {

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
    width: 200,
    barHeight: 30,
    datas:[
      {name:'js',per:0.6, color:'#ff7676'},
      {name:'CSS', per: 0.5},
      {name:'python', per:0.3},
      {name:'React',per:0.1},
      {name:'HTML5',per:0.3},
      {name:'React',per:0.4},
      {name:'C',per:0.55},
      {name:'Node',per:0.5}
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
    const {width, datas, barHeight, vatical} =this.props;
    const height = barHeight * datas.length

    return(
      <Motion defaultStyle={{x:0}} 
        style={{x: spring( this.context.onEnter && this.state.isStart ? 1 : 0, springCfg)}}
      >
        {({x}) => 
          <div style={{position:'relative',width,height}}>
            {datas.map((data, i) =>
              <Bar top={i * barHeight} width={width} height={barHeight} data={data} key={i} transition={x}/>
            )}  
          </div>
        }
      </Motion>

    )
  }
}