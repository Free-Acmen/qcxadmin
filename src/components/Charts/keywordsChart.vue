<template>
  <div>
    <div :class="className1" :style="{height:height,width:width}"/>
  </div>
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

import { twoDigit, isToday } from '@/utils/commonFunc'

require('echarts/theme/macarons') // echarts theme


const animationDuration = 500

// const colorArr = ['#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80', '#8d98b3', '#e5cf0d', '#97b552', '#95706d', '#dc69aa', '#07a2a4', '#9a7fd1', '#588dd5', '#f5994e', '#c05050', '#59678c', '#c9ab00', '#7eb00a', '#6f5553', '#c14089']

const colorArr = ['#323441', '#97b552', '#07a2a4', '#6f5553', '#c14089', '#ffb980']

export default {
  mixins: [resize],
  props: {
    className1: {
      type: String,
      default: 'chart1'
    },
    // className2: {
    //   type: String,
    //   default: 'chart2'
    // },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '400px'
    },
    asin: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    site: {
      type: String,
      required: true
    }
  },
  watch: {
    date: function(newVal, oldVal){
      console.log(newVal, oldVal)
      var data = {
        asin: this.asin,
        date: newVal,
        location: this.site
      }
      this.getChartData(data, 2)
    }
  },
  data() {
    return {
      // chart1: null,
      // chart2: null,
      timer: null,
      asinData: {},
      chartdata: {},
      // chart1Legend: [],
      xAxisData: [],
      rank1: [],
      rank2: [],
      // ranks: [],
      // scores: [],
      // reviews: []
    }
  },
  mounted() {
    this.chart1 = echarts.init(this.$el.children[0], 'macarons')
    // this.chart2 = echarts.init(this.$el.children[1], 'macarons')
    // echarts.connect([this.chart1, this.chart2]);
    var data = {
      asin: this.asin,
      date: this.date,
      location: this.site
    }
    this.getChartData(data, 1)

    // this.chart1.dispatchAction({
    //   type: 'showTip',
    //   seriesIndex: 0,
    //   dataIndex: 3
    // })
    // this.timer = setInterval(this.getUpdateData.bind(this, data, 2), 60*1000)
  },
  beforeDestroy() {
    if(this.timer){
      clearInterval(this.timer)
      this.timer = null
    }
    if (this.chart1) {
      this.chart1.dispose()
      this.chart1 = null
    }
  },
  methods: {
    initChart() {
      var that= this
      this.chart1.setOption({
        title: {
          text: '关键词排名',
          left: '50%',
        },
        color:[colorArr[0], colorArr[1], colorArr[2]], 
        legend: {
          type: 'scroll',
          // orient: 'vertical',
          left: 20,
          top: 0,
          // bottom: 20,
          data: ['关键词1', '关键词2']
        },
        tooltip: {
          trigger: 'axis', //'item',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'line' // 默认为直线，可选为：'line' | 'shadow' | 'cross'
          },
          backgroundColor: 'rgba(50,50,50,.85)',
          formatter : function (params) {
            // console.log(params)
            let markerB = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:8px;height:8px;background-color:'
            let markerE = ';"></span>'
            let param0 = params[0];
            let param1 = params[1]

            let html = ''
            html += param0.axisValue;

            
            html+= '<br> '+ markerB + colorArr[0] + markerE + ' ' + param0.name + ': ' + param0.value[1];
            html += '<br> '+ markerB + colorArr[1] + markerE + ' ' + param1.name + ': ' + param1.value[1];

            html += '<div style="border-top: 1px solid #d87a80;margin: 5px 0;"></div>';
            html += '<div style="color: red;"> 121212</div>';
   
            // html += '<br>'+ markerB + colorArr[2] + markerE +' 大类排名: ' + (that.chartdata[param.axisValue].BigCatRank == '2147483647' ?  '无' : that.chartdata[param.axisValue].BigCatRank);
 
            // html += '<br>'+ markerB + colorArr[3] + markerE +' 评分: ' + that.chartdata[param.axisValue].Score;
  
            // html += '<br>'+ markerB + colorArr[4] + markerE +' 评论数: ' + that.chartdata[param.axisValue].Reviews 
            return html
          }
        },
        grid: {
          top: '15%',
          left: '3%',
          right: '5%',
          bottom: '8%',
          containLabel: true
        },
        // calculable: true,
        xAxis: [{
          show: true,
          type: 'category',
          name: '时间轴',
          data: this.xAxisData,
          axisTick: {
            show: true,
            inside: true,
            alignWithLabel: true
          },
          axisLabel : {//坐标轴刻度标签的相关设置。
            interval: 0,
            rotate:"-40",
            show: true
          }
        }],
        yAxis: [{
          type: 'value',
          name: '排名',
          // min: function(value) {
          //   var min = value.min
          //   if(min > 0){
          //     min = min - 1
          //   }
          //   return min.toFixed(1);
          // },
          axisTick: {
            show: false
          }
        }],
        dataZoom: [
          {
            show: true,
            realtime: true,
            start: 0,
            end: 100,
          },
          {
            type: 'inside',
            realtime: true,
            start: 1,
            end: 35
          }
        ],
        series: [{
            name: '关键词1',
            type: 'line',
            smooth: 0,
            z:10,
            // sampling: 'average',
            lineStyle: {
              width: '2',
            },
            // showSymbol: false,
            showAllSymbol:true,
            symbolSize: 6,
            symbol: 'none',
            data: this.rank1,
            animationDuration
          },
          {
            name: '关键词2',
            type: 'line',
            smooth: 0,
            z:10,
            // sampling: 'average',
            lineStyle: {
              width: '2',
            },
            showAllSymbol:true,
            // showSymbol: false,
            symbolSize: 6,
            symbol: 'none',
            data: this.rank2,
            animationDuration
          }
        ]
      })
    },
    updateChart(){
      this.chart1.setOption({
        series: [{data: this.seriesData}, {data: this.sellers}, {data: this.ranks}]
      })
    },
    getChartData(data, flag) {
      // getBuyCartData(data).then( res => {
      //   this.initData(res.data)
      //   if(flag == 1){
      //     this.initChart()
      //   }else{
      //     this.updateChart()
      //   }
      // })

      this.initData()
      this.initChart()
    },
    getUpdateData: function(data){
      this.updateChart()
    },
    initData(chartdata) {
      let that = this
      const xAxisData = 30
      const startTime = 0 
    
      let xData = [] //X轴数据
      let data1 = []  
      let data2 = []  

      
      let dataObj = []

      // let minX = Object.keys(dataObj)[0]
      // let maxX = chartdata.lastIndex
      
      for(var i=startTime; i< xAxisData; i++){
        let xAxis, series1, series2
        // if(i >= 25){
        //   // xAxis = '+' + twoDigit(parseInt((i-1440)*1/60)) + ':' + twoDigit((i-1440)*1%60)
        // }else{
        //   // xAxis = '-' + twoDigit(parseInt(i*1/60)) + ':' + twoDigit(i*1%60)
        // }
        xAxis = i + 1 + '号'
        xData.push(xAxis)

        
        if(i == 3 || i== 26){
          series1 = {
            name: '关键词1',
            value: [xAxis, 55],
            symbol: 'emptyCircle',
            itemStyle: {
              color: colorArr[5]
            },
            label: {
              show: true,
              color: colorArr[5],
              fontWeight: 700,
              // formatter: function(params){
              //   return that.chartdata[params.value[0]].CurBuyboxSeller + '  ' +  params.value[1]
              // }
            }
          }

          series2 = {
            name: '关键词1',
            value: [xAxis, 35],
            symbol: 'emptyCircle',
            itemStyle: {
              color: colorArr[4]
            },
            label: {
              show: true,
              color: colorArr[4],
              fontWeight: 700,
              // formatter: function(params){
              //   return that.chartdata[params.value[0]].CurBuyboxSeller + '  ' +  params.value[1]
              // }
            }
          }
        }else if(i==5 || i==10){
          series1 = {
            name: '关键词1',
            value: [xAxis, null],
          }
          series2 = {
            name: '关键词1',
            value: [xAxis, 35],
          }
        }else{
          series1 = {
            name: '关键词1',
            value: [xAxis, 55],
          }
          series2 = {
            name: '关键词1',
            value: [xAxis, 35],
          }
        }
        data1.push(series1)
        data2.push(series2)

      }
      this.xAxisData = xData
      this.rank1 = data1
      this.rank2 = data2

    }
  }
}
</script>
