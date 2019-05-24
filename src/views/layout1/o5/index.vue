<template>
    <div class="container">
        <div class="middle" v-for="(item,index) in orderData" :key="index">
            <div class="bus" v-if="item.status == 1">
              等待买家付款
            </div>
            <div class="bus" v-if="item.status == 2">
              等待商家发货
            </div>
            <div class="bus" v-if="item.status == 3">
              等待买家收货
            </div>
            <div class="bus" v-if="item.status == 4">
              交易完成 等待买家评价
            </div>
            <div class="bus" v-if="item.status == 5">
              交易完成
            </div>
            <div class="commodity" v-for="(item,index) in item.commodity" :key="index">
                <div class="pic">
                    <img :src="item.id.img" alt="">
                </div>
                <div class="right">
                    <div class="title">
                        {{item.id.title}}
                    </div>
                    <div class="price">
                        $<span class="price-info">{{item.id.price}} </span>  ×{{item.num}}
                    </div>
                </div>
            </div>
            <div class="bottom" >
            <span class="totalNum">共{{item.totalNum}}件</span>
            <span>合计：$ <span class="price-num">{{item.totalPrice}}</span> </span>
            </div>
            <div class="btns" v-if="item.status == 1">
              <Button size="small" class="btn1">取消订单</Button>
              <Button size="small" class="btn2">付款</Button>
            </div>
            <div class="btns" v-if="item.status == 2">
            </div>
            <div class="btns" v-if="item.status == 3">
              <Button size="small" class="btn2">确认收货</Button>
            </div>
            <div class="btns" v-if="item.status == 4">
              <Button size="small" class="btn2">评价</Button>
            </div>
        </div>
    </div>
</template>

<script>
import {Button} from 'mint-ui'
export default {
  name: 'o2',
  components: {
    Button
  },
  data () {
    return {
      orderData: []
    }
  },
  methods: {
    getOrder4 () {
      this.$axios.get(this.$api.getOrder4).then(res => {
        console.log(res)
        const orderData = res.data
        this.orderData = orderData
        for (let i=0; i<this.orderData.length; i++) {
          console.log(1)
          var sum  = 0
          var price = 0
          console.log(this.orderData[i].commodity.length)
          for (let j=0; j<this.orderData[i].commodity.length; j++) {
            sum += this.orderData[i].commodity[j].num 
            price += this.orderData[i].commodity[j].num * this.orderData[i].commodity[j].price
          }
          console.log(sum)
          this.orderData.splice(i,1,{
            ...this.orderData[i],
            totalNum: sum,
            totalPrice: price
          })
        }
        console.log(this.orderData)
      })
    }
  },
  created () {
    this.getOrder4()
  }
}
</script>

<style scoped lang="scss">
@import '../../../globalCss/px2-rem.scss';
.container {
    .middle {
      margin-top: 10px;
      background: #fff;
      .bus {
        padding: 6px;
        font-size: 16px;
        color: orangered;
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
          padding-left: 175px;
          .totalNum {
            color: #888
          }
          .price-num {
            font-size: 16px;
            color: orangered;
          }
        }

       .btns {
         display: flex;
         justify-content: flex-end;
         padding: 2px 0; 
         .btn1 {
           border-radius: 15px;
           margin-right: 6px;
           padding: 0 24px;
           background: #fff;
         }
         .btn2 {
           border-radius: 14px;
           padding: 0 20px;
           box-sizing: border-box;
           color: orangered;
           background: #fff;
         }
       } 
    }
}
</style>
