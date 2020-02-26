export default{
  data() {
    return {
      list: [],
      pageData: {},
      loading: false
    }
  },
  mounted() {
    this.GetList()
  },
  computed: {
    numb: function(){
      return this.pageData.size * (this.pageData.curPage - 1) + 1
    },
    refreshclass: function(){
    	if(this.loading){
    		return "refreshbtn refreshanimate"
    	}else{
    		return 'refreshbtn'
    	}
    }
  },
  methods: {  
    GetList: function(page){
      this.list = []
      this.pageData = this.$refs.tyPage.getPageData()
      if(this.filterData && typeof this.filterData == 'function'){
        this.filterData()
      }
      let data = {Page: page || this.pageData.curPage, PageSize: this.pageData.size}
      if(this.filter){
        Object.keys(this.filter).forEach( key => {
          if(this.filter[key] || this.filter[key] === 0 || this.filter[key] === '0' || this.filter[key] === false){
            data[key] = this.filter[key]
          }
        })
      }

      let flag = false 
      if(this.getPage){
        flag = true
      }
      this.loading = true
      this.getList(this.apiPath, data, flag).then(res => {
      	for(var i=0;i<res.data.DataList.length;i++){
          res.data.DataList[i].index = i
      	}
        this.list = res.data.DataList || []
        this.$refs.tyPage && this.$refs.tyPage.setPageData(res.data.PageSize, res.data.CurrentPage, res.data.TotalCount)
        this.loading = false
        if(this.dataLodered && typeof this.dataLodered == 'function'){
          this.dataLodered()
        }
      })
    },
    PageChange: function(pageData){
      this.GetList()
    },
    refresh:function(){
    	this.GetList()
    },
    ModuleHandle: function(data, index){
      var opt = {}
      if(data == -1){
        if(index){
          opt.backdata = {taskType: index}
        }
        this.$refs.module.show(false, opt)
      }else{
        opt.title = this.title + '编辑'
        opt.backdata = {
          type: 'edit',
          index: index,
          taskType: data.taskType || ''
        }
        this.$refs.module.show(data, opt)
      }
    },
    ModuleDataHandle: function(formdata, backdata){
      if(backdata.type == 'edit'){
        this.Update(formdata)
      }else{
        this.Add(formdata)
      }
    },
    Add: function(formdata){
      this.add(this.apiPath, formdata).then( res => {
        this.CFunc.showMsg('新增成功!')
        this.GetList()
      })
    },
    Update: function(formdata){
      this.update(this.apiPath, formdata).then(res => {
        this.CFunc.showMsg('修改成功!')
        this.GetList()
      })
    },
    ValChange: function(rowData, key, val){
      let keyArr = key.split(",")
      let valArr = typeof val == "string"?[val]:val
      keyArr.forEach((key, index) => {
        rowData[key] = valArr[index]
      })
      this.Update(rowData)
    },
    Del: function(rowData){    	
      let Id = JSON.stringify(rowData.Id)
      this.del(this.apiPath, Id).then( res => {
        this.CFunc.showMsg('删除成功!')
        this.GetList()
      })
    },
    //列表选中高亮
    ListRowHight: function(row,event,column){
      this.$refs.listTable.setCurrentRow(this.list[row.index]);
    }
  }
}