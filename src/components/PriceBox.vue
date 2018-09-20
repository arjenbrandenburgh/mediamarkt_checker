<template>
  <div class="column is-4">
    <section class="box status-update" :class="color">
      <h5>{{header}}</h5>
      <p class="box-price is-marginless">€{{price | formatPrice}}</p>
      <p class="is-marginless">Gezien op {{date | date}}</p>
    </section>
  </div>
</template>

<script>
export default {
  name: 'price-box',
  props: [ 'header', 'price', 'date', 'color' ],
  filters: {
    date(dt) {
      // Print the date in a readable format
      const f = (d) => d < 10 ? `0${d}` : d;
      return `${f(dt.getDate())}-${f(dt.getMonth() + 1)}-${dt.getFullYear()}`;
    },
    formatPrice(price) {
      // If a price has no decimals, then don't show them. Else, make sure there are always 2
      return (price % 1 !== 0) ? price.toFixed(2) : price;
    },
  },
};
</script>

<style lang="scss">
  @import '../styles/partials/_colors';
  @import '~bulma/sass/utilities/initial-variables';

  .status-update {
    padding: 12px;
    border-radius: 3px;

    .box-price {
      font-size: 3rem;
    }

    $colors-list: 'green' 'red' 'grey';
    $color-variables: $mm-green $mm-red $grey;

    @each $current-color in $colors-list {
      $i: index($colors-list, $current-color);
      &.#{$current-color} {
        color: nth($color-variables, $i);
        background-color: rgba(nth($color-variables, $i), 0.1);
      }
    }
  }
</style>
