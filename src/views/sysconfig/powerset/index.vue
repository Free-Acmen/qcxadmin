<template>
  <div class="app-container">  	
  	<header class="header">
      <span>权限管理</span>
  	 	<el-button type="primary" style="float: right" @click='ModuleHandle'>新增权限</el-button>
  	</header>
  	<el-main v-if='tabslist.length>0' class='powerclass'>
	  	<el-tabs v-model="activeName" tab-position="left" type="card" editable  @edit="handleTabsEdit" @tab-click='handletabschange'>
		    <el-tab-pane v-for='item in tabslist' :key='item.Id' :name='item.Id' :label="item.Name">
		    </el-tab-pane>
		  </el-tabs>
		  <div class="treebox">
		  		<div style="padding: 10px 100px 10px 200px;">
		    		<el-tree
		    			ref="tree"
						  :data="tabscontent"
						  show-checkbox
						  node-key="id"
						  default-expand-all
						  :default-checked-keys="ShowChecked"
						  highlight-current
						  :props="defaultProps">
						</el-tree>	  
		    	</div>
		    	<el-button type="primary" style='float: right;margin-top: -40px;margin-right: 10px;' @click='SavePower(powerRoleId)'>保存权限</el-button>
		  </div>
		</el-main>
		<div class="emptypower"  v-else>暂无相关数据~</div>
		<role-creat ref='module' @formdata="ModuleDataHandle"></role-creat>
  </div>
</template>

<script>
import { addrole, GetAuthByRole, SavePower, Deletetrole, getmenulist } from '@/api/sysconfig'
import roleCreat from './components/roleCreatM'
export default {
	components: {
		roleCreat: roleCreat,
  },
  data() {
    return {
    	activeName:'',
			tabslist:[
				{name:'1111'},
				{name:'2222'},
			],
			showright:{
				data:[]
			},
			tabscontent:[],
			multipleSelection: [],
			defaultProps:{
					children: 'children',
          label: 'text'
			},
			checkkey:[],
			checkall:[],
			roleId:'',
			ShowChecked:[],
			powerRoleId:''
    }
	},
	computed: {

  },
  created() {
  },
  mounted() {
		this.getlist(0)
  },
  methods: {
  	//获取菜单表格
    getlist:function(index){
    	var data = {}
    	//获取权限菜单
    	getmenulist(data).then(res => {
				this.tabscontent = res.data
      })
    	//获取角色列表
    	GetAuthByRole(data).then(res => {
    		this.activeName = res.data[0].Id    		
    		for(var i=0;i<res.data.length;i++){
    			if(res.data[i].ShowChecked){
    				res.data[i].ShowChecked = res.data[i].ShowChecked.split(',')
	    		}
    		}  
    		this.tabslist = res.data
    		this.ShowChecked = res.data[index].ShowChecked
    		this.powerRoleId = res.data[index].Id
    	})
    },
    ModuleHandle:function(){
    	var opt = {}
    	this.$refs.module.show(false, opt)
    },
    ModuleDataHandle: function(formdata, backdata){
			addrole(formdata).then(res => {
				this.CFunc.showMsg('添加角色成功~')
				this.getlist(0)
			})
    },
    //保存权限
    SavePower:function(Id){    
    	this.checkkey = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
    	this.checkall = this.$refs.tree.getCheckedKeys()
    	
    	
    	var data = {
    		auth:this.checkkey,
    		ShowChecked:this.checkall.join(','),
    		roleId:Id
    	}
    	SavePower(data).then(res => {
    		this.CFunc.showMsg('设置权限成功~')
    	})
    },
	  //删除角色
	  handleTabsEdit:function(targetName, action){	  	
	  	this.$confirm('此操作将永久删除该角色权限, 是否继续?', '提示', {
	      confirmButtonText: '确定',
	      cancelButtonText: '取消',
	      type: 'warning'
	    }).then(() => {
	      this.$message({
//	        type: 'success',
//	        message: '删除成功!'
	      });
	      let Id = JSON.stringify(targetName)
	  	
		  	if (action === 'remove') {
					Deletetrole(Id).then(res => {
		    		this.CFunc.showMsg('删除角色成功~')
		    		this.getlist(0)
		    	})
		   }
	    }).catch(() => {
	      this.$message({
	        type: 'info',
	        message: '已取消删除'
	      });          
	    });
	  },
	  handletabschange:function(tab,event){
	  	var data = {}
	  	this.tabslist = []
	  	GetAuthByRole(data).then(res => {
//  		this.activeName = res.data[0].Id    		
    		for(var i=0;i<res.data.length;i++){
    			if(res.data[i].ShowChecked){
    				res.data[i].ShowChecked = res.data[i].ShowChecked.split(',')
	    		}
    		}  
    		this.tabslist = _.cloneDeep(res.data)
    		this.ShowChecked = res.data[tab.index].ShowChecked
    		this.powerRoleId = res.data[tab.index].Id
    	})
	  }
  }
}
</script>
<style lang="scss">
	.el-header{
		height: 32px!important;
		margin: 0;
		padding: 0;
	}
	.el-main{
		margin: 10px 0 0 0;
		padding: 0;
	}
	.el-tabs--left.el-tabs--card .el-tabs__nav{
		background: #fff;
	}
	.el-tabs--left .el-tabs__header.is-left{
		margin-right: 0;
		border-radius: 4px 0 0px 0px;
		min-width: 160px;
	}
	.el-tabs--left.el-tabs--card .el-tabs__item.is-left{
		text-align: center;
	}
	.el-tabs--left .el-tabs__content{
		border: 1px solid #eee;
		min-height: 162px;
		background: #fff;
		padding: 20px;
	}
	.emptypower{
		text-align: center;
    line-height: 200px;
    color: #999;
	}
	.el-tabs__new-tab{
		display: none;
	}
	
	.powerclass{
		.el-tabs{
			float:left;
			width:161px;
			.el-tabs__content{
				display: none;
			}
		}
		.treebox{
			margin-left: 160px;
	    background: #fff;
	    border: 1px solid #eee;
		}
	}
</style>