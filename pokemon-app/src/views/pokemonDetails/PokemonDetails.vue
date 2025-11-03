<script>
export default {
  name: "PokemonDetails",
  props: {
    id: Number
  },
  created() {
    console.log(this.$route.params.id);
  }
}
</script>

<template>
  <p class="card-text">
    {{ id }}
  </p>
</template>

<style scoped>
.card-text {
  color: white;
}
</style>