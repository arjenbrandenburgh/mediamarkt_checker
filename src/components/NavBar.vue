<template>
    <div class="navbar is-inline-flex is-transparent">
        <div class="navbar-brand">
            <router-link to="/" class="navbar-item">
                <img src="../assets/logo.svg" width="112" height="28" alt="Logo">
            </router-link>
        </div>
        <div class="navbar-menu" v-if="$route.path !== '/'">
            <div class="navbar-item">
                <div class="control has-icons-left">
                <autocomplete
                    :classes="{ input: 'input has-centered-text', list: 'is-overlay' }"
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
                <span class="icon is-left is-small" style="font-size: 0.6rem; margin-left: 5px; margin-top: 8px;">
                    <font-awesome-icon icon="search" fixed-width size="2x" />
                </span>
                </div>
            </div>
        </div>
        <div class="navbar-item is-flex-touch">
            <router-link to="/analyse" class="navbar-item">
                <font-awesome-icon icon="chart-line" />
            </router-link>
            <a class="navbar-item" target="_blank" href="https://www.github.com/arjenbrandenburgh/mediamarkt_checker/">
                <font-awesome-icon :icon="['fab', 'github']" />
            </a>
            <router-link to="/about" class="navbar-item">
                <font-awesome-icon icon="info-circle" />
            </router-link>
        </div>
    </div>
</template>

<script>
import Autocomplete from 'vue2-autocomplete-js';

export default {
  name: 'app-navbar',
  components: {
    Autocomplete
  },
  computed: {
    apiPath() {
      return process.env.VUE_APP_API_ENDPOINT + '/products';
    }
  },
  methods: {
    getData(sel) {
      this.$router.push({ name: 'product', params: { id: sel.productid }});
    },
    processData(obj) {
      return obj.data;
    },
    renderChild(data) {
      return `<b class="autocomplete-anchor-text">${ data.name }</b>`;
    }
  }
}
</script>

<style lang="scss">
    .navbar {
      left: 0;
      top: 0;
      justify-content: space-around;
      width: 100%;
      border-bottom: 1px solid lightgray;

      .autocomplete {
        left: 0px;
        top: 35px;

        ul {
          margin-left: 21px;
        }
      }
    }
    .navbar-menu {
        flex-grow: 0.5;
        justify-content: center;
    }
    .navbar-menu .navbar-item {
        flex-grow: 1;
        justify-content: center;
    }
    .navbar-menu .navbar-item .control {
        width: 50%;
    }


</style>