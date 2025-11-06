<template>
  <span class="badge">
    {{ label }}
  </span>
</template>

<script>
export default {
  name: "TotalPokemonBadge",
  props: {
    label: Number
  }
}
</script>

<style scoped>
.badge {
  background-color: #1a365d;
  color: #63b3ed;
  border-radius: 0.250rem;
  padding: 0.250rem 0.625rem;
}
</style>