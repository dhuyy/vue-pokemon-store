<template>
  <div class="products">
    <div class="search-results" v-show="foundVisibility">
      Found {{ items.length }} pokémons.
    </div>
    <div class="product" v-for="item in items">
      <div>
        <div class="product-image">
          <img :src="item.image" :alt="item.name">
        </div>            
      </div>
      <div>
        <h4 class="product-title">{{ item.name }}</h4>
        <h5 class="product-price">{{ item.price | currency }}</h5>
        <button @click="addItem(item)" class="btn add-to-cart">Add to Cart</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'PokemonList',
  data() {
    return {
      limit: 3,
      items: [],
      foundVisibility: false,
    }
  },

  created() {
    this.getAllPokemons()
  },

  methods: {
    getAllPokemons() {
      axios.post('https://graphql-pokemon.now.sh', {
        query: `{
          pokemons(first: ${this.limit}) {
            id
            name
            maxCP
            image
          }
        }`
      })
      .then(response => {
        !this.foundVisibility ? this.foundVisibility = true : null;

        this.items = response.data.data.pokemons.map(element => {
          return {
            id: element.id,
            name: element.name,
            price: element.maxCP,
            image: element.image,
            quantity: 1
          }
        })
      })
    },

    
    getPokemon() {
      if (this.searchTerm.trim() == '') {
        this.getAllPokemons();
        return;
      }

      axios.post('https://graphql-pokemon.now.sh', {
        query: `{
          pokemon(name: "${this.searchTerm}") {
            id
            name
            maxCP
            image
          }
        }`
      })
      .then(response => {
        const pokemon = response.data.data.pokemon;

        this.items = [{
          id: pokemon.id,
          name: pokemon.name,
          price: pokemon.maxCP,
          image: pokemon.image,
          quantity: 1
        }]
      })
    }
  },

  filters: {
    currency(value) {
      return '$ '.concat((value * .01).toFixed(2))
    }
  }
}
</script>

<style>
.product-list {
  margin-right: 1rem;
}

.search-results {
  padding-bottom: 1rem;
}

.search-results .search-term {
  font-style: italic;
}

.product {
  padding: 1rem;
  border: 1px solid #E9E9E9;
  border-radius: 2px;
  overflow: auto;
  margin: 1rem 1rem 1rem 0;
  display: flex;
  flex-flow: row nowrap;
}

.product:first-child {
  margin-top: 0;
}

.product > div:first-child {

}

.product > div:last-child {
  margin-left: 1rem;
}

.product-image {
  width: 250px;
  height: 150px;
  overflow: hidden;
  border: 1px solid #E9E9E9;
  border-radius: 2px;
}

.product-image > img {
  max-height: 100%;
  margin: 0 auto;
  display: block;
}

.product-title {
  margin-top: 0;
  margin-bottom: 10px;
}

.product-price {
  margin-top: 0;
}

.product .add-to-cart {
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
}

#product-list-bottom {
  text-align: center;
  color: #AAAAAA;
  font-size: 0.85rem;
}
</style>