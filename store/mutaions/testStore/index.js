

const state = {
    testIndex: 1
}

const mutation = {
    "TEST_INDEX_ADD": (state)=> {
        state.testIndex = state.testIndex+1
    },
    "TEST_INDEX_REDUCE": (state)=> {
        state.testIndex = state.testIndex-1
    }  
}


export default {
    state,
    mutation
}