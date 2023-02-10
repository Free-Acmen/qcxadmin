<template>
  <div class="app-container">
    <header class="header">
      <span>学校专业信息维护</span>
       <!-- <svg-icon @click='refresh' :class-name="refreshclass" icon-class='refresh'/> -->
    </header>
    <section class="content">
      <!-- <el-input
        placeholder="输入关键字进行过滤"
        v-model="filterText">
      </el-input> 
      :filter-node-method="filterNode"
      -->

      <el-tree
        ref="tree"
        :props="{
          label: 'name',
          children: 'children',
          isLeaf: 'isSmall'
        }"
        node-key="id"
        :load="treeload"
        lazy
      >
        <div slot-scope="{ node, data }">
          <span style="display:inline-block;width:600px;">{{ node.label }}</span>
          <span>
            <el-button v-if="node.level-7<0" style="color:#42b983;" type="text" @click.stop="add(node, data)">添加</el-button>
            <el-button v-if="node.level-1>0" type="text" @click.stop="edit(node, data)">编辑</el-button>
            <el-button v-if="node.level-1>0" style="color:#F56C6C;" type="text" @click.stop="del(node, data)">删除</el-button>
          </span>
        </div>
      </el-tree>


      <!-- <el-table 
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
      </el-table> -->
    </section>
    <add-model ref='addModule' @formdata="addHandle"></add-model>
    <edit-model ref='editModel' @formdata="editHandle"></edit-model>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import addModel from './components/addModel'
import editModel from './components/editModel'

import { getNextPaths, addPaths, editPaths, delPaths } from '@/api/score'

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
      filterText:'',
      loading: false,
      list:[]
    }
  },
  mounted() {
    // console.log(this.userInfo)
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    refreshclass: function(){
    	if(this.loading){
    		return "refreshbtn refreshanimate"
    	}else{
    		return 'refreshbtn'
    	}
    }
  },
  components: {
    addModel: addModel,
    editModel: editModel
  }, 
  created() {
    this.loading=true    
    getNextPaths(0).then(res => {
      let p1idList = res.data
      p1idList.forEach(item => {
        item.hasChildren = true
        p1idKey[item.id] = item
      });
      this.list = p1idList
      this.loading=false          
    })
  },
  // watch: {
  //   filterText(val) {
  //     this.$refs.tree.filter(val);
  //   }
  // },
  methods: {
    refresh(){
      this.loading=true    
      // getNextPaths(0).then(res => {
      //   let p1idList = res.data
      //   p1idList.forEach(item => {
      //     item.hasChildren = true
      //     p1idKey[item.id] = item
      //   });
      //   this.list = p1idList
      //   this.loading=false          
      // })
    },
    // filterNode(value, data) {
    //   if (!value) return true;
    //   return data.name.indexOf(value) !== -1;
    // },
    add(node, data){
      this.$refs.addModule.show(data, {})
    },
    addHandle(nodeData, parentData){
      // let a={
      //   CreateTime: '2022-02-21 16:00:36',
      //   id:"1-10001-1-025100-0-1526-101-8",
      //   isSmall:true,
      //   level:7,
      //   name:"sssdsdsdsds",
      //   pid:"1-10001-1-025100-0-1526-101",
      //   pname:"思想政治理论+英语（一）+数学（三）+金融学综合",
      //   prid:"101",
      //   rid:"8"
      // }
      console.log(nodeData)
      addPaths(nodeData).then(res=>{
        if(res.success){
          this.$refs.tree.append(res.data, parentData)
          this.CFunc.showMsg('数据添加成功!')          
        }else{
          this.CFunc.showMsg('数据添加失败!', 'error')
          
        }      
      })
    },
    edit(node, data){
      this.$refs.editModel.show(data, {})
    },
    editHandle(data, nodeData){
      editPaths(data).then(res=>{
        if(res.success){
          nodeData.name = data.name
          this.CFunc.showMsg('数据更新成功!')          
        }else{
          this.CFunc.showMsg('数据更新失败!', 'error')
        }
      })
    },
    del(node, data){
      this.$confirm(`你确定要删除 ${data.name} 的相关数据吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delPaths({id: node.id}).then(res=>{
          if(res.success){
            this.$refs.tree.remove(node)     
            this.CFunc.showMsg('数据删除成功!')          
          }else{
            this.CFunc.showMsg('数据删除失败!', 'error')
          }
        })
      }).catch(() => { });
    },
    // load(tree, treeNode, resolve) {
    //   // console.log(tree, treeNode, 1212)
    //   getNextPaths(JSON.stringify(tree.id)).then(res => {
    //     let arr = res.data
    //     arr.forEach(item=>{
    //       if(item.level-7<0){
    //         item.hasChildren = true
    //       }else{
    //         item.hasChildren = false
    //       }
    //     })
    //     resolve(arr)
    //   })
    // },
    treeload(node, resolve) {
      // console.log(node, 1212)
      if(node.level==0){
        getNextPaths(0).then(res => {
          let p1idList = res.data
          p1idList.forEach(item => {
            p1idKey[item.id] = item
          });
          resolve(p1idList)     
        })
      }else{
        getNextPaths(JSON.stringify(node.data.id)).then(res => {
          let arr = res.data
          // arr.forEach(item=>{
          //   if(item.level-7<0){
          //     item.isLeaf = false
          //   }else{
          //     item.isLeaf = true
          //   }
          // })
          resolve(arr)
        })
      }

      
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

  .el-tree-node__content{
    height: 32px;
    border-bottom:1px solid #E8EAEC; 
  }
</style>

