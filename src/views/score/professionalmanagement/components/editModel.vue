<template>
  <div class="user-model">
    <el-dialog  :title="option.title" :top="option.top" :close-on-click-modal="false" :modal="option.isModal" :visible.sync="isShow"  :width="option.width" append-to-body @opened="openHandle">
      <div>
        <el-form label-position="left" label-width="120px" :model="formData" :rules="rules" inline-message ref="form">
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item :label="pLabel">
                {{initData.pname}}
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item  prop="name" :label="levelLabel">
                <el-input v-model="formData.name" placeholder="请输入名称"></el-input>
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
import { GetAuthByRole } from '@/api/sysconfig'
import { getNextPaths } from '@/api/score'

export default {
  data(){
    return {
    	initData:{},
      isShow: false,
      saveState: true,
      option: {
        isModal: true,
        title: '院校信息维护',
        width: '700px',
        top: '50px',
        backdata: {}
      },
      formData: {
        name:''
      },
      rules: {
        p1id: [
        	{ required: true, message: '必选', trigger: 'change' }
        ]
      }
    }
  },
  computed:{
    levelLabel(){
      let nameArr=['省市','院校','院系','专业','专业方向','专业方向课程','科目']
      return nameArr[this.initData.level-1]
    },
    pLabel(){
      let nameArr=['省市','院校','院系','专业','专业方向','专业方向课程','科目']
      return nameArr[this.initData.level-2]
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
      this.formData = Object.assign({}, this.$options.data().formData) 
      
      this.formData = Object.assign({}, this.initData)
    },
    btnSure: function(){
       this.$refs.form.validate(valid => {
        if (valid) {
          if(!this.saveState){
            return
          }
          this.saveState = false
          var formdata = Object.assign({}, this.formData)

          // this.$emit('formdata', formdata, this.option.backdata)
          this.isShow = false
        } else {
          this.CFunc.showMsg('请先完善信息,再提交!', 'error')
          this.saveState = true
          return false
        }
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
