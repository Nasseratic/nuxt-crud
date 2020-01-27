<template>
  <div>
    <template v-if="header.filter.action === undefined">
    <b-select v-model="header.filter.vModel" :placeholder="'Select a '+header.name">
        <option
          v-for="option in header.filter.options"
          :value="option.value"
          :key="option.value">
          {{ option.text }}
        </option>
      </b-select>
    </template>
    <template v-else>
      <b-select v-model="header.filter.vModel" :placeholder="'Select a '+header.name"
                @input="header.filter.action(header.filter.vModel)">
        <option
          v-for="option in header.filter.options"
          :value="option.value"
          :key="option.value">
          {{ option.text }}
        </option>
      </b-select>
    </template>
  </div>
</template>
<script>
  export default {
    props: [
      "header",
    ]
  }
</script>
