<template>
  <div>
    <top-table :module="moduleName" :addButton="true">
      <template v-slot:title>
        Users({{ response.payload.total_record }})
      </template>
      <template v-slot:crumb>
        <li class="is-active">
          <a href="#"><i class="fa fa-users"></i> {{ moduleName }}</a>
        </li>
      </template>
    </top-table>
    <a href="" @click.prevent="activeAll">Active All</a>
    <Table
      :defaultProps="defaultProps"
    />
    <!--    custom filter-->
    <!--     table option must have this attr with this value to allow slots-->
    <!--      <template v-slot:customFilter>-->
    <!--        input-->
    <!--      </template>-->
  </div>
</template>
<script>
  import Table from "../../components/admin/common/table"
  import MixinTable from "../../mixin/table"
  import TopTable from '../../components/admin/common/top_table'
  import moment from 'moment';

  export default {
    mixins: [MixinTable],
    components: {
      Table,
      TopTable
    },
    mounted() {
      this.index();
      this.headers.push(this.editAction, this.deleteAction)
    },
    methods: {
      activeAll() {
        console.log("do some thing with ids", this.ids)
      }
    },
    data() {
      return {
        moduleName: "users",
        headers: [
          {
            name: "block",
            sort: true,
            title: "User Status",
            render: {
              action: (val) => {
                if (val === 1) {
                  return "Blocked"
                } else {
                  return "Active"
                }
              }
            },
            filter: {
              type: "select",
              vModel: "",
              options: [
                {text: "select user status", value: ""},
                {text: "Block", value: 1},
                {text: "Active", value: 2},
              ],
              action: (val) => {
                this.filter("block", val);
              }
            }
          },
          {
            name: "name",
            sort: true,
            title: "User Name",
            filter: {
              type: "text",
              vModel: "",
              action: (val) => {
                this.filter("name", val);
              }
            }
          },
          {
            name: "email",
            sort: true,
            title: "Email",
            filter: {
              type: "email",
              vModel: "",
              action: (val) => {
                this.filter("email", val);
              }
            }
          },
          {
            name: "created_at",
            sort: true,
            title: "Created At",
            render: {
              action: (val) => {
                return moment(val).format("YYYY-MM-DD")
              }
            },
            filter: {
              type: "date",
              vModel: null,
              action: (val) => {
                this.filter("created_at", val);
              }
            }
          },
          {
            name: "updated_at",
            sort: true,
            title: "Updated At",
            render: {
              action: (val) => {
                return moment(val).format("YYYY-MM-DD")
              }
            },
            filter: {
              type: "date",
              vModel: null,
              action: (val) => {
                this.filter("updated_at", val);
              }
            }
          },
          {
            name: "role",
            sort: true,
            title: "Role",
            render: {
              action: (val) => {
                if (val === 2) {
                  return "admin"
                } else {
                  return "user"
                }
              }
            },
            filter: {
              type: "select",
              vModel: "",
              options: [
                {text: "select user rol", value: ""},
                {text: "admin", value: 2},
                {text: "user", value: 1},
              ],
              action: (val) => {
                this.filter("role", val);
              }
            }
          },
        ],
        customFilter: [
          {
            filter: {
              type: "select",
              vModel: "",
              options: [
                {text: "select user status", value: ""},
                {text: "Block", value: 1},
                {text: "Active", value: 2},
              ],
              action: (val) => {
                this.filter("block", val);
              }
            }
          }
        ]
      }
    }
  }
</script>
