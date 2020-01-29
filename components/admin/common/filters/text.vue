<template>
  <div>
    <template v-if="header.filter.action === undefined">
      <input type="text" v-model="header.filter.vModel" />
    </template>
    <template v-else>
      <input
        type="text"
        v-model="header.filter.vModel"
        @keyup="header.filter.action(header.filter.vModel)"
      />
    </template>
  </div>
</template>
<script>
export default {
  props: ["header"],
  mounted() {
    if (this.$route.query[this.header.name] !== undefined) {
      this.header.filter.vModel = this.$route.query[this.header.name];
    }
  }
};
</script>
