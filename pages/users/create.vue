<template>
  <div>
    <top-table :module="moduleName" :addButton="false">
      <template v-slot:title>
        Create Users
      </template>
      <template v-slot:crumb>
        <li>
          <NuxtLink to="/users">
            <i class="fa fa-users"></i> {{ moduleName }}
          </NuxtLink>
        </li>
        <li class="is-active">
          <a href="#"> Create </a>
        </li>
      </template>
    </top-table>
    <div>
      <form @submit.prevent="storeData" name="createfolder">
        <user-form :inputs="user" :response="response"/>
        <submit-button/>
        <reset-button/>
      </form>
    </div>
  </div>
</template>
<script>
  import TopTable from '../../components/admin/common/top_table'
  import UserForm from '../../components/forms'
  import User from '../../objects/admin/forms/users'
  import MixinTable from "../../mixin/table"
  import SubmitButton from '../../components/inputs/submit'
  import ResetButton from '../../components/inputs/reset'

  export default {
    mixins: [MixinTable],
    components: {
      TopTable,
      UserForm,
      SubmitButton,
      ResetButton
    },
    data() {
      return {
        moduleName: "users",
        user: User
      }
    },
    beforeMount(){
      this.clearObjectValue(this.user);
    },
    methods: {
      storeData() {
        this.store(this.user).then((res) => {
          this.$router.push("/" + this.moduleName)
        })
      }
    }
  }
</script>
