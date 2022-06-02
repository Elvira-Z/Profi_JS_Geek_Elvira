const goods = [
  { product_name: 'Shirt', price: 150 },
  { product_name: 'Socks', price: 50 },
  { product_name: 'Jacket', price: 350 },
  { product_name: 'Shoes', price: 250 },
];


const BASE_URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";
const GOODS = `${BASE_URL}/catalogData.json`;
const SELECTED_ITEMS = `${BASE_URL}/getBasket.json`;




function service(url) {
  return fetch(url).then((res) => {
    const fetchGoods = res.json()

  });

};

class GoodsItem {
  constructor({ product_name = '', price = 'Запросить прайс' }) {
    this.title = product_name;
    this.price = price;
  }
  render() {
    return `
    <div class="goods-item">
      <h3>${this.title}</h3>
      <p>${this.price}</p>
    </div>
  `
  }
}

class GoodsList {
  list = [];
  filteredGoods = []
  fetchData() {
    const promItems = service(GOODS);
    promItems.then((data) => {
      this.list = data;
      this.filteredGoods = data;
      return data;

    });
    return promItems;
  }
  filter(str) {
    this.filteredGoods = this.list.filter(({ product_name }) => {
      return (new RegExp(str, 'i')).test(product_name);
    })

  }
  render() {
    const goodsList = this.filteredGoods.map(item => {
      const goodsItem = new GoodsItem(item);
      return goodsItem.render()
    }).join('');
    document.querySelector('.goods-list').innerHTML = goodsList;
  }
  summPrice() {
    const summ = this.list.map(item => item.price).reduce((a, b) => a + b);
    return summ;
  }
}

class SelectedItems {
  list = [];
  fetchData() {
    service(SELECTED_ITEMS, (data) => {
      this.list = data

    });
  }
}
const selectedItems = new SelectedItems();
selectedItems.fetchData()


const goodsList = new GoodsList();
goodsList.fetchData().then(() => {
  goodsList.render()
});

document.querySelector('.search').addEventListener('click', () => {
  const searchText = document.querySelector('.searchText');
  goodsList.filter(searchText.value)
  goodsList.render()


})

const container = document.querySelector('body');
container.setAttribute('class', 'container');

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


const header = document.querySelector('header');
const button = document.querySelector('button');
const sumTab = document.createElement('summ');
















