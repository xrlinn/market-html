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
        <div class="middle" v-for="(item,index) in commodityData" :key="index">
            <div class="bus">
              惠普中国官方旗舰店
            </div>
            <div class="commodity">
                <div class="pic">
                    <img :src="item.img" alt="">
                </div>
                <div class="right">
                    <div class="title">
                        {{item.title}}
                    </div>
                    <div class="price">
                        $<span class="price-info">{{item.price}} </span>  ×{{item.num}}
                    </div>
                </div>
            </div>
            <div class="bottom" >
            <span class="totalNum">共{{item.num}}件</span>
            <span>合计：$ <span class="price-num">{{item.num*item.price}}</span> </span>
            </div>
        </div>
        <div class="footer">
          <div class="left">
            <span class="totalNum">共{{totalNum}}件</span>
            <span>合计：$ <span class="price-num">{{totalPrice}}</span> </span>
          </div>
          <Button @click="handleOrder">提交订单</Button>
        </div>
    </div>
</template>

<script>
import {inputNumber} from 'element-ui'
import {Button, MessageBox} from 'mint-ui'
export default {
  name: 'order',
  components: {
    inputNumber,
    Button
  },
  data () {
    return {
      commodityData: [],
      price: '',
      totalNum: 0,
      totalPrice: 0,
      isShow: false
    }
  },
  methods: {
    getCommodityData () {
        const arrId = this.$route.params.id
        for (let i =0; i<arrId.length; i++) {
          this.$axios.get(this.$api.getCommodity + arrId[i].id).then(res => {
          console.log(res)
          let resData = res.data
          this.commodityData.push(resData)
          this.commodityData.splice(i,1,{
            ...this.commodityData[i],
            num: arrId[i].num
          })
          this.totalNum += arrId[i].num
          this.totalPrice += arrId[i].num * arrId[i].price
        })
      }
    },
    handleChange(value) {
      console.log(value)
    },
    handleOrder () {
      const arrId = this.$route.params.id
      const arr = JSON.stringify(arrId)
       MessageBox.confirm('', { 
        message: '您需支付￥' + this.totalPrice, 
        title: '提示', 
        confirmButtonText: '确认付款', 
        cancelButtonText: '取消' 
        }).then(action => { 
        if (action == 'confirm') {     //确认的回调
        this.$axios.post(this.$api.upOrder,{arr:arr,status:2}).then(res => {
          if (res.code === 200) {
            this.$router.push({
              name: 'three'
            })
          }
        }) 
        }
        }).catch(err => { 
        if (err == 'cancel') {     //取消的回调
        this.$axios.post(this.$api.upOrder,{arr:arr}).then(res => {
          if (res.code === 200) {
            this.$router.push({
              name: 'two'
            })
          }
        })
        } 
      })
    }
  },
  created () {
    let token = sessionStorage.getItem('token')
    if (token) {
      this.$store.dispatch('getUserData')
    }
    this.getCommodityData ()
    this.$axios.get(this.$api.getAllOrder).then(res => {
        console.log(res)
      })
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

      .bottom {
          padding-left: 200px;
          .totalNum {
            color: #888
          }
          .price-num {
            font-size: 16px;
            color: orangered;
          }
        }
    }

    .footer {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 998;
        background: #fff;
        height: px-to-rem(100);
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left {
          padding-left: 100px;
          .totalNum {
            color: #888
          }
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
