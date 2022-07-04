
export default Vue.component('cart-window', {
    data() {
        return {
            basketGoodsItems: []
        }
    },
    template: `
    <div class="cart">
      <img src="./photo/cross.png" class="crossIcon"  @click="$emit('click')" alt="">
      <p class="cartList">Список товаров:</p>
      <in-cart-items v-for="item in basketGoodsItems" 
      :item="item" 
      @add="addGood" 
      @delete="deleteGood"></in-cart-items>
      
    </div>`,
    mounted() {
        service(SELECTED_ITEMS).then((data) => {
            this.basketGoodsItems = data
        })
    },
    methods: {
        addGood(id) {
            serviceWithBody(SELECTED_ITEMS, "POST", {
                id
            }).then((data) => {
                this.basketGoodsItems = data;
            })
        },
        /*deleteGood(id) {
          serviceWithBody(SELECTED_ITEMS, "DELETE", {
            id
          }).then((data) => {
            this.basketGoodsItems = data;
   
          })
        }*/
    }
});