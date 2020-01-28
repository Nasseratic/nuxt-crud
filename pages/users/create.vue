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
        <user-form :inputs="requestOptions.data" :response="response"/>
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
  import SubmitButton from '../../components/inputs/submit'
  import ResetButton from '../../components/inputs/reset'
  //mixin
  import Store from "../../mixin/actions/store"
  import Response from "../../mixin/objects/normalResponse"

  export default {
    mixins: [Store, Response],
    components: {
      TopTable,
      UserForm,
      SubmitButton,
      ResetButton
    },
    data() {
      return {
        moduleName: "users",
        requestOptions: {
          data: User
        }
      }
    },
    beforeMount() {
      this.clearObjectValue(this.requestOptions.data);
    },
    methods: {
      storeData() {
        this.store().then((res) => {
          this.$router.push("/" + this.moduleName)
        }).catch(res => this.response = res)
      }
    }
  }
</script>
