<template>
  <v-flex class="container row mx-auto justify-center flex-column">
        <!-- <Card 
        class="rotating"
        v-for="(card, index) in cards"  
        :key="index" 
        :card="card"
        /> -->
        <!-- Dealer -->
          <v-col class="row">
          <!-- <h3>Player: {{playerPoints}}</h3> -->
          <Card 
            v-for="(card, index) in dealerCards"
            :key="index"
            :card ="card"
          />
        </v-col>
        <v-col class="ma-0 pa-0">
          <v-btn class="success mr-2" rounded @click="newGame" :disabled="isRunning">Start New game</v-btn>
          <v-btn class="primary mr-2" rounded @click="hit">Hit</v-btn>
          <v-btn class="red" rounded>Stand</v-btn>
        </v-col>
        <!-- Player -->
        <v-col class=" row ma-0 pa-0">
          <!-- <h3>Player: {{playerPoints}}</h3> -->
          <Card 
            v-for="(card, index) in playerCards"
            :key="index"
            :card ="card"
          />
        </v-col>
    </v-flex>
</template>

<script>
import Card from '@/components/Card.vue'
export default {
  components:{
    Card
  },
  data() {
    return{
      isRunning: false
      // playerPoints: 0,
      // playerHand: [],
      // dealerPoints: 0,
      // dealerHand: []
    }
  },
  computed:{
    cards(){
      return this.$store.getters.cards
    },
    playerCards(){
      return this.$store.getters.playerCards
    },
    dealerCards(){
      return this.$store.getters.dealerCards
    }
  },
  methods:{
    newGame(){
       this.isRunning = true
       this.$store.dispatch('generateDeck')
        for (let i = 0; i < 2; i++){
          this.$store.dispatch('playerCards')
          this.$store.dispatch('dealerCards')
        }
        // setTimeout(() => {
        //   this.$store.dispatch('playerCards')
        // }, 1000);
      //  let player = []
      //  for(let i=0; i<2; i++) {
      //    let card = this.cards.shift()
      //    player.push(card)
      //  }
       console.log(this.cards);
       console.log(this.playerCards);
       console.log(this.dealerCards);
    },
    hit(){
      this.$store.dispatch('hit')
      console.log(this.playerCards);
    }
  }

}
</script>

<style lang="scss">

</style>