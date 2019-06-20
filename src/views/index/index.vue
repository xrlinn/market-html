<template>
  <div class="index">
    <div class="index-header">
        <!-- <input type="text" class="input" placeholder="请搜索物品">
        <i class="iconfont icon-sousuo"></i> -->
        <Search v-model="value" :result.sync="result" @click.native="handleSearch"></Search>
    </div>
    <!-- <Loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded"  ref="loadmore" :auto-fill="false"> -->
    <MySwiper/>
    <nav-bar/>
    <router-view></router-view>
    <!-- <tab-bar/> -->
    <!-- </Loadmore> -->
  </div>
</template>

<script>
import MySwiper from '@/components/swiper'
import dyInput from '@/components/dy-input'
import navBar from '@/components/nav-bar'
// import contentItem from './contentItem'
import { Loadmore,Search } from 'mint-ui'
export default {
  name: 'index',
  components: {
    MySwiper,
    dyInput,
    navBar,
    Search
  },
  data () {
    return {
      result: [],
      value: ''
    }
  },
  methods: {
    handleSearch () {
      this.$router.push({
        name: 'searchRes'
      })
    }
  }
}
</script>

<style  lang="scss">
@import "../../globalCss/px2-rem";
  .index {
    padding-bottom: 60px;
  }
  .index-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    height: px-to-rem(100);
    // text-align: center;
    background-image: linear-gradient(to right, #FD9126, #FF5000);
    justify-content: center;
    z-index: 2;
    .mint-search{
      height: 50px;
    }
    .mint-searchbar{
      background: none;
      align-self: center;
      margin-top: 7px; 
      .mint-searchbar-inner {
        border-radius: 16px;
        .mintui-search {
          font-size: 14px;
        }
      }
    }

    // .iconfont {
    //   position: absolute;
    //   top: px-to-rem(24);
    //   left: px-to-rem(150);
    //   font-size: 22px;
    //   z-index: 4;
    // }
  }
</style>
