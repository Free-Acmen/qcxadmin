<template>
  <div class="level-data">
    <el-dialog ref="batchDialog" :title="options.title" :close-on-click-modal="false" :modal="options.modal" :visible.sync="levelDialog" width="1066px">
      <div class="level-body">
        <div class="search-box">
          <el-input style="width:93.5%;vertical-align: bottom;" type="text" v-model="keyWord" @keyup.enter.native="searchCategory" placeholder="搜索分类名称"></el-input>
          <el-button type="primary" style="margin-left: 3px;" @click="searchCategory">搜索</el-button>
        </div>
        <div v-if="!options.multiple" class="selected-level">
          <div :title="selLevelList.slice(-1)[0].Path" v-for="(item, index) in selLevelList" :key="index">
            <span v-if="index != 0">&nbsp;>&nbsp;</span>{{item[options.enName]}}
            <p v-if="item[options.zhName]">{{item[options.zhName]}}</p>
          </div>
        </div>
        <div v-if="options.multiple" class="mul-selected-level">
          <div :title="item[options.fullPath]" v-for="(item, index) in mulSelLevelList" :key="index">
            {{item[options.enName]}}
            <p :title="item[options.zhName]" v-if="item[options.zhName]">{{item[options.zhName]}}</p>
            <i class="el-icon-close" @click="delSellEvel(item, index)"></i>
          </div>
        </div>
        <div class="level-list" v-show="!searchListStatus">
          <div class="level-x">
            <data-list v-bind="$attrs" v-on="$listeners" :options="options" v-for="item in levelList" v-if="item.show" :parentobj="item" :key="item.parentId" @add="selAdd" @back="levelListChange"></data-list>
          </div>
        </div>
        <div class="search-realut" v-show="searchListStatus">
          <span v-if="searchList.length == []" style="display: block;text-align: center;">未查询到相关数据</span>
          <i v-if="searchList.length < 0" style="margin-left: 47.5%;margin-top: 44px;font-size: 40px;color: #409EFF;" class="el-icon-loading"></i>
          <div v-for="(item, index) in searchList" :key="index" v-if="item[options.visible] || options.visible === ''" @click="searchSel(item)">
            {{item[options.fullPath]}}
          </div>
        </div>
      </div>  
      <span slot="footer" class="dialog-footer">
        <el-button @click="levelDialog = false">取 消</el-button>
        <el-button v-show="searchListStatus" @click="rollback">返 回</el-button>
        <el-button type="primary" @click="sure" v-show="!searchListStatus || options.multiple">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import dataList from "./dataList.vue"
  export default{
    data(){
      return {
        name: 'Category',
        levelDialog: false,
        keyWord: '',
        options: {
          location: '',
          title: '类目选择',           //弹窗名称
          modal: true,
          id: 'categoryId',           //渲染数据唯一id的key名
          zhName: 'zhName',           //渲染数据中文名称key名
          enName: 'enName',           //渲染数据英文名称key名
          isleaf: 'isleaf',           //数据是否是最后一级的key名
          parentId: 'parenid',        //数据是父类id的key名
          fullPath: 'nodePath',       //数据所在位置的全部路径的key名
          fullPathId: 'nodePathId',   //数据所在位置的全部路径id的key名
          splitSymbol: '/',           //全路径分分隔符
          level: 'level',             //数据所在层级的key名
          visible: 'visible',         //数据是否可见的key名
          multiple: true,             //能否多选
          canSelParent: true,         //能否选这有之类的数据
          topParentId: '0'           //顶级数据父id
        },
        levelList: [
          // {level: 1, show: true,  parentId: '0', pathId: '1'}
        ],
        mulSelLevelList: [],
        selLevelList: [],
        searchListStatus: false,
        searchList: []
      }
    },
    props: {
      search: Function
    },
    methods:{
      show: function(categoryList, opt){
        this.levelDialog = true
        this.keyWord = ''
        this.searchListStatus = false
        this.options = Object.assign({}, this.options, opt)
        this.initCategory(categoryList)
      },
      initCategory: function(data){
        if(this.options.multiple){
          this.mulSelLevelList = data
        }

        // if(data.length > 0 && !this.options.multiple){
        //   this.selLevelList = data          
        //   this.levelList = []
        //   data.forEach( (item, index) => {
        //     var obj = {
        //       level: index+1,
        //       show: true,
        //       parentId: item[this.options.parentId],
        //       activeId: item[this.options.id],
        //       pathId: item[this.options.fullPathId]  
        //     }
        //     this.levelList.push(obj)
        //   });
        // }else{
          this.selLevelList = []
          this.levelList = [{level: 1, show: true, parentId: this.options.topParentId}]
        // }
      },
      searchCategory: function(){
        var keyWord = $.trim(this.keyWord)
        if(!keyWord){
          return
        }
        let data = {
          location: this.options.location,
          keyword: keyWord
        }
        let resolve = (searchData) => {
          if(searchData instanceof Array){
            this.searchListStatus = true
            this.searchList = []
            this.searchList = searchData           
          }else{  
            this.$message({
              message: '数据格式有问题',
              type: 'error'
            }) 
          }
        }
        this.search(data, resolve)
      },
      //避免选择的数据重复或者父类已选还选了之类
      filerData: function(data){
        let arr = [], isExit = false, isParentExit = false
        let fullPathArr = data[this.options.fullPath].split(this.options.splitSymbol)

        for(var i=0,len=this.mulSelLevelList.length; i<len; i++){
          var item  = this.mulSelLevelList[i]
          if(item[this.options.id] == data[this.options.id]){
            this.$message({
              message: '已添加过该条目，无需在添加!',
              type: 'warning'
            })
            isExit = true
            break
          }

          if(fullPathArr.indexOf(item[this.options.enName]) != -1){
            this.$message({
              message: '已添加这该条目的父类条目，无需在添加!',
              type: 'warning'
            })
            isParentExit = true
            break
          }
        }

        if(isExit || isParentExit){
          return  this.mulSelLevelList
        }

        this.mulSelLevelList.forEach( item => {
          if(item[this.options.fullPath].split(this.options.splitSymbol).indexOf(data[this.options.enName]) == -1){
            arr.push(item)
          }
        })

        arr.push(data)
        return arr
      },
      selAdd: function(data){
        this.mulSelLevelList = this.filerData(data)
      },
      levelListChange: function(level, item){
        if(item[this.options.isleaf]){
          this.levelList = this.levelList.slice(0, level)
          this.selLevelList = this.selLevelList.slice(0, level)
          this.selLevelList[level-1] = item
          return
        }

        var len = this.levelList.length
        if(len >= 4 && level >=4){
          var width = 250 * (level + 1) + 10 * level
          $(".level-x").css("width", width +'px')
          setTimeout(function(){
            $(".level-list").scrollLeft(width);
          }, 0)
        }else{
          $(".level-x").css("width", '1040px')
        }

        if(level <= len){
          this.levelList = this.levelList.slice(0, level)
          this.selLevelList = this.selLevelList.slice(0, level-1)
        }
        
        var obj = {
          level: level+1, 
          show: true, 
          parentId: item[this.options.id],
          pathId: item[this.options.fullPathId] 
        }
        this.levelList.push(obj)
        this.selLevelList.push(item)
      },
      delSellEvel: function(item, index){
        this.mulSelLevelList.splice(index, 1)
      },
      sure: function(){
        var len = this.selLevelList.length
        if(!this.options.multiple){
          var leafCategory = this.selLevelList[len-1][this.options.isleaf]
          if(!leafCategory && !this.options.canSelParent){
            this.$message({
              message: '您勾选的数据还有子数据!',
              type: 'warning'
            })         
            return
          }
        }
        if(this.options.multiple){
          this.$emit("leveldata", this.mulSelLevelList)
        }else{
          this.$emit("leveldata", this.selLevelList[len-1])
        }
        // console.log(this.selLevelList, this.mulSelLevelList)
        this.levelDialog = false
      },
      searchSel: function(item){
        if(this.options.multiple){
          this.selAdd(item)
          return
        }
        
        this.$emit("categorydata", item)
        // var nodePathId = item[this.options.fullPathId]
        // this.ajax(this.options.getFullPathAjax, nodePathId, 5, {amzs: true}).then( res => {
        //   if(res.success){
        //     this.selLevelList = res.data
        //     this.levelDialog = false
        //     this.$emit("categorydata", this.selLevelList)
        //   }else{
        //     toastr.error("获取类目失败!")          
        //   }   
        // }) 
      },
      rollback: function(){
        this.keyWord = ''
        this.searchListStatus = false
      }
    },
    components: {
      dataList: dataList
    }
  }
