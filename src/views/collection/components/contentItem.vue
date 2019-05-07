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
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {Button} from 'mint-ui'
export default {
  name: 'contentitem',
  data () {
      return {
          value: [],
      }
  },
  components: {
    Button
  },
  props: {
    options: Object
  },
  methods: {
    // handleDelete (id) {
    //   this.$axios.delete(this.$api.deleteCollection + id).then(res => {
    //     console.log(res)
    //   })
    // }
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
