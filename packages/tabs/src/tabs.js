import { provide,emit } from 'vue'
import { useVModel } from './useTabsVMdel'
export default {
  name: 'AcTabs',
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    type: String
  },
  emit:['update:modelValue'],
  setup (props, { emit,slots }) {
    let activeName = useVModel(props, 'modelValue', emit)
    
    
    // console.log("slots",slots.default());
    // 定义点击事件的事件处理函数
    const clickCheckName = (name,index) => {
      // console.log("你爱着谁",name);
      activeName.value = name
      emit('tab-click', { name, index })
    }
    provide('activeName', activeName)
 
    return { activeName, clickCheckName }
  },
  render () {
    const panels = this.$slots.default()
    let type = this.type
    const dynamicPanels = []
    panels.forEach(item => {
      // console.log("类型",item);
      // 提取静态的组件内容
      if (item.type.name === 'AcTabPane') {
        dynamicPanels.push(item)
      } else {
        // 提取动态的组件内容
        item.children.forEach(i => {
          dynamicPanels.push(i)
        })
      }
    })
    // console.log("等一下---",panels);
    const nav = <nav>{
      dynamicPanels.map((item, index) => {
        return <a onClick={() => this.clickCheckName(item.props.name,index)} class={{ active: item.props.name === this.modelValue }}>{ item.props.label }</a>
        // return <a href="javascript:;">56456465654</a>
      })
    }</nav>
 
    // return <div class="tabs">{[nav, panels]}</div>
    return <div class={{'ac-tabs':true,'ac-tabs--title':type==='title'}}>{[nav,panels]}</div>
  }
}
