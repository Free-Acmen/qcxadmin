<template>
  <div class="file-upload">
    <el-upload
      :headers="headers"
      :data="uploadData"
      :drag="drag"
      multiple
      :action="action"
      :before-upload="beforeUpload"
      :on-preview="handlePreview" 
      :on-success="handleSuccess"
      :before-remove="beforeRemove"
      :on-remove="handleRemove"
      :limit="limit"
      :show-file-list="true"
      :file-list="fileList"
      :on-exceed="handleExceed">
      <el-button v-if="!drag" type="primary">点击上传</el-button>
      <i v-if="drag" class="el-icon-upload"></i>
      <div v-if="drag" class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div slot="tip" class="el-upload__tip">{{tip}}</div>
    </el-upload>
  </div>
</template>

<script>
import { getCookie } from '@/utils/auth'

let action = process.env.VUE_APP_BASE_API + 'File/UploadFiles'
export default {
  name: 'UploadFile',
  data() {
    return {
      action: action
    }
  },
  props: {
    fileList: {
      type: Array,
      default: () => {
        return []
      }
    },
    headers: {
      type: Object,
      default: () => {
        return {
          loginName: getCookie('name'),
          token: getCookie('token')
        }
      }
    },
    uploadData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    drag: {
      type: Boolean,
      default: true
    },
    accept: {
      type: String,
      default: '', //'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel'
    },
    limit: {
      type: Number,
      default: 1
    },
    tip: {
      type: String,
      default: ''
    }
  },
  methods: {
    beforeUpload(file){
      this.$emit('beforeUp', file)
    },
    handlePreview(file) {
      this.$emit('preview', file)
    },
    handleSuccess(response, file, fileList){
      if(response.success&&response.data){
        this.$emit('success', response, file, fileList)
      }else{
        this.CFunc.showMsg('上传文件失败!', 'error')
      }
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 ${this.limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`)
    },
    handleRemove(file, fileList) {
      this.$emit('remove', file, fileList)
    }
  }
}
</script>

<style lang="scss">
  .el-upload--text{
    width: 100%;
    .el-upload-dragger{
      width: 100%;
    }
  }
</style>
