<template>
	<div>
		<h1 class="text-center text-light bg-danger">Gastos</h1>
		<ul class="list-group">
			<li v-for="expense in expenses" :key="expense.id"
				@click="setModal(true, expense)"
				class="list-group-item d-flex justify-content-between align-items-start mb-2"
				>
				<div class="ms-2 me-auto">
					<div class="fw-bold">{{ expense.title }}</div>
					Monto:${{ expense.amount }}
				</div>
				<span v-if="expense.fixed"
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
			<button @click="onDelete(transaction.id)" class="btn btn-danger btn-sm"> Eliminar</button>		
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
				<select class="form-select" v-model="transaction.type">
					<option value="Incoming" >Ingreso</option>
					<option selected value="Expense">Gasto</option>
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
			<button @click.prevent="onClick"
				type="submit"
				class="btn btn-primary">Finalizar</button>

			<button @click="setModal(false)"
				class="btn btn-secondary">Salir</button>

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
import useTransaction from '../composables/useTransaction'


export default {
	props:['expenses'],
	components: { Modal },
	setup(props){

		const { updateTransaction, deleteTransaction } = useTransaction()
		
		const isOpen = ref(false)
		const transaction = ref({})

		const setModal = (isOpenModal, expense) => {
				const { id, title, amount, type, fixed } = expense
				transaction.value = { id, title, amount, type, fixed }
				
				isOpen.value = isOpenModal

			}

		const onClick = () => {
				updateTransaction(transaction.value)
				isOpen.value = false
			}

		const onDelete = id => {
			deleteTransaction(id)
			isOpen.value = false
		}

		return {
			isOpen,
			transaction,
			setModal,
			onClick,
			onDelete
		}
	}
		
}
</script>

<style scoped>

</style>
