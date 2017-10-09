<template>
  <div id="app">
    <StoreHeader title="Vue.js Pokémon Store"></StoreHeader>
    <section class="main">
      <PokemonStoreList></PokemonStoreList>
      <StoreCart></StoreCart>
    </section>
  </div>
</template>

<script>
import StoreHeader from './components/StoreHeader.vue';
import PokemonStoreList from './components/PokemonStoreList.vue';
import StoreCart from './components/StoreCart.vue';

export default {
  name: 'app',
  components: {
    StoreHeader,
    PokemonStoreList,
    StoreCart
  }
}
</script>

<style>
/* Generic styling */

html, body {
  width: 100%;
  height: 100%;
  margin: 0;
}

body {
  font-family: 'Lato', sans-serif;
  background-color: #F5F5F5;
}

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

#app {
  margin: 0 2rem;
  padding: 0 2rem;
  background-color: white;
  display: flex;
  flex-direction: column;
}

.header {
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
</style>
