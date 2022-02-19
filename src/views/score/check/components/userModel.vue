<template>
  <div class="user-model">
    <el-dialog  :title="option.title" :top="option.top" :close-on-click-modal="false" :modal="option.isModal" :visible.sync="isShow"  :width="option.width" append-to-body @opened="openHandle">
      <div>
        <el-form label-position="left" label-width="210px" :model="formData" :rules="rules" inline-message ref="userModelForm">
          
          <el-row>
            <el-col :span="10">
              <el-form-item  prop="RealName" label="姓名">
                <el-input v-model="formData.RealName" placeholder="请输入姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10" :offset="2">
              <el-form-item  prop="UserName" label="手机号">
                {{formData.UserName}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10" v-for="(item, index) in formData.InputData" :key="index" :offset="index%2==0 ? 0 : 2">
              <el-form-item :prop="'InputData.'+index+'.grade'" :label="item.name" :rules="[{required: true, message: '该项必填', trigger: 'blur'}]">
                <!-- <el-input v-model="formData.RealName" placeholder="请输入姓名"></el-input> -->
                <el-input-number v-model="item.grade" :controls="false" :min="0"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <div style="height: 260px;">
            <tyimg :src="'//adm.kaoyanxiao.com/dat/Uploads'+formData.Image"></tyimg>
          </div>

          <el-row>
            <el-col :span="22">
              <el-form-item  prop="Checked" label="审核状态">
                <el-radio v-model="formData.Checked" :label="true">已审核</el-radio>
                <el-radio v-model="formData.Checked" :label="false">未审核</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
          
          <el-row>
            <el-col :span="22">
              <el-form-item  prop="Remark" label="备注">
                <el-input type="textarea" v-model="formData.Remark" :rows="4" placeholder="请输入备注"></el-input>
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
import md5 from 'js-md5'
import { GetAuthByRole } from '@/api/sysconfig'

export default {
  data(){
    return {
    	initData:{},
      isShow: false,
      saveState: true,
      option: {
        isModal: true,
        title: '用户分数',
        width: '860px',
        top: '80px',
        backdata: {}
      },
      formData: {
        RealName: '',
        UserName: '',
        Image: '',
        InputData: [],
        Checked: false,
      	Remark:'',
      },
      rules: {
        RealName: [
        	{ required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        // UserPassword: [
        //   {required: true, message: '请输入密码', trigger: 'blur' }
        // ],
        // RealName: [
        // 	{ required: true, message: '请输入昵称', trigger: 'blur' }
        // ]
      }
    }
  },
  methods: {
    show: function(data, opt){
      this.isShow = true
      this.saveState = true
      this.option = Object.assign(this.$options.data().option, opt)
      this.initData = data
    },
    openHandle: function(){
      this.$refs.userModelForm.resetFields()
      this.formData.Image = ''
      if(this.initData){
        Object.assign(this.formData, this.initData)
        this.formData.InputData = JSON.parse(this.formData.InputData)
      }else{
        this.formData = Object.assign({}, this.$options.data().formData) 
      }
    },
    btnSure: function(){
       this.$refs.userModelForm.validate(valid => {
        if (valid) {
          if(!this.saveState){
            return
          }
          this.saveState = false
          var formdata = Object.assign({}, this.formData)
          formdata.InputData = JSON.stringify(formdata.InputData)

          this.$emit('formdata', formdata, this.option.backdata)
          this.isShow = false
        } else {
          this.CFunc.showMsg('请先完善信息,再提交!', 'error')
          this.saveState = true
          return false
        }
      })
    },
    // getrolelist:function(){
    // 	var data = {}
    // 	GetAuthByRole(data).then(res => {
    // 		this.rolelist = res.data
    // 	})
    // }
  },

}
</script>

<style scoped lang="scss">
  .line{
    text-align: center;
  }
</style>
