<template>
  <div class="rule-create">
    <el-dialog  :title="option.title" :top="option.top" :close-on-click-modal="false" :modal="option.isModal" :visible.sync="isShow"  :width="option.width" append-to-body @opened="openHandle">
      <div>
        <el-form label-position="left" label-width="110px" :model="formData" :rules="rules" inline-message ref="shopCreateForm">
          <el-row>
            <el-col :span="22">
              <el-form-item  prop="Key" label="Key">
                <el-input v-model="formData.Key" placeholder="请输入Key值"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item  prop="Value" label="Value">
                <el-input type="textarea" v-model="formData.Value" row="3" placeholder="请输入Value值"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          
          <el-row>
            <el-col :span="22">
              <el-form-item  prop="Desc" label="描述">
                <el-input type="textarea" v-model="formData.Desc" row="3" placeholder="请输入描述"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="btnSure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data(){
    return {
    	initData:{},
      isShow: false,
      saveState: true,
      option: {
        isModal: true,
        title: '新增数据字典',
        width: '800px',
        top: '80px',
        backdata: {}
      },
      formData: {
      	Key:'',
      	Value:'',
        Desc:'',
      },
      maillist:[],
      rules: {
        Key: [
        	{ required: true, message: '请输入Key值', trigger: 'blur' }
        ],
        // Value: [
        //   {required: true, message: '请输入Value值', trigger: 'change' }
        // ],
      }
    }
  },
  components: {
  },
  methods: {
    show: function(data, opt){
      this.isShow = true
      this.saveState = true
      this.option = Object.assign(this.$options.data().option, opt)
      this.initData = data
    },
    openHandle: function(){
      this.$refs.shopCreateForm.resetFields()
      if(this.initData){
        Object.assign(this.formData, this.initData)
      }else{
        this.formData = Object.assign({}, this.$options.data().formData) 
      }
    },
    btnSure: function(){
       this.$refs.shopCreateForm.validate(valid => {
        if (valid) {
          if(!this.saveState){
            return
          }
          this.saveState = false
          this.CFunc.showMsg('新增购物车任务成功!')
          var formdata = Object.assign({}, this.formData)
          this.$emit('formdata', formdata, this.option.backdata)
          this.isShow = false
        } else {
          this.CFunc.showMsg('请先完善信息,再提交!', 'error')
          return false
        }
      })
    },
  },

}
</script>

<style scoped lang="scss">
  .line{
    text-align: center;
  }
</style>
