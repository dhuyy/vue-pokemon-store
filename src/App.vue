<template>
  <div id="app">
    <header>
      <h1>Vue.js Pokémon Store</h1>
      <form class="searchbar"@submit.prevent="getPokemon">
        <input v-model="searchTerm" type="text" placeholder="Type here...">
        <input type="submit" value="Search" class="btn">
      </form>
    </header>
    <section class="main">
      <PokemonList></PokemonList>
      <PokemonCart></PokemonCart>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import PokemonList from './components/PokemonList.vue'
import PokemonCart from './components/PokemonCart.vue'

export default {
  name: 'app',
  components: {
    PokemonList,
    PokemonCart
  },
  data () {
    return {
      searchTerm: ''
    }
  }
}
</script>

<style>
/* Generic styling */

h2, h3, h4, h5, h6 {
  font-family: 'Montserrat', sans-serif;
}

button:focus, input:focus {
  outline: none;
}

.btn {
  background-color: #F08080;
  border-radius: 2px;
  color: white;
  user-select: none;
  border: none;
  cursor: pointer;
  opacity: 1;
}

.btn:active {
  opacity: 0.8;
}

[v-cloak] {
  display: none !important;
}

.fade-enter-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}

/* Sections */

html, body {
  width: 100%;
  height: 100%;
  margin: 0;
}

body {
  font-family: 'Lato', sans-serif;
  background-color: #F5F5F5;
}

#app {
  margin: 0 2rem;
  padding: 0 2rem;
  background-color: white;
  display: flex;
  flex-direction: column;
}

header {
  flex: 0;
  padding: 1rem 0;
}

.main {
  display: flex;
  flex-direction: row;
  flex: 1;
  padding-bottom: 2rem;
}

.products {
  flex: 3;
}

.cart {
  flex: 2;
}

/* Header */

h1 {
  font-family: 'Luckiest Guy', cursive;
  font-size: 2.5rem;
  padding: 2rem 0 1rem;
  margin: 0;
  color: #FFAFAF;
  text-shadow: black 2px 1px 1px;
}

.searchbar {
  flex: 0 0 auto;
  padding: 1rem 0;
  border: 3px solid #E9E9E9;
  border-left: 0;
  border-right: 0;
  margin-bottom: 1rem;
  display: flex;
}

.searchbar > input {
  padding: 5px;
  font-size: 1.3rem;
  border: 1px solid #E9E9E9;
  border-right: none;
}

.searchbar > input[type=submit] {
  background-color: black;
  padding: 1rem;
  border: none;
  border-radius: 2px;
  font-size: 0.8rem;
  color: white;
  user-select: none;
}
</style>
