<template>
  <div>
    <b-form-group
      :id="input.name+input.type"
      :label="input.label"
      :label-for="input.name"
      :description="input.description !== undefined ? input.description  : ''"
    >
      <b-form-select v-model="input.vModel" :options="input.options" class="mb-3">
        <template v-slot:first>
          <b-form-select-option :value="input.placeholder.value" selectec disabled>{{ input.placeholder.text }}</b-form-select-option>
        </template>
      </b-form-select>
    </b-form-group>
    <div v-if="error && error[input.name]">
      <b-message type="is-danger" has-icon>
        <ul>
          <li v-for="(err , index) in error[input.name]">
            {{ err }}
          </li>
        </ul>
      </b-message>
    </div>
  </div>
</template>
<script>
  export default {
    props: [
      "input",
      "error"
    ]
  }
</script>
