<template>
	<button class="btn btn-danger fab"
		@click="isOpen = true"
	>Nuevo</button>

	<Modal v-if="isOpen"
		@on:close="isOpen = false"
	>
		<template v-slot:header>
		<div class="modal-header">
			<h5 class="modal-title">Agregar Movimiento</h5>
		</div>
		</template>
		<template v-slot:body>
		<div class="modal-body">
			<form @submit.prevent="onClick">
				<label for="Concepto" class="form-label">Concepto</label>
				<input type="text" class="form-control" v-model="transaction.title"/>
				<label for="amount" class="form-label mt-3">Monto</label>
				<input type="number" class="form-control" v-model="transaction.amount"/>
				<label for="type" class="form-label mt-3">Tipo</label>
				<select class="form-select" v-model="transaction.type">
					<option value="Incoming">Ingreso</option>
					<option value="Expense">Gasto</option>
				</select>
				<div class="form-check form-switch my-3">
					<input class="form-check-input"
						v-model="transaction.fixed"
						type="checkbox" 
						role="switch" 
						id="flexSwitchCheckDefault">
					<label class="form-check-label" for="flexSwitchCheckDefault">Fijo</label>
				</div>	
		<div class="modal-footer">
			<button type="submit" class="btn btn-primary">Finalizar</button>
			<button 
				class="btn btn-secondary"
				@click="isOpen = false"
			>
				Salir
			</button>

		</div>
			</form>
		</div>
		</template>
		<template v-slot:footer></template>
	</Modal>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex'

import Modal from '../components/Modal'
import useTransaction from '../composables/useTransaction'

export default{
	components: { Modal },
	setup(){
		const { newTransaction } = useTransaction()

		const isOpen = ref(false)
		const transaction = ref({ title:"", amount:"", type:"", fixed: false })
		
		const onClick = () => {
			newTransaction(transaction.value)
			transaction.value = { title:"", amount:"", type:"", fixed: false }
			isOpen.value = false
		}

	
		return {
			isOpen, transaction,
			onClick
		}
	}
}
</script>

<style scoped>
.fab {
	position: absolute;
	bottom: 100px;
	right: 50px;
	width: 70px;
	height: 70px;
	border-radius: 50%;
}

</style>

