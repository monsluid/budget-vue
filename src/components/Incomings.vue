<template>
	<div>
		<h1 class="text-center text-light bg-success">Ingresos</h1>
		<ul class="list-group">
			<li v-for="incoming in incomings" :key="incoming.id"
				@click="setModal(true, incoming)"
				class="list-group-item d-flex justify-content-between align-items-start mb-2"
				>
				<div class="ms-2 me-auto">
					<div class="fw-bold">{{ incoming.title }}</div>
					Monto:${{ incoming.amount }}
				</div>
				<span v-if="incoming.fixed"
				class="badge bg-primary rounded-pill">Fijo</span>
			</li>
		</ul>
	</div>
	
	<Modal v-if="isOpen"
		@on:close="setModal(false)"
	>
		<template v-slot:header>
		<div class="modal-header">
			<h5 class="modal-title">Editar Movimiento</h5>
			<button @click="setModal(false)" class="btn btn-danger btn-sm"> Eliminar</button>		
		</div>
		</template>
		<template v-slot:body>
		<div class="modal-body">
			<form>
				<label for="Concepto" class="form-label">Concepto</label>
				<input type="text" class="form-control" v-model="transaction.title"/>
				<label for="amount" class="form-label mt-3">Monto</label>
				<input type="number" class="form-control" v-model="transaction.amount">
				<label for="type" class="form-label mt-3">Tipo</label>
				<select class="form-select">
					<option selected value="Incoming">Ingreso</option>
					<option value="Expense">Gasto</option>
				</select>
				<div class="form-check form-switch my-3">
					<input class="form-check-input"
						:checked="transaction.fixed ? 'true' : '' "
						type="checkbox" 
						role="switch" 
						id="flexSwitchCheckDefault">
					<label class="form-check-label" for="flexSwitchCheckDefault">Fijo</label>
				</div>	
		<div class="modal-footer">
			<button class="btn btn-primary">Finalizar</button>
			<button 
				class="btn btn-secondary"
				@click="setModal(false)"
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
import { ref } from 'vue'
import { useStore } from 'vuex'

import Modal from '../components/Modal'

export default {
	props:['incomings'],
	components: { Modal },
	setup(props){
		
		const isOpen = ref(false)
		const transaction = ref({})

		const setModal = (isOpenModal, incoming) => {
				const { id, title, amount, type, fixed } = incoming
				transaction.value = { id, title, amount, type, fixed }
				
				isOpen.value = isOpenModal

			}

		return {
			isOpen,
			transaction,
			setModal
		}
	}
		
}
</script>

<style scoped>

</style>
