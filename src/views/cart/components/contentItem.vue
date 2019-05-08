<template>
    <div class="container">
        <div class="commodity">
            <div class="pic">
                <img :src="options.commodity.img" alt="">
            </div>
            <div class="right">
                <div class="title">
                    {{options.commodity.title}}
                </div>
                <div class="price">
                    $<span class="price-info">{{options.commodity.price}}</span>
                    <input-number v-model="num" @change="(value) => handleChange(value,index)" :min="1" :max="20" label="描述文字"></input-number> 
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {Button} from 'mint-ui'
import {inputNumber} from 'element-ui'
export default {
  name: 'contentitem',
  data () {
      return {
          // value: [],
          num: 1
      }
  },
  components: {
    Button,
    inputNumber
  },
  props: {
    options: Object,
    index: Number
  },
  methods: {
    handleChange (value,index) {
      console.log(value)
      this.$emit("give-value", value, index)
    }
    // handleDelete (id) {
    //   this.$axios.delete(this.$api.deleteCollection + id).then(res => {
    //     console.log(res)
    //   })
    // }
  },
  witch: {
      options: {
        immediate: true,
        deep: true,
        handler(value){
          this.num = value.num;
        }
      }
    },
  created () {
    console.log(this.options)
  }
}
</script>

<style scoped lang="scss">
@import '../../../globalCss/px2-rem';
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


</style>
