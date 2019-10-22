export default {
  mounted () {
    this.getUserInfo()
  },
  computed: {
    userInfo () {
      return JSON.parse(sessionStorage.userInfo)
    }
  },
  methods: {
    getUserInfo () {
      let id = JSON.parse(sessionStorage.userInfo)._id
      if (!id) return
      this.$store.dispatch('getUserInfo', {id})//
    }
  }
}
