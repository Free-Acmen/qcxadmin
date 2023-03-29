<template>
  <div class="app-container">
  	 <el-tabs type="border-card">
		  <el-tab-pane label="参数设置">
		  	<el-form :model="form" status-icon :rules="rules" ref="ruleForm" label-width="120px" style="width: 800px;margin: 0 auto;">
		  		<el-form-item label="首页图" prop="oldpass">
						<div style="width:80px;">
							<upload  @success="successHandle" :drag="false"></upload>
						</div>
						
            <tyimg :lazy="true" v-if="form.homeImage" :src="form.homeImage" width="300px" height="160px"></tyimg>
				  </el-form-item>
				  <el-form-item label="首页图跳转地址" prop="bannerUrl">
				    <el-input v-model="form.bannerUrl" autocomplete="off"></el-input>
				  </el-form-item>
			
				  <el-form-item>
				    <el-button type="primary" @click="submitForm()">提交</el-button>
				    <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
				  </el-form-item>
				</el-form>
		  </el-tab-pane>
		</el-tabs>  	 

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import upload from '@/components/Upload/fileUpload'

import { setHomeConfig, getHomeConfig } from '@/api/score'

export default {
	components: {
		upload: upload
  },
  data() {
    return {
			form: {
				homeImage:'',
	      bannerUrl: ''
	    },
	    rules: {
	    	
	    }
    }
	},
	computed: {

  },
  mounted() {
		this.getConfig()
  },
  methods: {
		getConfig(){
			getHomeConfig().then(res=>{

			})
		},
		successHandle(res, files){
			this.form.homeImage = '//adm.kaoyanxiao.com/dat/Uploads'+ res.data[0].FilePath
		},
		submitForm(){
			let data = JSON.stringify(this.form)
			setHomeConfig({setting: data}).then(res=>{

			})
		}
  }
}
</script>
<style lang="scss">
	
</style>