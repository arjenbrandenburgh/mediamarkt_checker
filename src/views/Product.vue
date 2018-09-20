<template>
  <div class="product">
    <pulse-loader :loading="productLoading" color="#cc2d20"></pulse-loader>

    <div class="notification is-danger" v-if="!productLoading && errorLoading">
      Er is iets mis gegaan bij het laden van dit product!
    </div>

    <h1 class="title" v-if="product">{{product.name}}</h1>
    <h2 class="subtitle" v-if="product">
      <a :href="product.url" target="_blank">
        Ga naar product pagina
        <font-awesome-icon icon="external-link-alt" size="sm" />
      </a>
    </h2>

    <div class="columns" v-if="product">
      <div class="column">
        <span v-if="product.category_lvl1" class="tag is-light">{{product.category_lvl1}}</span>
        <span v-if="product.category_lvl2" class="tag is-light">{{product.category_lvl2}}</span>
        <span v-if="product.category_lvl3" class="tag is-light">{{product.category_lvl3}}</span>
      </div>
    </div>

    <div class="columns">
      <price-box v-if="lowestPrice"  :price="lowestPrice.y"  :date="lowestPrice.t"  header="Laagste prijs" color="green" />
      <price-box v-if="highestPrice" :price="highestPrice.y" :date="highestPrice.t" header="Hoogste prijs" color="red" />
      <price-box v-if="latestPrice"  :price="latestPrice.y"  :date="latestPrice.t"  header="Meest recente prijs" color="grey" />
    </div>

    <chart v-if="prices" :prices="prices" />
  </div>
</template>

<script>
import axios from "axios";
import PulseLoader from '@/components/PulseLoader';
import PriceBox from '@/components/PriceBox';
import Chart from '@/components/Chart';

export default {
  name: 'Product',
  components: {
    PriceBox,
    PulseLoader,
    Chart
  },

  data() {
    return {
      productLoading: true,
      errorLoading: false,
      prices: null,
      product: null
    };
  },

  mounted() {
    this.initProduct();
  },

  watch: {
    '$route': function () {
      this.initProduct();
    }
  },

  computed: {
    lowestPrice () {
      if (this.prices && this.prices.length > 0) {
        return this.prices.reduce((prev, current) => (prev.y <= current.y) ? prev : current);
      }
    },
    highestPrice () {
      if (this.prices && this.prices.length > 0) {
        return this.prices.reduce((prev, current) => (prev.y >= current.y) ? prev : current);
      }
    },
    latestPrice () {
      if (this.prices && this.prices.length > 0) {
        return this.prices[this.prices.length - 1];
      }
    },
  },

  methods: {
    initProduct() {
      this.productLoading = true;
      this.errorLoading = false;
      this.product = null;
      this.getProduct();
      this.getPrices();
    },

    getProduct() {
      axios.get(`/products/${this.$route.params.id}`).then(res => {
        if (res.data) {
          this.productLoading = false;
          this.product = res.data.data;
          document.title = `${this.product.name} - Mediamarkt Checker`;
        }
      })
      .catch(error => this.errorLoading = true)
      .finally(() => this.productLoading = false);
    },

    getPrices() {
      axios.get(`/prices/${this.$route.params.id}`).then(res => {
        if (res.data) {
          this.prices = res.data.data.map(item => ({
            t: new Date(item.date),
            y: parseFloat(item.price),
          }));
        }
      })
      .catch(() => this.prices = []);
    },

  },
};
</script>

<style scoped>
.tag:not(:first-child) {
  margin-left: 15px;
}
</style>