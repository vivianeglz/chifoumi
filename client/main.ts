import './assets/styles/style.scss'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHand, faHandScissors, faHandBackFist } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const app = createApp(App)
app.use(router)
app.mount('#app')
library.add(faHand, faHandScissors, faHandBackFist)
app.component('FontAwesomeIcon', FontAwesomeIcon)
