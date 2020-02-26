<template>
	<div class="statistics">
		<el-row :gutter="20">			
		  <el-col :span="4" v-for="(item, index) in users" :key="index">
		  	<div class="grid-content">
		  		<span><strong>{{item.Count}}</strong></span>
		  		<span>{{item.Status}}</span>
		  	</div>
		  </el-col>
		</el-row>
	</div>
</template>

<script>
import { countUser } from '@/api/dashboard'

export default {
  name: 'statistics',
  data() {
    return {
      users: [],
      schools:[],
    }
  },
  mounted() {
    countUser().then( res => {
      this.users = res.data.s
    })
  },
  methods: {
	
  }
}
</script>

<style lang="scss">
.statistics{
	.el-col{
		.grid-content{
			min-height: 160px;
			background: #fff;
			box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
			border-radius: 4px;
			text-align: center;			
			position: relative;
			span{
				font-size: 16px;
				color: #666;
				position: absolute;
				line-height: auto;
				top: 10px;
				left: 10px;
				strong{
					cursor: context-menu;
				}
				strong{
					color: lightsalmon;
					cursor: pointer;
				}
				// strong:last-child{
				// 	color: gray;
				// 	font-size: 22px;
				// 	font-weight: normal;
				// }
			}
			span:first-child{
				position: initial;
				font-size: 30px;
				display: block;
				padding-top: 60px;
			}
			span:last-child{
				color: lightseagreen;
			}
		}	
		.Ipcount{
			span:first-child{
				line-height: 40px !important;
    			padding-top: 40px;
    			font-size: 22px;
			}
		}
		.tasktotal {
			box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
			border-radius: 4px;
			.el-col:first-child{
				border-right: 1px solid #eee;
			}
			.grid-content{
				box-shadow: none;
			}
		}	
	}
}
</style>