<template>
  <div class="user-select">
    <el-select style="width:100%;" v-model="userId" filterable :clearable="clearable" :filter-method="diyUserFilter" default-first-option  :placeholder="placeholder" :multiple='isMutiple'  @change="changeHandle" @visible-change="diyUserFilter('')">
      <el-option :label="item.RealName" :value="item.Id" v-for=" item in options" :key="item.Id"></el-option>
    </el-select>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getUserList } from '@/api/jobdiary/statistic'

let managerKey = {}

export default {
  name: 'userSelect',
  data(){
    return {
      userId: '',
      userList: '',
      options: ''
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  props:{
    value: {},
    isMutiple: {
      type: Boolean,
      default: false
    },
    // isDefault: { //是否有默认值
    //   type: Boolean,
    //   default: true
    // },
    type: { // 一个页面有多个选人下拉是 用来区别回调事件
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请选择人员'
    },
    clearable: {
      type: Boolean,
      default: false
    }
  }, 
  model: {
    prop: 'value',
    event: 'input'
  },
  watch: {
    userId: function(newVal, oldVal){
      this.$emit('input', newVal)
    },
    value:{
      handler: function(newVal, oldVal){
        this.userId = this.value
      },
      immediate: true
    } 
  },
  mounted() {
    getUserList().then( res => {
      this.userList = res.data
      this.options = res.data
      res.data.forEach(item => {
        managerKey[item.Id] = item
      })
    })
    // if(this.isDefault){
    //   this.userId = this.userInfo.UserId
    // }
  },
  methods: {
    diyUserFilter: function(query){
      if (query) { //query存在
        this.options = this.userList.filter((item) => {
          let str = item.RealName + item.UserName
          if(item.PYCODE){
            str += item.PYCODE
          }
          if (!!~str.indexOf(query) || !!~str.toUpperCase().indexOf(query.toUpperCase())) {
            return true
          }
        })
      } else { //query为空时，还原数组
        this.options = this.userList
      }
    },
    changeHandle: function(val){
      this.$nextTick( ()=> {
        let userObj 
        if(this.userId && this.userId instanceof Array){
          // userObj = managerKey[this.userId]
          let  arr = []
          this.userId.forEach( id => {
            arr.push(managerKey[id])
          })
          userObj = arr
        }else if(this.userId){
          userObj = managerKey[this.userId]
        }else{
          userObj = '' 
        }
        this.$emit('userchange', userObj, this.type)
      })
    }
  }
}
</script>

<style scoped>
  .user-select{
    width: 100%;
  }
</style>

