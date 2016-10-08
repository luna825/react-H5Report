import React, {Component, PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {shortUID} from '../utils/utils'


/**
 * 进出页面动画组件
 * animate：false 则没动画，number则是动画的延迟出现的时间
 * style提供组件的位置,offset设置动画出的偏移
 */
export default class AnimateItem extends Component{

  static propTypes={
    animate:PropTypes.oneOfType([  // false 则没动画，number则是动画的延迟出现的时间
      PropTypes.bool,
      PropTypes.number
    ]),
    debug:PropTypes.bool,
    duration:PropTypes.number,
    offsetTop:PropTypes.string, //动画初始出现位置的偏移
    offsetLeft:PropTypes.string,//动画初始出现位置的偏移
    style:PropTypes.object,     //组件在页面的位置
    fade:PropTypes.bool         //是否渐隐渐现
  };

  static defaultProps={
    debug:false,
    duration:1000,
    offsetTop:'0',
    offsetLeft:'0',
    animate:false,
    fade: true
  };

  static contextTypes={
    onEnter:PropTypes.bool
  }

  constructor(props){
    super(props)
    this.state={
      classKey:'',
      css:'',
      isAnimate: props.animate !== false
    }

    this.defaultStyle = {
      position: 'absolute',
      display:'inline-block'
    }
  }

  componentWillMount() {
    this._setClassKey()
  }
  componentDidMount() {
    this._Animate()
  }


  _Animate(){
    const {animate, duration, debug} = this.props;


    debug && debugLog('isAnimate',this.state.isAnimate)

    if(this.state.isAnimate){
      const startDelay = typeof animate === 'number' ? animate : 0;
      let css =''
      css = this._getCSS(startDelay, duration)
      this.setState({css})
    }
  }

  //进出动画样式
  _getCSS(startDelay, duration){
    const {classKey} = this.state;
    const {offsetTop, offsetLeft, debug, fade} = this.props;

    const startOpacity = fade ? 0.01 : 1;

    return `
      .${classKey}-enter {
        opacity: ${startOpacity};
        transform: translate(${offsetLeft},${offsetTop});
      }
      .${classKey}-enter.${classKey}-enter-active{
        opacity:1;
        transform: none;
        transition: all ${duration}ms ease ${startDelay}ms;
      }
    .${classKey}-leave {
        opacity: 1;
        transform: none;
      }
      .${classKey}-leave.${classKey}-leave-active{
        opacity:${startOpacity};
        transform: translate(${offsetLeft},${offsetTop});
        transition: all ${duration}ms ease;
      }
    `
  }


  render(){
    const {children, onEnter, style, duration} = this.props;
    const {css,classKey, isAnimate} = this.state;

    return(
      <div style={{...this.defaultStyle,...style}}><style>{css}</style>
      {!isAnimate ? children :
        <ReactCSSTransitionGroup
          transitionName={classKey}
          transitionEnterTimeout={0}
          transitionLeaveTimeout={duration}
        >
          {this.context.onEnter && children}
        </ReactCSSTransitionGroup>
      }
      </div>
    )
  }
  //为每个组件设置单独的动画id
  _setClassKey(){
    this.setState({classKey: `am-${shortUID()}`})
  }
}