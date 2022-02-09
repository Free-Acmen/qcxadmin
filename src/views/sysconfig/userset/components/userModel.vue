<template>
  <div class="user-model">
    <el-dialog  :title="option.title" :top="option.top" :close-on-click-modal="false" :modal="option.isModal" :visible.sync="isShow"  :width="option.width" append-to-body @opened="openHandle">
      <div>
        <el-form label-position="left" label-width="110px" :model="formData" :rules="rules" inline-message ref="userModelForm">
          <el-row>
            <el-col :span="11">
              <el-form-item  prop="UserName" label="用户名" >
                <el-input v-model.trim="formData.UserName" placeholder="请输入用户名" :disabled="option.backdata.type == 'edit'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="2">
              <el-form-item  prop="UserPassword" label="密码" >
                <el-input type="password"  v-model="formData.UserPassword" placeholder="请输入密码" :disabled="option.backdata.type == 'edit'"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="11">
              <el-form-item  prop="RealName" label="真实姓名">
                <el-input v-model="formData.RealName" placeholder="请输入昵称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="2">
              <el-form-item  prop="Gender" label="性别">
                <el-radio v-model="formData.Gender" :label="0">男</el-radio>
                <el-radio v-model="formData.Gender" :label="1">女</el-radio>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="11">
              <el-form-item  prop="MobilePhone" label="手机号">
                <el-input v-model.trim="formData.MobilePhone" placeholder="请输入手机号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="2">
              <el-form-item  prop="Email" label="邮箱">
                <el-input v-model.trim="formData.Email" placeholder="请输入邮箱"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="11">
              <el-form-item  prop="CityId" label="负责区域">
                <el-select v-model="formData.CityId" filterable clearable placeholder="请选择负责区域" @change="cityChange">
                  <el-option label="全部" value="ALL"></el-option>
                  <el-option v-for="(item, index) in cityList" :key="index" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="2" v-if="formData.CityId!='ALL'">
              <el-form-item  prop="RoleId" label="负责校区">
                <el-select v-model="formData.RoleId" filterable clearable placeholder="请选择负责校区">
                  <el-option v-for="(item, index) in collegesList" :key="index" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="11">
              <!-- <el-form-item  prop="IsAdmin" label="管理员">
                <el-radio v-model="formData.IsAdmin" label="是">是</el-radio>
                <el-radio v-model="formData.IsAdmin" label="否">否</el-radio>
              </el-form-item>   -->
              <!-- <el-form-item  prop="RoleId" label="角色">
                <el-select v-model="formData.RoleId" placeholder="请选择角色">
                	<el-option
							      v-for="item in rolelist"
							      :key="item.Id"
							      :label="item.Name"
							      :value="item.Id">
							    </el-option>
							  </el-select>
              </el-form-item> -->
            </el-col>
            <el-col :span="11">
              <el-form-item  prop="IsEnabled" label="启用">
                <el-radio v-model="formData.IsEnabled" :label="true">是</el-radio>
                <el-radio v-model="formData.IsEnabled" :label="false">否</el-radio>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-form-item  prop="Description" label="备注">
                <el-input type="textarea" v-model="formData.Description" row="3" placeholder="请输入备注"></el-input>
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
import { GetAuthByRole, getNextPaths } from '@/api/sysconfig'

let cityKey=[], collegesKey=[]

export default {
  data(){
    return {
    	initData:{},
      isShow: false,
      saveState: true,
      option: {
        isModal: true,
        title: '用户信息',
        width: '800px',
        top: '80px',
        backdata: {}
      },
      // roleList: [],
      formData: {
      	UserName:'',
      	UserPassword:'',
        RealName:'',
        Email:'',
        MobilePhone: '',
        Gender: 0,
        CityId:'ALL',
        RoleId:'',

//      IsAdmin: '否',
        // RoleId:'',
        IsEnabled: true,
        Description: '',
        Status: '管理员'
      },
      cityList:[],
      collegesList:[],
      // rolelist:[],
      rules: {
        UserName: [
        	{ required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        UserPassword: [
          {required: true, message: '请输入密码', trigger: 'blur' }
        ],
        RealName: [
        	{ required: true, message: '请输入昵称', trigger: 'blur' }
        ],
        RoleId: [
        	{ required: true, message: '请选择负责校区', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    show: function(data, opt){
      this.isShow = true
      this.saveState = true
      this.option = Object.assign(this.$options.data().option, opt)
      this.initData = data
      // console.log(this.option)
      // this.getrolelist()
      this.getCityData()
    },
    openHandle: function(){
      this.$refs.userModelForm.resetFields()
      if(this.initData){
        Object.assign(this.formData, this.initData)
        if(this.formData.RoleId){
          if(this.formData.RoleId=='ALL'){
            this.formData.CityId='ALL'
          }else{
            let arr=this.formData.RoleId.split('-')
            this.formData.CityId=arr[0]
            this.cityChange()
          }
        }
      }else{
        this.formData = Object.assign({}, this.$options.data().formData) 
      }
    },
    getCityData(){
      getNextPaths('0').then(res => {
        this.cityList=res.data||[]
        this.cityList.forEach(item => {
          cityKey[item.id]=item
        });
    	})
    },
    cityChange(){
      if(this.formData.CityId=='ALL'){
        this.formData.RoleId=''
        this.collegesList=[]
        return false
      }
      getNextPaths(this.formData.CityId).then(res => {
        this.collegesList=res.data||[]
        this.collegesList.forEach(item => {
          collegesKey[item.id]=item
        });
    	})
    },
    btnSure: function(){
       this.$refs.userModelForm.validate(valid => {
        if (valid) {
          if(!this.saveState){
            return
          }
          this.saveState = false
          var formdata = Object.assign({}, this.formData)
//        if(this.option.backdata.type != 'edit'){
//          formdata.UserPassword = md5(formdata.UserPassword)
//        }
          if(formdata.CityId=='ALL'){
             formdata.RoleId='ALL'
          }else{
            // formdata.CityName=cityKey[formdata.CityId].name
            formdata.RoleName=collegesKey[formdata.RoleId].name
          }

          delete formdata.CityId
          
          console.log(formdata)
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
