<template>
    <div>
        <mt-header fixed :title="$route.meta.title">
            <mt-button  icon="back" slot="left" @click="$router.back()">返回</mt-button>
            <mt-button  slot="right" class="btn" @click="handleSend">发表评价</mt-button>
        </mt-header>
        <div class="container" v-for="(item,index) in commodityData" :key="index">
            <div class="row1">
                <div class="pic">
                    <img :src="item.id.img" alt="">
                </div>
                <div class="title">
                    {{item.id.title}}
                </div>
            </div>
            <div class="comment">
                <textarea name="" id="text"  placeholder="有更多的宝贝使用心得？分享给想买的他们吧" v-model="text[index]">
                
                </textarea>
                <div class="pic-wrap">
                    <div class="pics" v-for="(it,index) in item.url" :key="index">
                      <img :src="it" alt="">
                    </div>
                </div>
                <lin-upload class="add" @success="(url)=>getUrl(url,index)">
                        <div class="add-image" align="center">
                            <i class="iconfont icon-iconfont-camera"></i> 
                            <div class="font">添加图片</div>
                        </div>
                </lin-upload>
            </div>
        </div>
    </div>
</template>

<script>
import {Header,Button,Toast} from 'mint-ui'
import linUpload from '@/components/lin-upload'
export default {
  name: 'comment',
  components: {
    mtHeader: Header,
    mtButton: Button,
    linUpload 
  },
  data () {
    return {
      commodityData:[],
      text: []
    }
  },
  methods: {
    getUrl (url,index) {
      console.log(url)
      console.log(index)
      this.commodityData.splice(index,1,{
        ...this.commodityData[index],
        url: url
      })
    },
    handleSend () {
      const id = this.$route.params.orderData._id
      for (let i = 0; i<this.commodityData.length; i++) {
        const commodityId = this.commodityData[i].id._id
        const text = this.text[i]
        const url = this.commodityData[i].url
        this.$axios.post(this.$api.addCommentToCommodity,{commodityId,text,url}).then(res => {
          console.log(res)
        })
      }
      this.$axios.put(this.$api.changeOrderStatus + id,{status:5}).then(res => {
        if (res.code === 200) {
          this.$router.push({
            name: 'index'
          })
          Toast({
            message: '评价成功',
            duration: 800
          })
        }
      })
    }
  },
  created () {
    this.commodityData = this.$route.params.orderData.commodity
    console.log(this.commodityData)
  }
}
</script>

<style scoped lang='scss'>
    .mint-header{
      background: rgba(255,255,255,0.1);
      color: #333333;
      .btn {
          color: orangered;
      }
    }
    .container {
        margin-top: 40px;
        .row1 {
            display: flex;
            .pic {
                img {
                    width: 40px;
                    height: 40px;
                }
            }
            .title {
                height: 40px;
                line-height: 40px;
                word-break:keep-all;       /* 不换行 */
                white-space:nowrap;        /* 不换行 */
                overflow:hidden;           /* 内容超出宽度时隐藏超出部分的内容 */
                text-overflow:ellipsis;    /*溢出时显示省略标记...；需与overflow:hidden;一起使用*/
            }
        }
        
        .comment {
            #text {
                width: 100%;
                height: 100px;
                border: none;
                outline: none;
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
            .add {
                display: inline-block;
                .add-image {
                    width: 80px;
                    height: 80px;
                    border: 1px dashed rgba(0, 0, 0, .2);
                    color: #888;
                    .iconfont {
                        font-size: 40px;
                    }
                    .font {
                        // padding: 10px 0;
                    }
                }
            }
        }
    }
</style>
