<template>
	<button class="btn btn-danger fab"
		@click="isOpen=true"
	>Nuevo</button>

	<Modal v-if="isOpen"
		@on:close="isOpen=false"
		title="hola mundo"
	>
		<template v-slot:header>
		<div class="modal-header">
			<h5 class="modal-title">Agregar Movimiento</h5>
			<button @click="isOpen=false" class="btn-close"></button>		
		</div>
		</template>
		<template v-slot:body>
		<div class="modal-body">
			<form>
				<label for="Concepto" class="form-label">Concepto</label>
				<input type="text" class="form-control" />
				<label for="amount" class="form-label mt-3">Monto</label>
				<input type="number" class="form-control" />
				<label for="type" class="form-label mt-3">Tipo</label>
				<select class="form-select">
					<option value="Incoming">Ingreso</option>
					<option value="Expense">Gasto</option>
				</select>
				<div class="form-check form-switch my-3">
					<input class="form-check-input"
						type="checkbox" 
						role="switch" 
						id="flexSwitchCheckDefault">
					<label class="form-check-label" for="flexSwitchCheckDefault">Fijo</label>
				</div>	
		<div class="modal-footer">
			<button class="btn btn-primary">Finalizar</button>
			<button 
				class="btn btn-secondary"
				@click="isOpen=false"
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
import Modal from '../components/Modal'

export default{
	components: { Modal },
	setup(){

		return {
			isOpen: ref(false),
			transaction: ref({})
				
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

