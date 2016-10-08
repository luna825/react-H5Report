import React from 'react'


import {SectionsContainer, Section, AnimateItem} from './components'


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
      <SectionsContainer arrowNavgation={false} backToTop={this.state.backToTop}>
        <ReportFace />
        <ReportContentCore />
        <ReportTail handleOnClick={this.handleOnClick.bind(this)} />
      </SectionsContainer>
    )
  }
}