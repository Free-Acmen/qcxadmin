<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name: {{ name }}</div> -->
    <component :is="currentRole"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import userDashboard from './user'

export default {
  name: 'Dashboard',
  data(){
    return {
      currentRole: 'adminDashboard'
    }
  },
  created() {
    if (!this.roles.includes('admin')) {
      this.currentRole = 'userDashboard'
    }
  },
  computed: {
    ...mapGetters(['roles'])
  },
  components: { adminDashboard, userDashboard },
}
</script>

<style lang="scss">
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.dashboard-container {
  .main{
  	section{
  		margin-top: 20px;
  	}
  }
}
.statisticsindexlist{
	.dashboardindex{
		padding: 0;
		.content{
			padding-bottom: 0;
		}
		.footer{
			position: static;
			width: 100%;
			border: 1px solid #eee;
			border-top: none;
		}
	}
}

</style>
