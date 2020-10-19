<template>
   <v-card
    class="mx-2 mt-3 px-0 py-0"
    style="border-radius: 5%;"
    max-width="200"
    max-height="300"
  >
   <v-img class="ma-0 pa-0" :src="require(`../static/images/${card}.png`)" width="100%" height="100%" alt="" />
    <!-- <v-card-text>
      <p class="display-1 text--primary">
        {{`${this.card.id}`}}
     </p>
    </v-card-text> -->
  </v-card>
</template>

<script>
export default {
    props: ['card'],
    data(){
        return{
            // path:  `../static/images`
        }
    },
    methods:{
      // rotate(){
      //   this.$emit('rotate', this.card)
      // }
    }
}
</script>

<style lang="scss" scoped>

</style>