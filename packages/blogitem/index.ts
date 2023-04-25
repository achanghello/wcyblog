// 每个组件的入口文件

import Blogitem from './src/blogitem.vue'
import { App } from 'vue'

Blogitem.install = (app:App)=>{
    app.component(Blogitem.name,Blogitem)
}


export default Blogitem