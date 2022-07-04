export default Vue.component('input-search', {
    props: ['value'],
    template: `
      <input type="text" class="searchText"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
        placeholder="Поиск..">`
})