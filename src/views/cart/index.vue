<template>
  <div class="container">
    <div class="header">
      <h3>购物车({{userData.cartnums}})</h3>
      <Button class="contro" size="small" @click="handleShow">{{text}}</Button>
    </div>
    <Loadmore  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded"  ref="loadmore" :auto-fill="false" id="box">
      <div class="content" v-for="(item, index) in contentData" :key="index">
        <input type="checkbox" class="outerInput"  :value="item" v-model="checkData"  :key="index" @click="check($event,index)">
        <div class="commodity">
            <div class="pic">
                <img :src="item.commodity.img" alt="">
            </div>
            <div class="right">
                <div class="title">
                    {{item.commodity.title}}
                </div>
                <div class="price">
                    $<span class="price-info">{{item.commodity.price}}</span>
                    <input-number :key="index" v-model="item.num" @change="(value) => handleChange(value,index,item.commodity.price)" :min="1" :max="20" label="描述文字"></input-number> 
                </div>
            </div>
        </div>
      </div>
    </Loadmore>
    <div class="footer" >
          <div class="left">
            <label for="quan">
                <div class="checkbox"></div>
                <input type="checkbox" id="quan" @click="checkAll()" v-model="checkall">  <span>全选</span> 
            </label>
          </div>
          <div class="count" v-if="!isShow">
            <span>合计：￥{{count}}</span>
            <Button @click="handleCount">结算</Button>
          </div>
          <Button @click="handleDelete" v-if="isShow">删除</Button>
          <Button @click="handleCollection" v-if="isShow">移入收藏夹</Button>
    </div>
  </div>
</template>

