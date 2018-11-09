import Vue from 'vue';
import Vuex from 'vuex';
import testStore from './modules/testStore'

Vue.use(Vuex);
export default ()=>{
    return new Vuex.Store({
        modules:{
            testStore
        },
        strict: false
    })
}