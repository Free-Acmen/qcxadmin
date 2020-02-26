<template>
	<div class="list">
		<el-row :gutter="20">
		  <el-col :span="12">
		  	<div class="grid-content">
		  		<el-table
			      :data="tasklist"
			      style="width: 100%">
			      <el-table-column
			        prop="name"
			        label="任务名称" >
			      </el-table-column>
			      <el-table-column
			        prop="time"
			        label="创建时间" width='160'>
			      </el-table-column>
			      <el-table-column
			        prop="price"
			        label="价格" width='100'>
			      </el-table-column>
			      <el-table-column
			        prop="status"
			        label="状态" width='100'>
			        <template slot-scope='scope'>
			        	<el-tag v-if='scope.row.status == 1' type="success">成&nbsp;&nbsp;&nbsp;&nbsp;功</el-tag>
						<el-tag v-if='scope.row.status == 2' type="info">完&nbsp;&nbsp;&nbsp;&nbsp;成</el-tag>
						<el-tag v-if='scope.row.status == 3' type="primary">进行中</el-tag>
						<el-tag v-if='scope.row.status == 4' type="danger">失&nbsp;&nbsp;&nbsp;&nbsp;败</el-tag>
			        </template>
			      </el-table-column>
			    </el-table>
		  	</div>
		  </el-col>
		  <el-col :span="6">
		  	<div class="grid-content bg-purple">
		  		<el-table
			      :data="noticelist"
			      style="width: 100%">
			      <el-table-column
			        prop="name"
			        label="通知" >
			      </el-table-column>
			      <el-table-column
			        prop="time"
			        label="创建时间" width='160'>
			      </el-table-column>
			    </el-table>
		  	</div>
		  </el-col>
		  <el-col :span="6">
		  	<div class="grid-content sliderbox">
		  		<div class="block">
				    <el-carousel height="165px">
				      <el-carousel-item v-for="item in slidelist" :key="item">
				        <img :src='item' lazy/>
				      </el-carousel-item>
				    </el-carousel>
				</div>
				<div class="block">
				    <el-carousel height="165px">
				      <el-carousel-item v-for="item in slidelist1" :key="item">
				        <img :src='item' lazy/>
				      </el-carousel-item>
				    </el-carousel>
				</div>
				<div class="block">
				    <el-carousel height="165px">
				      <el-carousel-item v-for="item in slidelist2" :key="item">
				        <img :src='item' lazy/>
				      </el-carousel-item>
				    </el-carousel>
				</div>
		  	</div>
		  </el-col>
		</el-row>
	</div>
	 
</template>

<script>
	export default {
	  name: 'list',
	  data() {
	    return {
			tasklist:[
				{name:'1asdfasdfa54sdfa1sdf1a65s7f',time:'2019-06-13 18:36',price:'￥1200',status:1},
				{name:'任务2',time:'2019-06-13 18:36',price:'￥1200',status:2},
				{name:'任务3',time:'2019-06-13 18:36',price:'￥1200',status:3},
				{name:'任务4',time:'2019-06-13 18:36',price:'￥1200',status:4},
				{name:'任务5',time:'2019-06-13 18:36',price:'￥1200',status:1},
				{name:'任务1',time:'2019-06-13 18:36',price:'￥1200',status:2},
				{name:'任务2',time:'2019-06-13 18:36',price:'￥1200',status:3},
				{name:'任务3',time:'2019-06-13 18:36',price:'￥1200',status:4},
				{name:'任务4',time:'2019-06-13 18:36',price:'￥1200',status:1},
				{name:'任务5',time:'2019-06-13 18:36',price:'￥1200',status:2},
			],
			noticelist:[
				{name:'1asdfasdfa54sdfa1sdf1a65s7f',time:'2019-06-13 18:36'},
				{name:'通知1',time:'2019-06-13 18:36'},
				{name:'通知1',time:'2019-06-13 18:36'},
				{name:'通知1',time:'2019-06-13 18:36'},
				{name:'通知1',time:'2019-06-13 18:36'},
				{name:'通知1',time:'2019-06-13 18:36'},
				{name:'通知1',time:'2019-06-13 18:36'},
				{name:'通知1',time:'2019-06-13 18:36'},
				{name:'通知1',time:'2019-06-13 18:36'},
				{name:'通知1',time:'2019-06-13 18:36'},
			],
			slidelist:[
				 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
		          'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
			],
			slidelist1:[
		          'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
		          'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
			],
			slidelist2:[
		          'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
		          'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
		          'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
			],
	    }
	  },
	  methods: {
		
	  }
	}
</script>

<style lang="scss">
	.list{
		.el-col{
			.grid-content{
				box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
				.block{
					margin-bottom: 20px;
					img{
						width: 100%;
						height: 100%;
					}
				}
				.block:last-child{
					margin-bottom: 0;
				}
			}
			.sliderbox{
				box-shadow: none;
			}
			
		}
		
		.el-table .cell{
			line-height: 40px!important;
			font-size: 14px;
			text-overflow: ellipsis;
	    	overflow: hidden;
	    	white-space: nowrap;
		}
		 .el-carousel__item h3 {
	    color: #475669;
	    font-size: 14px;
	    opacity: 0.75;
	    line-height: 150px;
	    margin: 0;
	  }
	
	  .el-carousel__item:nth-child(2n) {
	     background-color: #99a9bf;
	  }
	  
	  .el-carousel__item:nth-child(2n+1) {
	     background-color: #d3dce6;
	  }
		
			
	}
	
	
</style>