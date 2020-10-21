<template>
  <v-app>
    <v-app-bar
      app
      dark
      class="d-flex justify-center"
    >
      <h1>BlackJack</h1>
    </v-app-bar>
    <v-main>
      <v-container fluid class="table_wrapper">
         <Table />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Table from '@/components/Table.vue'
export default {
  name: 'App',
  components: {
    Table
  },
  data: () => ({
  }),
};
</script>

<style lang="scss" scoped>
    .table_wrapper{
    background-color: #155029;
    height: 100%;
  }

</style>
