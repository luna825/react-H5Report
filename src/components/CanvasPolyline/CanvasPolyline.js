import React ,{Component, PropTypes} from 'react'

export default class CanvasPolyline extends Component{


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
    width:530,
    height:400,
    datas:[
      {name:'js',per:0.4, color:'#ff7676'},
      {name:'CSS', per: 0.2},
      {name:'python', per:0.3},
      {name:'React',per:0.1},
      {name:'HTML5',per:0.15}
    ],
    transition:1
  };

  componentDidMount() {

    const {width, height, datas , transition} = this.props;

    if ( this._Grid.getContext ){
      /*--------------------折线图网格背景层 Start------------------*/
      // 画背景网格
      this.Grid = this._initContext(this._Grid, width, height)
      this._drawGrid(this.Grid, datas.length + 1, 11, '#AAA', 2); // data.lenght + 1 多出两根线头和尾不用
      //X轴项目文字
      datas.forEach((data, i ) =>{
        this._drawText(this.Grid, data.name, width / (datas.length + 1) * (i + 1), height, '24px Arail', 'center', 'bottom') 
      })
      /*--------------------折线图网络背景层  End------------------*/
      
      /*--------------------折线图数据动画层 Start------------------*/
      this.Point = this._initContext(this._Point, width, height)//画数据点
      this._Animate(this.Point, transition, datas)
      /*--------------------折线图数据动画层 End------------------*/
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

    let points = []; //存诸所有的数据点
    datas.forEach((data, i)=>{
      const x = width / (datas.length + 1) * (i + 1)
      const y = (1 - data.per * transition) * (height - height/11)  // 网格的高度为height减去一个等分的距离
      this._drawRound(ctx, x, y, 5, '#ff8878', 3)//画出数据点
      this._drawText(ctx, Math.round(data.per * transition * 100) + '%', x, y - 10, '18px Arail', 'center', 'bottom') //数据文字
      points.push({x,y})
    })
    // 数据点连线
    this._drawPath(ctx, points, '#ff8878', 3) 

    //填充阴影
    points.push( // 加入 x轴上, 与最后一个点及第一个点的垂直点
      {x: width - width / (datas.length + 1), y:height - height/11},
      {x: width / (datas.length + 1), y: height- height / 11 }
    )
    this._drawFill(ctx, points, 'rgba(255, 136, 120, 0.2)')

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
   * @param  {context} ctx       画布
   * @param  {array} points      路径点的集合，每一个point有x,y两个属性
   * @param  {string} color      线的颜色
   * @param  {number} lineWidth  线的粗细
   */
  _drawPath(ctx, points, color='#000', lineWidth=1){

    if (points.length < 2) { return ;}

    ctx.beginPath();

    points.forEach((point, i) =>{
      i === 0 ? ctx.moveTo(point.x, point.y) : ctx.lineTo(point.x, point.y)
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
   */
  _drawRound(ctx, x, y, radius, color='#000', lineWidth=1 ){

    ctx.beginPath()
    ctx.arc(x, y , radius, 0, 2 * Math.PI)

    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;

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
   * 画网格线
   * @param  {context} ctx       画布
   * @param  {number} xStep      x方向分成的份数
   * @param  {number} yStep      y方向分成的份数
   * @param  {string} color      线的颜色
   * @param  {number} lineWidth  线的粗细
   */
  _drawGrid(ctx, xStep, yStep, color, lineWidth){

    const {width, height} = ctx;

    //画布的左边和下方预留一个等分的距离用于写字
    for(let i = 0; i <= xStep ; i++ ){ 
      
      this._drawPath(ctx, [{x: i * width / xStep, y: 0}, {x:i * width / xStep, y:height - height / yStep}], color, lineWidth)
    }

    for(let i = 0; i < yStep; i ++){ 
      this._drawPath(ctx, [{x:0, y:i * height / yStep}, {x:width, y:i * height / yStep}], color, lineWidth)
    }

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
    const {width , height} = this.props;
    return(
      <div style={{width: width /2 + 2, height: height /2 + 2}}>
        <canvas ref={c => this._Grid = c} width={width} height={height} style={style} > </canvas>
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