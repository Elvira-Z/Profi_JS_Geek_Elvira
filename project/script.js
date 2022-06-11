const BASE_URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";
const GOODS = `${BASE_URL}/catalogData.json`;
const SELECTED_ITEMS = `${BASE_URL}/getBasket.json`;


function service(url) {
  return fetch(url).then((res) => res.json());
};

const itemTitle = document.querySelectorAll('h3');
itemTitle.forEach(element => {
  element.setAttribute('class', 'itemTitle')
});

const itemPrice = document.querySelectorAll('p');
itemPrice.forEach(element => {
  element.setAttribute('class', 'itemPrice')
});

const goodsItem = document.querySelectorAll('.goods-item ');
goodsItem.forEach(element => {
  const createPhotoItem = document.createElement('img');
  createPhotoItem.setAttribute('class', 'photoItem');
  element.insertAdjacentElement('afterbegin', createPhotoItem);
  createPhotoItem.setAttribute('src', 'https://alehan.ru/upload/resize_cache/iblock/e0b/827_1500_1/e0b7fbace1f33b9c5fd6d581feebe710.jpg');
});

window.onload = () => {
  Vue.component('input-search', {
    props: ['value'],
    template: `
      <input type="text" class="searchText"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
        placeholder="Поиск..">`
  })

  Vue.component('cart-window', {
    template: `
  <div class="cart">
    <img src="photo/cross.png" class="crossIcon"  @click="$emit('click')" alt="">
    <p class="cartList">Список товаров:</p>
  </div>`
  }),

    Vue.component('custom-button', {
      template: `
      <button class="cart-button" type="button" v-on:click="$emit('click')">
      <slot></slot>
      </button>
      `
    })
  Vue.component('good', {
    props: [
      'item'
    ],
    template:
      `<div class="goods-item">
    <h3>{{ item.product_name }}</h3>
    <p>{{ item.price }}</p>
 </div>`
  })


  const app = new Vue({
    el: '#root',
    data: {
      list: [],
      searchValue: '',
      isVisibleCart: false,
      waiting: true
    },
    mounted() {
      service(GOODS).then((data) => {
        this.list = data;
        return data;
      }),
        this.waiting = false
    },
    computed: {
      summPrice() {
        return this.list.reduce((prev, { price }) => {
          return prev + price;
        }, 0)
      },
      filteredGoods() {
        return this.list.filter(({ product_name }) => {
          return (new RegExp(this.searchValue, 'i')).test(product_name);
        })
      }
    },
    methods: {
      cliclkCart() {
        this.isVisibleCart = true;
      },
      closeCart() {
        this.isVisibleCart = false;
      },

    }
  })
}












