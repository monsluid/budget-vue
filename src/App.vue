<template>
<div class="container">
	<h1 class="title-app text-center my-3">Presupuesto <span> Vue </span></h1>
  <div class="row">
  	<div class="col-12 col-md-6">
  		<Incomings :incomings="getIncomings()"/>
  	</div>
  	<div class="col-12 col-md-6">
  		<Expenses :expenses="getExpenses()"/>
  	</div>
  </div>
	<NewTransaction/>
</div> 
</template>

<script>
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import Incomings from './components/Incomings';
import Expenses from './components/Expenses';
import NewTransaction from './components/NewTransaction.vue';

import useTransaction from './composables/useTransaction';

export default {
	components: { Incomings, Expenses, NewTransaction },
	setup(){

		const store = useStore()
		
		const { getAllTransactions, 
			      getIncomings, 
			      getExpenses,
			      loadTransactions } = useTransaction()
	
		onMounted(() => {
			loadTransactions()
		})

		return {
			getAllTransactions, getIncomings, getExpenses,

			setModal: (isOpen) => store.commit('setModal', isOpen)
		}

	}
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&family=Raleway:wght@300;400;500;700&display=swap');

#app {
	font-family: 'Raleway', sans-serif;
}

.title-app span {
	color: #1B5E20;
	font-weight: bold;
}
</style>
