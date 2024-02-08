<script setup>
import { ProductService } from '@/service/ProductService';

onMounted(() => {
  ProductService.getProducts().then((data) => (products.value = data));
  console.log('AppTable mounted');
});

const products = ref();
</script>

<template>
  <div class="card">
    <DataTable :value="products" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" showGridlines stripedRows
      tableStyle="min-width: 50rem">
      <Column field="code" header="Code"></Column>
      <Column field="name" header="Name"></Column>
      <Column field="category" header="Category"></Column>
      <Column field="quantity" header="Quantity"></Column>
    </DataTable>
  </div>
</template>

<style scoped>
h1 {
  border: 5px solid red;
}
</style>
