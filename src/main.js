import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core';
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart } from 'echarts/charts';
// 标签自动布局、全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers';

import {
TitleComponent,
TooltipComponent,
GridComponent,
DatasetComponent,
TransformComponent
} from 'echarts/components';

import App from './App.vue'
import router from './router'


import axios from 'axios'
import VueAxios from 'vue-axios'

import { ToolboxComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';


echarts.use([LineChart]);

echarts.use([ToolboxComponent]);

Vue.use(VueAxios, axios)

// 注册必须的组件
echarts.use([
TitleComponent,
TooltipComponent,
GridComponent,
DatasetComponent,
TransformComponent,
BarChart,
LabelLayout,
UniversalTransition,
CanvasRenderer
]);

Vue.use(ElementUI);
//关闭vue的生产提示
Vue.config.productionTip = false

Vue.prototype.$echarts = echarts;

new Vue({
router,
render: h => h(App),
}).$mount('#app')