<template>
  <div class="cart">
    <h2>Store Cart</h2>
    <ul>
      <li class="cart-item" v-for="item in cart">
        <div class="item-title">{{ item.name }}</div>
        <span class="item-qty">{{ item.quantity }} x {{ item.price | currency }}</span>
        <button class="btn" @click="inc(item)">+</button>
        <button class="btn" @click="dec(item)">-</button>
      </li>
    </ul>
    <div v-if="cart.length">
      <div>Total: {{ total | currency }}</div>
    </div>
    <div v-else class="empty-cart">
      <div>No items in the cart.</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StoreCart',
  data() {
    return {
      total: 0,
      cart: []
    }
  },

  created() {
    Event.listen('onAddToCart', item => {
      this.addItem(item);
    })
  },

  methods: {
    addItem(item) {
      this.total += item.price;

      const existingItem = this.cart.filter(element => element.id == item.id )

      existingItem.length > 0 ? item.quantity++ : this.cart.push(item)
    },

    inc(item) {
      if (item.quantity >= 0) {
        item.quantity++
        this.total += item.price
      }
    },

    dec(item) {
      if ((item.quantity - 1) == 0) {
        this.cart.forEach((element, i) => {
          if (element.id == item.id) this.cart.splice(i, 1)
        })
      } else {
        item.quantity--
      }

      this.total -= item.price
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