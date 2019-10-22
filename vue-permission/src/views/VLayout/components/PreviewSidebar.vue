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
import menus from '../menus'
import userInfoMixins from "@/js/mixins/userInfoMixin.js";

export default {
  name: 'SilderBar',
  components: {
    VAppMenu
  },
  props: {
    collapse: {
      type: Boolean,
      default: false,
    },
    menus: {
      type: Array,
      default: () => {
        return [];
      },
    }
  },
  mixins: [userInfoMixins],

  mounted() {
    this.initMenu();
  },
  data() {
    return {
    }
  },
  computed: {
    currentId() {

    }
  },
  methods: {
    initMenu () {

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
<style lang="scss" >
  .menu-icon{
    display: inline-block;
    width: 30px;
    height: 30px;
    background-size: contain;
    /* position: relative; */
    padding-left: 5px;
    background-repeat: no-repeat;
  }
  $imgUrl: '../../../assets/images/mobile/';
  .head {background-image: url( $imgUrl + "1-Yu-W.png")}
  .thoracic {background-image: url( $imgUrl + "2-Yu-W.png")}
  .upperLimb {background-image: url( $imgUrl + "3-Yu-W.png")}
  .male {background-image: url( $imgUrl + "4-Yu-W.png")}
  .female {background-image: url( $imgUrl + "5-Yu-W.png")}
  .lowerLimb {background-image: url( $imgUrl + "6-Yu-W.png")}
  .item7 {background-image: url( $imgUrl + "7-Yu-W.png")}

</style>
