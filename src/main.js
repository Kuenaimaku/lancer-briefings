import { createApp } from 'vue'
import App from './App.vue'

import Oruga from '@oruga-ui/oruga-next'
import '@oruga-ui/oruga-next/dist/oruga.min.css'


import './assets/styles/main.scss'

createApp(App)
	.use(Oruga)
	.mount('#app')
