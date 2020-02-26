<template>
  <div class="user-container">
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
    	<!--<section class="list">
    		<list ref='list'></list>
    	</section>-->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import welcome from '../components/welcome'
import statistics from '../components/statistics'
import list  from '../components/list'
// import statisticsAsin from '../../statistics/asinaction/index'

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
		// statisticsAsin: statisticsAsin
  },
}
</script>

<style scoped lang="scss">
.app-main{
	background: #eee;
}
</style>
