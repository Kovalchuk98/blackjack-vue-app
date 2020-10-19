import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({

    state: {
        deck: [],
        playerPoints: 0,
        playerHand: [],
        dealerPoints: 0,
        dealerHand: []
    },

    mutations: {

        setDeck(state, payload){
            state.deck = payload
            // console.log(state.deck)
        },

        setPlayerCards(state, payload){
            state.playerHand.push(payload)
        },

        setDealerCards(state, payload){
            state.dealerHand.push(payload)
        }
    },

    actions: {

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

        hit({ dispatch }){
            dispatch('playerCards')
        },

        playerCards({ commit, state }){
            let playerDeck = []
            for(let i=0; i<1; i++) {
              let card = state.deck.shift()
              playerDeck.push(card)
            }
            commit('setPlayerCards', playerDeck )
            // console.log(state.deck)
        },
        
        dealerCards({ commit, state }){
            let dealerDeck = []
            for(let i=0; i<1; i++) {
              let card = state.deck.shift()
              dealerDeck.push(card)
            }
            commit('setDealerCards', dealerDeck )
            // console.log(state.deck)
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
        }
    }

})

export default store