export default Vue.component('in-cart-items', {
    props: ['item'],
    template:
        `<div class="inCartItem">
      <div class="itemName">{{ item.product_name }}</div>
      <div class="itemSum">{{ item.price }} руб.</div>
      <button @click="$emit('add', item.id_product)" class="changeQuantity">+</button>
      <div class="itemQuantity">{{ item.count }} шт.</div>
      <button @click="$emit('delete', item.id_product)" class="changeQuantity">-</button>
   </div>`
})