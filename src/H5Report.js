import React from 'react'


import {SectionsContainer, Section, AnimateItem, 
  PolylineDemo, PieDemo, RingDemo, RadarDemo, BarDemo, BarVDemo, Points} from './components'

import Point from './components/Point/Point_pre'


const LevelCenter={
  left:'50%',
  transform:'translate(-50%,0)'
}
const center={
  left:'50%',
  top:'50%',
  transform:'translate(-50%,-50%)'
}
/*-----------------页脚 start--------------------*/
const Footer = ()=>
   <AnimateItem animate={1000} style={{bottom:0,left:0,width:'100%'}} offsetTop="30px">
     <div className="footer-slide"> </div>
   </AnimateItem>

/*-----------------页脚  End--------------------*/


/*-----------------首页 start--------------------*/
const ReportFace = () =>
    <Section className='report-face'>
      <AnimateItem animate={0} duration={500}
        style={{left:'50%',top:100,transform:'translate(-50%,0)'}}
        offsetTop = "-100px"
      >
        <div className="face-logo"></div>
      </AnimateItem>

      <AnimateItem animate={500} duration={500}
        style={{left:'50%',top:180,transform:'translate(-50%,0)'}}
        offsetLeft = "-100%"
      >
        <div className="face-slogan swing"></div>
      </AnimateItem>

      <AnimateItem animate={1000} 
        style={{left:0,bottom:0}}
        offsetTop="100%"
        offsetLeft="-100%"
      >
        <div className="face-img-left"></div>
      </AnimateItem>

      <AnimateItem animate={1000} 
        style={{right:0,bottom:0}}
        offsetLeft='100%'
        offsetTop='100%'
      >
        <div className="face-img-right"></div>
      </AnimateItem>
      <Footer />
    </Section>
/*-----------------首页 End--------------------*/

/*-----------------核心理念 Start--------------------*/
const ReportContentCore = ()=>
  <Section className="report-content">
    <AnimateItem>
      <div className="caption"> 核心理念 </div>
    </AnimateItem>
    <AnimateItem style={{...LevelCenter, top:140}} offsetTop='80px' animate={0}>
      <div style={{color:'red',fontSize:'26px',width:254}}> IT教育网 = 只学有用的 </div>
    </AnimateItem>
    <AnimateItem animate={1500} style={{...LevelCenter, top:220}} offsetTop="100%">
      <div className="core-description">
        2013年，IT教育网的诞生引领中国IT职业从教育进入新时代；高质量实战课程、全新教学模式、实时互动学习，以领先优势打造行业品牌；迄今为止，IT教育网已成为中国规模最大、互动性最高的IT技能学习平台。
      </div>
    </AnimateItem>
    <AnimateItem animate={1000} style={{...LevelCenter, bottom:40}} offsetTop="100%">
      <div className="core-people" ></div>
    </AnimateItem>
    <Footer />
  </Section>
/*-----------------核心理念 End--------------------*/

/*-----------------课程分布polyline Start--------------------*/
const ReportContentCourse = () =>
  <Section className="report-content">
    <AnimateItem >
      <div className="caption"> 课程分布 </div>
    </AnimateItem>
    <AnimateItem animate={0} style={{...LevelCenter,top:160}}>
      <div style={{color:'red'}}>前端开发课程占到40%</div>
    </AnimateItem>
    <AnimateItem style={center} animate={0} offsetTop='-100px'>
      <PolylineDemo delay={1000} />
    </AnimateItem>
    <Footer />
  </Section>
/*-----------------课程分布polyline End--------------------*/

/*-----------------移动开发Pie Start--------------------*/
const ReportContentMobile = () =>
  <Section className="report-content">
    <AnimateItem >
      <div className="caption"> 移动开发课程资源 </div>
    </AnimateItem>
    <AnimateItem animate={0} style={{...LevelCenter,top:160}}>
      <div style={{color:'red'}}>移动课程Android占到40%</div>
    </AnimateItem>
    <AnimateItem style={center} animate={false}>
      <PieDemo delay={1000} />
    </AnimateItem>
    <Footer />
  </Section>
/*-----------------移动开发Pie End--------------------*/

/*-----------------前端开发Bar Start--------------------*/
const ReportContentFrontEnd = () =>
  <Section className="report-content">
    <AnimateItem >
      <div className="caption"> 前端开发课程 </div>
    </AnimateItem>
    <AnimateItem style={center} animate={0} offsetTop="-100px">
      <BarDemo delay={1000} />
    </AnimateItem>
    <AnimateItem style={{...LevelCenter, bottom:150}} animate={0}>
      <div style={{color:'#ff7676'}}> 前端课程javascript占60% </div>
    </AnimateItem>
    <Footer />
  </Section>