</script>

<style lang="scss">
  .level-data .el-dialog__body {
    padding: 10px 0;
  }
  .level-body{
    min-height: 380px;
    padding: 0 20px;
  } 

  .selected-level{
    padding: 8px 0;
    margin-left: -10px;
    display: flex;
    color: #E6A23C;
    &>div{
      padding-left: 20px;
      span{
        margin-left: -17px;
      }
    }
  }

  .mul-selected-level{
    padding-top: 10px;
    display: flex;
    flex-wrap: wrap;
    margin-left: -5px;
    margin-right: -5px;
  }
  .mul-selected-level div{
    flex: 0 1 119px;
    padding: 0px 15px 0 5px;
    border: 1px solid #F8E5C8;
    background-color: #FDF6EB;
    color: #e6a23c;
    border-radius: 4px;
    /* text-align: center; */
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-right: 5px;
    margin-left: 5px;
    margin-bottom: 5px;
    position: relative;
  }
  .mul-selected-level p{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 0;
    padding: 0;
  }
  .mul-selected-level div i{
    position: absolute;
    right: 2px;
    top: 4px;
    cursor: pointer;
  }

  .level-list{
    width: 100%;
    overflow-x: auto;
    height: 340px;
    margin-top: 5px;
  }
  .category-child:last-child{
    margin-right: 0;
  }
  .search-realut{
    height: 335px;
    overflow-y: auto;
  }
  .search-realut div{
    line-height: 30px;
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
  .level-list::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: transparent;
  }
  .level-list::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-color: rgba(0,0,0,.2);
  }
  .level-list::-webkit-scrollbar-track {
    border-radius: 8px;
    background-color: #F1F1F1;
  }
  
</style>
