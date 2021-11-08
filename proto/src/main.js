import { createApp } from 'vue'
// import Vuex from 'vuex'
import App from './App.vue'
import store from './store'

createApp(App)
    .use(store)
    .mount('#app')



//const store = new Vuex.Store({
//    state: {
//        count: 0
//    },
//    mutations: {
//        increment (state) {
//            state.count++
//        }
//    }
//})

