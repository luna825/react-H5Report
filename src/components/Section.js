import React,{Component, PropTypes} from 'react'


//报告单页，提供页面进入离开态度
export default class Section extends Component{

  constructor(props){
    super(props)
    this.state={
      windowHeight:window.innerHeight,
      windowWidth: window.innerWidth,
      onEnter:false
    }
  }
 /*------提供全局提供 页面进入离开状态 Start------*/
  static childContextTypes={
    onEnter:PropTypes.bool  
  };

  getChildContext(){
    return {
      onEnter: this.state.onEnter
    }
  }
 /*------提供全局提供 页面进入离开状态 End------*/

 static propTypes={
  className: PropTypes.string
 }

 static defaultProps={
  className:''
 }


  componentDidMount() {

    window.addEventListener('resize', this.handleResize)
    //监听父元素的动画
    this.sectionAncetor = this._findSectionAncetor()
    if (this.props.debug){
      debugLog('sectionAncetor', this.sectionAncetor)
    }

    this.sectionAncetor.addEventListener('transitionend', this.handleTransition)
    this.handleTransition()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
    this.sectionAncetor.removeEventListener('transitionend', this.handleTransition)
  }

  handleResize =() =>{
    this.setState({
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth
    })
  }


  //判断当前Sectin 是否进行进行视口
  handleTransition = (e) =>{

    if (!this._ref){
      return 
    }

    let wayPointTop = this._ref.getBoundingClientRect().top
    if (wayPointTop === 0 ){
      this.setState({onEnter:true})
    }else{
      this.setState({onEnter:false})
    }
  }

  //查找父元素
  _findSectionAncetor = ()=>{
    if (this.props.sectionAncetor){
      return this.props.sectionAncetor
    }

    let node = this._ref

    if(node.parentNode){
      return node.parentNode
    }

    return window
  }


  render(){

    let sectionStyle = {
      width:            '100%',
      height:           this.state.windowHeight,
      backgroundColor:  this.props.color,
      position:         'relative'
    };

    return(
      <div className={this.props.className} style={sectionStyle} ref={c => this._ref = c}>
       {this.props.children}
      </div>
    )
  }

}