<template>
		<div class="card text-center my-2">
			<div class="card-header">
				<h3>Mis Finanzas</h3>
			</div>
			<div class="card body">
				<div class="row">
					<div class="col-12">
						<h4>Ingresos: <span>${{ getTotalIncomings }}</span></h4>
					</div>
					<div class="col-12">
						<h4>Gastos: <span>${{ getTotalExpenses }}</span></h4>
					</div>
					<div class="col-12">
						<h4>Total: <span>${{ getTotalIncomings - getTotalExpenses }}</span></h4>
					</div>
			</div>
		</div>
	</div>
</template>

<script>
import useTransaction from '../composables/useTransaction'

export default{
	props:['incomings', 'expenses'],
	setup(props){
		
		const { getTotalIncomings, getTotalExpenses } = useTransaction()

		
		return {
			getTotalIncomings, getTotalExpenses
		}
	}
}
</script>

<style scoped>

</style>
