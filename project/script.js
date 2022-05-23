const goods = [
  { title: 'Shirt', price: 150 },
  { title: 'Socks', price: 50 },
  { title: 'Jacket', price: 350 },
  { title: 'Shoes', price: 250 },
];



class GoodsItem {
  constructor({ title = '', price = 'Запросить прайс' }) {
    this.title = title;
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
  fetchData() {
    this.list = goods
  }
  render() {
    const goodsList = this.list.map(item => {
      const goodsItem = new GoodsItem(item);
      return goodsItem.render()
    }).join('');
    document.querySelector('.goods-list').innerHTML = goodsList;
  }
  summPrice() {
    const summ = this.list.map(item => item.price).reduce((a, b) => a + b);
    return summ

  }
}


const goodsList = new GoodsList(goods);
goodsList.fetchData();
goodsList.render();
goodsList.summPrice();
console.log(goodsList.summPrice())



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
sumTab.setAttribute('class', 'sumTab');
header.insertAdjacentElement('beforeend', sumTab)
sumTab.innerHTML = `${goodsList.summPrice()} у.е`;














