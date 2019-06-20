<template>
    <div class="details">
        <div class="img">
            <img :src="commodityData.img" alt="">
        </div>
        <div class="container">
            <div class="price">
                $<span class="price-num">{{commodityData.price}}</span>
            </div>
            <div class="title">
                {{commodityData.title}}
            </div>
            <div class="btn">
                <div class="like">
                    <Button size="small" @click="handleLike">
                        <i class="iconfont icon-dianzan"></i>{{commodityData.like}}人赞过
                    </Button>
                </div>
                <div class="collection">
                    <Button size="small" @click="handleCollect">
                        <i class="iconfont icon-shoucang"></i>{{commodityData.collections}}人收藏
                    </Button>
                </div>
            </div>
            <div class="line"></div>
            <div class="delivery">
                <span>发货地址</span>
                <span class="address"><i class="iconfont icon-dizhi"></i>{{commodityData.delivery}}</span>
            </div>
            <div class="content-row1">
                宝贝评价{{commodityData.comment.length}}
            </div>
            <div class="content-container" v-for="(it,index) in commodityData.comment" :key="index">
                <div class="avatar">
                    <img :src="it.user.avatar" alt="">
                </div>
                <div class="right">
                    <div class="usernickname">
                        {{it.user.usernickname}}
                    </div>
                    <div class="comment">
                        {{it.text}}
                    </div>
                    <div class="pic-wrap">
                        <div class="pics" v-for="(its,index) in it.img" :key="index">
                          <img :src="its" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="tabbar">
            <Tabbar v-model="selected" :fixed="true">
                <TabItem id="index">
                    <i class="iconfont icon-dianpu" slot="icon"></i>
                    店铺
                </TabItem>
                <TabItem id="msg">
                    <i class="iconfont icon-kefu" slot="icon"></i>
                    客服
                </TabItem>
                <TabItem id="cart">
                    <Button type="primary" @click="handleCart">加入购物车</Button>
                </TabItem>
                <TabItem id="person">
                    <Button type="danger" @click="handlejump">立即购买</Button>
                </TabItem>
            </Tabbar>
        </div>
    </div>    
</template>

<script>
import { Tabbar, TabItem, Button, Toast } from 'mint-ui'
export default {
  name: 'details',
  components: {
    Tabbar,
    TabItem,
    Button,
    Toast
  },
  data () {
    return {
      commodityData: [],
      arr: [1,2,3,4]
    }
  },
  methods: {
    getCommodityData () {
      const id = this.$route.params.id
      this.$axios.get(this.$api.getCommodity + id).then(res => {
        console.log(res)
        let resData = res.data
        this.commodityData = resData
      })
    },
    handlejump () {
      this.$router.push({
        name: 'upOrder1',
        params: {
          id: this.$route.params.id
        }
      })
    },
    handleCollect () {
      this.$axios.post(this.$api.addCollection, {commodityId: this.commodityData._id}).then(res => {
        console.log(res)
        if (res.code === 200) {
          Toast({
            message: res.msg,
            duration: 1000
          })
          this.getCommodityData()
        } else {
          Toast({
            message: '您已经收藏过了哦',
            duration: 1000
          })
        }
      })
    },
    handleLike () {
      this.$axios.post(this.$api.addLike, {commodityId: this.commodityData._id}).then(res => {
        console.log(res)
        if (res.code === 200) {
          Toast({
            message: res.msg,
            duration: 1000
          })
          this.getCommodityData()
        } else {
          Toast({
            message: res.msg,
            duration: 1000
          })
        }
      })
    },
    handleCart () {
        this.$axios.post(this.$api.addCart, {commodityId: this.commodityData._id}).then(res => {
            console.log(res)
            if (res.code === 200) {
                Toast({
                    message: res.msg,
                    duration: 1000
                })
            }
        })
    }
  },
  created () {
    this.getCommodityData()
  }
}
</script>

<style scoped lang="scss">
@import "@/globalCss/px2-rem.scss";
.details{
    padding-bottom: 60px;
}
.img {
    height: px-to-rem(750);
}
.container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background: #fff;

    .price {
        color: #fe8800;
        margin: 4px 0;
        .price-num {
            font-size: 18px;
        }
    }

    .title {
        font-size: 16px;
        margin: 4px 0;
        padding-left: 32px;
        
        color:#000000;
        overflow:hidden;
        text-overflow: ellipsis;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
    }

    .btn {
    display: flex;
    justify-content: space-around;
    margin: 4px 0;
    /deep/ .mint-button-text {
            font-size: 12px;
            color: #555;
        }

        .mint-button{
            width: 100px;
            height: 26px;
          .iconfont {
                padding-right: 4px;
          }
        }
    }
    .line {
        height: 6px;
        background: #e0e0e0;
        margin-top: 6px;
    }

    .delivery {
        color: #555;
        padding: 4px 0;
        .address {
            padding-left: 32px;
            color: #000000;
        }
    }

    .content-row1 {
        padding: 4px 0;
        font-size: 15px;
        color: #000000;
    }

    .content-container {
        display: flex;
        .avatar {
          img {
            height: px-to-rem(90);
            width: px-to-rem(90);
            border-radius: 50%
          }
        }

        .right {
            flex:1;
            .usernickname {
                text-align: center;
                height: px-to-rem(90);
                line-height: px-to-rem(90);
            }
            .comment {

                padding-left: 28px;
            }
            .pic-wrap {
              display: flex;
              flex-wrap: wrap;
              .pics {
                width: 31%;
                margin-left: 4px;
                img {
                  height: 80px;
                }
              }
            }
        }

    }
}


</style>
