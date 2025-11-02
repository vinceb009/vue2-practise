<script>
export default {
  name: "PokemonCard",
  props: {
    name: String,
    coverImage: String,
  }
}
</script>

<template>
  <div class="card">
    <img :src="coverImage" width="150"/>
    {{name}}

  </div>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>