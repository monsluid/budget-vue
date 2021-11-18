<template>
<div class="container">
  <div class="row">
  	<div class="col-12 col-md-6">
  		<Incomings/>
  	</div>
  	<div class="col-12 col-md-6">
  		<Expenses/>
  	</div>
  </div>
	<NewTransaction/>
</div>
  
</template>

<script>
import Incomings from './components/Incomings';
import Expenses from './components/Expenses';
import NewTransaction from './components/NewTransaction.vue';

export default {
	components: { Incomings, Expenses, NewTransaction }

  
}
</script>

<style lang="scss">

</style>
