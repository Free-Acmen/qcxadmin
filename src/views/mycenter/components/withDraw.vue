<template>
	<div>
		<el-dialog
		  :title="opt.title"
		  :visible.sync="withdrawshow"
		  width="30%"
		  :close-on-click-modal = 'false'
		  >
		  <section>
		  	<el-form :model="withdrawForm" status-icon :rules="rules" ref="withdrawForm" label-width="100px">
			  <el-form-item label="提现金额" prop="money">
			    <el-input v-model="withdrawForm.money" autocomplete="off"></el-input>
			  </el-form-item>
			</el-form>
		  </section>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="closewithdraw">取 消</el-button>
		    <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>

<script>
	
export default {
  name: 'withDraw',
  data(){
  	var validateMoney = (rule, value, callback) => {
	    if (value === '') {
	      callback(new Error('请输入提现金额！'));
	    } else {
	    	var reg = /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/
	      if (!reg.test(value)) {
	        callback(new Error('请输入正确的提现金额！'));
	      }
	      callback();
	    }
	  };
  	
    return {
      withdrawshow:false,
      opt:[],
      withdrawForm: {
		money:''
      },
      rules: {
		money: [
			{ validator: validateMoney, trigger: 'blur' }
		],
	  }
    }
  },

  methods: {
  	show(opt){
  		this.withdrawshow = true
  		this.opt = opt
  	},
	closewithdraw(){
		this.withdrawshow = false
		//this.withdrawForm.money = ''
		this.$refs['withdrawForm'].resetFields();
	},
	submitForm(){
		this.$refs['withdrawForm'].validate((valid) => {
          if (valid) {
            this.withdrawshow = false
            this.CFunc.showMsg('提交成功')
            this.$emit('getmoney', this.withdrawForm.money)
            this.$refs['withdrawForm'].resetFields();
          } else {
			this.CFunc.showMsg('提交失败','error')
            return false;
          }
        });
	}
  }
}
	
</script>

<style>
</style>