import *as ations from '../../actions/testStore'
import mutation from '../../mutaions/testStore'
import *as getters from '../../getters/testStore'

export default{
    state: mutation.state,
    mutations: mutation.mutation,
    actions: ations,
    getters: getters
}