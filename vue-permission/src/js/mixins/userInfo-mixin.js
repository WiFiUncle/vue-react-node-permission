export default {
  mounted () {
    this.getUserInfo()
  },
  computed: {
    userInfo () {
      if (sessionStorage.userInfo) {
        return JSON.parse(sessionStorage.userInfo)
      } else {
        return {}
      }
    }
  },
  methods: {
    getUserInfo () {
      if (sessionStorage.userInfo) {
        let id = JSON.parse(sessionStorage.userInfo)._id
        if (!id) return
        this.$store.dispatch('getUserInfo', {id})//
      }
    }
  }
}
