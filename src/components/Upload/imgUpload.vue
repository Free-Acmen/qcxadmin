<template>
  <div class="img-upload">
    <el-upload
      :headers="headers"
      :data="uploadData"
      :action= "action"
      :before-upload="beforeUpload"
      :on-preview="handlePreview" 
      :on-success = "handleSuccess"
      :before-remove="beforeRemove"
      :on-remove="handleRemove"
      :multiple="multiple"
      :limit="limit"
      list-type="picture-card"
      :show-file-list="false"
      :file-list="fileList"
      :on-exceed="handleExceed">
      <!-- <el-button type="primary">点击上传</el-button> -->
      <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
      <i class="el-icon-plus"></i>
      <div slot="tip" class="el-upload__tip">{{tip}}</div>
    </el-upload>
  </div>
</template>

<script>
import { getCookie } from '@/utils/auth'

//"https://jsonplaceholder.typicode.com/posts/"

let action = process.env.VUE_APP_BASE_API + 'File/UploadFiles'

export default {
  name: 'UploadImg',
  data() {
    return {
      action: action
    };
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
    accept: {
      type: String,
      default: '', //'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel'
    },
    multiple:{
      type: Boolean,
      default: false
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
      // console.log(file)
    },
    handlePreview(file) {
      // console.log(file);
    },
    handleSuccess(response, file, fileList){
      if(response.success&&response.data){
        this.$emit('success', response, file, fileList)
      }else{
        this.CFunc.showMsg('上传文件失败!', 'error')
      }
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 ${this.limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    }
  }
}
</script>
