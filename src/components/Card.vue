<template>
   <v-card
    class="ma-3 px-0 py-0"
    style="border-radius:7%;"
    max-width="15%"
    max-height="35%"
  >
   <!-- max-width="160" -->
    <!-- max-height="260" -->
   <v-img 
      class="ma-0 pa-0" 
      :src="(this.index == 0 && this.isRunning === true) ? require(`../static/images/gray_back.png`) : require(`../static/images/${card}.png`)" 
      alt="" 
    />
  </v-card>
</template>

<script>
export default {
    props: ['card','index','isRunning'],
    data(){
        return{

        }
    },
    methods:{
      
    }
}
</script>

<style lang="scss" scoped>

</style>