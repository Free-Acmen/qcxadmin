<template>
  <div class="user-model">
    <el-dialog  :title="option.title" :top="option.top" :close-on-click-modal="false" :modal="option.isModal" :visible.sync="isShow"  :width="option.width" append-to-body @opened="openHandle">
      <div>
        <el-form label-position="left" label-width="120px" :model="formData" :rules="rules" inline-message ref="form">
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item :label="levelLabel">
                {{initData.name}}
              </el-form-item>
            </el-col>
            <el-col :span="24" v-if="initData.level==1">
              <el-form-item  prop="p2name" label="院校">
                <el-input v-model="formData.p2name" placeholder="请输入院校名称"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="24" v-if="initData.level==2">
              <el-form-item  prop="p3name" label="院系">
                <el-input v-model="formData.p3name" placeholder="请输入院校名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24" v-if="initData.level==3">
              <el-form-item  prop="p4name" label="专业">
                <el-input v-model="formData.p4name" placeholder="请输入专业名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24" v-if="initData.level==4">
              <el-form-item  prop="p5name" label="专业方向">
                <el-input v-model="formData.p5name" placeholder="请输入专业名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24" v-if="initData.level==5">
              <el-form-item  prop="p6name" label="专业方向课程">
                <el-input v-model="formData.p6name" placeholder="如: 思想政治理论+英语（一）+数学（三）+金融学综合"></el-input>
              </el-form-item>
            </el-col>
             <el-col :span="24" v-if="initData.level==6">
              <el-form-item  prop="p7name" label="课程名称">
                <el-input v-model="formData.p7name" placeholder="如: 金融学综合"></el-input>
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
        width: '600px',
        top: '50px',
        backdata: {}
      },
      formData: {
        p1name:'',
        p2name:'',
        p3name:'',
        p4name:'',
        p5name:'',
        p6name:'',
        p7name:''
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
      if(this.initData){
        
      }
    },
    btnSure: function(){
       this.$refs.form.validate(valid => {
        if (valid) {
          if(!this.saveState){
            return
          }
          this.saveState = false
          var formdata = Object.assign({}, this.formData)

          let level = Number(this.initData.level)+1
          let name = formdata['p'+level+'name']
          let prid =  this.initData.id.split('-').slice(-1)[0]

          let rid= Math.random().toString().slice(-3)
          let id = this.initData.id+ '-' + rid
          let nodeData={
            id: id,
            rid: rid,
            isSmall: level-7>=0,
            level: level,
            name: name,
            pid: this.initData.id,
            pname: this.initData.name,
            prid: prid
          }

          this.$emit('formdata', nodeData, this.initData)
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
