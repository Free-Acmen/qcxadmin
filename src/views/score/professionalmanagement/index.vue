<template>
  <div class="app-container">
    <header class="header">
      <span>学校专业信息维护</span>
      <!-- <svg-icon @click='refresh' :class-name="refreshclass" icon-class='refresh'/> -->
      <!-- <div style="float: right">
        <el-button  type="primary" @click="ModuleHandle(-1)">信息添加</el-button> 
      </div> -->
    </header>
    <section class="content">
      <!-- <div class="fliter-box">
        <el-row :gutter="20">
          <el-col :span="3">
            <el-select v-model="filter.p1id" placeholder="省市" filterable  @change="p1idListChange" clearable>
              <el-option v-for="item in p1idList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-select v-model="filter.p2id" placeholder="院校" filterable  @change="p2idListChange" clearable>
              <el-option v-for="item in p2idList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-select v-model="filter.p3id" placeholder="院系" filterable  @change="p3idListChange" clearable>
              <el-option v-for="item in p3idList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-select v-model="filter.p4id" placeholder="专业" filterable  @change="p4idListChange" clearable>
              <el-option v-for="item in p4idList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-col>
        </el-row>
      </div> -->

      <el-table 
        ref='treeTable' 
        row-key="id"
        stripe
        border
        lazy
        :load="load"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        :data="list"> 
        <el-table-column label="名称" width="600">
          <template slot-scope="scope">
          	{{scope.row.name}}        
          </template>
        </el-table-column>
        
        <el-table-column label="操作" header-align="center" align="center" width="150">
          <template slot-scope="scope">
            <el-button v-if="scope.row.level-7<0" style="color:#42b983;" type="text" @click="add(scope.row)">添加</el-button>
            <el-button v-if="scope.row.level-2>0" type="text" @click="edit(scope.row)">编辑</el-button>
            <el-button v-if="scope.row.level-2>0" style="color:#F56C6C;" type="text" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column> 
      </el-table>
    </section>
    <!-- <footer class="footer">
      <ty-page ref="tyPage" @pagechange="PageChange"></ty-page>
    </footer> -->
    <!-- <add-model ref='module' @formdata="ModuleDataHandle"></add-model> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import tyPage from '@/components/TyPagination'
// import pageMixin from '@/mixin/tabePageMixin'
// import addModel from './components/addModel'

import { getList, add, del, update} from '@/api/commonCrud'
import { getNextPaths } from '@/api/score'

let p1idKey = {}

export default {
  data() {
    return {
      title: '学校专业历史信息',
      apiPath: 'HYJY/History',
      getPage: true,
      p1idList:[],
      p2idList:[],
      p3idList:[],
      p4idList:[],
      filter: {
        OrderBy: '',
        // Status: '待核实',
        // UserName: '',
        // RealName:'',
        p1id: '',
        p2id: '',
        p3id: '',
        p4id: '',
        // TGStart: '',
        // TGEnd: ''
      },
      list:[]
      // multipleSelection: [],
      // tableKey: [],
    }
  },
  // mixins: [pageMixin],
  mounted() {
    // console.log(this.userInfo)
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  components: {
  	// addModel: addModel,
    // tyPage: tyPage
  }, 
  created() {
    getNextPaths(0).then(res => {
      // console.log(res)
      this.p1idList = res.data
      
      this.p1idList.forEach(item => {
        item.hasChildren = true
        p1idKey[item.id] = item
      });
      this.list = this.p1idList
    })
  },
  methods: {
    // getList, 
    // add,
    // del, 
    // update,
    add(row){},
    edit(row){},
    del(row){},
    load(tree, treeNode, resolve) {
      // console.log(tree, treeNode)
      getNextPaths(JSON.stringify(tree.id)).then(res => {
        let arr = res.data
        arr.forEach(item=>{
          if(item.level-7<0){
            item.hasChildren = true
          }else{
            item.hasChildren = false
          }
        })
        resolve(arr)
      })
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
      // this.GetList(1)
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
      // this.GetList(1)
    },
    p3idListChange: function(){
      let data = JSON.stringify(this.filter.p3id)
      getNextPaths(data).then(res => {
        this.p4idList = res.data
      })
      this.p4idList = []
      this.filter.p4id = ''
      // this.GetList(1)
    },
    p4idListChange: function(){
      // this.GetList(1)      
    },
  }
}
</script>

<style lang="scss">
  // .el-dropdown-link {
  //   cursor: pointer;
  //   color: #409EFF;
  //   margin-left: 5px;
  // }
  // .fliter-range-ipt{
  //   width: 100%;
  // }
  // .pic-img{
  //   width: 20px;
  //   height: 20px;
  //   vertical-align: middle;
  // }
  .content{
    img{
      width:50px;
      height:50px;
      vertical-align: middle;
    }
  }
</style>

