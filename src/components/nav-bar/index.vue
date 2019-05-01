<template>
    <div class="navbar">
        <Navbar v-model="selected" >
            <TabItem id="all">全部</TabItem>
            <TabItem id="computer">电脑</TabItem>
            <TabItem id="clothes">衣服</TabItem>
            <TabItem id="fruit">水果</TabItem>
        </Navbar>
    </div>
</template>

<script>
import { Navbar, TabItem } from 'mint-ui'
export default {
  name: 'navBar',
  components: {
    Navbar,
    TabItem  
  },
  data () {
      return {
        selected: 'index' 
      }
  },
  created () {
    this.selected = this.$route.name
  }
  
}
</script>

<style scoped>
.navbar {
    height: 46px;
}
</style>
