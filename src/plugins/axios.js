import Vue from 'vue'
import axios from 'axios'
import '../css/estilo.css'

Vue.use({
    install(Vue){
        Vue.prototype.$http = axios.create({
            baseURL: 'https://cadastro-vue-d6b54.firebaseio.com/',
        })
    }
})