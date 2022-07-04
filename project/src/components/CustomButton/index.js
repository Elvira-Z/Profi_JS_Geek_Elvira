export default Vue.component('custom-button', {
    template: `
      <button class="cart-button" type="button" v-on:click="$emit('click')">
      <slot></slot>
      </button>
      `
});