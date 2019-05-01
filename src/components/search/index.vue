<template>
    <div class="container">
        <Search class="search" v-model="value" :result.sync="result">
            <!-- <Cell
            v-for="item in result"
            :title="item.title"
            :value="item.value">
            <Cell> -->
        </Search>
    </div>
</template>

<script>
import {Search, Cell } from 'mint-ui'
export default {
  name: 'search',
  components: {
    Search,
    Cell
  },
  data () {
    return {
      result: [],
      value: ''
    }
  },
  created () {
    
  }
}
</script>

<style scoped>
.search {
  display: block;
}
</style>
