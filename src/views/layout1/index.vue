<template>
    <div class="layout1">
        <Header fixed :title="$route.meta.title">
          <Button icon="back" slot="left" @click="jump">返回</Button>
        </Header>
        <Navbar v-model="selected" >
            <TabItem id="one">全部</TabItem>
            <TabItem id="two">待付款</TabItem>
            <TabItem id="three">待发货</TabItem>
            <TabItem id="four">待收货</TabItem>
            <TabItem id="five">待评价</TabItem>
        </Navbar>
        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import { Navbar, TabItem, Header, Button } from 'mint-ui'
export default {
  name: 'like',
  components: {
    Navbar,
    TabItem,
    Header,
    Button
  },
  data () {
      return {
        selected: 'one' 
      }
  },
  methods: {
    jump () {
      this.$router.push({
        name: 'person'
      })
    }
  },
  watch: {
    selected (val) {
      this.$router.push({
        name: val
      })
    }
  },
  created () {
    this.selected = this.$route.name
  }
}
</script>

<style scoped lang="scss">
@import '../../globalCss/px2-rem.scss';
.mint-header{
      background: rgba(255,255,255,0.1);
      color: #333333;
    }
.layout1 {
    margin-top: px-to-rem(80);
}
</style>
