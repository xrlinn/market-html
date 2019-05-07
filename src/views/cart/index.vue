<template>
  <div class="container">
    <div class="header">
      <h3>购物车({{userData.cartnums}})</h3>
      <Button class="contro" size="small" @click="handleShow">{{text}}</Button>
    </div>
    <Loadmore  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded"  ref="loadmore" :auto-fill="false" id="box">
      <div class="content" v-for="(item, index) in contentData" :key="index">
        <input type="checkbox" class="outerInput"  :value="item" v-model="checkData" v-if="isShow" :key="index" @click="check($event,index)">
        <contentItems :index="index"  :options="item" @give-value="getvalue"/>
      </div>
    </Loadmore>
    <div class="footer" >
          <div class="left">
            <label for="quan">
                <div class="checkbox"></div>
                <input type="checkbox" id="quan" @click="checkAll($event)">  <span>全选</span> 
            </label>
          </div>
          <Button @click="handleCount" v-if="!isShow">结算</Button>
          <Button @click="handleDelete" v-if="isShow">删除</Button>
          <Button @click="handleCollection" v-if="isShow">移入收藏夹</Button>
    </div>
  </div>
</template>

<script>
import contentItems from './components/contentItem'
import { Loadmore, Button, Toast } from 'mint-ui'

export default {
  name: 'index',
  components: {
    contentItems,
    Loadmore,
    Button
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
      arr: {},
      value: 1,
      price: '',
      index: ''
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
      console.log(index)
      if (e.target.checked) {
        this.price = this.contentData[index].commodity.price
        this.arr[index] = this.value*this.price
      }
      console.log(this.arr)
    },
    checkAll (e) {
      // var box = document.getElementById("box");
      // var checkboxs = box.getElementsByTagName("input")
      if (e.target.checked) {
        this.contentData.forEach((el,i) => {
          console.log(el)
          console.log(this.checkData[i])
          if (this.checkData.indexOf(el) == '-1') {
            this.checkData.push(el)
          }
				  // 数组里没有这一个才push，防止重复push  
        })
      } else {
        this.checkData = []
      } 
    },
    handleDelete () {
      for (var i=0; i<this.checkData.length; i++) {
        this.$axios.delete(this.$api.deleteCart + this.checkData[i]._id).then(res => {
           if (res.code === 200) {
              this.contentData = []
              this.getCart()
           }
        })
      }
    },
    handleCollection () {
      for (var i=0; i<this.checkData.length; i++) {
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

    },
    handleShow () {
      this.isShow = !this.isShow
      this.text = this.isShow?'完成':'管理'
    },
    getvalue(value,index){
      this.value = value;
      this.index = index
      var box = document.getElementById("box");
      var checkboxs = box.getElementsByClassName('outerInput')
      if (checkboxs[index].checked) {
        this.arr[index] = this.value*this.contentData[index].commodity.price
      }
      console.log(this.arr)
    },
  },
  watch: {
    checkData: { // 监视双向绑定的数组变化
      handler () {
        if (this.checkData.length == this.contentData.length) {
          document.querySelector('#quan').checked = true
        }else {
          document.querySelector('#quan').checked = false
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
    
    .content {
        display: flex;
        align-items: center;
        // margin-top: px-to-rem(40);
    }
    .footer {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 60px;
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

