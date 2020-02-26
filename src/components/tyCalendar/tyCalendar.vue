<template>
  <div class="ty-calendar">
    <div class="calendatr-head">
      <span class="blue">{{year}}</span>
      <span>年</span>
      <span class="blue">{{month}}</span>
      <span>月</span>
    </div>
    <div class="calendatr-week">
      <span  v-for="item in weeks" :key="item">{{item}}</span>      
    </div>
    <div class="calendatr-body">
      <div @click="dayClick(item)" :title="item && item.SubText" :class="{'hasDate': item, 'holiday': item && !item.IsWorkDay, 'today': item && item.Today}" v-for="(item, index) in days" :key="index">
        <!-- <div class="day-box" v-if="item.Day"> -->
          <em v-if="item && !item.IsWorkDay">休</em>
          <span v-if="item" class="day">{{item.DayIndex}}</span>
          <span v-if="item" class="info">&nbsp;{{item.Text}}&nbsp;</span>
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      dayOfWeek: '',
      weeks: [ '日', '一', '二', '三', '四', '五', '六'],
      dayList: []
    }
  },
  props: ['year', 'month', 'days'],
  computed: {},
  mounted() {
    // this.dayListFunc()
  },
  methods: {
    // dayListFunc(){
    //   let firstDay = new Date(`${this.year}-${this.month}-1`)
    //   let dayOfWeek = firstDay.getDay()
    //   //计算出本月第1天距离第一个有几格,需要用上月时间补上
    //   if ( 1 > dayOfWeek) { 
    //       dayOfWeek = 7 - 1 + dayOfWeek
    //   } else if (1 < dayOfWeek) {
    //       dayOfWeek = dayOfWeek - 1
    //   }
    //   this.dayOfWeek = dayOfWeek
    //   let startDate = new Date(firstDay)
    //   startDate.setDate(firstDay.getDate() - dayOfWeek)
    //   let item, tempArr = [], tempItem, info
    //   let monthDays = 30 + dayOfWeek
    //   if([1, 3, 5, 7, 8, 10, 12].indexOf(this.month) != -1){
    //     monthDays += 1 
    //   }
    //   if(this.month == 2){
    //     monthDays = 28 + dayOfWeek
    //   }

    //   for(let i = 0; i< monthDays; i++){
    //     if( i >= dayOfWeek){
    //       item = new Date(startDate)
    //       item.setDate(startDate.getDate() + i)
    //       // let date = `${item.getFullYear()}-${item.getMonth()+1}-${item.getDate()}`
    //       let date = `${item.getDate()}`
    //       info = '工作日'
    //       if(item.getDay() == 6 || item.getDay() == 0){
    //         info = '休假'
    //       }
    //       tempItem = {
    //         date: date,
    //         info: info
    //       }
    //       tempArr.push(tempItem)
    //     }else{
    //       tempArr.push({})
    //     }
    //   }
    //   this.dayList = tempArr
    // },
    dayClick: function(item){
      this.$emit('dayclick', item, this.month)
    }
  },
}
</script>

<style scoped lang="scss">
  .ty-calendar{
    display: flex;
    flex-direction: column;
    width: 410px;
    height:368px;
    border: 2px solid #94c9ff;
    padding: 10px;
    font-size: 14px;
    .calendatr-head{
      display: flex;
      color: #666;
      padding: 0 0 8px;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid #57abff;
      span{
        min-width: 40px;
        text-align: center;
      }
      .blue{
        color: #94c9ff;
        font-size: 18px;
      }
    }
    .calendatr-week{
      padding: 8px 0;
      display: flex;
      border-bottom: 1px solid #c8cacc;
      span{
        width: 55px;
        font-size: 14px;
        text-align: center;
      }
    }
    .calendatr-body{
      display: flex;
      flex-wrap: wrap;
      height: 287px;
      div{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        width: 55px;
        text-align: center;
        cursor: pointer;
        // border: 1px solid transparent;
        border-bottom: 1px solid #c8cacc;
        position: relative;
        em{
          position: absolute;
          top: 0;
          left: 0;
          background: #969799;
          font-style: normal;
          width: 15px;
          height: 15px;
          color: #fff;
          line-height: 14px;
        }
        span{
          &.day{
            font-size: 18px;
            color: #000;
            margin-top: 12%;
          }
          &.info{
            font-size: 12px;
            margin-top: 3px;
            color: #999;
            overflow: hidden;
            white-space: nowrap;
            width: 100%;
            text-overflow: ellipsis;
          }
        }
        &.hasDate.holiday{
          background-color:#f2f1f1;
          span{
            // color: #fff;
          }
        }
        &.hasDate:hover{
          background-color:#94c9ff;
          // border: 1px solid #409eff;
          span{
            color: #fff;
          }
        }
        
        &.hasDate.today{
          background-color:#fb0;
          span{
            color: #fff;
          }
        }
      }
      
    }
  }
</style>
