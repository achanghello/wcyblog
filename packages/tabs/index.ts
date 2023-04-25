// 每个组件的入口文件

import Tabs from './src/tabs.js'
import { App } from 'vue'

Tabs.install = (app:App)=>{
    app.component(Tabs.name,Tabs)
}


export default Tabs