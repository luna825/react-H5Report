import React, {Component, PropTypes} from 'react'
import {StaggeredMotion, spring, presets} from 'react-motion'
import classnames from 'classnames'
import './point.css';



// utility function
//产生指定范围的随机数
function random(range){
    const max = Math.max(range[0],range[1]);
    const min = Math.min(range[0],range[1]);

    const diff = max - min;
    return Math.ceil(Math.random()*diff + min);
}

//角度转化为弧度
// function toRadians(degrees){
//   return degrees * (Math.PI / 180)
// }

// function randomDelayPosition(initChildPointDiam, diff, index){

//   const flyOutRadius = initChildPointDiam * index 
//   const range = index % 2 === 0 ? [45, 90] : [90, 150]
//   const randomDegrees = random(range)
//   console.log(randomDegrees)

//   return {
//     deltaX : flyOutRadius * Math.cos(toRadians(randomDegrees)) ,
//     deltaY : flyOutRadius * Math.sin(toRadians(randomDegrees)) 
//   }
// }

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
      deltaX : random([childPointDiam / 2 , width - childPointDiam]),
      deltaY : random([150, height - childPointDiam - 100]) 
    }
  }

  // 循环执行，直到生成的点与datas数据中的任何点都不重复后，返回
  while(true){
    const deltaX = random([childPointDiam / 2, width - childPointDiam])
    const deltaY = random([150, height - childPointDiam- 100])
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


//默认颜色
const colors = ['#ff7676','#99c1ff','#ffa4a4']


export default class Point extends Component{

  constructor(props){
    super(props)

    this.pointProperty=[]
  }

  static contextTypes={
    onEnter:PropTypes.bool,
    width:PropTypes.number,
    height:PropTypes.number
  };

  static propTypes={
    initChildPointDiam : PropTypes.number,
    datas: PropTypes.array
  };


  static defaultProps ={
    initChildPointDiam: 150,
    datas:[{name:'A项目',per:0.4},{name:'B项目',per:0.3},{name:'C项目',per:0.5}]
  };

  componentWillMount() {
    const {initChildPointDiam, datas} = this.props;
    const {width, height} = this.context;
    datas.sort((v1, v2)=>v2.per - v1.per).forEach((data,i)=>{

      const childPointDiam = initChildPointDiam * data.per/datas[0].per //按per比例缩放
      const diff = initChildPointDiam - childPointDiam


      const {deltaX, deltaY} = randomPosition(childPointDiam, width , height, this.pointProperty)

      data.childPointDiam = childPointDiam 
      data.location = {offsetX:deltaX, offsetY:deltaY}
      if(!data.color){
        data.color = colors[i % colors.length]
      }
      this.pointProperty.push(data)
    })
  }

  initPointChildStyleInit = (data,i)=>{


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

  initPointChildStyle = (data,i)=>
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


  finalPointChildStyleInit =(data,i) =>{
    const {childPointDiam, location:{offsetX, offsetY}} = data

    return { 
      width:childPointDiam,
      height:childPointDiam,
      left: offsetX,
      top: offsetY,
      opacity: 1,
      scale: 1}
  }

  finalPointChildStyle =(data,i) =>{
    const {childPointDiam, location:{offsetX, offsetY}} = data

    return { width:childPointDiam,
      height:childPointDiam,
      left: offsetX,
      top: offsetY,
      opacity: spring(1),
      scale: spring(1)}
  }


  renderChildPoint(){

    let onEnter = this.context.onEnter

    //Point 的初始 style  不带spring 
    const targetPointStyleInit = this.pointProperty.map((data,i)=>{
      return onEnter ? this.finalPointChildStyleInit(data,i) : this.initPointChildStyleInit(data,i)
    })

    const targetPointStyle = this.pointProperty.map((data,i)=>{
      return onEnter ? this.finalPointChildStyle(data,i) : this.initPointChildStyle(data,i)
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
          <div>
            { interpolatedStyles.map(({...ret, scale},i)=>
              <div className={classnames('point',{point_shadow: i==0},{point_focus:scale==1 && i==0})}
                   key={i}
                   style={{
                    ...ret,
                    transform:`scale(${scale}) translate(-50%, -50%)`,
                    backgroundColor: this.pointProperty[i].color
                   }}
              >
                <div>{this.pointProperty[i].name}</div>
                <div>{this.pointProperty[i].per}</div>
              </div>
            )}
          </div>
        }
      </StaggeredMotion>
    )

  }

  render(){
    const {initChildPointDiam} = this.props;
    return(
      <div style={{position:'relative',width:initChildPointDiam,height:initChildPointDiam}}>
        {this.renderChildPoint()}
      </div>
    )
  }
}