export default Vue.component('good', {
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
            }).then((data) => {
                this.basketGoodsItems = data;
            })
        }
    }
})