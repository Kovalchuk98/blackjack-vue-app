import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({

    state: {
        deck: [],
        playerHand: [],
        dealerHand: [],
    },

    mutations: {

        setDeck(state, payload){
            state.deck = payload
        },

        setPlayerCards(state, payload){
            state.playerHand = payload
        },

        setDealerCards(state, payload){
            state.dealerHand = payload
        },

        hit(state){
            let hitCard = state.deck.shift()
            state.playerHand.push(hitCard)
            console.log(state.deck)
        },
         stand(state){
           let hitCard = state.deck.shift()
            state.dealerHand.unshift(hitCard)
            console.log(state.deck)
        }
    },

    actions: {
     
        newGame( {dispatch, commit, state} ){

            dispatch('generateDeck')
            let stack = []
            let playerCards = []
            let dealerCards = []
            for(let i = 0; i < 4; i++){
              let a  = state.deck.shift()
              stack.push(a)
            }
           stack.forEach((item, index)=>{
               (index % 2 === 0) ? playerCards.push(item) : dealerCards.push(item)
           })
           commit('setPlayerCards', playerCards)
           commit('setDealerCards', dealerCards)
        },
        
        generateDeck({ dispatch }){
            const color = ["S","H","D","C"]
            const val = ["2","3","4","5","6","7","8","9","10","AC","J","Q","K"]
            let deck = []
            val.map((v)=>{
                color.map((c)=>{
                    deck.push(`${v}${c}`)
                })
            })
            dispatch('shuffleDeck', deck)
        },

        shuffleDeck({ commit }, payload){
            for(let i = payload.length - 1; i > 0; i--){
                let j = Math.floor(Math.random() * i)
                let tmp = payload[i]
                payload[i] = payload[j]
                payload[j] = tmp
            }
            commit('setDeck', payload)
            console.log(payload)
        },

        hit({ commit }){
            commit('hit')
        },

        stand({ commit }){
            commit('stand')
        }
    },

    getters: {
        cards(state){
            return state.deck
        },
        playerCards(state){
            return state.playerHand
        },
        dealerCards(state){
            return state.dealerHand
        },
        playerPoints(state){
            return state.playerPoints
        },
        dealerPoints(state){
            return state.dealerPoints
        }
    }
})

export default store