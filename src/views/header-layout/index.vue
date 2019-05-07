<template>
    <div>
        <Header fixed :title="$route.meta.title">
          <Button icon="back" slot="left" @click="$router.back()">返回</Button>
        </Header>
        <router-view></router-view>
    </div>
</template>

<script>
import {Header, Button} from 'mint-ui'

export default {
  name: 'header-layout',
  components: {
    Header,
    Button
  }
}
</script>

<style  lang="scss">
    .mint-header{
      background: rgba(255,255,255,0.1);
      color: #333333;
    }

</style>
