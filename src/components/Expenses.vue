<template>
	<div>
		<h1 class="text-center bg-danger text-light">Gastos</h1>
		<ul class="list-group">
			<li v-for="expense in expenses" :key="expense.id"
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
</template>

<script>
export default{
	props:['expenses'],
		
}
</script>

<style scoped>

</style>
