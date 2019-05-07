<template>
    <div class="container">
        <div class="container-left" v-for="(item,index) in item" :key="index">
            <div class="img">
                <img :src="item.img" alt="">
            </div>
            <div class="title">
                {{item.title}}
            </div>
            <div class="price-info">
                <div class="price">
                    <span>$</span>{{item.price}}
                </div>
                <div class="paycount">
                    {{item.paycounts}}人付款
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'contentItem',
  props: {
    item: Object
  },

  data () {
    return {
        
    }
  },
  created () {
    console.log(this.item)
  }
}
</script>

<style lang="scss">
@import "../../../globalCss/px2-rem";
.container-left {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: px-to-rem(244);
    height: px-to-rem(380);
    .img {
        height: px-to-rem(244);
    }
    .title {
        width: px-to-rem(188);
        overflow:hidden;
        text-overflow: ellipsis;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
    }
    .price-info {
        width: px-to-rem(216);
        display: flex;
        justify-content: space-between;
    }
}
</style>
