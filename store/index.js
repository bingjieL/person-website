import Vue from 'vue';
import Vuex from 'vuex';
import userBasic from './modules/userBasic'

Vue.use(Vuex);
export default ()=>{
    return new Vuex.Store({
        modules:{
            userBasic
        },
        strict: false
    })
}