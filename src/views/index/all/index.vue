<template>
    <div>
        <div class="container">
            <div class="container-left" v-for="(item,index) in contentData" :key="index">
                <router-link :to="{name: 'details', params: {id: item._id}}" class="link">
                    <div class="img">
                        <img :src="item.img" alt="">
                    </div>
                    <div class="title">
                        {{item.title}}
                    </div>
                    <div class="price-info">
                        <div class="price">
                            $<span class="price-num">{{item.price}}</span>
                        </div>
                        <div class="paycount">
                            {{item.paycounts}}人付款
                        </div>
                    </div>
                </router-link>
            </div>
        </div> 
    </div>
</template>

<script>
export default {
  name: 'all',
  components: {
      
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

<style scoped lang="scss">
  @import "@/globalCss/px2-rem.scss";
  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    
      .container-left {
        width: 46%;
        .link {
          background: #fff;
          margin-top: 10px;
          box-sizing: border-box;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          height: px-to-rem(560);

          .title {
            color:#000000;
            margin-bottom: 20px;
            width: 80%;
            overflow:hidden;
            text-overflow: ellipsis;
            display:-webkit-box;
            /*! autoprefixer: off */
            -webkit-box-orient:vertical;
            -webkit-line-clamp:2;
            /*! autoprefixer: on */
          }
          .price-info {
            text-align: center;
            padding-bottom: 10px;
            width: 90%;
            display: flex;
            justify-content: space-between;
            .price {
              color: #fe8800;
              .price-num {
                font-size: 18px;
              }
            }
            .paycount {
              color: #999999;
            }
          }
        }
      }
  }

</style>
