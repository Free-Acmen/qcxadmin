<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

import { getFllowUpData } from '@/api/extendserv'
import { twoDigit, isToday } from '@/utils/commonFunc'

require('echarts/theme/macarons') // echarts theme
// import { debounce } from '@/utils'

const animationDuration = 2000

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '500px'
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
    },
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      // chart: null,
      timer: null,
      legendData: [],
      legendSeled: {},
      xAxisData: [],
      seriesData: [],
      axisValue: ''
    }
  },
  mounted() {
    this.chart = echarts.init(this.$el, 'macarons')
    this.getChartData(this.id, 1)
    this.timer = setInterval(this.getChartData.bind(this, this.id, 2), 60*1000)

    this.chart.getZr().on('click', () => { //全区域图表点击事件
      this.$emit('echartClick', this.axisValue)
    })
  },
  beforeDestroy() {
    if(this.timer){
      clearInterval(this.timer)
      this.timer = null
    }

    if (this.chart) {
      this.chart.dispose()
      this.chart = null
    }
  },
  methods: {
    initChart() {
      let that = this
      this.chart.setOption({
        legend: {
          type: 'scroll',
          // orient: 'vertical',
          left: 100,
          top: 25,
          // bottom: 20,
          data: this.legendData,
          selected: this.legendSeled
        },
        title: {
          text: this.asin + '跟卖图表'
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(50,50,50,.85)',
          formatter: val => {
            that.axisValue = val[0].axisValue
            let html = val[0].axisValue + '<br> '
            for(var i=0, len = val.length; i< len; i++){
              let param = val[i]
              html += param.seriesName + ' : ' + param.value[1] + '<br>'
            }
            return html
          },
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'cross' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: '12%',
          left: '2%',
          right: '5%',
          bottom: '10%',
          containLabel: true
        },
        // calculable: true,
        xAxis: [{
          type: 'category',
          name: '时间轴',
          data: this.xAxisData,
          axisTick: {
            show: false,
            alignWithLabel: true
          },
          axisLabel : {//坐标轴刻度标签的相关设置。
            interval: 29,
            rotate:"-40"
          }
        }],
        yAxis: [{
          type: 'value',
          name: '跟卖价格',
          axisTick: {
            show: false
          }
        }],
        dataZoom: [
          {
            show: true,
            realtime: true,
            // height: 30,
            // xAxisIndex: [0],
            // bottom: 0,
            start: 0,
            end: 100,
            // handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
            // handleSize: '110%',
            // handleStyle: {
            //   color: '#d3dee5'
            // },
            // textStyle: {color: '#fff' },
            // borderColor: '#90979c'
          },
          {
            type: 'inside',
            // show: true,
            realtime: true,
            // height: 15,
            start: 1,
            end: 35
          }
        ],
        series: this.seriesData
      })
    },
    updateChart(){
      let curLegendSeled = this.chart._model.option.legend[0].selected
      this.chart.setOption({
        legend: {
          data: this.legendData,
          selected: Object.assign(this.legendSeled, curLegendSeled)
        },
        xAxis: [{
          data: this.xAxisData,
        }],
        series: this.seriesData
      })
    },
    getChartData(id, flag) {
      getFllowUpData(id).then( res => {
        // console.log(res)
        this.initData([])
        if(flag == 1){
          this.initChart()
        }else{
          this.updateChart()
        }

      })
    },
    initData(chartdata) {
      const myDate = new Date()
      const hours = myDate.getHours()   
      const minutes = myDate.getMinutes()  
      const xAxisData = hours * 60 + minutes 
      const startTime = xAxisData - 24*60
      console.log(startTime)

      let xData = []
      let data1 = []
      let data2 = []
      let data3 = []
      // let data4 = []
      // let data5 = []
      // let data6 = []
      // let data7 = []
      // let data8 = []
      // let data9 = []

      // for(var i=0; i< xAxisData; i++){
      //   xData.push( parseInt(i*1/60) + ':' + i*1%60)

      //   data1.push(Math.random() > 0.5 ? Math.floor(Math.random()*9) + 1 : "null")
      //   // data2.push(Math.random() > 0.5 ? Math.floor(Math.random()*9) + 1 : "null")
      //   // data3.push(Math.random() > 0.5 ? Math.floor(Math.random()*9) + 1 : "null")
      //   // data4.push(Math.random() > 0.5 ? Math.floor(Math.random()*9) + 1 : "null")
      //   // data5.push(Math.random() > 0.5 ? Math.floor(Math.random()*9) + 1 : "null")
      //   // data6.push(Math.random() > 0.5 ? Math.floor(Math.random()*9) + 1 : "null")
      //   // data7.push(Math.random() > 0.5 ? Math.floor(Math.random()*9) + 1 : "null")
      //   // data8.push(Math.random() > 0.5 ? Math.floor(Math.random()*9) + 1 : "null")
      //   // data9.push(Math.random() > 0.5 ? Math.floor(Math.random()*9) + 1 : "null")
      // }

      for(var i=startTime; i< xAxisData; i++){
        let xAxis
        if(i < 0){
          if(60 + i*1%60 == 60){
            xAxis = twoDigit(24 + parseInt(i*1/60)) + ':00'
          }else{
            xAxis = twoDigit(23 + parseInt(i*1/60)) + ':' + twoDigit(60 + i*1%60)
          }
        }else{
          xAxis = twoDigit(parseInt(i*1/60)) + ':' + twoDigit(i*1%60)
        }
        xData.push(xAxis)
        let arr = [xAxis, Math.random() > 0.5 ? Math.floor(Math.random()*9) + 1 : "null"]
        if(-500 <= i && i <= 120){
          data1.push([xAxis, 8])
        }
        if(i == 200){
          data1.push([xAxis, 'null'])
        }
        if(300 <= i && i <= 800){
          data1.push([xAxis, 6])
        }

        if(20 <= i && i <= 500){
          data2.push([xAxis, 9])
        }
        if(i == 600){
          data2.push([xAxis, 'null'])
        }
        if(800 <= i && i <= 1440){
          data2.push([xAxis, 3])
        }

        if(20 <= i && i <= 1440){
          data3.push([xAxis, 7])
        }

        // Math.random() > 0.5 && data4.push(arr)
        // Math.random() > 0.5 && data5.push(arr)
        // Math.random() > 0.5 && data6.push(arr)
        // Math.random() > 0.5 && data7.push(arr)
        // Math.random() > 0.5 && data8.push(arr)
        // Math.random() > 0.5 && data9.push(arr)
      }

      // console.log(data1, data2, data3)

      // chartdata = [{name: '跟卖1号',data: data1}, {name: '跟卖2号',data: data2}, {name: '跟卖3号',data: data3}, {name: '跟卖4号',data: data4}, {name: '跟卖5号',data: data5}, {name: '跟卖6号',data: data6}, {name: '跟卖7号',data: data7}, {name: '跟卖8号',data: data8}, {name: '跟卖9号',data: data9}] 
      
      chartdata = [{name: '跟卖1号',data: data1}, {name: '跟卖2号',data: data2}, {name: '跟卖3号',data: data3}] 

      // console.log(JSON.stringify(chartdata))

      this.xAxisData = xData
      this.seriesData = []
      this.legendData = []
      this.legendSeled = {}


      chartdata.forEach( (item, index) => {
        let series = {
          name: item.name,
          type: 'line',
          showSymbol: false,
          symbolSize: 5,
          symbol: 'circle',
          itemStyle: {
            normal: {
              label: {
                show: true,
                formatter(p) {
                  return p.value > 0 ? p.value : ''
                }
              }
            }
          },
          data: item.data,
          animationDuration
        }
        this.seriesData.push(series)
        this.legendData.push(item.name)
        if( index == 0){
          this.legendSeled[item.name] = true
        }else{
          this.legendSeled[item.name] = false
        }
      })
    }
  }
}
</script>
