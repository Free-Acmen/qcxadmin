<template>
  <div class="logs">
    <el-dialog  :title="option.title" :top="option.top" :close-on-click-modal="false" :modal="option.isModal" :visible.sync="isShow"  :width="option.width" append-to-body @opened="openHandle">
      <div>
        <el-table :data="logsList">
          <el-table-column align="center" type="index" label="序号" width="50"></el-table-column>
  
          <el-table-column property="optType" label="操作类型"></el-table-column>
          <el-table-column property="opter" label="操作人"></el-table-column>
          <el-table-column property="date" label="操作时间"></el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import { getStatusLog } from '@/api/score'

export default {
  data(){
    return {
    	initData:{},
      isShow: false,
      saveState: true,
      option: {
        isModal: true,
        title: '数据操作日志',
        width: '600px',
        top: '80px',
        backdata: {}
      },
      logsList:[]
    }
  },
  methods: {
    show: function(data, opt){
      this.isShow = true
      this.saveState = true
      this.logsList = []
      this.option = Object.assign(this.$options.data().option, opt)
      this.initData = data
    },
    openHandle: function(){
      this.getLogs()
    },
    getLogs(){
      getStatusLog({Id: this.initData.Id}).then(res => {
        this.logsList = res.data || []
      })
    }
  },

}
</script>

<style scoped lang="scss">
  .line{
    text-align: center;
  }
</style>
