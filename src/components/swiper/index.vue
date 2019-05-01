<template>
  <div class="swiper-container">
     <swiper v-if="swiperData.length>1" :options="swiperOption" ref="mySwiper">
    <!-- slides -->
    <swiper-slide v-for="(item, index) in swiperData" :key="index">
      <router-link :to="{name: 'details', params: {id: item.commodity._id}}" class="swiper-img-wrap">
        <img :src="item.img" :alt="item.img" class="swiper-img">
      </router-link>
    </swiper-slide>
    <!-- Optional controls -->
    <div class="swiper-pagination"  slot="pagination"></div>
  </swiper>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'index',
  data () {
    return {
      swiperOption: {
        // some swiper options/callbacks
        // 所有的参数同 swiper 官方 api 参数
        // ...
        //可选选项，自动滑动
        autoplay: true,
        // 循环滚动
        loop : true,
        //轮播图分页
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      },
      swiperData: []
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  methods: {
    getSwiper () {
      this.$axios.get(this.$api.getSwiper).then(res => {
        this.swiperData = res.data
      })
    }
  },
  // computed: {
  //     swiper() {
  //       return this.$refs.mySwiper.swiper
  //     }
  //   },
  //   mounted() {
  //     // current swiper instance
  //     // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
  //     console.log('this is current swiper instance object', this.swiper)
  //     // this.swiper.slideTo(3, 1000, false)
  //   },
  created () {
    this.getSwiper()
  }
}
</script>

<style scoped lang="scss">
 @import '../../globalCss/px2-rem';
 .swiper-container {
   margin-top: px-to-rem(50);
 }
 .swiper-img-wrap {
    display: block;
    width: 100%;
    position: relative;
    color: rgba(255,255,255,.9);
    text-decoration: none;
  }
   .swiper-img {
      height: px-to-rem(320)
    } 

</style>
