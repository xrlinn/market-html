<template>
  <div class="container">
    <Button class="contro" size="small" @click="handleShow">{{text}}</Button>
    <Loadmore  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded"  ref="loadmore" :auto-fill="false" id="box">
      <div class="content" v-for="(item, index) in contentData" :key="index">
        <input type="checkbox"  :value="item._id" v-model="checkData" v-if="isShow">
        <contentItems  :options="item"/>
      </div>
    </Loadmore>
    <div class="footer" v-if="isShow">
          <div class="left">
            <label for="quan">
                <div class="checkbox"></div>
                <input type="checkbox" id="quan" @click="checkAll($event)">  <span>全选</span> 
            </label>
          </div>
          <Button @click="handleDelete">删除</Button>
    </div>
  </div>
</template>

<script>
import contentItems from './components/contentItem'
import { Loadmore, Button } from 'mint-ui'
import moment from 'moment'

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
      text: '管理'
    }
  },
  methods: {
    getTrace () {
      return new Promise(resolve => {
        this.$axios.get(this.$api.getTrace, {
          params: this.queryData
        })
          .then(res => {
            console.log(res)
            let resData = res.data
            if (resData.length < this.queryData.size) {
              this.allLoaded = true // 若数据已全部获取完毕
            }
            resData = resData.map(item => {
              item.updateTime = moment(item.updateTime).format('YYYY年MM月DD日 HH:mm:ss')
              return item
            })
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
    checkAll (e) {
        // var box = document.getElementById("box");
        // var checkboxs = box.getElementsByTagName("input")
        if (e.target.checked) {
            // for (var i=0; i<checkboxs.length; i++) {
            //     if (!checkboxs[i].checked) {
            //         this.checkData.push(checkboxs[i].checkData)
            //     } 
            // }
            this.contentData.forEach((el,i) => {
                if (this.checkData.indexOf(el._id) == '-1') {
						// 数组里没有这一个ID才push，防止重复push
                    this.checkData.push(el._id)
                }
            });
        } else {
            this.checkData = []
        }  
    },
    handleDelete () {
        for (var i=0; i<this.checkData.length; i++) {
            this.$axios.delete(this.$api.deleteTrace + this.checkData[i]).then(res => {
                if (res.code === 200) {
                    this.contentData = []
                    this.getTrace()
                }
            })
        }
    },
    handleShow () {
        this.isShow = !this.isShow
        this.text = this.isShow?'完成':'管理'
    }
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
    this.getTrace()
  }
}
</script>

<style scoped lang="scss">
@import "../../globalCss/px2-rem";

.container {
  padding: px-to-rem(18);
//   padding-bottom: 20px;
    .contro {
    margin-top: px-to-rem(40);
    }
    
    .content {
        display: flex;
        align-items: center;
        margin-top: px-to-rem(40);
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

