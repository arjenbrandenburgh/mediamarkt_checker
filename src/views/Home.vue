<template>
  <div class="home">
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Mediamarkt Checker
          </h1>
          <h2 class="subtitle">
            Voor prijsvergelijking
          </h2>
        </div>
      </div>
    </section>

    <p class="has-text-justified">
      Zoek hieronder naar een product. Ook kan je per categorie bekijken wat de grootste prijsschommelingen per 24 uur en per week zijn op de <router-link to="/analyse">Grootste Veranderingen</router-link> pagina.
    </p>

    <div class="control has-icons-left">
      <autocomplete
        :classes="{ input: 'input is-large has-centered-text' }"
        :url="apiPath"
        param="term"
        anchor="title"
        label="writer"
        placeholder="Zoek product"
        :debounce="500"
        :process="processData"
        :onShouldRenderChild="renderChild"
        :min="3"
        :on-select="getData">
      </autocomplete>
      <span class="icon is-left is-small"  style="font-size: 1.1rem; margin-left: 5px; margin-top: 9px;">
          <font-awesome-icon icon="search" fixed-width size="2x" />
      </span>
    </div>
  </div>
</template>

<script>
import Autocomplete from 'vue2-autocomplete-js'

export default {
  name: 'home',
  components: {
    Autocomplete
  },
  computed: {
    apiPath() {
      return process.env.VUE_APP_API_ENDPOINT + '/products';
    }
  },
  mounted () {
    document.title = `Mediamarkt Checker`;
  },
  methods: {
    getData(sel) {
      this.$router.push({ name: 'product', params: { id: sel.productid }});
    },
    processData(obj) {
      return obj.data;
    },
    renderChild(data) {
      return `
        <b class="autocomplete-anchor-text">${ data.name }</b>
        <span class="tag is-light is-pulled-right is-size-7 is-hidden-touch">${ data.category_lvl2 || data.category_lvl1 }</span>
      `;
    }
  }
};
</script>

<style lang="scss">
@import '../styles/partials/_colors';

.home {
  margin-bottom: 25vh;
}

.autocomplete ul {
  margin-left: 39px;
}

.hero.is-primary {
  background-color: $mm-red;
  margin-bottom: 3vh;
}

p {
  margin-bottom: 3vh;
}
</style>