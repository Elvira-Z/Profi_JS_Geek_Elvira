const goods = [
  { title: 'Shirt', price: 150 },
  { title: 'Socks', price: 50 },
  { title: 'Jacket', price: 350 },
  { title: 'Shoes', price: 250 },
];

/*const renderGoodsItem = (title = 'Item', price = 'Запросить прайс') => {
  return `
    <div class="goods-item">
      <h3>${title}</h3>
      <p>${price}</p>
    </div>
  `;
};*/

const { title = 'Item', price = 'Запросить прайс' } = renderGoodsItem

const renderGoodsList = (list = []) => {
  let goodsList = list.map(item => renderGoodsItem(item.title, item.price)).join('');
  document.querySelector('.goods-list').innerHTML = goodsList;

}

renderGoodsList(goods);

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










