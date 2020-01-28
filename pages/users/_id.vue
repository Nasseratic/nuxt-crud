<template>
  <div>
    <top-table :module="moduleName" :addButton="false">
      <template v-slot:title>
        Update Users
      </template>
      <template v-slot:crumb>
        <li>
          <NuxtLink to="/users">
            <i class="fa fa-users"></i> {{ moduleName }}
          </NuxtLink>
        </li>
        <li class="is-active">
          <a href="#"> Update </a>
        </li>
      </template>
    </top-table>
    <div>
      <form @submit.prevent="updateData">
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
  /////mixin
  import Show from "../../mixin/actions/show"
  import Update from "../../mixin/actions/update"
  import Response from "../../mixin/objects/normalResponse"

  export default {
    mixins: [Show, Update, Response],
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
          id: this.$route.params.id,
          data: User
        }
      }
    },
    mounted() {
      this.find().then((res) => {
        this.response = res;
        this.setValuesToObject(this.requestOptions.data, res.payload)
      })
    },
    methods: {
      updateData() {
        this.update().then((res) => {
          this.$router.push("/" + this.moduleName)
        })
      }
    }
  }
</script>
