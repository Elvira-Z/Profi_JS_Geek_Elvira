const BASE_URL = "http://localhost:8000/";
const GOODS_ADD = `${BASE_URL}goods`;
const GOODS = `${BASE_URL}goods.json`;
const SELECTED_ITEMS = `${BASE_URL}basket`;


function service(url) {
  return fetch(url).then((res) => res.json())
};

function serviceWithBody(url = "", method = "POST", body = {}) {
  return fetch(
    url,
    {
      method,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(body)
    }
  )
}

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

  Vue.component('in-cart-items', {
    props: ['item'],
    template:
      `<div class="inCartItem">
      <div class="itemName">{{ item.product_name }}</div>
      <div class="itemSum">{{ item.price }} руб.</div>
      <button class="changeQuantity">+</button>
      <div class="itemQuantity">{{ item.count }} шт.</div>
      <button class="changeQuantity">-</button>
   </div>`
  })

  Vue.component('cart-window', {
    data() {
      return {
        basketGoodsItems: []
      }
    },
    template: `
    <div class="cart">
      <img src="photo/cross.png" class="crossIcon"  @click="$emit('click')" alt="">
      <p class="cartList">Список товаров:</p>
      <in-cart-items v-for="item in basketGoodsItems" :item="item"></in-cart-items>
    </div>`,
    mounted() {
      service(SELECTED_ITEMS).then((basket) => {
        this.basketGoodsItems = basket
      })
    }
  });

  Vue.component('custom-button', {
    template: `
      <button class="cart-button" type="button" v-on:click="$emit('click')">
      <slot></slot>
      </button>
      `
  });

  const goodsItem = Vue.component('good', {
    props: ['item'],
    template:
      `<div class="goods-item">
      <div class="itemImg"></div>
      <div>
    <h3>{{ item.product_name }}</h3>
    <p>{{ item.price }}</p>
    </div>
    <custom-button class="addItem" @click="addGood">Добавить</custom-button>
 </div>`,
    methods: {
      addGood() {
        serviceWithBody(GOODS_ADD, "POST", {
          id: this.item.id_product
        })
      }
    }
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












