<template>
  <div class="amz-site">
    <el-select v-model="site" filterable placeholder="请选择站点" :multiple='isMutiple' @change="changeHandle">
      <el-option v-if="showAll" label="全部站点" value=""></el-option>
      <el-option v-if="!area || item.LocationArea == area" v-for="(item, index) in siteList" :key="index" :label="item.LocationName" :value="item.Location"></el-option>
    </el-select>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'amzSite',
  data(){
    return {
      site: '',
    }
  },
  computed: {
    ...mapGetters(['siteList'])
  },
  props: ['value', 'type', 'showAll', 'isMutiple', 'area'],
  model: {
    prop: 'value',
    event: 'input'
  },
  watch: {
    site: function(newVal, oldVal){
      this.$emit('input', newVal)
    },
    value:{
      handler: function(newVal, oldVal){
        this.site = this.value
      },
      immediate: true
    } 
  },
  methods: {
    changeHandle: function(val){
      this.$nextTick( ()=> {
        var siteObj = {name: '全部', val: ''}
        this.siteList.forEach(item => {
          if(item.Location == val){
            siteObj = {name: item.LocationName, val: item.Location}
          }
        });
        this.$emit('sitec', siteObj, this.type)
      })
    }
  }
}
</script>
