<template>
  <div class="app-container fixed-footer">
    <header class="header">
      <span>菜单管理</span>
       <el-button style="float: right"  type="primary" @click="ModuleHandle(-1,'',tableData)">新增菜单</el-button> 
    </header>
    <section class="content">
    	<el-table ref='listTable'  :data="tableData"  row-key="id" default-expand-all highlight-current-row :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
		    <el-table-column
		      prop="text"
		      label="菜单名称"
		      >
		    </el-table-column>
		    <el-table-column
		      prop="description"
		      label="菜单别称"
		      >
		    </el-table-column>
		    <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="text" @click="ModuleHandle(scope.row, scope.$index, tableData)">编辑</el-button>
            <el-button type="text" @click="Del(scope.row, scope.$index)">删除</el-button>
          </template>
        </el-table-column> 
		  </el-table>
    </section>
    <menu-model ref='module' @formdata="ModuleDataHandle"></menu-model>

    <el-tooltip placement="top" content="返回顶部">
      <back-to-top :visibility-height="300" :back-position="50" />
    </el-tooltip>
  </div>
</template>

<script>
import backToTop from '@/components/BackToTop'
import menuModel from './components/menuModel'
import { getmenulist, Addmenu, Delmenu, Updatemenu } from '@/api/sysconfig'

export default {
  data() {
    return {
      title: '菜单管理',  
      tableData: []
    }
  },
  mounted() {
  	this.getlist()
  },
  components: {
    menuModel: menuModel,
    backToTop: backToTop
  },
  methods: {
    //获取菜单表格
    getlist:function(){
    	var data = {}
    	getmenulist(data).then(res => {
				this.tableData = res.data
      })
    },
    //打开弹窗
    ModuleHandle: function(data, index, list){
      var opt = {}
      if(data == -1){
        this.$refs.module.show(false, opt, list)
      }else{
        opt.title = this.title + '编辑'
        opt.backdata = {
          type: 'edit',
          index: index
        }
        this.$refs.module.show(data, opt, list)
      }
    },
    //弹窗提交
    ModuleDataHandle: function(formdata, backdata){
      if(backdata.type == 'edit'){
        this.Update(formdata)
      }else{
        this.Add(formdata)
      }
    },
    //新增菜单
    Add: function(formdata){
    	if(formdata.IsFirst == '1'){
    		var data = {
    			ParentId:0,
    			Name:formdata.text,
    			Description:formdata.description,
    		}
    	}else if(formdata.IsFirst == '2'){
    		var data = {
    			ParentId:formdata.parentId[formdata.parentId.length-1],
    			Name:formdata.text,
    			Description:formdata.description,
    		}
    	}
    	Addmenu(data).then(res => {
    		this.CFunc.showMsg('添加成功!')
        this.getlist()
    	})
    },
    //更新菜单
    Update: function(formdata){
    	console.log(formdata)
//  	return
      if(formdata.IsFirst == '1'){
    		var data = {
    			Id:formdata.id,
    			ParentId:0,
    			Name:formdata.text,
    			Description:formdata.description,
    		}
    	}else if(formdata.IsFirst == '2'){
    		var data = {
    			Id:formdata.id,
    			ParentId:formdata.parentId,
    			Name:formdata.text,
    			Description:formdata.description,
    		}
    	}
    	Updatemenu(data).then(res => {
    		this.CFunc.showMsg('更新成功!')
        this.getlist()
    	})      
    },
    //删除菜单
    Del: function(rowData,index){
    	var Id = JSON.stringify(rowData.id)
    	Delmenu(Id).then(res => {
    		this.CFunc.showMsg('删除成功!')
        this.getlist()
    	})
    },
  }
}
</script>

<style lang="scss">

</style>

