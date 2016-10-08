import React, {Component, PropTypes} from 'react'


//整个H5报告页，监听鼠标滚动和触摸 提供页面滑动动画
export default class SectionsContainer extends Component{

  constructor(props){
    super(props)

    this.state={
      name:'fullpage',
      slidesCount: props.children.length || 1,
      downThreshold: -Math.abs(this.props.threshold || 100), //鼠标上下滚判定
      upThreshold: this.props.threshold || 100, //鼠标上滚判定
      activeSlide:0, //当前页
      slides:[],
      sectionScrolledPosition:0, //页面滚动位置
      scrollPending:false  //页面是否在滚动
    }
  }

  static propTypes ={
    duration: PropTypes.number,
    arrowNavgation: PropTypes.bool
  } ;

  static defaultProps = {
    duration : 600,           //页面滚动时间
    arrowNavgation: true      //是否显示导航小圆点
  };

  componentDidMount() {

    window.addEventListener('wheel',this.handleMouseWheel)
    window.addEventListener('resize', this.onResize)
    window.addEventListener('touchstart',this.handleTouchStart)
    window.addEventListener('touchend',this.handleTouchEnd)
    window.addEventListener('touchmove',this.handleTouchMove)
    this.onResize()
    
  }

  componentWillUnmount() {
    window.removeEventListener('wheel', this.handleMouseWheel)
    window.removeEventListener('resize', this.onResize)
    window.removeEventListener('touchstart',this.handleTouchStart)
    window.removeEventListener('touchend',this.handleTouchEnd)
    window.removeEventListener('touchmove',this.handleTouchMove)
  }

  /**
   * 初始化整个报告页面
   */
  onResize(){

    //清除x,y的滚动条
    document.querySelector('body').style.overflow = 'hidden';

    //初始化每面的位置
    let slides = [];
    for (let i = 0; i < this.state.slidesCount; i++ ){
      slides.push(- window.innerHeight * i)
    }
    this.setState({slides: slides})

    //页面大小变化后重新滚动
    this.scrollToSilder(this.state.activeSlide)
  }

  /**
   * 滚动状态
   * @param  {number} slider [要滚动的目的页面]
   */
  scrollToSilder(slider){
    this.setState({
      scrollPending: true,
      activeSlide: slider,
      sectionScrolledPosition: this.state.slides[slider]
    })

    //滚动完成后将页面状态设为未滚动
    setTimeout(() =>{
      this.setState({
        scrollPending:false
      })
    }, this.props.duration + 200 )
  }


  /**
   * 滚轮触发事件
   */
  handleMouseWheel = (e) =>{

    e.preventDefault()

    //页面正在滚动则不触发
    if(this.state.scrollPending){
      return;
    }
    //判定是上还是下滑
    const scrollDown = (e.wheelDelta || -e.deltaY || e.detail) < this.state.downThreshold;
    const scrollUp = (e.wheelDelta || -e.deltaY || e.detail) > this.state.upThreshold;

    let activeSlide = this.state.activeSlide;

    if(scrollDown){

      if(activeSlide === this.state.slidesCount - 1){
        return this.setState({scrollPending: false})
      }

      activeSlide = activeSlide + 1
    }else if( scrollUp ){

      if(!activeSlide){
        return this.setState({scrollPending: false})
      }

      activeSlide = activeSlide - 1
    }else {
      return this.setState({scrollPending:false})
    }

    this.scrollToSilder(activeSlide)
  }

  /*--------------------触摸事件-----------------------*/
  handleTouchMove=(e) =>{
    e.preventDefault()
  }

  handleTouchStart = (e) =>{
    this._touchStart = e.touches[0].clientY
  }

  handleTouchEnd = (e) =>{
    const touchEnd = e.changedTouches[0].clientY
    if(this._touchStart > touchEnd + 100){
      if(this.state.activeSlide === this.state.slidesCount - 1){
        return
      }
      return this.scrollToSilder( this.state.activeSlide + 1)
    }else if(this._touchStart < touchEnd - 100) {
      if(this.state.activeSlide === 0){
        return
      }
      return this.scrollToSilder(this.state.activeSlide - 1)
    }
  }
  /*--------------------触摸事件-----------------------*/


/*-------------------圆点导航 start-----------------------*/
  renderNavgation=()=>{
    let navigationStyle = {
      position:   'fixed',
      zIndex:     '10',
      right:      '20px',
      top:        '50%',
      transform:  'translate(-50%, -50%)',
    };


    const anchor = this.state.slides.map((_,index)=>{
      let anchorStyle = {
        cursor:           'pointer',
        display:          'block',
        margin:           '10px',
        borderRadius:     '100%',
        backgroundColor:  this.state.activeSlide === index? '#ffffff':'#556270',
        padding:          '5px',
        transition:       'all 0.2s',
        transform:        this.state.activeSlide === index ? 'scale(1.3)' : 'none'
      };
      return(
        <div style={anchorStyle} key={index} onClick={()=>this.scrollToSilder(index)}></div>
      )
    })

    return(
      <div style={navigationStyle}>
        {anchor}
      </div>
    )
  }
/*-------------------圆点导航 End---------------------*/

  render(){

    let containerStyle = {
      height:     '100%',
      width:      '100%',
      position:   'relative',
      transform:  `translate3d(0px, ${this.state.sectionScrolledPosition}px, 0px)`,
      transition: `all ${this.props.duration}ms ease`,
    };

    return(
      <div >
        <div style={containerStyle} >
          {this.props.children}
        </div>
        {this.props.arrowNavgation && this.renderNavgation()}
      </div>
    )
  }
}