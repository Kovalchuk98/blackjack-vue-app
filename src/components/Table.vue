<template>
  <v-flex class="container row mx-auto align-center flex-column">
        <!-- Dealer -->
        <h1 class="align-self-start">Dealer: {{ isRunning ? '?' : dealerPoints}}</h1>
        <v-row class="card_wrapper row justify-center">
          <Card 
            v-for="(card, index) in dealerCards"
            :key="card"
            :card ="card"
            :index = "index"
            :isRunning="isRunning"
          />
        </v-row>
        <!-- :show="show" -->
        <!-- <v-row class="row justify-center ma-4" style="border: 2px solid #95998180;"> -->
          <h1>{{msg}}</h1>
        <!-- </v-row> -->
        <!-- Player -->
        <h1 class="align-self-start">Player: {{playerPoints}}</h1>
        <v-row class="card_wrapper row justify-center">
          <Card 
            v-for="card in playerCards"
            :key="card"
            :card ="card"
          />
        </v-row>

        <v-row class="d-flex align-center justify-center mt-2">
          <v-btn class="success mr-4 mb-2" large rounded @click="newGame" :disabled="isRunning">New game</v-btn>
          <v-btn class="primary mr-4 mb-2" large rounded :disabled="!isRunning" @click="hit">Hit</v-btn>
          <v-btn class="orange mr-4 mb-2" large rounded :disabled="!isRunning" @click="stand">Stand</v-btn>
          <v-btn class="red mb-2" large rounded :disabled="!isRunning" @click="giveUp">Give Up</v-btn>
        </v-row>
          <v-row class="flex-column align-self-start ma-2 pa-2" style="border: 2px solid #95998180; border-radius: 4%;">
          <h3>Player Wins: {{totalWins.player}}</h3>
          <h3>Dealer Wins: {{totalWins.dealer}}</h3>
        </v-row>



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
      isRunning: false,
      playerPoints: 0,
      dealerPoints: 0,
      msg: '',
      totalWins:{
        player: 0,
        dealer: 0
      },
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
    },
  },
  methods:{
    newGame(){
       this.isRunning = true
       this.$store.dispatch('newGame')

      //  if(this.dealerPoints > this.playerPoints){
      //     this.msg = 'You lose'
      //     this.isRunning = false
      //     setTimeout(() => {
      //       this.newGame()
      //     }, 2000);
      //   } else if(this.dealerPoints == this.playerPoints){
      //      this.msg = 'Draw'
      //   } else {
      //     this.msg = 'You win'
      //   }

      this.playerPoints = this.checkHand(this.playerCards)
      this.dealerPoints = this.checkHand(this.dealerCards)

      this.msg = 'Make Your move...'


    },

    checkHand(hand){
      let value = 0;
      hand.forEach((item)=>{
        let v = item.slice(0, -1)
        if(isNaN(parseInt(v)) && hand.length === 2 && v === 'AC' && value < 11){
          v = 11
        } else if((isNaN(parseInt(v)) && hand.length >= 3 && v === 'AC') || (isNaN(parseInt(v)) && hand.length === 2 && v === 'AC' && value >= 11)){
          v = 1
        } else if (isNaN(parseInt(v))){
          v = 10
        } else {
          v = parseInt(v)
        }
        value += v
      })
      return value
    },

    hit(){
      this.$store.dispatch('hit')
      this.playerPoints = this.checkHand(this.playerCards)
        if(this.playerPoints > 21) {
            this.msg = 'Busted, you lose'
            this.isRunning = false
            this.totalWins.dealer++
            // setTimeout(() => {
            // this.giveUp()
            // this.newGame()
            // }, 2000);
        }
    },
      stand(){
        while(this.dealerPoints <= 16 && this.playerPoints > this.dealerPoints){
          this.$store.dispatch('stand')
          this.dealerPoints = this.checkHand(this.dealerCards)
            if(this.dealerPoints > 21) {
              // this.msg = 'Busted, Dealer lose'
              this.isRunning = false
              this.totalWins.player++
              this.show = true
          }
        }

        if(this.dealerPoints > this.playerPoints && this.dealerPoints <= 21){
          this.msg = 'You lose'
          this.isRunning = false
          this.totalWins.dealer++
            // setTimeout(() => {
            //   this.giveUp()
            //   this.newGame()
            // }, 2000);
        } else if(this.dealerPoints == this.playerPoints){
           this.msg = 'Draw'
          this.isRunning = false
            // setTimeout(() => {
            //   this.giveUp()
            //   this.newGame()
            // }, 2000);
        } else {
          this.msg = 'You win'
          this.totalWins.player++
          this.isRunning = false
            // setTimeout(() => {
            //   this.giveUp()
            //   this.newGame()
            // }, 2000);
           }
        },

    //     if(this.dealerPoints > this.playerPoints && this.dealerPoints <= 21){
    //       this.msg = 'You lose'
    //       this.isRunning = false
    //       this.totalWins.dealer++
    //     } else if(this.dealerPoints == this.playerPoints){
    //        this.msg = 'Draw'
    //     } else {
    //       this.msg = 'You win'
    //       this.totalWins.player++
    //     }
    // },
      giveUp(){
        this.isRunning = false
        this.playerPoints = 0
        this.dealerPoints = 0
        this.playerHand = null
        this.dealerHand = null
      }
    }
  }

</script>

<style lang="scss">
  .card_wrapper{
    position: relative;
    width: 85%;
    min-height: 90px;
    border: 2px solid #95998180;
    border-radius: 20px;
  }
</style>