<template>
  <div>
    <div v-for="singleInput in inputs" :key="singleInput.name">
      <div v-if="singleInput.type === 'text'">
        <text-input :input="singleInput" :error="response.errors"/>
      </div>
      <div v-else-if="singleInput.type === 'password'">
        <password-input :input="singleInput" :error="response.errors"/>
      </div>
      <div v-else-if="singleInput.type === 'email'">
        <email-input :input="singleInput" :error="response.errors"/>
      </div>
      <div v-else-if="singleInput.type === 'select'">
        <select-input :input="singleInput" :error="response.errors"/>
      </div>
    </div>
  </div>
</template>
<script>
  import TextInput from './inputs/text'
  import EmailInput from './inputs/email'
  import PasswordInput from './inputs/password'
  import SelectInput from './inputs/select'

  export default {
    props: ["inputs", "response"],
    components: {
      TextInput,
      EmailInput,
      SelectInput,
      PasswordInput
    }
  }
</script>
