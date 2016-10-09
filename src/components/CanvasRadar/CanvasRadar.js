import React ,{Component, PropTypes} from 'react'


export default class CanvasRadar extends Component{

  constructor(props){
    super(props)
  }

  static propTypes ={
    width:PropTypes.number,
    height:PropTypes.number,
    datas: PropTypes.array,
    transition: PropTypes.number
  };

  static defaultProps ={
    width:500,
    height:500,
    datas:[
      {name:'Js',per:0.8, color:'#ff7676'},
      {name:'CSS', per: 0.6},
      {name:'Python', per:0.75},
      {name:'React',per:0.4},
      {name:'HTML5',per:0.65},
      {name:'C',per:0.55},
      {name:'Node',per:0.5}
    ],
    transition:1
  };

  componentDidMount() {

    const {width, height, datas , transition} = this.props;

    if ( this._Radar.getContext ){
      /*--------------------雷达图背景层 Start------------------*/
  
      this.Radar = this._initContext(this._Radar, width, height)
      //五层雷达图，由外到里绘制
      for (let i = 10; i > 0; i--){
        const fill = i % 2 === 0 ? '#99c0ff' : '#FFF'
        this._drawRarda(this.Radar, width/2, height/2, (width/2-2) * i/10, datas.length , fill, '#FFF' )
      }

     
      /*--------------------雷达图背景层  End------------------*/
      

      /*--------------------雷达图数据动画层 Start------------------*/
      this.Point = this._initContext(this._Point, width ,height)
      this._Animate(this.Point, transition, datas)

      /*--------------------雷达图数据动画层 End------------------*/
    }
 
  }

  componentWillReceiveProps(nextProps) {
    const {datas, transition} = nextProps;
    if(transition !== this.props.transition){
      this._Animate(this.Point, transition, datas)
    }
  }



  /**
   * 通过 transition变化 在Y轴上产生变化，
   * @param  {context} ctx          [画布]
   * @param  {number} transition     [变化比例,小数]
   * @param  {array} datas          [要显示的数据]
   */
  _Animate( ctx ,transition ,datas){

    this._clearContext(ctx)

    const {width, height} = ctx;

    let points =[];
    const radian = 2 * Math.PI / datas.length;
    const raduis = width / 2 - 2
    datas.forEach((data, i) =>{
      
      const x = width / 2 + transition * data.per * raduis * Math.cos(radian * i - 1/2 * Math.PI)
      const y = width / 2 + transition * data.per * raduis * Math.sin(radian * i - 1/2 * Math.PI)

      this._drawRound(ctx, x, y, 8, '#ff7676', 3, '#ff7676' )

      points.push({x,y})

    })

    this._drawPath(ctx, points, '#ff7676', 3, true)


  }

  /**
   * 雷达图
   * @param  {context} ctx           画布
   * @param  {number} x             [雷达图中心点X坐标]
   * @param  {number} y             [雷达图中心点Y坐标]
   * @param  {number} radius        [雷达图的半径]
   * @param  {number} numberOfAngle [雷达图一共有几个角]
   * @param  {string} fill          [内部填充颜色]
   * @param  {String} color         [内部射线颜色]
   */
  _drawRarda(ctx, x, y, radius, numberOfAngle, fill, color){

    const radian = 2 * Math.PI / numberOfAngle 
    let points = [];
    for (let i = 0; i < numberOfAngle; i++){
      const pX = x + radius * Math.cos(radian * i - 1/2 * Math.PI)
      const pY = y + radius * Math.sin(radian * i - 1/2 * Math.PI)
      points.push({x:pX, y:pY})
    }
    fill && this._drawFill(ctx, points, fill)
    color && this._drawRay(ctx, {x,y}, points, color, 3)

  }

  /**
   * 项目文字样式
   * @param  {number} x      [需要添加文字的雷达图中心坐标x]
   * @param  {number} y      [需要添加文字的雷达图中心坐标y]
   * @param  {number} radius [需要添加文字的雷达图中心坐标半径]
   * @param  {number} count  [需要添加文字的雷达图个数]
   * @param  {number} i      [第i个角的文字]
   * @return {object}        [返回的文字样式]
   */
  _textStyle(x, y, radius, count, i){

    const radian = 2 * Math.PI / count 

    const px = x/2 + radius/2 * Math.cos(radian * i - 1/2 * Math.PI);
    const py = y/2 + radius/2 * Math.sin(radian * i - 1/2 * Math.PI);


    const style ={ 
      position : 'absolute',
      opacity: this.props.transition > .9 ? 1 : 0,
      transition: 'all .5s linear'
    }

    if (px > x /2){
      style.left = px
    }else{
      style.right = x - px
    }

    if( py > y/2){
      style.top = py
    }else{
      style.bottom = y - py
    }

    return style
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
   * @param  {constext} ctx       画布
   * @param  {Number} x         圆心x坐标
   * @param  {Number} y         圆心y坐标
   * @param  {Number} radius    半径
   * @param  {String} color     颜色
   * @param  {Number} lineWidth 线宽
   * @param  {String} fill      如果有填充颜色则进行填充
   */
  _drawRound(ctx, x, y, radius, color='#000', lineWidth=1, fill ){

    ctx.beginPath()
    ctx.arc(x, y , radius, 0, 2 * Math.PI)

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
    const {width , height, datas} = this.props;
    return(
      <div style={{width: width /2 + 2, height: height /2 + 2}}>
        {datas.map((data, i) =>
          <div style={this._textStyle(width/2, height/2, height/2 + 4, datas.length, i)} key={i}>{data.name}</div>
        )}
        <canvas ref={c => this._Radar = c} width={width} height={height} style={style} > </canvas>
        <canvas ref={c => this._Point = c} width={width} height={height} style={style} > </canvas>
      </div>
    )
  }
}


const style = {
  width: '100%',
  height: '100%',
  position:'absolute'
}