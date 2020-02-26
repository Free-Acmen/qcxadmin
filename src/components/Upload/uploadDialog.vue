<template>
  <div class="rule-create">
    <el-dialog v-el-drag-dialog  :title="option.title" :top="option.top" :close-on-click-modal="false" :modal="option.isModal" :visible.sync="isShow"  :width="option.width" append-to-body @opened="openHandle" @close="closeHandle">
      <div>
        <file-upload
        v-on="$listeners" 
        v-bind="$attrs"
        @beforeUp="beforeUpHandle"
        @preview="previewHandle"
        @remove="removeHandle"
        ></file-upload>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="btnSure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import elDragDialog from '@/directive/el-dragDialog'
import fileUpload from './fileUpload'

// Request URL: https://ai.esells.cn/esells.ty.app/api/Task/GetTaskStatus disabled

export default {
  directives: { elDragDialog },
  data(){
    return {
      isShow: false,
      option: {
        isModal: true,
        title: '上传窗口',
        width: '500px',
        top: '80px',
        backdata: {}
      }
    }
  },
  components: {
    fileUpload: fileUpload
  },
  methods: {
    show: function(data, opt){
      this.isShow = true
      this.saveState = true
      this.option = Object.assign(this.$options.data().option, opt)
    },
    openHandle: function(){
      
    },
    beforeUpHandle: function(file){
      // console.log(file, 1)
    },
    previewHandle: function(file){
      // console.log(file, 2)
    },
    removeHandle: function(file, fileList){
      // console.log(file, 4)      
    },
    btnSure: function(){
      this.isShow = false
    },
    closeHandle: function(){
      this.$emit('close')    
      this.$parent.GetList && this.$parent.GetList()
    }
  }

}
</script>

<style scoped lang="scss">
 
</style>
