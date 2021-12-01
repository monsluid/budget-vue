import { computed } from 'vue'
import { useStore } from 'vuex'

const useTransaction = () => {

	const store = useStore()

	return {
		// getters
		getAllTransactions: () => store.getters['getAllTransactions'],
		getIncomings: () => store.getters['getIncomings'],
		getExpenses: () => store.getters['getExpenses'],
		// computed props
		getTotalIncomings: computed( () => store.getters['getTotalIncomings']),
		getTotalExpenses: computed( () => store.getters['getTotalExpenses']),
		// methods CRUD
		loadTransactions: () => store.dispatch('loadTransactions'),
		newTransaction: (transaction) => store.dispatch('newTransaction', transaction),
		updateTransaction: (transaction) => store.dispatch('updateTransaction',transaction),
		deleteTransaction: (id) => store.dispatch('deleteTransaction', id)
	}

}

export default useTransaction