<script>
import { Loadmore, Button, Toast } from 'mint-ui'
import {inputNumber} from 'element-ui'
export default {
  name: 'index',
  components: {
    Loadmore,
    Button,
    inputNumber,
    Toast
  },
  data () {
    return {
      contentData: [],
      queryData: {
        pn: 1,
        size: 10
      },
      allLoaded: false,
      checkData: [],
      isShow: false,
      text: '管理',
      count: 0,
      checkall: false,
      arr: [],
      arr1: []
    }
  },
  methods: {
    getCart () {
      return new Promise(resolve => {
        this.$axios.get(this.$api.getCart, {
          params: this.queryData
        })
          .then(res => {
            console.log(res)
            let resData = res.data
            if (resData.length < this.queryData.size) {
              this.allLoaded = true // 若数据已全部获取完毕
            }
            this.contentData = [...this.contentData, ...resData]
            console.log(this.contentData.length)
            
            for (let i =0; i<this.contentData.length; i++) {// 初始化商品信息对象
              var obj = { 
                'num': 1,
                'price': 0,
                'id': ''
              }
                obj.num = 1
                obj.price = this.contentData[i].commodity.price
                obj.id = this.contentData[i].commodity._id
                this.arr1.push(obj)
            }
            resolve()
          })
      })
    },
    loadBottom () {
      this.queryData = {
        pn: this.queryData.pn + 1,
        size: 4
      }
      this.getCollection().then(() => {
        // this.allLoaded = true
        this.$refs.loadmore.onBottomLoaded()
      })
    },
    check (e,index) {
      setTimeout(() => {
        this.getCheckPrice1()
      }, 30)
    },
    checkAll () {
      // var box = document.getElementById("box");
      // var checkboxs = box.getElementsByTagName("input")
      var _this = this
      if (this.checkall) {
        this.checkData = []
        this.count = 0
        } else {
        console.log(this.arr)
        this.checkData = []
        this.contentData.forEach(function (item) {
          _this.checkData.push(item)
        })
        setTimeout(() => {
        this.getCheckPrice1()
      }, 30)
      }
    },
    handleDelete () {
      for (let i=0; i<this.checkData.length; i++) {
        this.$axios.delete(this.$api.deleteCart + this.checkData[i]._id).then(res => {
           if (res.code === 200) {
              this.contentData = []
              this.count = 0
              this.getCart()
              this.$store.dispatch('getUserData')
           }
        })
      }
    },
    handleCollection () {
      for (let i=0; i<this.checkData.length; i++) {
        this.$axios.post(this.$api.addCollection, {commodityId: this.checkData[i].commodity._id}).then(res => {
          console.log(res)
          if (res.code === 200) {
            Toast({
              message: res.msg,
              duration: 1000
            })
            this.handleDelete()
          } else {
            Toast({
              message: '您已经收藏过了哦',
              duration: 1000
            })
          }
        })
      }
    },
    handleCount () {
      var box = document.getElementById("box");
      var checkboxs = box.getElementsByClassName('outerInput')
      for (let i=0; i<checkboxs.length; i++) {
        if (checkboxs[i].checked) {
          this.arr1[i].num = this.contentData[i].num
          this.arr.push(this.arr1[i])
      } else {
        for (let j=0; j<this.arr.length; j++) {
          if (this.arr[j].id === this.contentData[i].id) {
            this.arr.splice(j,1)
          }
        }
      }
      }
      console.log(this.arr)
      this.$router.push({
        name: 'upOrder',
        params: {
          id: this.arr
        }
      })
      
      
    },
    handleShow () {
      this.isShow = !this.isShow
      this.text = this.isShow?'完成':'管理'
    },
    handleChange (value,index,price) {
      console.log(value)
      console.log(index)
      console.log(price)
      // this.checkData.push(this.contentData[index])
      console.log(this.checkData,"123")
      console.log(this.contentData,"456")
      this.$nextTick(() => {
        this.contentData.splice(index,1, {
        ...this.contentData[index],
        num: value,
        price: price
      })
      })
      if (!this.checkData[index]) {
        console.log('go')
      }else {
        console.log('yes')
        setTimeout(() => {
          this.checkData.splice(index,1, {
          ...this.checkData[index],
          num: value,
          price: price
          })
          this.getCheckPrice()
        }, 50);
      }
    },
    getCheckPrice () {
      var checkprice = 0;
      for(var i=0; i<this.checkData.length; i++){
          var item = this.checkData[i];
          checkprice += item.num * item.price;
      }
      this.count = checkprice.toString().replace(/\B(?=(\d{3})+$)/g,',');
    },
    getCheckPrice1 () {
      var checkprice = 0;
      for(var i=0; i<this.checkData.length; i++){
          var item = this.checkData[i];
          checkprice += item.num * item.commodity.price;
      }
      this.count = checkprice.toString().replace(/\B(?=(\d{3})+$)/g,',');
    }
  },
  watch: {
    checkData: { // 监视双向绑定的数组变化
      handler () {
        if (this.checkData.length === this.contentData.length) {
          this.checkall = true
        }else {
          this.checkall = false
        }
      },
      deep: true
    }
  },
  created () {
    let token = sessionStorage.getItem('token')
    if (token) {
      this.$store.dispatch('getUserData')
    }
    this.getCart()
     
  },
  computed: {
    userData () {
      return this.$store.state.userData
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../globalCss/px2-rem";

.container {
  padding: px-to-rem(18);
  .header {
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: px-to-ren(100);
    background-image: linear-gradient(to right, #FD9126, #FF5000);
    color: #fff;
    h3 {
      flex:1;
    }
    .mint-button{
      background-image: linear-gradient(to right, #FF5A06, #FF5000);
      color: #fff;
      border: none;
    }
  }

  #box {
    padding-bottom: 80px;
  }
    
    .content {
        display: flex;
        align-items: center;
        // margin-top: px-to-rem(40);
        .commodity {
        padding: 6px 0;
        display: flex;
        align-items: center;
        background: #fff;
        border-radius: 10px;
        .pic {
          padding: 0 8px;
          img {
            height: px-to-rem(260);
            width: px-to-rem(260);
          }
        }
        .right {
          display: flex;
          height: px-to-rem(260);
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
    }
    .footer {
        position: fixed;
        left: 0;
        right: 0;
        z-index: 998;
        background: #fff;
        bottom: 55px;
        height: px-to-rem(100);
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-top: 1px solid #888;
        background: #fff;
        .left {
            padding-left: 30px;
            // .checkbox {
            //     display: inline-block;
            //     width: 14px;
            //     height: 14px;
            //     border-radius: 50%;
            //     border: 1px solid #888;
            // }
        }
        .mint-button {
          margin-right: 12px;
          border-radius: 20px;
          width: 100px;
          background-color: #FF5000;
          background-image: linear-gradient(to right, #FD9126, #FF5000);
          color:#fff;
          font-size: 16px;
        }
      }
}
</style>

