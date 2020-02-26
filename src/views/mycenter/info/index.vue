<template>
  <div class="app-container">
  	 <el-tabs type="border-card">
		  <!-- <el-tab-pane label="个人信息">
		  	<el-form label-position="left" label-width="110px" class='info'>
		  		<header class="personal">
		  	 		<el-row>
				      <el-col :span="8">
				        <el-form-item label="账号:">
				          	{{userInfo.UserName}}
				        </el-form-item>
				      </el-col>
				      <el-col :span="8">
				        <el-form-item label="昵称:">
				          	{{userInfo.RealName}}
				        </el-form-item>
				      </el-col>
				    </el-row> 
				  </header>
		  		
				  
				  <section class="loginlist">
				  	<header>登陆记录</header>
				  	<el-table :data="personInfo.tableData" border style="width: 100%">
					    <el-table-column prop="CreateTime" label="日期" ></el-table-column>
					    <el-table-column prop="IPAddress" label="地址">
					      <template slot-scope='scope'>
					      	{{scope.row.IPAddress?scope.row.IPAddress:'未知'}}
					      </template>
					    </el-table-column>
					    <el-table-column prop="IP" label="登录IP"></el-table-column>
					  </el-table>
				  </section>
				  
		  	</el-form>		  	
		  </el-tab-pane> -->

		  <el-tab-pane label="修改密码">
        
		  	<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
		  		<el-form-item label="旧密码" prop="oldpass">
				    <el-input type="password" v-model="ruleForm.oldpass" autocomplete="off"></el-input>
				  </el-form-item>
				  <el-form-item label="新密码" prop="newpass">
				    <el-input type="password" v-model="ruleForm.newpass" autocomplete="off"></el-input>
				  </el-form-item>
				  <el-form-item label="确认新密码" prop="checkPass">
				    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
				  </el-form-item>
				  <el-form-item>
				    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
				    <el-button @click="resetForm('ruleForm')">重置</el-button>
				  </el-form-item>
				</el-form>
		  </el-tab-pane>
		</el-tabs>  	 
		<with-draw ref="withDraw" @getmoney="getmoney"></with-draw>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import { loginList, accountList, changepass } from '@/api/mycenter'
import tyPage from '@/components/TyPagination'
import withDraw from '../components/withDraw'

export default {
	components: {
    tyPage: tyPage,
    withDraw:withDraw
  },
  data() {
  	var validateOldPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
  	var validateNewPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }else if(value === this.ruleForm.oldpass){
        	callback(new Error('新密码不能与旧密码相同！'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.newpass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
			personInfo:{
				username:'21547854596@qq.com',
				nikename:'任逍遥',
				phone:'12547895875',
				address:'',
				tableData: []
			},
			accountInfo:{
				surplus:2000,
				backsurplus:500,
				member:30,
				date:'',
				searchWord:'',
				tableData:[],
				typeList:[{label:'消费',value:'消费'},{label:'充值',value:'充值'}],
				page:{
					total:91,
					pagesizes:[10,20,50,100],
					pagesize:20,
					pageshow:true,
					currentPage:2,					
				}
			},
			ruleForm: {
				oldpass:'',
	      newpass: '',
	      checkPass: '',
	    },

	    rules: {
	    	oldpass: [
	        { validator: validateOldPass, trigger: 'blur' },
	        { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
	      ],
	      newpass: [
	        { validator: validateNewPass, trigger: 'blur' },
	        { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
	      ],
	      checkPass: [
	        { validator: validatePass2, trigger: 'blur' },
	        { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
	      ],
	    }
    }
	},
	computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  created() {
  },
  mounted() {
    // this.loginList()
    //this.accountList()
    // this.$store.dispatch('user/GetAllUser').then((res) =>{
    // 	this.accountInfo.surplus = res.Money
    // 	this.accountInfo.backsurplus = res.Rebate
    // })
  },
  methods: {
  		loginList: function(){
  			var logindata = {
  				Page:1,
  				PageSize:10,
  				OrderBy:'CreateTime Desc'
  			}
  			loginList(logindata).then(async res => {
  				this.personInfo.address = res.data.DataList[0].IPAddress
					this.personInfo.tableData = res.data.DataList
	      })
  		},
  		accountList: function(){
  			var accountdata = {
  				Page:1,
  				PageSize:10,
  				OrderBy:"CreateTime Desc"
  			}
  			accountList(accountdata).then(async res => {
  				this.accountInfo.tableData = res.data.DataList
  			})
  		},
  		searchAccount:function(){
  			if(this.accountInfo.date){
  				var start = this.accountInfo.date[0] + ' 00:00:00'
  				var end = this.accountInfo.date[1] + ' 23:59:59'
  			}
  			if(this.accountInfo.searchWord){
  				var type = this.accountInfo.searchWord
  			}
				var accountdata = {
					Page:1,
					PageSize:10,
					OrderBy:'CreateTime Desc',
					TimeStart:start|| '',
					TimeEnd:end || '',
					Type: type || '',
				}
//			console.log(accountdata)
//			return
  			accountList(accountdata).then(async res => {
  				this.accountInfo.tableData = res.data.DataList
  			})
  	},
  		//账户信息分页切换一页选择显示几条
	    pageChange: function(pageData){
	      console.log(pageData) 
	    },
  		//修改密码提交
			submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {              	
          	var passdata = {
          		userName:this.userInfo.UserName,
          		password:this.ruleForm.oldpass,
          		newpassword:this.ruleForm.newpass,
          	}       	
          	changepass(passdata).then(async res => {
			        this.CFunc.showMsg('修改密码成功')
			        await this.$store.dispatch('user/logout', this.loginForm)
			        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
			      })  	
          } else {
            console.log('修改密码失败!!');
            return false;
          }
        });
      },
      //修改密码重置
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //提现
      withdraw(key){
      	if(key == 1){
      		var opt = {
	      		title:'账户提现',
	      	}
      		this.$refs.withDraw.show(opt)
      	}else if(key == 2){
      		var opt = {
	      		title:'账户充值',
	      	}
      		console.log('账户充值')
      	}      	
      },
      getmoney(money){
				console.log(money)
			},
  }
}
</script>
<style lang="scss">
	.info{ 
		.personal{
			box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
			padding: 10px 30px;
		}
		.loginlist,.accountlist{
			margin-top: 20px;
			header{
				height: 35px;
		    line-height: 35px;
		    border: 1px solid #eee;
		    border-bottom: none;
		    padding: 0 10px;
			}
			.searchbox{
				border: 1px solid #eee;
		    border-bottom: none;
		    padding: 10px 20px;
			}
			.page{
				border: 1px solid #eee;
		    border-top: none;
		    padding: 10px 0;
			}
		}
	}
	
	.demo-ruleForm{
		width: 600px;
		margin: 0 auto;
	}
</style>