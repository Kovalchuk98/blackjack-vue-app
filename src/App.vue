<template>
  <v-app>
    <v-app-bar
      app
      dark
    >
    </v-app-bar>
    <v-main>
      <v-container fluid class="table_wrapper">
         <Table />
      </v-container>
    </v-main>
  </v-app>
</template>
        //  @click.native="aaaa(index)"
      //  :class="{ rotating_true: cards[index] }"
          //  :class="{rotating_true: activeIndex == index}"

<script>
import Table from '@/components/Table.vue'
export default {
  name: 'App',
  components: {
    Table
  },
  data: () => ({
    // activeIndex: null
  }),
  computed:{
    // cards(){
    //   return this.$store.getters.cards
    // }
  },
  methods:{
    // rotate(index){
    //   console.log(index);
    // }
    // aaaa(index){
    //   this.activeIndex = index
    // }
  }
};
</script>

<style lang="scss" scoped>
    .table_wrapper{
    background-color: rgb(21, 80, 41);
    height: 100%;
    // background-image: url('~@/static/images/table_txt.jpg');
    // background-origin: border-box;
    // background-repeat: repeat;
  }
  // .rotating {
  // transition: all .6s ease-in;
  // }
  // .rotating_true {
  //   transform: rotateZ(360deg);
  // }
</style>
