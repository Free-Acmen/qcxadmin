<template>
  <div class="app-container">
    <header class="header">
      <span>学校专业信息维护</span>
    </header>
    <section class="content">
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
            <el-button v-if="scope.row.level-1>0" type="text" @click="edit(scope.row)">编辑</el-button>
            <el-button v-if="scope.row.level-1>0" style="color:#F56C6C;" type="text" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column> 
      </el-table>
    </section>
    <add-model ref='addModule'></add-model>
    <edit-model ref='editModel'></edit-model>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import addModel from './components/addModel'
import editModel from './components/editModel'

import { getNextPaths } from '@/api/score'

let p1idKey = {}

export default {
  data() {
    return {
      title: '学校专业历史信息',
      apiPath: 'HYJY/History',
      getPage: true,
      filter: {
        OrderBy: '',
      },
      list:[]
    }
  },
  mounted() {
    // console.log(this.userInfo)
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  components: {
    addModel: addModel,
    editModel: editModel
  }, 
  created() {
    getNextPaths(0).then(res => {
      let p1idList = res.data
      p1idList.forEach(item => {
        item.hasChildren = true
        p1idKey[item.id] = item
      });
      this.list = p1idList
    })
  },
  methods: {
    add(row){
      console.log(row)
      this.$refs.addModule.show(row, {})
    },
    edit(row){
      this.$refs.editModel.show(row, {})
    },
    del(row){
      this.$confirm(`你确定要删除 ${row.name} 的相关数据吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        
      }).catch(() => { });
    },
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
    }
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

