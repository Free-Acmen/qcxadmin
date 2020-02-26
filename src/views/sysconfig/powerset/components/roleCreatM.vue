<template>
  <div class="rule-create">
    <el-dialog  :title="option.title" :top="option.top" :close-on-click-modal="false" :modal="option.isModal" :visible.sync="isShow"  :width="option.width" append-to-body @opened="openHandle">
      <div>
        <el-form label-position="left" label-width="110px" :model="formData" :rules="rules" inline-message ref="shopCreateForm">
          <el-row>
            <el-col :span="22">
              <el-form-item  prop="Name" label="角色名称">
                <el-input v-model="formData.Name" placeholder="请输入角色名称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
					
					<el-row>
            <el-col :span="22">
              <el-form-item  prop="Type" label="角色类型">
              	<el-select v-model="formData.Type" filterable placeholder="请选择角色类型">
							    <el-option
							      v-for="item in rolelist"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							  </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          
          <el-row>
            <el-col :span="22">
              <el-form-item  prop="Description" label="描述">
                <el-input  type="textarea" v-model="formData.Description" placeholder="请输入描述"></el-input>
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
export default {
  data(){
    return {
    	initData:{},
      isShow: false,
      saveState: true,
      option: {
        isModal: true,
        title: '新增权限',
        width: '800px',
        top: '80px',
        backdata: {}
      },
      formData: {
      	Name:'',
      	Type:'',
        Description:'',
      },
      rolelist:[
      	{label:'管理员',value:'admin'},
      	{label:'用户',value:'user'},
      ],
      rules: {
        Name: [
        	{ required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        Type: [
          {required: true, message: '请选择角色类型', trigger: 'change' }
        ]
      }
    }
  },
  components: {
  },
  methods: {
    show: function(data, opt){
      this.isShow = true
      this.saveState = true
      this.option = Object.assign(this.$options.data().option, opt)
      this.initData = data
    },
    openHandle: function(){
      this.$refs.shopCreateForm.resetFields()
      if(this.initData){
        Object.assign(this.formData, this.initData)
      }else{
        this.formData = Object.assign({}, this.$options.data().formData) 
      }
    },
    btnSure: function(){
       this.$refs.shopCreateForm.validate(valid => {
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
          return false
        }
      })
    },
  },

}
</script>

<style scoped lang="scss">
  .line{
    text-align: center;
  }
</style>
