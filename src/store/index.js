import { createStore } from 'vuex'
import { v4 as uuidv4 } from 'uuid'
import apiConnection from '../api/transactionApi'

export default createStore({
	state: {
		transactions: [],
		isOpenModal: false
  },
	mutations: {
		setTransactions(state, values){
			state.transactions = values
		},

		newTransaction(state, transaction){

			transaction.id = uuidv4()
			state.transactions.push(transaction)
		},

		setModal(state, isOpen) {
			state.isOpenModal = isOpen
		}
  },
	actions: {
		async loadTransactions({commit}){

			try {
				//get transactions from api
				const { data } = await apiConnection.get('transactions')
				// Commit mutation
				commit('setTransactions', data)
			} catch(error) {
				console.log(error)
			}
		},

	},
	getters:{
		getAllTransactions(state){
			return state.transactions
		},

		getIncomings(state){
			return state.transactions.filter((transaction) => transaction.type === 'Incoming')
		},
		getExpenses(state){
			return state.transactions.filter((transaction) => transaction.type === 'Expense')
		},

		getModalStatus(state) {
			return state.isOpenModal
		}
	},
  modules: {
  }
})
