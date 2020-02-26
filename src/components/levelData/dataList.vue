<template>
  <div class="data-list" :level="parentobj.level">
    <div class="serch">
      <el-input type="text" v-model="searchWord" @keyup.native="searchChildCategory"></el-input>
      <span class="el-icon-search"></span>
    </div>
    <div class="list-item">
      <div class="item-box" @click="categorySelect(item, index)" :class="{'active': activeIndex == index}" v-for="(item, index) in searchData" :key="item.index" v-if="item[options.visible] || options.visible === ''">
        <div class="item-name" :class="{'mult-item': options.multiple}">
          <span :title="item[options.enName]">{{item[options.enName]}}</span>
          <div class="zh-name" :title="item[options.zhName]" v-if="item[options.zhName]">{{item[options.zhName]}}</div>
        </div>
        <span v-if="options.multiple && ( options.canSelParent || item[options.isleaf])" class="add-btn" @click.stop="add(item)">添加</span>
        <span class="el-icon-arrow-right" v-if="!item[options.isleaf]"></span>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        nodeData: {},
        activeIndex: -1,
        searchWord: '',
        dataOrginal: [],
        searchData: []
      }
    },
    // props: ['parentobj', 'options'],
    props: {
      parentobj: Object,
      options: Object,
      lazy: {
        type: Boolean,
        default: true
      },
      load: Function
    },
    mounted() {
      // this.getCategoryList()
      this.nodeData = Object.assign({}, this.parentobj, {location: this.options.location})
      this.load(this.nodeData, this.resolve)
    },
    watch: {
      parentobj(){
        this.activeIndex = -1
        // this.getCategoryList()
        this.load(this.nodeData, this.resolve)
      }
    },
    methods: {
      resolve: function(data){
        if(data instanceof Array){
          this.loadNode(data)
        }else{  
          this.$message({
            message: '数据格式有问题',
            type: 'error'
          }) 
        }
      },
      loadNode: function(nodeData){
        this.searchWord = ''
        nodeData.forEach( item => {
          if(item[this.options.parentId] == this.options.topParentId){
            item.fullPathId = item.CategoryId
          }else{
            item.fullPathId = this.parentobj.pathId + '/' + item.CategoryId
          }
        })
        this.searchData = nodeData
        this.dataOrginal =nodeData

        if(this.parentobj.activeId){
          this.searchData.forEach( (item, index) => {
            if(item.categoryId == this.parentobj.activeId){
              this.activeIndex = index
            }
          })
        }
      },
      searchChildCategory: function(){
        var serchVal = $.trim(this.searchWord.toLowerCase());
        if(serchVal){
          var serchReg = new RegExp(serchVal);
          this.searchData = []
          this.dataOrginal.forEach( (item, index) => {
            var listVal = ''
            if(item[this.options.enName]){
              listVal += item[this.options.enName].toLowerCase();
            }
            if(item[this.options.zhName]){
              listVal += item[this.options.zhName].toLowerCase();
            }
            if(serchReg.test(listVal)){
              this.searchData.push(item)
            }
          })
        }else{
          this.searchData = this.dataOrginal 
        }
      },
      categorySelect: function(item, index){
        this.activeIndex = index
        this.$emit('back', this.parentobj.level, item)
      },
      add: function(item){
        this.$emit('add', item)
      }
    }
  }
</script>

<style>
  .data-list{
    float: left;
    width: 248px;
    margin-right: 10px;
    height: 320px;
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow-y: auto;
  }
  .data-list .serch{
    position: relative;
    padding:2px;
  }
  .data-list .el-input__inner{
    padding: 0 30px 0 10px;
  }
  .data-list .serch span{
    position: absolute;
    top: 7px;
    right: 6px;
    font-size: 20px;
    color: #000;
    font-weight: 700;
  }

  .list-item .item-box{
    cursor: pointer;
    position:relative;
    line-height: 21px;
    padding: 1px 0;
  }
  .list-item .item-box.active{
    background-color: #eee;
  }
  .list-item .item-box:hover{
    background-color: #eee;
  }
  .add-btn{
    color:#409EFF;
    position: absolute;
    top: 0px;
    right: 20px;
  }

  .list-item .item-name{
    display: inline-block;
    width: 220px;
    overflow: hidden;
    padding-left: 10px;
    white-space: nowrap;
    text-overflow: ellipsis;
    vertical-align: bottom;
    line-height: 17px;
  }

  .zh-name{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .list-item .item-name.mult-item{
    width: 185px;
  }
  .list-item .el-icon-arrow-right{
    /* position:relative;
    top: 0;
    left: 5px; */
    position: absolute;
    top: 4px;
    right: 1px;
  }

  .data-list::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    background-color: transparent;
  }

  .data-list::-webkit-scrollbar-thumb {
    border-radius: 6px;
    background-color: rgba(0,0,0,.2);
  }

  .data-list::-webkit-scrollbar-track {
    border-radius: 6px;
    background-color: #F1F1F1;
  }
</style>
