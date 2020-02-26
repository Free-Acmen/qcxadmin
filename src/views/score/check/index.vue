<template>
  <div class="app-container fixed-footer">
    <header class="header">
      <span>用户管理</span>
      <svg-icon @click='refresh' :class-name="refreshclass" icon-class='refresh'/>
      <div style="float: right">
        <el-button type="warning" v-if="item.val !== filter.Status" v-for="(item, index) in tabName" :key="index" @click="allSetStatus(item.name)">批量{{item.name}}</el-button>
        <el-button  type="primary" @click="exportExcel">导出当前数据</el-button> 
      </div>
    </header>
    <section class="content">
      <div class="fliter-box">
        <el-row :gutter="20">
          <el-col :span="3">
            <el-input v-model.trim="filter.UserName" @change="GetList(1)" placeholder="手机号" clearable></el-input>
          </el-col>
          <el-col :span="3">
            <el-input v-model.trim="filter.RealName" @change="GetList(1)" placeholder="姓名" clearable></el-input>
          </el-col>
          <el-col :span="3">
            <el-select v-model="filter.p1id" placeholder="省市" @change="p1idListChange">
              <el-option v-for="item in p1idList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
            <!-- <el-input v-model.trim="filter.p1id" @change="GetList(1)" placeholder="p1id" clearable></el-input> -->
          </el-col>
          <el-col :span="3">
            <el-select v-model="filter.p2id" placeholder="院校" @change="p2idListChange">
              <el-option v-for="item in p2idList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
            <!-- <el-input v-model.trim="filter.p2id" @change="GetList(1)" placeholder="p2id" clearable></el-input> -->
          </el-col>
          <el-col :span="3">
            <el-select v-model="filter.p3id" placeholder="院系" @change="p3idListChange">
              <el-option v-for="item in p3idList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
            <!-- <el-input v-model.trim="filter.p3id" @change="GetList(1)" placeholder="p3id" clearable></el-input> -->
          </el-col>
          <el-col :span="3">
            <el-select v-model="filter.p4id" placeholder="专业" @change="p4idListChange">
              <el-option v-for="item in p4idList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
            <!-- <el-input v-model.trim="filter.p4id" @change="GetList(1)" placeholder="p4id" clearable></el-input> -->
          </el-col>
          <el-col :span="5">
            <el-row>
              <el-col :span="4" style="text-align:center;line-height: 30px;">总分:</el-col>
              <el-col :span="9">
                <tynumbipt tyclass="fliter-range-ipt" :precision='2' :min="0" v-model="filter.TGStart" @change="GetList(1)"></tynumbipt>
                <!-- <el-input-number style="width:100%;" v-model="filter.TGStart" controls-position="right" placeholder="小" @change="GetList(1)" :controls="false" :min="0"></el-input-number> -->
              </el-col>
              <el-col :span="2" style="text-align:center;line-height: 30px;">-</el-col>
              <el-col :span="9">
                <tynumbipt tyclass="fliter-range-ipt" :precision='2' :min="0" v-model="filter.TGEnd" @change="GetList(1)"></tynumbipt>
                <!-- <el-input-number style="width:100%;" v-model="filter.TGEnd" controls-position="right" placeholder="大" @change="GetList(1)" :controls="false" :min="0"></el-input-number> -->
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>

      <el-tabs v-model="filter.Status" @tab-click="handleClick">
          <el-tab-pane v-for='(item,index) in tabName' :label="item.name" :name="item.val" :key='index'></el-tab-pane>
      </el-tabs>

      <el-table ref='listTable' @sort-change="sortChange" @selection-change="handleSelectionChange" v-loading="loading" :data="list" @row-click="ListRowHight" highlight-current-row>
        <el-table-column type="selection" width="35"></el-table-column>
        <el-table-column align="center" label="序号" width="50">
          <template slot-scope="scope">
            {{ scope.$index + numb}}
          </template>
        </el-table-column>
 
        <el-table-column label="姓名" width="100">
          <template slot-scope="scope">
          		{{scope.row.RealName?scope.row.RealName:'无'}}        
          </template>
        </el-table-column>

        <el-table-column label="科目分数明细" min-width="500">
          <template slot-scope="scope">
          	<div style="display: flex;flex-wrap: wrap;"> 
          		<div style="margin-right: 20px;" v-for="(item, index) in JSON.parse(scope.row.InputData)" :key="index">
                <strong>{{item.name}}:</strong>
                <span style="color: #409EFF;">{{item.grade}}</span>
              </div>
          	</div>            
          </template>
        </el-table-column>

        <el-table-column label="总分" sortable="custom" prop="TotalGrade" width="120">
          <template slot-scope="scope">
          	<div> 
              <img v-if="scope.row.MsgStatus" title="已短信通知" class="pic-img" src="@/assets/tips.png" alt="已通知">
              <img v-if="scope.row.Checked" title="已审核" class="pic-img" src="@/assets/examine.png" alt="已审核">
              <span style="color: #67C23A;display:inline-block;min-width: 30px;">{{scope.row.TotalGrade/100}}</span>
              <div style="color: #67C23A;display:inline-block;">
                <el-popover
                  placement="left"
                  title="分数明细截图"
                  width="560"
                  trigger="hover"
                 >
                 <div>
                    <tyimg v-if="scope.row.Image" :src="'//adm.kaoyanxiao.com/dat/Uploads'+ scope.row.Image"></tyimg>
                    <span v-else>未上传分数明细图片</span>
                 </div>
                  <el-button type='text' style="color: #409EFF;" slot="reference"><i class="el-icon-picture" style="font-size: 14px;"></i></el-button>
                </el-popover>
              </div>
          	</div>            
          </template>
        </el-table-column>
        <el-table-column label="手机号" width="120">
          <template slot-scope="scope">
          		{{scope.row.UserName}}        
          </template>
        </el-table-column>
        <el-table-column label="创建时间"  sortable="custom" prop="CreateTime" width="140">
          <template slot-scope="scope">
          	{{scope.row.CreateTime}}        
          </template>
        </el-table-column>
        <el-table-column label="备注">
          <template slot-scope="scope">
          	<div class="ellipsis" :title="scope.row.Remark">
          		{{scope.row.Remark?scope.row.Remark:'无'}}
          	</div>            
          </template>
        </el-table-column>  
         <el-table-column label="操作" width="150">
          <template slot-scope="scope">
          	<!-- <el-button type="text" v-if="userInfo.IsSuperAdmin" @click="reSetPassword(scope.row, scope.$index)" >重置密码</el-button> -->
            <el-button type="text" @click="ModuleHandle(scope.row, scope.$index)">编辑</el-button>

            <el-button type="text" v-if="item.val !== scope.row.Status" v-for="(item, index) in tabName" :key="index" @click="handleCommand({status: item.val, data: scope.row})">{{item.name}}</el-button>

            <!-- <el-dropdown @command="handleCommand" trigger="click">
              <span class="el-dropdown-link" >
                设置<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-if="item.val !== scope.row.Status" :command="{status: item.val, data: scope.row}" v-for="(item, index) in tabName" :key="index">{{item.name}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown> -->
            <!-- <el-button type="text" @click="Del(scope.row, scope.$index)">删除</el-button> -->
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

import { getNextPaths, setStatus, setAllStatus, exportTab } from '@/api/score'

let p1idKey = {}

export default {
  data() {
    return {
      title: '用户分数',
      apiPath: 'HYJY/Users',
      getPage: true,
      tabName: [
        {name: '待核实', val:'待核实'},
        {name: '已核实', val:'已核实'},
        {name: '垃圾箱', val:'垃圾箱'}
      ],
      p1idList:[],
      p2idList:[],
      p3idList:[],
      p4idList:[],
      filter: {
        OrderBy: '',
        Status: '待核实',
        UserName: '',
        RealName:'',
        p1id: '',
        p2id: '',
        p3id: '',
        p4id: '',
        TGStart: '',
        TGEnd: ''
      },
      multipleSelection: [],
      tableKey: [],
    }
  },
  mixins: [pageMixin],
  mounted() {
    // console.log(this.userInfo)
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
  created() {
    getNextPaths(0).then(res => {
      // console.log(res)
      this.p1idList = res.data
      this.p1idList.forEach(item => {
        p1idKey[item.id] = item
      });
    })
  },
  methods: {
  	getList, 
    del, 
    update,
    exportExcel(){
      exportTab(this.filter).then( res => {
        // console.log(res)
        var url = "//adm.kaoyanxiao.com/dat/Uploads/" + res.message
        window.location.href = url
        // window.open(url, '_blank')
      })
    },
    dataLodered: function(){
      if(this.list[0]){
        this.tableKey = JSON.parse(this.list[0].InputData)
      }else{
        this.tableKey = []    
      }
    },
    handleSelectionChange: function(val){
      this.multipleSelection = val;
    },
    allSetStatus: function(status){
      if(this.multipleSelection.length <= 0){
        this.$message({
          type: 'warning',
          message: '请至少选择一项数据！'
        });
        return
      }
      var ids = []
      this.multipleSelection.forEach(item => {
        ids.push(item.Id)
      })

      // console.log(status)
      let mesg = '确认将改批数据全部设置到"' + status + '"中!';
      this.$confirm(mesg, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data = {
            uids: ids.join(','),
            status: status
          }
          // console.log(data)
          setAllStatus(data).then( res => {
            this.$message({
              type: 'success',
              message: '设置成功！'
            });
            this.GetList()
          })
        }).catch(() => { });
    },
    sortChange: function(sortData){
      // $(".diy-sort-handle").find('.caret-wrapper').removeClass('descending').removeClass('ascending') //去除自定义排序的样式
      let sortBy = [] //['BigCateRank asc']
      if(sortData.prop && sortData.order){
        if(sortData.order == 'descending'){
          sortBy.push(sortData.prop + ' desc')
        }else{
          sortBy.push(sortData.prop + ' asc')
        }
      }
      this.filter.OrderBy = sortBy.join(',')
      this.GetList()
      // console.log(sortData)
    },
    handleClick: function(){
      this.GetList(1)
    },
    p1idListChange: function(){
      getNextPaths(this.filter.p1id).then(res => {
        this.p2idList = res.data
      })
      this.p2idList = []
      this.filter.p2id = ''
      this.p3idList = []
      this.filter.p3id = ''
      this.p4idList = []
      this.filter.p4id = ''
      this.GetList(1)
    },
    p2idListChange: function(){
      let data = JSON.stringify(this.filter.p2id)
      getNextPaths(data).then(res => {
        this.p3idList = res.data
      })
      this.p3idList = []
      this.filter.p3id = ''
      this.p4idList = []
      this.filter.p4id = ''
      this.GetList(1)
    },
    p3idListChange: function(){
      let data = JSON.stringify(this.filter.p3id)
      getNextPaths(data).then(res => {
        this.p4idList = res.data
      })
      this.p4idList = []
      this.filter.p4id = ''
      this.GetList(1)
    },
    p4idListChange: function(){
      this.GetList(1)      
    },
    handleCommand(command) {
      let mesg = '确认将改数据设置到"' + command.status + '"中!';
      this.$confirm(mesg, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data = {
            uid: command.data.Id,
            status: command.status
          }
          setStatus(data).then( res => {
            this.$message({
              type: 'success',
              message: '设置成功！'
            });
            this.GetList()
          })
        }).catch(() => { });
     
    }
  }
}
</script>

<style lang="scss">
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
    margin-left: 5px;
  }
  .fliter-range-ipt{
    width: 100%;
  }
  .pic-img{
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }
</style>

