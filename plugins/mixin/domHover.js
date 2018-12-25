import { hostUrl } from '~/plugins/server/apiConfig'

const domHover = {
    computed: {
        $uploadUrl() {
            return `${hostUrl}/api/upFiles`
        }
    },
    methods: {
        $domHover(ref, className) {
            className.split(';').forEach(item => {
                this.$refs[ref].classList.add(item)
            })
        },
        $domRemoveClass(ref, className) {
            className.split(';').forEach(item => {
                this.$refs[ref].classList.remove(item)
            })
        }
    }
}

export default domHover