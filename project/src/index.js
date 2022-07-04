import './style.css';
import './components/CustomButton/index';
import './components/CartWindow/index';
import './components/InputSearch/index';
import './components/Good/index'
import { BASE_URL, GOODS_ADD, GOODS, SELECTED_ITEMS } from './constants';
import { service, serviceWithBody } from './services'

const itemTitle = document.querySelectorAll('h3');
itemTitle.forEach(element => {
  element.setAttribute('class', 'itemTitle')
});

const itemPrice = document.querySelectorAll('p');
itemPrice.forEach(element => {
  element.setAttribute('class', 'itemPrice')
});


window.onload = () => {


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












