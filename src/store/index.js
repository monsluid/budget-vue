import { createStore } from 'vuex'
import apiConnection from '../api/transactionApi'

export default createStore({
	state: {
		transactions: [],
  },
	mutations: {
		setTransactions(state, values){
			state.transactions = [ ...state.transactions, ...values ]
		},

		addTransaction(state, transaction){

			state.transactions.push(transaction)
		},

		updateTransaction(state, dataUpdated) {
			const index = state.transactions.map( t => t.id ).indexOf(dataUpdated.id)
			state.transactions[index] = dataUpdated
		},

		deleteTransaction(state, id){
			const index = state.transactions.map( t => t.id ).indexOf(id)
			state.transactions.splice(index,1)
		}

  },
	actions: {
		async loadTransactions({ commit }){

			try {
				//get transactions from api
				const { data } = await apiConnection.get('/transactions.json')
				
				if(!data){
					commit('setTransactions',[])
					return
				}
				
				const transactions = []
				for(let id of Object.keys(data)){
					transactions.push({id, ...data[id]})
				}
				
				commit('setTransactions', transactions)

			} catch(error) {
				console.log(error)
			}
		},

		async newTransaction({ commit },transaction){

			try {
				// save database
				await apiConnection.post('/transactions.json',transaction)
				// update state
				commit('addTransaction', transaction)
				

			} catch(error) {
				console.log(error)
			}
		},

		async updateTransaction({ commit }, transaction) {
			
			const { id, title, amount, type, fixed } = transaction
			const dataUpdated = { title, amount, type, fixed }
			
			try {
				// update in database
				await apiConnection.put(`/transactions/${id}.json`, dataUpdated)
				// all rigth? change State
				commit('updateTransaction', transaction)
			} catch(error) {
				console.log(error)
			}	
		},

		async deleteTransaction({ commit }, id){
			
			try {
				// delete in database
				await apiConnection.delete(`/transactions/${id}.json`)
				commit('deleteTransaction', id)
			} catch(error) {
				console.log('apiConnection Error:' + error)
			}
		}

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
		},
		
		getTotalIncomings(_, getters){
			return getters.getIncomings.reduce((acc, transaction) => acc + transaction.amount, 0)
		},

		getTotalExpenses(_, getters){
			return getters.getExpenses.reduce((acc, transaction) => acc + transaction.amount, 0)
		},

	},
  modules: {
  }
})
