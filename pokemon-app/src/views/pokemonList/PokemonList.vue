<template>
  <div class="main">
    <div class="header">
      <h3>PokemonList app</h3>
      <Badge :label="totalPokemonCount"/>
    </div>
    <div>
      <button
          class="baseMapButton mapButtonLeft"
          :disabled="!previousPokemonList"
          @click="handlePokemonList(previousPokemonList)"
      >
        <svg aria-hidden="true" class="mapButtonSvg" data-slot="icon" fill="currentColor"
             viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path clip-rule="evenodd"
                d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                fill-rule="evenodd"></path>
        </svg>
      </button>
      <button
          class="baseMapButton mapButtonRight"
          :disabled="!nextPokemonList"
          @click="handlePokemonList(nextPokemonList)"
      >
        <svg aria-hidden="true" class="mapButtonSvg" data-slot="icon" fill="currentColor"
             viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path clip-rule="evenodd"
                d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                fill-rule="evenodd"></path>
        </svg>
      </button>
    </div>
    <div class="pokemonContainer">
      <PokemonCard
          v-for="pokemon in pokemonList"
          :key="pokemon.id"
          :id="pokemon.id"
          :cover-image="pokemon.sprites.front_default"
          :name="pokemon.name"
          :types="pokemon.types"
      />
    </div>
  </div>
</template>

<script>
import PokemonCard from "@/views/pokemonList/components/PokemonCard.vue";
import Badge from "@/components/Badge.vue";

export default {
  name: 'PokemonList',
  components: {
    PokemonCard,
    Badge
  },
  data() {
    return {
      totalPokemonCount: 1025,
      nextPokemonList: null,
      previousPokemonList: null,
      pokemonList: [],
      isFetchingPokemonList: false
    }
  },
  created() {
    const firstUrlWithPokemonList = 'https://pokeapi.co/api/v2/pokemon/';
    this.handlePokemonList(firstUrlWithPokemonList);
  },
  methods: {
    async handlePokemonList(url) {
      try {
        if (this.isFetchingPokemonList) {
          return;
        }

        this.isFetchingPokemonList = true;

        const {
          next,
          previous,
          results,
        } = await this.fetchPokemonList(url)

        // Since there are quite a few pokemon, the api results are given back into mutliple lists.
        // you can check out the docs:
        // https://pokeapi.co/
        this.nextPokemonList = next;
        this.previousPokemonList = previous;

        // We wipe the previous list empty. So that the page doesnt overflow with previous paged data.
        this.pokemonList = [];

        for (const pokemon of results) {
          const {
            id,
            name,
            sprites,
            types
          } = await this.fetchPokemonDetails(pokemon.url);

          this.pokemonList.push({id, name, sprites, types});

          await new Promise(r => setTimeout(r, 200)); // delay for animation
        }
      } catch (e) {
        alert('Failed to fetch pokemon list');
      } finally {
        this.isFetchingPokemonList = false;
      }
    },
    async fetchPokemonList(url) {
      const response = await fetch(url);
      const json = await response.json();

      return {
        next: json.next,
        previous: json.previous,
        results: json.results
      }
    },
    async fetchPokemonDetails(url) {
      const response = await fetch(url);
      const json = await response.json();

      return {
        id: json.id,
        name: json.name,
        sprites: {
          front_default: json.sprites.front_default,
        },
        types: json.types,
      }
    }
  }
}
</script>

<style scoped>
.main {
  padding-top: 20px;
  color: white;
  text-align: center;
}

.header {
  align-items: center;
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 10px;
}

.mapButtonSvg {
  color: white;
  width: 20px;
}

.baseMapButton {
  background-color: #1b1a1a;
  border: none;
  color: white;
  padding: 5px 10px;
  cursor: pointer;
}

.mapButtonLeft {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.mapButtonRight {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

.pokemonContainer {
  padding: 20px;
  justify-content: center;
  align-items: center;
  display: grid;
  grid-template-columns: repeat(4, auto);
  gap: 10px;
}
</style>