import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import EventDispatcherAdapter from './shared/EventDispatcherAdapter.js'

window.axios = axios;
window.Event = new EventDispatcherAdapter();

new Vue({
  el: '#app',
  render: h => h(App)
})
