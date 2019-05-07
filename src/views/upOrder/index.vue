<template>
    <div class="container">
        <div class="user">
            <div class="left">
                <i class="iconfont icon-dizhi"></i>
            </div>
            <div class="right">
                <div class="right-row1">
                    <span>{{userData.usernickname}}</span> <span>{{userData.phone}}</span>
                </div>
                <div class="right-row2">
                    <p>{{userData.address}}</p>
                    <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-youbian"></use>
                    </svg>
                </div>
                <div class="right-row3">
                  收货不便时，可选择免费代收货服务
                </div>
            </div>
        </div>
        <div class="middle">
            <div class="bus">
              惠普中国官方旗舰店
            </div>
            <div class="commodity">
                <div class="pic">
                    <img :src="commodityData.img" alt="">
                </div>
                <div class="right">
                    <div class="title">
                        {{commodityData.title}}
                    </div>
                    <div class="price">
                        $<span class="price-info">{{commodityData.price}} </span>  ×{{num}}
                    </div>
                </div>
            </div>
            <div class="counts">
              <span>购买数量</span>
              <input-number v-model="num" @change="handleChange" :min="1" :max="20" label="描述文字"></input-number>
            </div>
        </div>
        <div class="footer">
          <div class="left">
            <span>共{{num}}件</span>
            <span>合计：$ <span class="price-num">{{price*num}}</span> </span>
          </div>
          <Button>提交订单</Button>
        </div>
    </div>
</template>

<script>
import {inputNumber} from 'element-ui'
import {Button} from 'mint-ui'
export default {
  name: 'order',
  components: {
    inputNumber,
    Button
  },
  data () {
    return {
      commodityData: {},
      num: 1,
      price: ''
    }
  },
  methods: {
    getCommodityData () {
      return new Promise(resolve => {
        const id = this.$route.params.id
        this.$axios.get(this.$api.getCommodity + id).then(res => {
        console.log(res)
        let resData = res.data
        this.commodityData = resData
        this.price = resData.price
        resolve()
        })
      })
      
    },
    handleChange(value) {
      console.log(value)
    }
  },
  created () {
    let token = sessionStorage.getItem('token')
    if (token) {
      this.$store.dispatch('getUserData')
    }
    this.getCommodityData ()
    console.log(this.$route.params.id)
  },
  computed: {
    userData () {
      return this.$store.state.userData
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../globalCss/px2-rem.scss';
.container {
    margin-top: px-to-rem(80);
    .user {
      display: flex;
      height: px-to-rem(240);
      background: #fff;
      border-radius: 10px;
      .left {
        line-height: px-to-rem(240);
        text-align: center;
        .iconfont {
          color: orange;
          font-size: 26px;
        }
      }
      .right {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .right-row2 {
          display: flex;
          align-items: center;
          .icon {
            font-size: 26px;
          }
        }
      }
    }

    .middle {
      margin-top: 10px;
      background: #fff;
      .bus {
        padding: 6px;
        font-size: 16px;
      }
      .commodity {
        padding: 6px 0;
        display: flex;
        .pic {
          padding: 0 8px;
          img {
            height: px-to-rem(260);
            width: px-to-rem(260);
          }
        }
        .right {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .price {
            text-align: center;
            padding-bottom: 20px;
            color: #888;
            .price-info {
              font-size: 18px;
              color: orangered;
            }
          }
        }
      }

      .counts {
        padding: 10px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }

    .footer {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        height: px-to-rem(100);
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left {
          padding-left: 100px;
          .price-num {
            font-size: 18px;
            color: orangered;
          }
        }
        .mint-button {
          margin-right: 12px;
          border-radius: 10px;
          background-color: #FF5000;
          background-image: linear-gradient(to right, #FD9126, #FF5000);
          color:#fff;
          font-size: 16px;
        }
      }
}
</style>
