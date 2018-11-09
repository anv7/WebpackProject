// 入口文件

import Vue from 'vue'
import App from './app.vue'

// 引入全局样式
import './assets/styles/global.less'

// 全局的样式
// import './assets/styles/test.css'
// import './assets/images/kemiteb.jpeg'
// import './assets/styles/test-stylus.styl'

const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
    render: (h) => h(App)
}).$mount(root)

