

const state = {
    userData: {
        commentUserEmail: '',
        commentUserName: '',
        commentUserImg: ''
    }
}

const mutation = {
    "SET_USER_BASIC": (state, userData)=> {
        return state.userData = userData
    },
    "CLEAR_USER_BASIC": (state)=> {
        return state.userData = {
            commentUserEmail: '',
            commentUserName: '',
            commentUserImg: ''
        }
    }  
}


export default {
    state,
    mutation
}