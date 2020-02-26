<template>
  <div class="categoryStep">
    <el-dialog ref="batchDialog" title="类目选择" :close-on-click-modal="false" :modal="true" :visible.sync="categoryDialog" width="800px">
      <div class="category-body">
        <div class="search-box">
          <el-input style="width:90%;vertical-align: bottom;" type="text" v-model="keyWord" @keyup.enter.native="searchCategory" placeholder="搜索分类名称"></el-input>
          <el-button type="primary" style="margin-left: 15px;" @click="searchCategory">搜索</el-button>
        </div>
        <div class="selected-category" v-show="!searchListStatus">
          <span v-for="(item, index) in selectCategoryList" :key="index">
            <span v-if="index != 0">&nbsp;>&nbsp;</span>{{item.zhName}}
          </span>
        </div>
        <div class="category-list" v-show="!searchListStatus">
          <div class="catrgory-x" style="display: flex;">
            <category-child v-for="item in childCategory" v-if="item.show" :parentobj="item" :key="item.id" @back="childCategoryChange"></category-child>
          </div>
        </div>
        <div class="search-realut" v-show="searchListStatus">
          <span v-if="searchList.length == []" style="display: block;text-align: center;">查询无相关数据</span>
          <div v-for="item in searchList" :key="item.categoryId" @click="searchSel(item)">{{item.nodePath}}</div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="categoryDialog = false">取 消</el-button>
        <el-button v-show="searchListStatus" @click="rollback">返 回</el-button>
        <el-button type="primary" @click="categorySure" v-show="!searchListStatus">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {getCateGoryListByName, getCateGoryListByNodePathId} from '@/api/asin'
  import categoryChild from "./categoryChild.vue"
  export default{
    data(){
      return {
        name: 'Category',
        categoryDialog: false,
        location: '',
        keyWord: '',
        defaultOpt:{
          onlySelChild: true
        },
        childCategory: [
          {level: 1, show: true,  parentId: '0'}
        ],
        selectCategoryList: [],
        searchListStatus: false,
        searchList: []
      }
    },
    mounted() {},
    methods:{
      show: function(categoryList, opt){
        this.categoryDialog = true
        this.keyWord = ''
        this.searchListStatus = false
        this.initCategory(categoryList)
      },
      initCategory: function(data){
        if(data.length > 0){
          this.selectCategoryList = data
          this.childCategory = []
          data.forEach( (item, index) => {
            var obj = {
              level: index + 1,
              show: true,
              parentId: item.parenid,
              activeId: item.categoryId
            }
            this.childCategory.push(obj)
          });
        }else{
          this.selectCategoryList = []
          this.childCategory = [{level: 1, show: true, parentId: '0'}]
        }
      },
      searchCategory: function(){
        var keyWord = $.trim(this.keyWord)
        if(!keyWord){
          return
        }
        this.searchListStatus = true
        this.searchList = []
        getCateGoryListByName(keyWord).then(res => {
          if(res.success){
            this.searchList = res.data
          }else{
            this.searchListStatus = fasle
            this.CFunc.showMsg('获取类目失败!', 'error')
          }
        })
      },
      childCategoryChange: function(level, item){
        if(item.isleaf){
          this.childCategory = this.childCategory.slice(0, level)
          this.selectCategoryList = this.selectCategoryList.slice(0, level)
          this.selectCategoryList[level-1] = item
          return
        }

        var len = this.childCategory.length
        if(len >= 4){
          var width = 248 * (level + 1) + 10 * level
          $(".catrgory-x").css("width", width +'px')
          setTimeout(function(){
            $(".category-list").scrollLeft(width);
          }, 0)
        }else{
          $(".catrgory-x").css("width", 'auto')
        }

        if(level <= len){
          this.childCategory = this.childCategory.slice(0, level)
          this.selectCategoryList = this.selectCategoryList.slice(0, level-1)
        }

        var obj = {
          level: level+1, 
          show: true, 
          parentId: item.categoryId
        }
        this.childCategory.push(obj)
        this.selectCategoryList.push(item)
      },
      categorySure: function(){
        var len = this.selectCategoryList.length
        var leafCategory = this.selectCategoryList[len-1].isleaf
        if(!leafCategory && this.defaultOpt.onlySelChild){
           this.CFunc.showMsg('您勾选的分类还有子类!', 'warning')         
          return
        }
        this.categoryDialog = false
        this.$emit("categorydata", this.selectCategoryList)
      },
      searchSel: function(item){
        var nodePathId = item.nodePathId
        getCateGoryListByNodePathId(nodePathId).then( res => {
          if(res.success){
            this.selectCategoryList = res.data
            this.categoryDialog = false
            this.$emit("categorydata", this.selectCategoryList)
          }else{
             this.CFunc.showMsg('获取类目失败!', 'error')      
          }   
        }) 
      },
      rollback: function(){
        this.keyWord = ''
        this.searchListStatus = false
      }
    },
    components: {
      categoryChild: categoryChild
    }
  }
</script>

<style>
  .categoryStep .el-dialog__body {
    padding: 10px 0;
  }
  .category-body{
    height: 420px;
    padding: 0 20px;
  } 
  .selected-category{
    padding: 8px 15px;
  }
  .category-list{
    width: 100%;
    overflow-x: auto;
    height: 340px;
    margin-top: 10px;
  }
  .category-child:last-child{
    margin-right: 0;
  }
  .search-realut{
    height: 370px;
    overflow-y: auto;
    margin-top: 30px; 
  }
  .search-realut div{
    line-height: 40px;
    padding: 0 5px;
    cursor: pointer;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .search-realut div:hover{
    background-color: #eee;
  }
</style>
