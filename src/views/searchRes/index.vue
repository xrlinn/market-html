<template>
    <div class="search">
        <Header fixed>
          <Button icon="back" slot="left" @click="$router.back()">返回</Button>
          <Button slot="right" class="btn" @click="search">搜 索</Button>
        </Header>
        <div class="search-wrap">
            <Search class="s1" v-model="value" :result.sync="result" @keyup.enter.native="search"></Search>
        </div>
        <div class="con">
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
import {Header,Search,Button,Toast} from 'mint-ui'
export default {
  name: 'search',
  components: {
    Header,
    Search,
    Button
  },
  data () {
      return {
          value: '',
          result: [],
          contentData: []
      }
  },
  methods: {
    search () {
      this.$axios.post(this.$api.getSearch,{title:this.value}).then(res => {
        console.log(res)
        document.activeElement.blur()
        if (res.code === 200) {
          this.contentData = res.data.commodity
        } else if (res.code === 201) {
          this.contentData = res.data
        } else {
          Toast({
            message: '该商品不存在',
            duration: 800
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../globalCss/px2-rem";
.mint-header{
      background: #eee;
      color: #333333;
      .btn {
        background-image: linear-gradient(to right, #FD9126, #FF5000);
        padding: 0 8px;
        color: #fff;
        border-radius: 14px;
        height: 30px;
      }
    }
    .search-wrap {
        position: fixed;
        top: 0;
        left: 88px;
        right: 88px;
        display: flex;
        height: px-to-rem(80);
        // text-align: center;
        // background-image: linear-gradient(to right, #FD9126, #FF5000);
        justify-content: center;
        z-index: 2;
        .mint-search{
          height: 40px;
          .s1 /deep/ {
            .mint-searchbar{
              background: none;
              padding: 0;
              align-self: center;

              .mint-searchbar-inner {
                  border-radius: 16px;
                  .mintui-search {
                  font-size: 14px;
                  }
              }
            }
          }
          
        }
        
    }

  .con {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 40px;
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
            -webkit-box-orient:vertical;
            -webkit-line-clamp:2;
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
