<template>
  <div class="products">
    <div v-if="showLoading">Loading...</div>
    <div v-if="showNoResults">Sorry, no results were found.</div>
    <div v-if="!showLoading && !showNoResults" class="search-results">
      Found {{ results.length }} pokémons.
    </div>
    <div class="product" v-for="item in items" :key="item.id">
      <div>
        <div class="product-image">
          <img :src="item.image" :alt="item.name">
        </div>            
      </div>
      <div>
        <h4 class="product-title">{{ item.name }}</h4>
        <h5 class="product-price">{{ item.price | currency }}</h5>
        <button @click="onClickAddToCart(item)" class="btn add-to-cart">Add to Cart</button>
      </div>
    </div>
    <div id="product-list-end"></div>
  </div>
</template>

<script>
import scrollMonitor from 'scrollMonitor';

export default {
  name: 'PokemonStoreList',
  data() {
    return {
      numberOfFetchedPokemons: 151, // Total of Pokémons from the first generation
      numberOfRenderedItems: 5,
      results: [],
      items: [],
      showLoading: true,
      showNoResults: false
    }
  },

  created() {
    this.getAllPokemons();

    Event.listen('onSearch', term => {
      this.items = []
      this.showNoResults = false
      this.showLoading = true

      term.trim() == '' ? this.getAllPokemons() : this.getPokemon(term);
    })
  },

  mounted() {
    this.setScrollMonitor();
  },

  methods: {
    renderChunkOfItems() {
      const resultsLength = this.results.length;
      const itemsRenderedLength = this.items.length;

      if (itemsRenderedLength < resultsLength) {
        const chunk = this.results.slice(itemsRenderedLength, itemsRenderedLength + this.numberOfRenderedItems);

        this.items = this.items.concat(chunk);
      }
    },

    onClickAddToCart(item) {
      Event.fire('onAddToCart', item);
    },

    createPokemonObject(object) {
      return {
        id: object.id,
        name: object.name,
        price: object.maxCP,
        image: object.image,
        quantity: 1
      }
    },

    getAllPokemons() {
      axios.post('https://graphql-pokemon.now.sh', {
        query: `{
          pokemons(first: ${this.numberOfFetchedPokemons}) {
            id
            name
            maxCP
            image
          }
        }`
      })
      .then(response => {
        this.results = response.data.data.pokemons.map(element => {
          return this.createPokemonObject(element)
        });

        this.renderChunkOfItems();
        this.showLoading = false;
      })
    },
    
    getPokemon(term) {
      axios.post('https://graphql-pokemon.now.sh', {
        query: `{
          pokemon(name: "${term}") {
            id
            name
            maxCP
            image
          }
        }`
      })
      .then(response => {
        this.results = [this.createPokemonObject(response.data.data.pokemon)];

        this.renderChunkOfItems();
        this.showLoading = false;
      })
      .catch(error => {
        this.showLoading = false;
        this.showNoResults = true;
      })
    },

    setScrollMonitor() {
      scrollMonitor
      .create(document.getElementById('product-list-end'))
      .enterViewport(() => {
        this.renderChunkOfItems();
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

#product-list-end {
  text-align: center;
  color: #AAAAAA;
  font-size: 0.85rem;
}
</style>
