import Vue from 'vue'
import VueRouter from 'vue-router'
import PokemonList from "@/views/PokemonList.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'pokemonList',
    component: PokemonList
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
