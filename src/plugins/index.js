
import Tyimg from '@/components/GlobalComponent/TyImg'
import TyNumbIpt from '@/components/GlobalComponent/TyNumbIpt'


export default {
  install: function(Vue){
    let componentList=[
      {name: 'tyimg', component: Tyimg},
      {name: 'tynumbipt', component: TyNumbIpt},
    ]
    componentList.forEach(item=>{
      Vue.component(item.name, item.component)
    })
  }
}