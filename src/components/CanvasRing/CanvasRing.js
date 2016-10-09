import React ,{Component, PropTypes} from 'react'


const PI = Math.PI

export default class CanvasRing extends Component{

  constructor(props){
    super(props)
  }

  static propTypes ={
    width:PropTypes.number,
    height:PropTypes.number,
    data: PropTypes.object,
    transition: PropTypes.number
  };

  static defaultProps ={
    width:400,
    height:400,
    data:{name:'Js',per:0.4, color:'#ff7676'},
    transition: 1
  };

  componentDidMount() {

    const {width, height, data, transition} = this.props;

    if ( this._Ring.getContext ){
      /*--------------------环图背景层 Start------------------*/
  
      this.Bg = this._initContext(this._Bg, width, height)
      this._drawRound(this.Bg, width/2, height/2, width/2-2, '#eee', 1, '#eee')


      this.Mask = this._initContext(this._Mask, width ,height)
      this._drawRound(this.Mask, width/2, height/2, (width/2 - 2) * 0.8,'#FFF', 1, '#FFF')
     
      /*--------------------环图背景层  End------------------*/
      

      /*--------------------环图数据动画层 Start------------------*/
      this.Ring = this._initContext(this._Ring, width, height)
      
      this._Animate(this.Ring, transition, data)
      /*--------------------环图数据动画层 End------------------*/
    }
 
  }

  componentWillReceiveProps(nextProps) {
    const {data, transition} = nextProps;
    if(transition !== this.props.transition){
      this._Animate(this.Ring, transition, data)
    }
  }


  /**
   * 通过 transition变化 在Y轴上产生变化，
   * @param  {context} ctx          [画布]
   * @param  {number} transition     [变化比例,小数]
   * @param  {array} datas          [要显示的数据]
   */
  _Animate( ctx ,transition ,data){

    this._clearContext(ctx)

    const {width, height} = ctx;

    this._drawRing(ctx, width/2, height/2, width/2-2, data.per * transition, data.color)


  }


  /**
   * 绘制环图底图
   * @param  {context} ctx    [画布]
   * @param  {number} x      [环图圆心X]
   * @param  {number} y      [环图圆心Y]
   * @param  {number} radius [环图半径]  
   */
  _drawRing(ctx, x, y, radius, per, color){

    const radian = 2 * PI * per

    ctx.beginPath()
    ctx.moveTo(x, y)

    ctx.arc(x, y, radius, -0.5 * PI, -0.5 * PI + radian)
    ctx.fillStyle = color || 'orange' 
    ctx.fill()

  }




  /**
   * 项目文字样式
   * @param  {number} x      [需要添加文字的环图中心坐标x]
   * @param  {number} y      [需要添加文字的环图中心坐标y]
   * @param  {number} radius [需要添加文字的环图中心坐标半径]
   * @param  {number} per    [需要添加文字项目在环图所占百分比]
   * @param  {radian} sAngle [需要添加文字项目在环图的起始位置]
   * @return {object}        [返回的文字样式]
   */
  _textStyle(width, height, data){

    return { 
      position : 'absolute',
      opacity: this.props.transition > .95 ? 1 : 0,
      transition: 'all .5s linear',
      fontSize:'6px',
      top: width / 2,
      left: height / 2,
      transform: 'translate(-50%, -50%)',
      zIndex: 9,
      color: data.color || 'orange'
    }

  }

  /**
   * 画布初始化
   * @param  {Canvas} canvas canvas DOM结点
   * @param  {number} width  画布宽
   * @param  {number} height 画布高
   * @return {context}       返回一个2d画布上下文
   */
  _initContext(canvas, width, height){
    if (canvas.getContext){
      const ctx = canvas.getContext('2d')
      ctx.width = width;
      ctx.height = height;
      return ctx;
    }
    return ;
  }

