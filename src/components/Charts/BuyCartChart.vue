<template>
  <div>
    <div :class="className1" :style="{height:height,width:width}"/>
    <div :class="className2" :style="{height:height,width:width}"/>
  </div>
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'
import { getBuyCartData } from '@/api/extendserv'

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
    className2: {
      type: String,
      default: 'chart2'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '240px'
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
      seriesData: [],
      sellers: [],
      ranks: [],
      scores: [],
      reviews: []
    }
  },
  mounted() {
    this.chart1 = echarts.init(this.$el.children[0], 'macarons')
    this.chart2 = echarts.init(this.$el.children[1], 'macarons')
    echarts.connect([this.chart1, this.chart2]);
    var data = {
      asin: this.asin,
      date: this.date,
      location: this.site
    }
    this.getChartData(data, 1)
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
    if (this.chart2) {
      this.chart2.dispose()
      this.chart2 = null
    }
  },
  methods: {
    initChart() {
      var that= this
      this.chart1.setOption({
        title: {
          text: '购物车等曲线图表',
          left: '50%',
        },
        color:[colorArr[0], colorArr[1], colorArr[2]], 
        legend: {
          type: 'scroll',
          // orient: 'vertical',
          left: 20,
          top: 0,
          // bottom: 20,
          data: ['购物车', '卖家数', '排名']
        },
        tooltip: {
          trigger: 'axis', //'item',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'line' // 默认为直线，可选为：'line' | 'shadow' | 'cross'
          },
          backgroundColor: 'rgba(50,50,50,.85)',
          formatter : function (params) {
            let markerB = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:8px;height:8px;background-color:'
            let markerE = ';"></span>'
            let param = params[0]
            let html = ''
            html += param.axisValue;
 
            html+= '<br> '+ markerB + colorArr[0] + markerE +' 购物车: ' + param.name + ' ' + param.value[1];

            html += '<br> '+ markerB + colorArr[1] + markerE +' 卖家数: ' + that.chartdata[param.axisValue].CurSellers;
   
            html += '<br>'+ markerB + colorArr[2] + markerE +' 大类排名: ' + (that.chartdata[param.axisValue].BigCatRank == '2147483647' ?  '无' : that.chartdata[param.axisValue].BigCatRank);
 
            html += '<br>'+ markerB + colorArr[3] + markerE +' 评分: ' + that.chartdata[param.axisValue].Score;
  
            html += '<br>'+ markerB + colorArr[4] + markerE +' 评论数: ' + that.chartdata[param.axisValue].Reviews 
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
            interval: 119,
            rotate:"-40",
            show: false
          }
        }],
        yAxis: [{
          type: 'value',
          // name: '跟卖价格',
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
            show: false,
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
            name: '购物车',
            type: 'line',
            smooth: 0,
            z:10,
            // sampling: 'average',
            lineStyle: {
              width: '2',
            },
            showAllSymbol:true,
            // showSymbol: false,
            symbolSize: 0,
            symbol: 'circle',
            data: this.seriesData,
            animationDuration
          },
          {
            name: '卖家数',
            type: 'line',
            smooth: 0,
            // sampling: 'average',
            lineStyle: {
              // color: '#97b552',
              width: '2',
              // opacity: '0.8'
            },
            showAllSymbol:true,
            // showSymbol: false,
            symbolSize: 0,
            symbol: 'circle',
            data: this.sellers,
            animationDuration
          },
          {
            name: '排名',
            type: 'line',
            smooth: 0,
            // sampling: 'average',
            lineStyle: {
              // color: '#323441',
              width: '2',
              // opacity: '0.8'
            },
            showAllSymbol:true,
            // showSymbol: false,
            symbolSize: 0,
            symbol: 'circle',
            data: this.ranks,
            animationDuration
          }
        ]
      })

      this.chart2.setOption({
        title: {
          text: '评分评论曲线图表',
          left: '50%',
        },
        color:[colorArr[3], colorArr[4]], 
        legend: {
          type: 'scroll',
          left: 20,
          top: 0,
          data: ['评分', '评论数']
        },
        tooltip: {
          trigger: 'axis', //'item',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'line' // 默认为直线，可选为：'line' | 'shadow' | 'cross'
          },
          backgroundColor: 'rgba(50,50,50,.85)',
          formatter : function (params) {
            let markerB = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:8px;height:8px;background-color:'
            let markerE = ';"></span>'
            let param = params[0]
            let html = ''
            html = param.axisValue
            html += '<br>'+ markerB + colorArr[3] + markerE +' 评分: ' + that.chartdata[param.axisValue].Score;
            html += '<br>'+ markerB + colorArr[4] + markerE +' 评论数: ' + that.chartdata[param.axisValue].Reviews 
            return html
          }
        },
        grid: {
          top: '15%',
          left: '3%',
          right: '5%',
          bottom: '18%',
          containLabel: true
        },
        // calculable: true,
        xAxis: [{
          type: 'category',
          name: '时间轴',
          data: this.xAxisData,
          axisTick: {
            show: true,
            inside: true,
            alignWithLabel: true
          },
          axisLabel : {//坐标轴刻度标签的相关设置。
            interval: 119,
            rotate:"-40"
          }
        }],
        yAxis: [{
          type: 'value',
          // name: '跟卖人数',
          minInterval: 1,
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
        series: [
          {
            name: '评分',
            type: 'line',
            smooth: 0,
            // sampling: 'average',
            lineStyle: {
              // color: '#6f5553',
              width: '2',
              // opacity: '0.8'
            },
            itemStyle: {
              color: '#6f5553'
            },
            symbolSize: 0,
            symbol: 'circle',
            data: this.scores,
            animationDuration
          },
          {
            name: '评论数',
            type: 'line',
            smooth: 0,
            // sampling: 'average',
            lineStyle: {
              // color: '#c14089',
              width: '2',
              // opacity: '0.8'
            },
            itemStyle: {
              color: '#c14089'
            },
            symbolSize: 0,
            symbol: 'circle',
            data: this.reviews,
            animationDuration
          }
        ]
      })
    },
    updateChart(){
      this.chart1.setOption({
        series: [{data: this.seriesData}, {data: this.sellers}, {data: this.ranks}]
      })

      this.chart2.setOption({
        series: [{data: this.scores}, {data: this.reviews}]
      })
    },
    getChartData(data, flag) {
      getBuyCartData(data).then( res => {
        this.initData(res.data)
        if(flag == 1){
          this.initChart()
        }else{
          this.updateChart()
        }
      })
    },
    getUpdateData: function(data){
      // console.log(this.chart1, this.chart2)
      this.updateChart()
    },
    initData(chartdata) {
      let that = this
      const xAxisData = 2880
      const startTime = 0 
    
      let xData = [] //X轴数据
      let data = []  //购物车数据
      let seller = [] //买家数数据
      let rank = [] //排名数据
      let score =  [] // 评分数据
      let review = [] //评论数据
      
      let dataObj = chartdata.hstory
      let minX = Object.keys(dataObj)[0]
      let maxX = chartdata.lastIndex
      let lastObj = {}  //记录最后一个点的变量
      
      for(var i=startTime; i< xAxisData; i++){
        let xAxis
        if(i >= 1440){
          xAxis = '+' + twoDigit(parseInt((i-1440)*1/60)) + ':' + twoDigit((i-1440)*1%60)
        }else{
          xAxis = '-' + twoDigit(parseInt(i*1/60)) + ':' + twoDigit(i*1%60)
        }
        xData.push(xAxis)
        
        if(i >= minX && i <= maxX){
          if(dataObj[i]!= undefined){
            lastObj = dataObj[i]
            if(lastObj.DivFlag.indexOf('SellerId') != -1 || i == minX){
              var dataType = {
                name: lastObj.CurBuyboxSeller,
                value: [xAxis, lastObj.SoldPrice],
                symbolSize: 6,
                itemStyle: {
                  color: colorArr[5]
                },
                label: {
                  show: true,
                  color: '#fa3232',
                  fontWeight: 700,
                  formatter: function(params){
                    return that.chartdata[params.value[0]].CurBuyboxSeller + '  ' +  params.value[1]
                  }
                }
              }
            }else{
              var dataType = {
                name: lastObj.CurBuyboxSeller,
                value: [xAxis, lastObj.SoldPrice]
              }
            }
          }else{
            var dataType = {
              name: lastObj.CurBuyboxSeller,
              value: [xAxis, lastObj.SoldPrice]
            }
          }
          this.chartdata[xAxis] = lastObj  //存存所有数据对象

          

          data.push(dataType)
          seller.push([xAxis, lastObj.sellersPoint])
          // rank.push([xAxis, lastObj.rankPoint])
          if(lastObj.BigCatRank == '2147483647'){
            rank.push([xAxis, 0])
          }else{
            rank.push([xAxis, lastObj.rankPoint])
          }
          score.push([xAxis, lastObj.Score])
          review.push([xAxis, lastObj.Reviews])
        }
      }
      this.xAxisData = xData
      this.seriesData = data
      this.sellers = seller
      this.ranks = rank
      this.scores = score
      this.reviews = review

    }
  }
}
</script>