/*-----------------前端开发 End--------------------*/

/*-----------------前端开发Bar Start--------------------*/
const ReportContentFrontEndV = () =>
  <Section className="report-content">
    <AnimateItem >
      <div className="caption"> 前端开发课程 </div>
    </AnimateItem>
    <AnimateItem style={center} animate={0} offsetTop="-100px">
      <BarVDemo delay={1000}/>
    </AnimateItem>
    <AnimateItem style={{...LevelCenter, bottom:150}} animate={0}>
      <div style={{color:'#ff7676'}}> 前端课程javascript占60% </div>
    </AnimateItem>
    <Footer />
  </Section>
/*-----------------前端开发 End--------------------*/

/*-----------------后端开发课程Radar Start--------------------*/
const ReportContentBackEnd = () =>
  <Section className="report-content">
    <AnimateItem >
      <div className="caption"> 后端开发课程 </div>
    </AnimateItem>
    <AnimateItem style={center} animate={0} offsetTop='-100px'>
      <RadarDemo delay={1000} />
    </AnimateItem>
    <Footer />
  </Section>
/*-----------------后端开发课程Radar End--------------------*/

/*-----------------课程报名人数Ring Start--------------------*/
const ReportContentRing = () =>
  <Section className="report-content">
    <AnimateItem >
      <div className="caption"> 课程报名人数过万 </div>
    </AnimateItem>
    <AnimateItem style={{...LevelCenter,top:160}} >
      <RingDemo delay={1000} />
    </AnimateItem>

    <AnimateItem style={{left:'10%',bottom:150}} >
      <RingDemo width={150} height={150} delay={1000} data={{name:'后端开发',per:.3}} />
    </AnimateItem>
    <AnimateItem style={{left:'40%',bottom:150}} >
      <RingDemo width={150} height={150} delay={1000} data={{name:'前端开发',per:.4}} />
    </AnimateItem>
    <AnimateItem style={{left:'70%',bottom:150}} >
      <RingDemo width={150} height={150} delay={1000} data={{name:'移动开发',per:.2}} />
    </AnimateItem>
    <AnimateItem style={{left:'25%',bottom:50}} >
      <RingDemo width={150} height={150} delay={1000} data={{name:'数据处理',per:.1}} />
    </AnimateItem>
    <AnimateItem style={{left:'55%',bottom:50}} >
      <RingDemo width={150} height={150} delay={1000} data={{name:'图像处理',per:.15}} />
    </AnimateItem>
    <Footer />
  </Section>
/*-----------------课程报名人数Ring End--------------------*/

/*-----------------难度分布Points Start--------------------*/
const ReportContentPoints = () =>
  <Section className="report-content">
    <AnimateItem >
      <div className="caption"> 课程难度分布 </div>
    </AnimateItem>
    <AnimateItem>
      <Points />
    </AnimateItem>
    <Footer />
  </Section>
/*-----------------难度分布Points End--------------------*/


/*-----------------尾页 Start--------------------*/
const ReportTail = ({handleOnClick}) => 
  <Section className="report-content">
    <AnimateItem animate={0} style={{...LevelCenter, top:'30%'}} >
      <div className="tail-title"> </div>
    </AnimateItem>
    <AnimateItem animate={1000} style={{...LevelCenter, top:'42%'}} offsetLeft="-100%">
      <div className="tail-slogan swing"> </div>
    </AnimateItem>
    <AnimateItem style={{...LevelCenter, top:30}} >
      <div className="tail-back shake" onClick={handleOnClick}> </div>
    </AnimateItem>
    <Footer />
  </Section>

/*-----------------尾页 End--------------------*/

export default class H5Report extends React.Component {

  constructor(props){
    super(props);
    this.state={
      backToTop:true
    }
  }

  handleOnClick(){
    this.setState({backToTop: !this.state.backToTop})
  }

  render(){
    return(
      <SectionsContainer arrowNavgation={false} backToTop={this.state.backToTop} activeSlide={0}>
        <ReportFace />
        <ReportContentCore />
        <ReportContentCourse />
        <ReportContentMobile />
        <ReportContentFrontEnd/>
        <ReportContentFrontEndV />
        <ReportContentBackEnd />
        <ReportContentRing />
        <ReportContentPoints />
        <ReportTail handleOnClick={this.handleOnClick.bind(this)} />
      </SectionsContainer>
    )
  }
}