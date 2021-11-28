import { useStore } from 'vuex'

const useTransaction = () => {

	const store = useStore()

	return {
		// Methods
		getAllTransactions: () => store.getters['getAllTransactions'],
		getIncomings: () => store.getters['getIncomings'],
		getExpenses: () => store.getters['getExpenses'],

		loadTransactions: () => store.dispatch('loadTransactions'),
		newTransaction: (transaction) => store.dispatch('newTransaction', transaction),
		updateTransaction: (transaction) => store.dispatch('updateTransaction',transaction),
		deleteTransaction: (id) => store.dispatch('deleteTransaction', id)
	}

}

export default useTransaction
