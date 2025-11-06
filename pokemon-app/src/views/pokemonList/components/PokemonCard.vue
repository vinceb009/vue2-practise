<script>
import Badge from "@/components/Badge.vue";

export default {
  name: "PokemonCard",
  components: {
    Badge,
  },
  props: {
    id: Number,
    name: String,
    coverImage: String,
    types: Array
  },
}
</script>

<template>
  <transition appear name="fade">
    <router-link :to="{ name: 'pokemonDetails', params: { id }}" class="card">
      <div class="header">
        <p>#{{ id }}</p>

        <svg aria-hidden="true" class="svg" data-slot="icon" fill="currentColor"
             viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path clip-rule="evenodd"
                d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06Z"
                fill-rule="evenodd"></path>
        </svg>
      </div>
      <div class="content">
        <img :src="coverImage" width="150"/>

        <p class="name">{{ name }}</p>

        <div class="typeContainer">
          <Badge v-for="type in types" :key="type.name" :label="type.type.name" class="typeBadge"/>
        </div>

      </div>

    </router-link>
  </transition>

</template>

<style scoped>
.fade-enter-active {
  transition: opacity 0.5s, transform 0.5s;
}

.fade-enter {
  opacity: 0;
  transform: translateY(50px);
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}

.card {
  border-radius: 10px;
  border: 1px solid #292929;
  background-color: #1b1a1a;
  padding: 15px;
  cursor: pointer;

  /* Since a router link is rendered as a under the hood, its also comes with its own css styles, which we remove here
     I dont think the blue text, underscore fit the current theme.
  */
  text-decoration: none;
  color: #c5c5c5;
}

.card:hover {
  background-color: #232222;
}

.header {

  display: flex;
  justify-content: space-between;
}

.svg {
  width: 20px;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.typeContainer {
  margin-top: 5px;
  display: flex;
  gap: 5px;
}
</style>