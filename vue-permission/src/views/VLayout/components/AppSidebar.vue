<template>
  <el-menu
    mode="vertical"
    background-color="#304156"
    :unique-opened="true"
    text-color="#bfcbd9"
    active-text-color="#409EFF"
    class="el-menu-vertical-custom" :default-active="String(currentId)" :collapse="collapse">
    <v-app-menu :menus="menus" />

  </el-menu>
</template>

<script>
import VAppMenu from './AppMenu.vue'
import menus from '../menus.js'
import userInfoMixins from '@/js/mixins/userInfo-mixin.js'
export default {
  name: 'SilderBar',
  components: {
    VAppMenu
  },
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  mixins: [userInfoMixins],

  mounted () {
    // this.initMenu();
  },
  watch: {
    // userInfo(val) {
    //   if(!val) return;
    //   this.menus = window.menus.some(item => {
    //       return item.role.includes(val.roleKey);
    //   })
    // }
  },
  data () {
    return {
      menus: menus
    }
  },
  computed: {
    //    menus() {
    //      let list = this.$store.getters.menuList;
    //      return list;
    //    },
    // currentId () {
    //      var arr = []
    //      ;(function fn(key, value, items, resultArr) {
    //        var checkResult = false
    //        debugger;
    //        for (let index = 0; index < items.length; index++) {
    //          const e = items[index]
    //          checkResult =
    //            e[key] === value ||
    //            (e.children && fn(key, value, e.children, resultArr))
    //          if (checkResult) {
    //            resultArr.push(e)
    //            break
    //          }
    //        }
    //        return checkResult
    //      })(
    //        'menuCode',
    //        this.$route.meta.pname || this.$route.name,
    //        this.menus,
    //        arr
    //      )
    //      return arr.map(e => e.menuId)[0]
    // }
  },
  methods: {
    initMenu () {
      if (!this.userInfo) return
      this.menus = window.menus.filter(item => {
        return item.role.includes(this.userInfo.roleKey)
      })
    }
  }
}
</script>

<style>
.el-menu-vertical-custom {
  width: 200px;
  height: 100%;
}
.el-menu-vertical-custom.el-menu--collapse {
  width: auto;
  transition: width 0.1s;
}
.el-menu--collapse .left-menu--text,
.el-menu--collapse .el-icon-arrow-right {
  /* transition: width 0.1s; */
  height: 0;
  width: 0;
  overflow: hidden;
  visibility: hidden;
  display: inline-block;
}
</style>
