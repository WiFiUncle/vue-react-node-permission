<template>
    <div>
      <slot name="header"></slot>
      <template v-for="(item,index) in menus">
        <el-submenu :index="String(item.id)" v-if="!!item.children&&item.children.length>0" :key="'p_'+index">
          <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title" class="left-menu--text menu-name">{{item.name}}</span>
          </template>
          <v-app-menu :menus="item.children" />
        </el-submenu>
        <el-menu-item v-else :key="'p_s_'+index" :index="String(item.id)"  @click="goRoute(item)">
          <i :class="item.icon"></i>
          <span slot="title" class="left-menu--text">{{item.name}}</span>
        </el-menu-item>
      </template>
    </div>
</template>
<script>
export default {
  name: 'v-app-menu',
  props: {
    menus: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
    }
  },
  methods: {
    goRoute (item) {
      let url = item.link || '/preview'
      if (item.firstLev) {
        url = url + '?firstLev=' + item.firstLev + '&secondLev=' + item.secondLev
      }
      this.$router.push(url)
    }
  }
}
</script>
