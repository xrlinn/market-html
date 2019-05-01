<template>
  <div class="index">
    <div  class="index-header">
        <input type="text" class="input" placeholder="请搜索物品">
        <i class="iconfont icon-sousuo"></i>
    </div>
    <!-- <Loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded"  ref="loadmore" :auto-fill="false"> -->
        <MySwiper/>
        <nav-bar/>
        <contentItem v-for="(item,index) in contentData" :key="index" :item="contentData" />
        <tab-bar/>
    <!-- </Loadmore> -->
  </div>
</template>

<script>
import MySwiper from '@/components/swiper'
import dyInput from '@/components/dy-input'
import tabBar from '@/components/tab-bar'
import navBar from '@/components/nav-bar'
import contentItem from './contentItem'
import { Loadmore } from 'mint-ui'
export default {
  name: 'index',
  components: {
    MySwiper,
    dyInput,
    tabBar,
    navBar,
    contentItem,
    // Loadmore
  },
  data () {
    return {
      contentData: [],
      // queryData: {
      //   pn: 1,
      //   commoditySize: 2,
      //   size: 2
      // },
      // allLoaded: false
    }
  },
  methods: {
    getContent () {
      return new Promise(resolve => {
        this.$axios.get(this.$api.getAllCommodity)
          .then(res => {
            console.log(res)
            let resData = res.data
            // if (resData.length < this.queryData.size) {
            //   this.allLoaded = true // 若数据已全部获取完毕
            // }
            this.contentData = [...this.contentData, ...resData]
            resolve()
          })
      })
    },
    // loadTop () {
    //   this.queryData = {
    //     pn: this.queryData.pn + 1,
    //     commoditySize: 2,
    //     size: 2
    //   }
    //   this.allLoaded = false
    //   this.getContent().then(() => {
    //     this.allLoaded = true
    //     this.$refs.loadmore.onTopLoaded()
    //   })
    // },
    // loadBottom () {
    //   this.queryData = {
    //     pn: this.queryData.pn + 1,
    //     bookSize: 2,
    //     size: 2
    //   }
    //   this.getContent().then(() => {
    //     // this.allLoaded = true
    //     this.$refs.loadmore.onBottomLoaded()
    //   })
    // }
  }, 
  created () {
    this.getContent()
  }
}
</script>

<style  lang="scss">
@import "../../globalCss/px2-rem";
  .index-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    height: px-to-rem(100);
    // text-align: center;
    background: #fe8800;
    justify-content: center;
    .input {
      border-radius: 10px;
      align-self: center;
      border: none;
      padding: 5px;
      padding-left: 30px; 
      z-index: 1;
    }
    .iconfont {
      position: absolute;
      top: px-to-rem(24);
      left: px-to-rem(150);
      font-size: 22px;
      z-index: 2;
    }
  }
  

</style>
