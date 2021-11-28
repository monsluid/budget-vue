import { createStore } from 'vuex'
import { v4 as uuidv4 } from 'uuid'
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
				// add id
				//transaction.id = uuidv4()
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
				console.log(id)
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
		}
	},
  modules: {
  }
})
