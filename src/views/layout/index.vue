<template>
    <div>
        <router-view></router-view>
        <tabBar/>
    </div>
</template>

<script>
import tabBar from '@/components/tab-bar'
export default {
  name: 'layout',
  components: {
    tabBar,
  }
}
</script>

<style scoped>

</style>
