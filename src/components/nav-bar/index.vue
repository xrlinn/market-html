<template>
    <div class="navbar">
        <Navbar v-model="selected" >
            <TabItem id="index">全部</TabItem>
            <TabItem id="computer">电脑</TabItem>
            <TabItem id="clothes">衣服</TabItem>
            <TabItem id="fruit">水果</TabItem>
        </Navbar>
    </div>
</template>

<script>
import { Navbar, TabItem } from 'mint-ui'
export default {
  name: 'navBar',
  components: {
    Navbar,
    TabItem
  },
  data () {
      return {
        selected: 'index' 
      }
  },
  methods: {
    getPosition () {
      var nav = document.querySelector(".navbar")
      var offsetTops = nav.offsetTop - 46
      // console.log(offsetTop);
      var scrollTop = document.documentElement.scrollTop||document.body.scrollTop
        if(scrollTop>=offsetTops){
          nav.classList.add("active")
        }
          else{
            nav.classList.remove("active")
          }
      }  
  },
  watch: {
    selected (val) {
      this.$router.push({
        name: val
      })
    }
  },
  created () {
    this.selected = this.$route.name
    window.addEventListener("scroll",this.getPosition)
  },
  mounted () {
    
  }

  
}
</script>

<style  lang="scss">
@import "../../globalCss/px2-rem";
.navbar {
    height: 46px;
}
.active{
    position: fixed;
    top: px-to-rem(100);
    left: 0;
    right: 0;
        }
</style>
