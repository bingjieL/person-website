import *as filters from './filters'
import Vue from 'vue'

Object.keys(filters).forEach(item => {
    Vue.filter(item, filters[item])
})