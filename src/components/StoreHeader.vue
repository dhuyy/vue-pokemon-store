<template>
  <div class="header">
    <h1>{{ title }}</h1>
    <form class="searchbar" @submit.prevent="onSubmitSearch">
      <input v-model="searchTerm" type="text" placeholder="Type here...">
      <input type="submit" value="Search" class="btn">
    </form>
  </div>
</template>

<script>
export default {
  name: 'StoreHeader',
  props: ['title'],
  data () {
    return {
      searchTerm: ''
    }
  },

  methods: {
    onSubmitSearch() {
      Event.fire('onSearch', this.searchTerm);
    }
  }
}
</script>

<style scoped>
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