  /**
   * 画路径
   * @param  {context} ctx         画布
   * @param  {array}   points      路径点的集合，每一个point有x,y两个属性
   * @param  {string}  color       线的颜色
   * @param  {number}  lineWidth   线的粗细
   * @param  {bool}    isclosePath 是否封口
   */
  _drawPath(ctx, points, color='#000', lineWidth=1, isclosePath){

    if (points.length < 2) { return ;}

    ctx.beginPath();

    points.forEach((point, i) =>{
      i === 0 ? ctx.moveTo(point.x, point.y) : ctx.lineTo(point.x, point.y)
    })
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;

    isclosePath && ctx.closePath()

    ctx.stroke()

  }


  /**
   * 射线
   * @param  {context} ctx       画布
   * @param  {object} rayPoint   {x,y}发射点起点
   * @param  {array} points      射线终点
   * @param  {String} color      线的颜色 
   * @param  {Number} lineWidth  线的宽度
   */
  _drawRay(ctx, rayPoint, points, color='#000', lineWidth=1){

    ctx.beginPath();
    points.forEach(point => {
      ctx.moveTo(rayPoint.x, rayPoint.y)
      ctx.lineTo(point.x, point.y)
    })

    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;

    ctx.stroke()
  }



  /**
   * 填充
   * @param  context ctx       画布
   * @param  {array} points    路径点的集合，每一个point有x,y两个属性
   * @param  {String} color    填充颜色 
   */
  _drawFill(ctx, points, color){
    if (points.length < 2) {return ;}

    ctx.beginPath();

    points.forEach((point, i) => {
      i === 0 ? ctx.moveTo(point.x, point.y) : ctx.lineTo(point.x, point.y)
    })

    ctx.fillStyle = color;
    ctx.fill()
  }

  /**
   * 画圆
   * @param  {constext} ctx     画布
   * @param  {Number} x         圆心x坐标
   * @param  {Number} y         圆心y坐标
   * @param  {Number} radius    半径
   * @param  {String} color     颜色
   * @param  {Number} lineWidth 线宽
   * @param  {String} fill      如果有填充颜色则进行填充
   */
  _drawRound(ctx, x, y, radius, color='#000', lineWidth=1, fill ){

    ctx.beginPath()

    ctx.arc(x, y , radius, 0, 2 * PI)


    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;

    if ( fill) {
      ctx.fillStyle = fill;
      ctx.fill()
    }

    ctx.stroke()

  }


  /**
   * 绘制文本
   * @param  {context} ctx          [description]
   * @param  {string} text         文字内容
   * @param  {number} x            文字x坐标
   * @param  {number} y            文字y坐标
   * @param  {string} font         文字样式与css一样
   * @param  {string} textAlign    center居中，start起点对齐,end终点对齐
   * @param  {String} textBaseline middle居中default, top上对齐，bottom下对齐
   */
  _drawText(ctx, text, x, y, font, textAlign='center', textBaseline ='middle'){

    ctx.font = font;
    ctx.textAlign = textAlign;
    ctx.textBaseline = textBaseline;
    ctx.fillStyle = '#000'

    ctx.fillText(text, x, y)

  }

  /**
   * 清除画布
   * @param  {context} ctx    画布
   * @param  {number} width   清除矩形的宽
   * @param  {number} height  清除矩形的高
   */
  _clearContext(ctx){
    ctx.clearRect(0,0, ctx.width, ctx.height)
  }



  render(){
    const {width , height, data} = this.props;
    return(
      <div style={{width: width /2 + 2, height: height /2 + 2}}>
        <div style={this._textStyle(width/2, height/2, data)}>
          <div style={{textAlign: 'center', margin:'5px 0',whiteSpace:'nowrap'}}>{data.name}</div>
          <div style={{textAlign: 'center'}}>{data.per * 100 + '%'}</div>
        </div>
        <canvas ref={c => this._Bg = c} width={width} height={height} style={style} > </canvas>
        <canvas ref={c => this._Ring = c} width={width} height={height} style={style} > </canvas>
        <canvas ref={c => this._Mask = c} width={width} height={height} style={style} > </canvas>
      </div>
    )
  }
}


const style = {
  width: '100%',
  height: '100%',
  position:'absolute'
}