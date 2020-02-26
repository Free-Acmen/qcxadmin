<template>
  <div class="pull-left category-child" :level="parentobj.level">
    <div class="serch">
      <el-input type="text" v-model="searchWord" @keyup.native="searchChildCategory"></el-input>
      <span class="el-icon-search"></span>
    </div>
    <div class="category-item">
      <div class="category-div" @click="categorySelect(item, index)" :class="{'active': activeIndex == index}" v-for="(item, index) in categoryData" :key="item.index">
        <span class="category-name">{{item.zhName}}</span>
        <span class="el-icon-arrow-right" v-if="!item.isleaf"></span>
      </div>
    </div>
  </div>
</template>

<script>
  import {getCateGoryListByParentId} from '@/api/asin'
  export default{
    data(){
      return {
        name: 'categoryChild',
        activeIndex: -1,
        searchWord: '',
        categoryDataOrginal: [],
        categoryData: []
      }
    },
    props: ['parentobj'],
    mounted() {
      this.getCategoryList()     
    },
    watch: {
      parentobj(){
        this.activeIndex = -1
        this.getCategoryList()
      }
    },
    methods: {
      getCategoryList: function(){
        getCateGoryListByParentId(this.parentobj.parentId).then(res => {
          if(res.success){
            this.categoryData = res.data
            this.categoryDataOrginal = this.categoryData

            if(this.parentobj.activeId){
              this.categoryData.forEach( (item, index) => {
                if(item.categoryId == this.parentobj.activeId){
                  this.activeIndex = index
                }
              });
            }
          }else{
             this.CFunc.showMsg('获取类目失败!', 'error')
          }
        })
        this.searchWord = ''
      },
      searchChildCategory: function(){
        var serchVal = $.trim(this.searchWord.toLowerCase());
        if(serchVal){
          var serchReg = new RegExp(serchVal);
          this.categoryData = []
          this.categoryDataOrginal.forEach( (item, index) => {
            var listVal = item.zhName.toLowerCase();
            if(serchReg.test(listVal)){
              this.categoryData.push(item)
            }
          })
        }else{
          this.categoryData = this.categoryDataOrginal 
        }
      },
      categorySelect: function(item, index){
        this.activeIndex = index
        this.$emit('back', this.parentobj.level, item)
      }
    }
  }
</script>

<style>
  .category-child{
    width: 248px;
    margin-right: 10px;
    height: 320px;
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow-y: auto;
  }
  .category-child .serch{
    position: relative;
    padding:2px;
  }
  .category-child .el-input__inner{
    padding: 0 30px 0 10px;
  }
  .category-child .serch span{
    position: absolute;
    top: 7px;
    right: 6px;
    font-size: 20px;
    color: #000;
    font-weight: 700;
  }

  .category-item .category-div{
    cursor: pointer;
  }
  .category-item .category-div.active{
    background-color: #eee;
  }
  .category-item .category-div:hover{
    background-color: #eee;
  }

  .category-item .category-name{
    display: inline-block;
    width: 200px;
    overflow: hidden;
    padding-left: 10px;
    white-space: nowrap;
    text-overflow: ellipsis;
    vertical-align: bottom
  }
  .category-item .el-icon-arrow-right{
    position:relative;
    top: 0;
    left: 10px;
  }
</style>
