<template>
  <span class="badge">
    {{ label }}
  </span>
</template>

<script>
export default {
  name: "TotalPokemonBadge",
  props: ["label"]
}
</script>

<style scoped>
.badge {
  background-color: #323232;
  color: #d6d6d6;
  border-radius: 0.250rem;
  padding: 0.250rem 0.625rem;
}
</style>