<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">登陆</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="请输入用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登陆</el-button>

      <div class="tips">还没有账号？
      	<!-- <router-link to="/register">立即注册~</router-link> -->
        请联系管理员
      </div>
    </el-form>

    <el-dialog title="手机验证" top="120px" width="450px" :close-on-click-modal="false"   :visible.sync="iphoneVali" >
      <el-form :model="iphoneForm" :rules="iphoneRules" label-position="left" label-width="70px" ref="iphoneForm">
        <el-form-item label="手机号" >
          {{iphoneForm.iphone}}
        </el-form-item>
        <el-form-item prop="code" label="验证码">
          <el-col :span="16">
            <el-input v-model.number="iphoneForm.code" placeholder="验证码"  autocomplete="off"></el-input>
          </el-col>
          <el-col :span="6" :offset="2">
            <el-button type="text" @click="getCode">{{codeText}}</el-button>
          </el-col>
        </el-form-item>
        <el-button :loading="loading" type="primary" style="width:100%;margin-top:30px;" @click.native.prevent="iphoneHandle">提 交</el-button>
      </el-form>
      <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="iphoneVali = false">取 消</el-button>
        <el-button type="primary" @click="iphoneVali = false">确 定</el-button>
      </div> -->
    </el-dialog>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { GetCode, LoginSubmit } from '@/api/user'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入用户名！'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于6个字符！'))
      } else {
        callback()
      }
    }
    return {
      iphoneVali: false,
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      iphoneForm: {
        iphone: '16695762422',
        code: ''
      },
      iphoneRules: {
        code: [
          {required: true, trigger: 'blur', message: '验证码不能为空'},
          {type: 'number', trigger: 'blur', message: '验证码必须为数字类型'}
        ],
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      codeText: '获取验证码',
      isdisabled: false
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            console.log(111111)
            this.$router.push({ path: this.redirect || '/' })
            // this.iphoneVali = true
            // this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getCode(){
      if(this.isdisabled){
        return 
      }
      GetCode(this.iphoneForm.iphone).then(res => {
        this.CFunc.showMsg('验证码已发送到指定手机，请查收!')
        console.log(res)
        this.setTime()
      })
    },
    setTime:function (){
      var time = 60;
      var i = 0;
      this.codeText = (time)+"s 后可重新获取";
      this.isdisabled=true
      var set = setInterval(() => {
        this.codeText = (--time)+"s  后可重新获取";
        i++;	
        if(i==60){
          this.isdisabled=false
          this.codeText = "获取验证码";
          clearInterval(set);
        }
      }, 1000);
    },
    iphoneHandle(){
      this.$refs.iphoneForm.validate(valid => {
        if (valid) {
          this.loading = true
          let data = {}
          LoginSubmit(data).then( res => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .login-form .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container .login-form {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
		a{
			color: #409EFF;
		}
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
