<template>
  <div class="app-container fixed-footer">
    <header class="header">
      <span>数据字典管理</span>
      <svg-icon @click='refresh' :class-name="refreshclass" icon-class='refresh'/>
       <el-button style="float: right"  type="primary" @click="ModuleHandle(-1)">新建</el-button> 
    </header>
    <section class="content">
      <el-table ref='listTable' v-loading="loading" :data="list" @row-click="ListRowHight" highlight-current-row>
        <el-table-column align="center" label="序号" width="50">
          <template slot-scope="scope">
            {{ scope.$index + numb}}
          </template>
        </el-table-column>
        <el-table-column label="Key" width="300">
          <template slot-scope="scope">
            {{scope.row.Key}}
          </template>
        </el-table-column>  
        <el-table-column label="Value" width="300">
          <template slot-scope="scope">
          		{{scope.row.Value}}        
          </template>
        </el-table-column> 
        <el-table-column label="描述">
          <template slot-scope="scope">
          	<div class="ellipsis" :title="scope.row.Desc">
          		{{scope.row.Desc}}
          	</div>            
          </template>
        </el-table-column>  
         <el-table-column label="操作" width="90">
          <template slot-scope="scope">
            <el-button type="text" @click="ModuleHandle(scope.row, scope.$index)">编辑</el-button>
<!--            <el-button type="text" @click="Del(scope.row, scope.$index)">删除</el-button>-->
          </template>
        </el-table-column> 
      </el-table>
    </section>
    <footer class="footer">
      <ty-page ref="tyPage" @pagechange="PageChange"></ty-page>
    </footer>
    <dictionary-creat ref='module' @formdata="ModuleDataHandle"></dictionary-creat>
  </div>
</template>

<script>
import tyPage from '@/components/TyPagination'
import dictionaryCreat from './components/dictionaryCreatM'
import pageMixin from '@/mixin/tabePageMixin'
import { getList, add, del, update} from '@/api/commonCrud'


export default {
  data() {
    return {
      title: '数据字典管理',
      apiPath: 'System/KV',
      getPage: true,
    }
  },
  mixins: [pageMixin],
  mounted() {
  },
  components: {
  	dictionaryCreat: dictionaryCreat,
    tyPage: tyPage
  },
  methods: {
  	getList, 
    add, 
    del, 
    update,
  }
}
</script>

<style lang="scss">

</style>

