<template>
  <v-flex class="container row mx-auto align-center flex-column">
        <!-- Dealer -->
        <h2 class="align-self-start">Dealer: {{ isRunning ? '?' : dealerPoints}}</h2>
          <v-row class="card_wrapper row justify-center">
          <transition-group name="fade" mode="out-in" class="d-flex row justify-center">
            <Card 
              v-for="(card, index) in dealerCards"
              :key="card"
              :card ="card"
              :index = "index"
              :isRunning="isRunning"
            />
          </transition-group>
        </v-row>
          <h2 class="mt-3">{{msg}}</h2>
        <!-- Player -->
        <h2 class="align-self-start">Player: {{playerPoints}}</h2>
        <v-row class="card_wrapper row justify-center">
          <transition-group name="fade" mode="in-out" class="d-flex row justify-center">
            <Card 
              v-for="card in playerCards"
              :key="card"
              :card ="card"
            />
          </transition-group>
        </v-row>

        <v-row class="d-flex align-center justify-center mt-4">
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
      msg: 'Click on "New Game" to start',
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
      this.playerPoints = this.checkHand(this.playerCards)
      this.dealerPoints = this.checkHand(this.dealerCards)
      this.msg = 'Make Your move'

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
        }
    },
      stand(){
        while(this.dealerPoints <= 17 && this.playerPoints > this.dealerPoints){
          this.$store.dispatch('stand')
          this.dealerPoints = this.checkHand(this.dealerCards)
        }

        if(this.dealerPoints > this.playerPoints && this.dealerPoints <= 21){
          this.msg = 'You lose'
          this.isRunning = false
          this.totalWins.dealer++
        } else if(this.dealerPoints == this.playerPoints){
          this.msg = 'Draw'
          this.isRunning = false
        } else {
          this.msg = 'You win'
          this.totalWins.player++
          this.isRunning = false
           }
        },

      giveUp(){
        this.isRunning = false
        this.playerPoints = 0
        this.dealerPoints = 0
        this.totalWins.player = 0
        this.totalWins.dealer = 0
        this.msg = 'Click on "New Game" to start'
        // this.$store.dispatch('giveUp')
        // this.playerHand = []
        // this.dealerHand = []
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
    transition: all .5s linear;
  }
  .fade-enter-active{
    transition-delay: 1s !important;
    transition: opacity 1s ease-in !important;
    }
  .fade-leave-active {
    transition: opacity 1s ease-out !important;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>