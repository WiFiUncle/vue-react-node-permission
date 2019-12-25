export default {
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
  }
}
