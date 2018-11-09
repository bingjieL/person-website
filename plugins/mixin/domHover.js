const domHover = {
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