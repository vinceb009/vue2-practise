<template>
  <div class="main">
    <div class="header">
      <h3>PokemonList app</h3>
      <TotalPokemonBadge
          :label="totalPokemonCount"
      />
    </div>
    <div>
      <button
        class="baseMapButton mapButtonLeft"
        @click="handlePokemonList(previousPokemonList)"
      >
        ⟵
      </button>
      <button
          class="baseMapButton mapButtonRight"
          @click="handlePokemonList(nextPokemonList)">
        ⟶
      </button>
    </div>
    <div class="pokemonContainer">
      <PokemonCard
          v-for="pokemon in pokemonList"
          :key="pokemon.name"
          :name="pokemon.name"
          :cover-image="pokemon.sprites.front_default"
      />
    </div>
  </div>
</template>

<script>
import TotalPokemonBadge from "@/views/components/TotalPokemonBadge.vue";
import PokemonCard from "@/views/components/PokemonCard.vue";

export default {
  name: 'PokemonList',
  components: {
    PokemonCard,
    TotalPokemonBadge
  },
  data() {
    return {
      totalPokemonCount: 0,
      nextPokemonList: null|"",
      previousPokemonList: null,
      pokemonList: []
    }
  },
  created() {
    const firstUrlWithPokemonList = 'https://pokeapi.co/api/v2/pokemon/';
    this.handlePokemonList(firstUrlWithPokemonList);
  },
  methods: {
    async handlePokemonList(url) {
      const {
        count,
        next,
        previous,
        results,
      } = await this.fetchPokemonList(url)

      this.totalPokemonCount = count;

      // Since there are quite a few pokemon, the api results are given back into mutliple lists.
      // you can check out the docs:
      // https://pokeapi.co/
      this.nextPokemonList = next;
      this.previousPokemonList = previous;

      // We wipe the previous list empy. So that the page doesnt overflow with previous paged data.
      this.pokemonList = [];

      for (const pokemon of results) {
        const {
          name,
          sprites
        } = await this.fetchPokemonDetails(pokemon.url);

        this.pokemonList.push({
          name,
          sprites,
        })
      }
    },
    async fetchPokemonList(url) {
      const response = await fetch(url);
      const json = await response.json();

      return {
        count: json.count,
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
          back_default: json.sprites.back_default,
        }
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

.baseMapButton {
  background-color: #2e2e2e;
  border: none;
  color: white;
  padding: 5px 10px;
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
  justify-content: center;
  align-items: center;
  display: grid;
  grid-template-columns: repeat(2, auto);
  margin: 0px 100px;
}
</style>