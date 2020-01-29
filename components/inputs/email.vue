<template>
  <div>
    <b-form-group
      :id="input.name + input.type"
      :label="input.label"
      :label-for="input.name"
      :description="input.description !== undefined ? input.description : ''"
    >
      <b-form-input
        :id="input.name"
        v-model="input.vModel"
        type="email"
        :name="input.name"
        :placeholder="input.placeholder"
      ></b-form-input>
    </b-form-group>
    <div v-if="error && error[input.name]">
      <b-message type="is-danger" has-icon>
        <ul>
          <li v-for="(err, index) in error[input.name]">
            {{ err }}
          </li>
        </ul>
      </b-message>
    </div>
  </div>
</template>
<script>
export default {
  props: ["input", "error"]
};
</script>
