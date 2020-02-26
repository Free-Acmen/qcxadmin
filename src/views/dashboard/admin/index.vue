<template>
  <div class="admin-container">
  	<!--欢迎语-->
    <welcome ref='welcome' :name='userInfo.RealName'></welcome>
    <div class="main">
    	<!--统计面板-->
    	<section class="statistics">
    		<statistics ref='statistics'></statistics>
    	</section>
    	<!--列表板块-->
    	<!-- <section class="statisticsindexlist">
    		<statistics-asin ref='list'></statistics-asin>
    	</section> -->

      <!-- <section>
        <el-row>
          <el-col :span="24">
            <follow-up-chart></follow-up-chart>
          </el-col>
        </el-row>
      </section>

      <section>
        <el-row>
          <el-col :span="24">
            <buy-cart-chart></buy-cart-chart>
          </el-col>
        </el-row>
      </section> -->

      <!-- <section>
        <el-row>
          <el-col :span="24">
            <mix-chart></mix-chart>
          </el-col>
        </el-row>
      </section> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import welcome from '../components/welcome'
import statistics from '../components/statistics'
import list  from '../components/list'
// import statisticsAsin from '../../statistics/asinaction/index'

import mixChart from '@/components/Charts/mixChart'
// import followUpChart from '@/components/Charts/FollowUpChart'
// import buyCartChart from '@/components/Charts/BuyCartChart'


export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  components: {
    welcome: welcome,
    statistics: statistics,
    list: list,
    mixChart: mixChart,
    // statisticsAsin: statisticsAsin
    // followUpChart: followUpChart,
    // buyCartChart: buyCartChart
  },
}
</script>

<style lang="scss">

</style>
