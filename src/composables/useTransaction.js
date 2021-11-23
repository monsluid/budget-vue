import { useStore } from 'vuex'

const useTransaction = () => {

	const store = useStore()

	return {
		// Methods
		getAllTransactions: () => store.getters['getAllTransactions'],
		getIncomings: () => store.getters['getIncomings'],
		getExpenses: () => store.getters['getExpenses'],

		loadTransactions: () => store.dispatch('loadTransactions')
	}

}

export default useTransaction
