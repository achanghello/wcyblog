// 每个组件的入口文件

import Upload from './src/test.vue'
import { App } from 'vue'

Upload.install = (app:App)=>{
    app.component(Upload.name,Upload)
}


export default Upload