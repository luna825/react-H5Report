import React, {Component, PropTypes} from 'react'
import {StaggeredMotion, spring, presets} from 'react-motion'
import classnames from 'classnames'

//散点默认颜色
const colors = ['#ff7676','#99c1ff','#ffa4a4']


export default class Points extends Component {

  constructor(props){
    super(props)

    this._Points =[]
  }

  static contextTypes ={
    onEnter: PropTypes.bool
  }


  static propTypes={
    initChildPointDiam : PropTypes.number, 
    datas: PropTypes.array
  };


  static defaultProps ={
    initChildPointDiam: 150,  // 散点直径
    datas:[{name:'高级',per:0.4},{name:'初级',per:0.3},{name:'中级',per:0.5}]
  };


  componentWillMount() {
    this.generateRandomPoints(this.props.initChildPointDiam, this.props.datas)
  }


  /**
   * 根据组件内的数据，生成不重复的散点
   * @param  {number} initChildPointDiam 初始的直径
   * @param  {array} datas               数据
   */
  generateRandomPoints(initChildPointDiam, datas){

    datas.sort((v1, v2)=>v2.per - v1.per).forEach((data,i)=>{

      const childPointDiam = initChildPointDiam * data.per/datas[0].per //按per比例缩放

      const {deltaX, deltaY} = randomPosition(childPointDiam, window.innerWidth , window.innerHeight, this._Points)

      data.childPointDiam = childPointDiam 
      data.location = {offsetX:deltaX, offsetY:deltaY}
      if(!data.color){
        data.color = colors[i % colors.length]
      }
      this._Points.push(data)
    })
  }

  initPointChildStyleInit = (data)=>{
  const {childPointDiam, location:{offsetX, offsetY}} = data

  return{
          width:childPointDiam,
          height:childPointDiam,
          left: offsetX,
          top: offsetY,
          opacity:0.01,
          scale:0
        }
  }

  initPointChildStyle = (data)=>
  {

  const {childPointDiam, location:{offsetX, offsetY}} = data

  return{
          width:childPointDiam,
          height:childPointDiam,
          left: offsetX,
          top: offsetY,
          opacity:spring(0.01),
          scale:spring(0)
        }
  }


  finalPointChildStyleInit =(data) =>{
    const {childPointDiam, location:{offsetX, offsetY}} = data

    return { 
      width:childPointDiam,
      height:childPointDiam,
      left: offsetX,
      top: offsetY,
      opacity: 1,
      scale: 1}
  }

  finalPointChildStyle =(data) =>{
    const {childPointDiam, location:{offsetX, offsetY}} = data

    return { width:childPointDiam,
      height:childPointDiam,
      left: offsetX,
      top: offsetY,
      opacity: spring(1),
      scale: spring(1)}
  }

  render(){

    let onEnter = this.context.onEnter

    //Point 的初始 style  不带spring 
    const targetPointStyleInit = this._Points.map((data)=>{
      return onEnter ? this.finalPointChildStyleInit(data) : this.initPointChildStyleInit(data)
    })

    const targetPointStyle = this._Points.map((data)=>{
      return onEnter ? this.finalPointChildStyle(data) : this.initPointChildStyle(data)
    })

    let calculateStylesForNextFrame = prevFrameStyles => {

      let nextFrameTargetStyles = prevFrameStyles.map((pointStyleInPreviousFrame, i )=>{
        if(i === 0){
          return targetPointStyle[i]
        }

        const prevPointScale = prevFrameStyles[i-1].scale

        const shouldApplyTargeStyle = ()=>{
          if(onEnter){
            return prevPointScale > 1 - 0.1
          }else{
            return prevPointScale < 0.1
          }
        }

        return shouldApplyTargeStyle() ? targetPointStyle[i] : pointStyleInPreviousFrame;

      })

      return nextFrameTargetStyles;
    }

    return(
      <StaggeredMotion
        defaultStyles={targetPointStyleInit}
        styles={calculateStylesForNextFrame}
      >
        {interpolatedStyles =>
          <div style={{position:'relative',width:this.props.initChildPointDiam,height:this.props.initChildPointDiam}}>
            { interpolatedStyles.map(({...ret, scale},i)=>
              <div className={classnames('point',{point_shadow: i==0},{point_focus:scale==1 && i==0})}
                   key={i}
                   style={{
                    ...ret,
                    transform:`translate(-50%, -50%) scale(${scale})`,
                    backgroundColor: this._Points[i].color
                   }}
              >
                <div>{this._Points[i].name}</div>
                <div>{this._Points[i].per * 100 + '%'}</div>
              </div>
            )}
          </div>
        }
      </StaggeredMotion>
    )

  }

}

// utility function
//产生指定范围的随机数
function random(range){
    const max = Math.max(range[0],range[1]);
    const min = Math.min(range[0],range[1]);

    const diff = max - min;
    return Math.ceil(Math.random()*diff + min);
}


/**
 * 随机生成一个位置，不与datas数据里的任何点重复
 * @param  {number} childPointDiam 生成点的直径
 * @param  {number} width          页面宽
 * @param  {number} height         页面高
 * @param  {object} datas          已生成点的数据，必须有childPointDiam,与location数据
 * @return {object}                {deltaX, deltaY}一个新的位置
 */
function randomPosition(childPointDiam, width, height, datas){

  //三角函数，计算两个点是否重合
  const delta = (diffX, diffY, pointDistance) =>{
    return Math.pow(diffX,2) + Math.pow(diffY,2) > Math.pow(pointDistance,2)
  }

  //第一个点直接返回
  if( datas.length === 0 ){
    return {
      deltaX : random([childPointDiam / 2 , width - childPointDiam/2]),
      deltaY : random([150, height - childPointDiam/2]) 
    }
  }

  // 循环执行，直到生成的点与datas数据中的任何点都不重复后，返回
  while(true){
    const deltaX = random([childPointDiam / 2, width - childPointDiam/2])
    const deltaY = random([150, height - childPointDiam/2])
    let location = datas.every((data) => {
      const diffX = data.location.offsetX - deltaX;
      const diffY = data.location.offsetY - deltaY;
      const pointDistance = data.childPointDiam/2 + childPointDiam/2
      return delta(diffX, diffY, pointDistance)
    })
    if(location){
      return  {
        deltaX,
        deltaY
      }
    }
  }
}