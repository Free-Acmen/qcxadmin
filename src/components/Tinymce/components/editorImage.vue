<template>
  <div >
    <el-button :style="{background:color,borderColor:color}" icon="el-icon-upload" size="mini" type="primary" @click="dialogVisible=true">
      图片上传
    </el-button>
    <el-dialog title="图片上传" append-to-body :visible.sync="dialogVisible">
      <div class="dialog-content upload-container" style="height:400px;">
        <upload :drag="true" accept="image/*" :max-size="5" @success="handleSuccess"></upload>

        <div style="display:flex;flex-wrap: wrap;">
          <div v-for="(item, index) in listObj" :key="index" style="position:relative;margin:5px;" >
            <tyimg :src="'//adm.kaoyanxiao.com/dat/Uploads'+item.FilePath" width="136px" height="136px"></tyimg>
            <div class="elem-img-opt">
              <span></span>
              <span @click="delImg(index)">删除</span>
            </div>
          </div>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import { getToken } from 'api/qiniu'
import upload from "@/components/Upload/fileUpload";

export default {
  name: 'EditorSlideUpload',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    }
  },
  data() {
    return {
      dialogVisible: false,
      listObj: [],
      fileList: []
    }
  },
  components: {
    upload 
  },
  methods: {
    handleSubmit() {
      this.$emit('successCBK', this.listObj)
      this.listObj = []
      this.fileList = []
      this.dialogVisible = false
    },
    handleSuccess(res, file) {
      // console.log(res, file)
      this.listObj.push(res.data[0])
    },
    delImg(index){
      this.listObj.splice(index, 1);
    }
  }
}
</script>

<style lang="scss">
  .upload-container{
    .el-upload{
      width: 100%;
      .el-upload-dragger{
        width: 100%;
      }
    }
  }
</style>


<style lang="scss" scoped>
  .elem-img-opt {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 5px;
    display: flex;
    justify-content: space-between;
    background: rgba(0, 0, 0, 0.6);
    span {
      cursor: pointer;
      color: #fff;
    }
  }  
</style>


// <style lang="scss" scoped>
// .editor-slide-upload {
//   margin-bottom: 20px;
//   ::v-deep .el-upload--picture-card {
//     width: 100%;
//   }
// }
// </style>
