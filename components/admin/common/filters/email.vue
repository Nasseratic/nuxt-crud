<template>
  <div>
      <input type="email" v-model="header.filter.vModel" @keyup="header.filter.action(header.filter.vModel)">
  </div>
</template>
<script>
  export default {
    props: [
      "header",
    ]
  }
</script>
