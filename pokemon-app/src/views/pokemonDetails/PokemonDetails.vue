<script>
import AnimatedCard from "@/views/pokemonDetails/components/AnimatedCard.vue";
import ImageSlider from "@/views/pokemonDetails/components/ImageSlider.vue";

export default {
  name: "PokemonDetails",
  components: { ImageSlider, AnimatedCard },
  props: {
    id: Number
  },
  data() {
    return {
      name: "",
      sprites: []
    }
  },
  created() {
    this.handlePokemonDetails();
  },
  methods: {
    async handlePokemonDetails() {
      const {
        name,
        sprites
      } = await this.fetchPokemonDetails(
          this.buildUrlToFetch(this.id)
      );

      this.name = name;
      this.sprites = this.filterAccessibleSprites(sprites);
    },
    buildUrlToFetch(id) {
      return `https://pokeapi.co/api/v2/pokemon/${id}`;
    },
    async fetchPokemonDetails(url) {
      const response = await fetch(url);
      const json = await response.json();

      return {
        name: json.name,
        sprites: json.sprites
      }
    },
    filterAccessibleSprites(sprites) {
      // filter null images, and only take the sprites in the root dir
      // there are even more sprites in their coresponding dir, but thats out of scope for this project.
      return Object.values(sprites).filter(sprite => sprite && typeof sprite !== "object");
    }

  }
}
</script>

<template>
  <div class="page">
    <router-link :to="{ name: 'pokemonList'}">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="backButton">
        <path fill-rule="evenodd" d="M5.25 6.31v9.44a.75.75 0 0 1-1.5 0V4.5a.75.75 0 0 1 .75-.75h11.25a.75.75 0 0 1 0 1.5H6.31l13.72 13.72a.75.75 0 1 1-1.06 1.06L5.25 6.31Z" clip-rule="evenodd" />
      </svg>
    </router-link>
    <div class="container">
      <AnimatedCard>
        <p>{{ name }}</p>
        <ImageSlider
          :sprites="sprites"
        />
      </AnimatedCard>
      <AnimatedCard>
        <p class="typeContainer">
          Hello world from card
        </p>
      </AnimatedCard>
      <AnimatedCard>
        <p class="typeContainer">
          Hello world from card
        </p>
      </AnimatedCard>
      <AnimatedCard>
        <p class="typeContainer">
          Hello world from card
        </p>
      </AnimatedCard>
    </div>
  </div>
</template>

<style scoped>
.page {
  padding: 20px;
}

.backButton {
  width: 20px;
  color: #c5c5c5;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  gap: 20px;
}

</style>