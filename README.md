## H5报告PPT
学习慕课网实战课程后，基于React, React-Motion及动画插件编写的一个H5报告PTT。    
[DEMO](http://luna825.p.imooc.io/)

#### 页面控制组件
**SectionsContainer**:整个H5报告页，监听鼠标滚动和触摸 提供页面滑动动画    
**Section**:报告单页，页面进入离开态度控制   
**AnimateItem**:为页面的各类组件提供进出动画

#### Canvas图表组件
图表组件采用Canvas绘制，每个组件有个变化属性(props)用于控制组件的关键动画，变化的频率采用react-motion来提供.为   
Polyline折线图级，Pie饼图，Ring环图，Radar雷达图提供动画。

#### CSS组件
Bar组件和Points散点图组件由Css实现并提供动画

