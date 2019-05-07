<template>
    <div class="container change-nickname">
        <dy-input-change :value="userMsg.address" @change="handleChange"/>
        <div class="desc">
            收货地址请仔细确认哦
        </div>
        <div class="btn-wrap">
            <Button size="large" type="primary" @click="handleSave">保存更改</Button>
        </div>
    </div>
</template>

<script>
import dyInputChange from '@/components/dy-input-change'
import {Button, Toast} from 'mint-ui'
// import { duration } from 'moment';
export default {
  name: 'changeNickname',
  components: {
    dyInputChange,
    Button
  },
  data () {
    return {
      address: ''
    }
  },
  methods: {
    handleChange (val) {
      this.address = val
    },
    handleSave () {
      this.$axios.put(this.$api.changeUser, {
        address: this.address
      }).then(res => {
        if (res.code === 200) {
          Toast({
            message: '修改收货地址成功',
            duration: 800
          })
          this.$store.dispatch('getUserData')
          setTimeout(() => {
            this.$router.push('/revise')
          }, 1000)
        } else {
          Toast({
            message: res.msg
          })
        }
      })
    }
  },
  computed: {
    userMsg () {
      return this.$store.state.userData
    }
  }
}
</script>

<style scoped lang="scss" src="./index.scss">

</style>
