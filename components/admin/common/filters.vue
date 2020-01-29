<template>
  <div>
    <template v-if="header.filter.type === 'text'">
      <text-input :header="header" />
    </template>
    <template v-if="header.filter.type === 'email'">
      <email-input :header="header" />
    </template>
    <template v-if="header.filter.type === 'date'">
      <date-input :header="header" />
    </template>
    <template v-if="header.filter.type === 'select'">
      <select-input :header="header" />
    </template>
  </div>
</template>
<script>
import TextInput from "./filters/text";
import EmailInput from "./filters/email";
import DateInput from "./filters/date";
import SelectInput from "./filters/select";

export default {
  components: {
    TextInput,
    EmailInput,
    DateInput,
    SelectInput
  },
  props: ["header"]
};
</script>
