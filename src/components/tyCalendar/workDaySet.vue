<template>
  <div class="set-workday">
    <div class="calendar-box" v-for="(item, index) in dateData" :key="index">
      <ty-calendar @dayclick="dayClick" :year="year" :days="item" :month="index + 1"></ty-calendar>
    </div>
  </div>
</template>

<script>
import tyCalendar from './tyCalendar'

import { listWorkDays,  setWorkDay } from '@/api/jobdiary/setworkday'

export default {
  data(){
    return{
      year: new Date().getFullYear(),
      dateData: []
    }
  },
  components: {
    tyCalendar: tyCalendar
  },
  mounted() {
    this.getDateData()
  },
  methods: {
    getDateData: function(){
      listWorkDays(JSON.stringify(this.year)).then( res => {
        this.dateData = res.data
      })
    },
    dayClick: function(dayObj, month){
      if(dayObj){
        this.dateData[month - 1].forEach((item, index) => {
          if(item && item.Day == dayObj.Day){
            this.dateData[month - 1][index].IsWorkDay = !dayObj.IsWorkDay
          }
        })
      }
    },
    setWorkDayHandle: function(){
      setWorkDay(this.dateData).then( res => {
        this.getDateData()
        this.CFunc.showMsg('工作日设定成功')
      })
    }
  }
}
</script>

<style lang="scss">
  .set-workday{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .calendar-box{
      margin: 10px 0;
    }
  }
</style>
