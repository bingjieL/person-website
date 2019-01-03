export default ({ app, route }) => {
    if(process.client) {
        let fullPath = route.path
        // console.log('---> app', route)
        let overdue = 6*60*60*1000
        // let overdue = 10000
        let timeStamp = new Date().valueOf()
        let userData = localStorage.getItem('userData')
        let _userData = userData? JSON.parse(unescape(userData)): null
        if(_userData) {
            // console.log('---> _userData', timeStamp - _userData.timeStamp)
            if(!_userData.timeStamp || timeStamp - _userData.timeStamp >= overdue ) { 
                // if(fullPath == '/changePassword' || fullPath == '/userDetail' || fullPath == '/userDetail')
                localStorage.removeItem('userData')
                app.store.commit('CLEAR_USER_BASIC')
            }
        }
    }
}