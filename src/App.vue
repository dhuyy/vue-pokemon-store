<template>
  <div id="app">
    <header>
      <h1>{{ title }}</h1>
    </header>
    <section class="main">
      <div class="products">
        <div class="product" v-for="item in items">
          <h4 class="product-title">{{ item.title }}</h4>
          <button @click="addItem(item)" class="add-to-cart">Add to Cart</button>
        </div>
      </div>
      <div class="cart">
        <h2>Shopping Cart</h2>
        <ul>
          <li class="cart-item" v-for="item in cart">
            <div class="item-title">{{ item.title }}</div>
            <span class="item-qty">{{ item.quantity }} x $ {{ item.price }}</span>
          </li>
        </ul>
        <div v-if="cart.length">
          <div>Total: $ {{ total | toFixed }}</div>
        </div>
        <div v-else class="empty-cart">
          <div>No items in the cart.</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      title: 'Vue.js Pokémon Store',
      total: 0,
      items: [
        {
          id: 1,
          title: 'Item 1',
          price: 9.99,
          quantity: 1
        },
        {
          id: 2,
          title: 'Item 2',
          price: 9.99,
          quantity: 1
        },
        {
          id: 3,
          title: 'Item 3',
          price: 9.99,
          quantity: 1
        }
      ],
      cart: []
    }
  },

  methods: {
    addItem(item) {
      this.total += item.price;

      const existingItem = this.cart.filter(element => element.id == item.id )

      existingItem.length > 0 ? item.quantity++ : this.cart.push(item)
    }
  },

  filters: {
    toFixed(value) {
      return value.toFixed(2)
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

/* Products */

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
  max-height: 150px;
  width: 250px;
  overflow: hidden;
  border: 1px solid #E9E9E9;
  border-radius: 2px;
}

.product-image > img {
  width: 100%;
  display: block;
}

.product-title {
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

/* Cart */

.cart {
  margin-left: 1rem;
  padding-left: 1rem;
}

.cart .empty-cart {
  padding-top: 1rem;
}

.cart > h2 {
  margin-top: 0;
}

.cart ul {
  width: 100%;
  font-size: 0.9rem;
  border-top: 2px solid black;
  list-style: none;
  margin: 0;
  padding: 0;
}

.cart ul li {
  vertical-align: top;
  padding: 1rem 1rem 1rem 0;
}

.cart ul .cart-item {
  border-bottom: 1px solid #E9E9E9;
}

.cart ul .cart-item .item-title {

}

.cart ul .cart-item .item-price {
  font-weight: bold;
  padding-top: 0.5rem;
}

.cart ul .cart-item .item-qty {
  margin-right: 1rem;
}

.cart ul .cart-item:last-child {
  border-bottom: none;
}

.cart ul .cart-item button {
  margin-right: 3px;
}
</style>
