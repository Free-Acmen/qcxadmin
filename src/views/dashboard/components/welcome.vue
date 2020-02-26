<template>
	<header class="welcome">
		<el-row>
		  <el-col :span="12">欢迎<span class="name">{{name}}</span>您的到来~</el-col>
		  <!-- <el-col :span="12"><el-button type="primary">充值</el-button></el-col> -->
		</el-row>
	</header>
</template>

<script>
export default {
  name: 'welcome',
  props:['name'],
  methods: {

  }
}
</script>

<style lang="scss">
	.welcome{
		height: 40px;
    	line-height: 40px;
    	box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    	padding: 0 20px;
    	.name{
    		color: #409EFF;
    		padding: 0 5px;
    	}
		button{
			float: right;
			margin: 4px 0;
		}
	}
</style>