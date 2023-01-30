<template>
  <div class="user-model" v-if="isShow">
    <el-dialog  :title="option.title" :top="option.top" :close-on-click-modal="false" :modal="option.isModal" :visible.sync="isShow"  :width="option.width" append-to-body @opened="openHandle">
      <div>
        <el-form label-position="left" label-width="80px" :model="formData" :rules="rules" inline-message ref="userModelForm">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item  prop="p1id" label="省市">
                <el-select v-model="formData.p1id" placeholder="省市" filterable @change="p1idListChange()">
                  <el-option v-for="item in p1idList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item  prop="p2id" label="院校">
                <el-select v-model="formData.p2id" placeholder="院校" filterable @change="p2idListChange()">
                  <el-option v-for="item in p2idList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item  prop="p3id" label="院系">
                <el-select v-model="formData.p3id" placeholder="院系" filterable @change="p3idListChange()">
                  <el-option v-for="item in p3idList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item  prop="p4id" label="专业">
                <el-select v-model="formData.p4id" placeholder="专业" filterable>
                  <el-option v-for="item in p4idList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item  prop="Content" label="信息内容">
                <tinymce :height="300" v-model="formData.Content"></tinymce>
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
import Tinymce from '@/components/Tinymce'

import { GetAuthByRole } from '@/api/sysconfig'
import { getNextPaths } from '@/api/score'

let p1idKey = {},  p2idKey = {},  p3idKey = {},  p4idKey = {}

export default {
  data(){
    return {
    	initData:{},
      isShow: false,
      saveState: true,
      option: {
        isModal: true,
        title: '专业历史信息',
        width: '1000px',
        top: '80px',
        backdata: {}
      },
      p1idList:[],
      p2idList:[],
      p3idList:[],
      p4idList:[],
      formData: {
        p1id:'',
        p2id:'',
        p3id:'',
        p4id:'',
        p1name:'',
        p2name:'',
        p3name:'',
        p4name:'',
        Content:''
      },
      rules: {
        p1id: [
        	{ required: true, message: '必选', trigger: 'change' }
        ],
        p2id: [
        	{ required: true, message: '必选', trigger: 'change' }
        ],
        p3id: [
        	{ required: true, message: '必选', trigger: 'change' }
        ],
        p4id: [
        	{ required: true, message: '必选', trigger: 'change' }
        ],
        Content: [
        	{ required: true, message: '必填', trigger: 'change' }
        ],
      }
    }
  },
  components:{
    Tinymce: Tinymce
  },
  methods: {
    show: function(data, opt){
      this.isShow = true
      this.saveState = true
      this.option = Object.assign(this.$options.data().option, opt)
      this.initData = data
      getNextPaths(0).then(res => {
        this.p1idList = res.data
        this.p1idList.forEach(item => {
          p1idKey[item.id] = item
        });
      })
      this.openHandle()
    },
    openHandle: function(){
      // this.$refs.userModelForm.resetFields()
      this.formData = Object.assign({}, this.$options.data().formData) 

      if(this.initData){
        console.log(this.initData)
        // Object.assign(this.formData, this.initData)
        this.p1idListChange(this.initData.p1id)
        this.p2idListChange(this.initData.p2id)
        this.p3idListChange(this.initData.p3id)

        Object.assign(this.formData, this.initData)

        // this.formData.InputData = JSON.parse(this.formData.InputData)
      }
    },
    p1idListChange: function(id){
      getNextPaths(id||this.formData.p1id).then(res => {
        this.p2idList = res.data
        this.p2idList.forEach(item => {
          p2idKey[item.id] = item
        });
      })
      this.p2idList = []
      this.formData.p2id = ''
      this.p3idList = []
      this.formData.p3id = ''
      this.p4idList = []
      this.formData.p4id = ''
      // this.GetList(1)
    },
    p2idListChange: function(id){
      let data = JSON.stringify(id||this.formData.p2id)
      getNextPaths(data).then(res => {
        this.p3idList = res.data
        this.p3idList.forEach(item => {
          p3idKey[item.id] = item
        });
      })
      this.p3idList = []
      this.formData.p3id = ''
      this.p4idList = []
      this.formData.p4id = ''
      // this.GetList(1)
    },
    p3idListChange: function(id){
      let data = JSON.stringify(id||this.formData.p3id)
      getNextPaths(data).then(res => {
        this.p4idList = res.data
        this.p4idList.forEach(item => {
          p4idKey[item.id] = item
        });
      })
      this.p4idList = []
      this.formData.p4id = ''
      // this.GetList(1)
    },
    btnSure: function(){
       this.$refs.userModelForm.validate(valid => {
        if (valid) {
          if(!this.saveState){
            return
          }
          this.saveState = false
          var formdata = Object.assign({}, this.formData)

          // formdata.InputData = JSON.stringify(formdata.InputData)
          formdata.p1name = p1idKey[formdata.p1id].name
          formdata.p2name = p2idKey[formdata.p2id].name
          formdata.p3name = p3idKey[formdata.p3id].name
          formdata.p4name = p4idKey[formdata.p4id].name

          delete formdata.index

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
