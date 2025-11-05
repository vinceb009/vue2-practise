import Vue from 'vue'
import VueRouter from 'vue-router'
import PokemonList from "@/views/pokemonList/PokemonList.vue";
import PokemonDetails from "@/views/pokemonDetails/PokemonDetails.vue";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'pokemonList',
        component: PokemonList
    },
    {
        path: '/pokemon/:id',
        name: 'pokemonDetails',
        component: PokemonDetails,
        props: route => ({ id: Number(route.params.id) }),
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
