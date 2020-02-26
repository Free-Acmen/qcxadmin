<template>
  <div class="user-model">
    <el-dialog  :title="option.title" :top="option.top" :close-on-click-modal="false" :modal="option.isModal" :visible.sync="isShow"  :width="option.width" append-to-body @opened="openHandle">
      <div>
        <el-form label-position="left" label-width="110px" :model="formData" :rules="rules" inline-message ref="userModelForm">
					<el-row>
            <el-col :span="22">
              <el-form-item  prop="text" label="菜单名称">
                <el-input v-model.trim="formData.text" placeholder="请输入菜单名称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item  prop="description" label="菜单别称">
                <el-input v-model.trim="formData.description" placeholder="请输入菜单别称称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          
					<el-row>
            <el-col :span="22">
              <el-form-item  prop="IsFirst" label="菜单类型">
                <el-radio v-model="formData.IsFirst" label="1">主菜单</el-radio>
                <el-radio v-model="formData.IsFirst" label="2">子菜单</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
          
          
          <el-row v-if='formData.IsFirst=="2"'>
            <el-col :span="22">
              <el-form-item  prop="parentId" label="上级菜单">
              	<el-cascader
						    	:options="menulist"
						    	:props="Props"
						    	v-model='parentIdvalue'
						    	clearable filterable change-on-select @change="handleChange"></el-cascader>
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
	import { getUpmenulist } from '@/api/sysconfig'
export default {
  data(){
    return {
    	initData:{},
      isShow: false,
      saveState: true,
      option: {
        isModal: true,
        title: '新增菜单',
        width: '800px',
        top: '80px',
        backdata: {}
      },
      formData: {
      	text:'',
      	description:'',
        IsFirst:'1',
        parentId:'',        
      },
      parentIdvalue:[],
      Props:{
      		 label: 'text', children:'children', value:'id'
			},
			showlist:[],
      menulist:[],
      rules: {
        text: [
        	{ required: true, message: '请输入菜单名称', trigger: 'blur' }
        ],
        description: [
        	{ required: true, message: '请输入菜单别称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    show: function(data, opt, list){
    	console.log(data)
    	this.menulistdata(data)
			this.menulist = list
      this.isShow = true
      this.saveState = true
      this.option = Object.assign(this.$options.data().option, opt)
      this.initData = data      
         
      console.log(this.formData.IsFirst)
    },
    openHandle: function(){
      this.$refs.userModelForm.resetFields()
      if(this.initData){
        Object.assign(this.formData, this.initData)
      	if(this.initData.parentId == "0"){
	      	this.formData.IsFirst = '1'
	      }else{
	      	this.formData.IsFirst = '2'
	      	this.parentIdvalue.push(this.initData.parentId)
	      }	      
      }else{
        this.formData = Object.assign({}, this.$options.data().formData) 
      }
      
      console.log(this.formData.parentId)
      console.log(this.formData.parentId)
      
    },
    btnSure: function(){    	
       this.$refs.userModelForm.validate(valid => {
        if (valid) {
          if(!this.saveState){
            return
          }
          this.saveState = false
          var formdata = Object.assign({}, this.formData)
          this.$emit('formdata', formdata, this.option.backdata)
          this.isShow = false
        } else {
          this.CFunc.showMsg('请先完善信息,再提交!', 'error')
          this.saveState = true
          return false
        }
      })
    },
    handleChange:function(value){
    	this.formData.parentId = value
    },
    menulistdata:function(data){
    	for(var i in data){
    		if(data[i].children&&data[i].children == ''){
    			delete(data[i]["children"]);
    		}else{
    			this.menulistdata(data[i].children)
    		}
    	}
    }
  },

}
</script>

<style scoped lang="scss">
  .line{
    text-align: center;
  }
  .el-cascader.el-cascader--small{
  	width: 100%;
  }
</style>
