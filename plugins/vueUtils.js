import Vue from 'vue'

const imgArr = [
    'http://blog.8bjl.cn/upload/header/header1.jpg',
    'http://blog.8bjl.cn/upload/header/header10.jpeg',
    'http://blog.8bjl.cn/upload/header/header2.jpeg',
    'http://blog.8bjl.cn/upload/header/header3.jpeg',
    'http://blog.8bjl.cn/upload/header/header4.jpeg',
    'http://blog.8bjl.cn/upload/header/header5.jpeg',
    'http://blog.8bjl.cn/upload/header/header6.jpeg',
    'http://blog.8bjl.cn/upload/header/header7.jpeg',
    'http://blog.8bjl.cn/upload/header/header8.jpeg',
    'http://blog.8bjl.cn/upload/header/header9.jpeg'
]
function deepCopy(obj) {
    var result = Array.isArray(obj) ? [] : {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'object') {
            result[key] = deepCopy(obj[key]);   //递归复制
            } else {
            result[key] = obj[key];
            }
        }
    }
    return result;
}


let Utils = {
    install(Vue) {
        Vue.prototype.$deepCopy = function(val) {
            return deepCopy(val)
        },
        Vue.prototype.$randdomHeader = function() {
            return imgArr[Math.floor(Math.random()*10)] 
        }
    }
}

Vue.use(Utils)
