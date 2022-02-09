<template>
  <div class="app-container fixed-footer">
    <header class="header">
      <span>用户管理</span>
      <svg-icon @click='refresh' :class-name="refreshclass" icon-class='refresh'/>
      <el-button v-if="userInfo.IsSuperAdmin" style="float: right"  type="primary" @click="ModuleHandle(-1)">新增用户</el-button> 
    </header>
    <section class="content">
      <!-- <div class="fliter-box">
        <el-row :gutter="20">
          <el-col :span="4">
            <el-input v-model.trim="filter.keyword" @change="GetList(1)" placeholder="用户名/昵称" clearable></el-input>
          </el-col>
        </el-row>
      </div> -->

      <el-table ref='listTable' v-loading="loading" :data="list" @row-click="ListRowHight" highlight-current-row>
        <el-table-column align="center" label="序号" width="50">
          <template slot-scope="scope">
            {{ scope.$index + numb}}
          </template>
        </el-table-column>
        <el-table-column label="用户名">
          <template slot-scope="scope">
            {{scope.row.UserName}}
          </template>
        </el-table-column>  
        <el-table-column label="真实姓名">
          <template slot-scope="scope">
          		{{scope.row.RealName?scope.row.RealName:'无'}}        
          </template>
        </el-table-column> 
        <el-table-column label="手机号码" >
          <template slot-scope="scope">
          		{{scope.row.MobilePhone?scope.row.MobilePhone:'无'}}        
          </template>
        </el-table-column> 
        <el-table-column label="负责区域" >
          <template slot-scope="scope">
            <span v-if="scope.row.RoleId=='ALL'">所有区域</span>
            <span v-else>{{scope.row.RoleName||scope.row.RoleId}}</span>
          </template>
        </el-table-column> 
        
        <el-table-column label="邮箱" >
          <template slot-scope="scope">
          		{{scope.row.Email?scope.row.Email:'无'}}        
          </template>
        </el-table-column> 
        <el-table-column label="性别"  width='80'>
          <template slot-scope="scope">
          		{{scope.row.Gender==0?"男":'女'}}        
          </template>
        </el-table-column>         
        <el-table-column label="管理员" width='80'>
          <template slot-scope="scope">
          		{{scope.row.IsAdmin?'是':'否'}}        
          </template>
        </el-table-column> 
        <el-table-column label="启用" width='80'>
          <template slot-scope="scope">
          		{{scope.row.IsEnabled?'启用':'未启用'}}        
          </template>
        </el-table-column> 
        <el-table-column label="备注">
          <template slot-scope="scope">
          	<div class="ellipsis" :title="scope.row.Description">
          		{{scope.row.Description?scope.row.Description:'无'}}
          	</div>            
          </template>
        </el-table-column>  
         <el-table-column label="操作" width="150">
          <template slot-scope="scope">
          	<el-button type="text" v-if="userInfo.IsSuperAdmin" @click="reSetPassword(scope.row, scope.$index)" >重置密码</el-button>
            <el-button type="text" v-if="userInfo.IsSuperAdmin" @click="ModuleHandle(scope.row, scope.$index)">编辑</el-button>
            <el-button type="text" v-if="userInfo.IsSuperAdmin" @click="Del(scope.row, scope.$index)">删除</el-button>
          </template>
        </el-table-column> 
      </el-table>
    </section>
    <footer class="footer">
      <ty-page ref="tyPage" @pagechange="PageChange"></ty-page>
    </footer>
    <user-model ref='module' @formdata="ModuleDataHandle"></user-model>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import tyPage from '@/components/TyPagination'
import userModel from './components/userModel'
import pageMixin from '@/mixin/tabePageMixin'
import { getList, del, update} from '@/api/commonCrud'
import { addUser } from '@/api/sysconfig'

import { ResettingPassword } from '@/api/sysconfig'


export default {
  data() {
    return {
      title: '用户管理',
      apiPath: 'HYJY/Users',
      getPage: true,
      filter: {
        Status: '管理员'
      }
    }
  },
  mixins: [pageMixin],
  mounted() {
    console.log(this.userInfo)
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  components: {
  	userModel: userModel,
    tyPage: tyPage
  },

  methods: {
  	getList, 
    add: addUser, 
    del, 
    update,
    reSetPassword: function(rowData){
    	let Id = JSON.stringify(rowData.Id)
    	this.$confirm('您确定要重置该账户密码？')
          .then(_ => {			      
			      ResettingPassword(Id).then( res => {
			        this.CFunc.showMsg('重置密码成功，重置的密码未初始密码。')
			      })
          })
          .catch(_ => {});
    }
  }
}
</script>

<style lang="scss">

</style>

