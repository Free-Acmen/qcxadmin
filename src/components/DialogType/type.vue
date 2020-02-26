<template>
	<div>
		<el-dialog
		  :title="opt.title"
		  :visible.sync="dialogType"
		  width="30%"
		  :close-on-click-modal = 'false'
		  >
		  <section>
		  	<el-form :model="dialogTypeForm" :rules="rules" ref="dialogTypeForm" label-width="100px">
			  <el-form-item :label="opt.title" prop="result">
			    <el-select style="width: 88%;" v-model="dialogTypeForm.result" :allow-create="isCreate" filterable clearable placeholder="请选择">
				    <el-option
				      v-for="(item, index) in opt.windowList"
				      :key="index"
				      :label="item.Reason"
				      :value="item.Reason">
				    </el-option>
				  </el-select>
			  </el-form-item>
			</el-form>
		  </section>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="closewithdraw">取 消</el-button>
		    <el-button type="primary" @click="submitForm('dialogTypeForm')">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>

<script>
	
export default {
  name: 'dialogType',
  data(){
    return {
      dialogType:false,
      opt: {},
      dialogTypeForm: {
        result:''
      },
      rules: {
        result:[
          {required: true, message: '请选择', trigger: 'change' }
        ],
      } 
    }
  },
  computed: {
    isCreate: function(){
      return this.opt.title != '标记'
    }
  },
  methods: {
  	show(opt){
  		this.dialogType = true
  		this.opt = opt
  	},
    closewithdraw(){
      this.dialogType = false
      this.$refs['dialogTypeForm'].resetFields();
    },
    submitForm(){
      this.$refs['dialogTypeForm'].validate((valid) => {
      if (valid) {
        this.dialogType = false
        // this.CFunc.showMsg('提交成功')
        this.$emit('dialogdata', this.dialogTypeForm.result, this.opt)
        this.$refs['dialogTypeForm'].resetFields();
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