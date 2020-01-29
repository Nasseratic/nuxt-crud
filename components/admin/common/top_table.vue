<template>
  <div>
    <nav class="breadcrumb" aria-label="breadcrumbs">
      <ul>
        <li>
          <NuxtLink to="/">
            <i class="fa fa-home"></i>
            Home
          </NuxtLink>
        </li>
        <slot name="crumb"></slot>
      </ul>
    </nav>
    <div>
      <h1>
        <slot name="title"></slot>
      </h1>
      <div v-if="addButton">
        <NuxtLink :to="'/' + module + '/create'"
          ><i class="fa fa-plus"></i> Add {{ singleModule }}</NuxtLink
        >
      </div>
    </div>
  </div>
</template>
<script>
var pluralize = require("pluralize");

export default {
  props: ["module", "count", "addButton"],
  computed: {
    singleModule() {
      return pluralize.singular(this.module);
    }
  }
};
</script>
