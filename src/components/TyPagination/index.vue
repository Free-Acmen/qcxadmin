<template>
  <div class="ty-pagination">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageData.curPage" :page-size="pageData.size" :total="pageData.total" :layout="layout" :page-sizes="pageSizes"></el-pagination>
  </div>
</template>

<script>

export default {
  name: 'tyPagination',
  data(){
    return {
      pageSizes: [24, 48, 96, 200],
      layout: "total, sizes, prev, pager, next, jumper",
      pageData: {
        size: 24,
        curPage: 1,
        total: 10
      }
    }
  },
  props: {
    // currentPage: {
    //   type: Number,
    //   required: true
    // },
    // pageSize: {
    //   type: Number,
    //   default: 20
    // },
    // total: {
    //   type: Number,
    //   required: true
    // }
  },
  methods: {
    setPageData: function(size, curPage, total){
      if(size){
        this.pageData.size = size
      }
      if(curPage){
        this.pageData.curPage = curPage
      }
      if(total || total == 0){
        this.pageData.total = total
      }
    },
    getPageData: function(){
      return this.pageData
    },
    handleSizeChange: function(val){
      this.setPageData(val)
      this.$emit('pagechange', this.pageData)
    },
    handleCurrentChange: function(val){
      this.setPageData(false, val)
      this.$emit('pagechange', this.pageData)
    },
  }
}
</script>

<style scoped>
  .ty-pagination{
    padding-top: 5px;
    text-align: center;
  }
</style>
