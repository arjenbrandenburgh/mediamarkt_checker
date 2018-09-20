<template>
  <div class="column is-half">

    <div v-if="changes && filterChanges().length === 0" class="notification is-warning">
      Geen wijzigingen {{ type === '+' ? 'omhoog' : 'omlaag' }} sinds {{ period === 'day' ? 'gisteren' : 'vorige week' }}
    </div>

    <table class="table is-narrow is-striped" v-if="changes && filterChanges().length > 0">
      <thead>
        <tr>
          <th>Product</th>
          <th class="has-text-right">Nieuw</th>
          <th class="has-text-right">Oud</th>
          <th class="has-text-right">%</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="change in filterChanges()">
          <td>
            <router-link :to="{ name: 'product', params: { id: change.productid }}">{{ change.name }}</router-link>
          </td>
          <td class="has-text-right">€{{ change.new_price | formatPrice }}</td>
          <td class="has-text-right">€{{ change.old_price | formatPrice }}</td>
          <td class="has-text-right" v-bind:class="{'is-red' : change.percentage < 0, 'is-green' : change.percentage > 0 }">{{ change.percentage | formatPercentage }}%</td>
        </tr> 

      </tbody>
    </table>

  </div>
</template>


<script>
export default {
  name: 'changes-table',
  props: [ 'changes', 'period', 'type'],
  filters: {
    formatPrice(price) {
      // If a price has no decimals, then don't show them. Else, make sure there are always 2
      return (price % 1 !== 0) ? price.toFixed(2) : price;
    },
    formatPercentage(percentage) {
      return (percentage > 0) ? `+${percentage}` : percentage;
    }
  },
  methods: {
    filterChanges() {
      return this.changes
        .filter((item) => item.period === this.period)
        .filter((item) => {
          return (this.type === '+') ? item.percentage > 0 : item.percentage < 0;
        })
        .sort((a, b) => {
          if (this.type === '+') { return a.percentage <= b.percentage ? 1 : -1; }
          else { return a.percentage >= b.percentage ? 1 : -1; }
        });
    },
  }
}
</script>


<style lang="scss">
  @import '../styles/partials/_colors';

  .table {
    width: 100%;
  }

  $colors-list: 'green' 'red';
  $color-variables: $mm-green $mm-red;

  @each $current-color in $colors-list {
    $i: index($colors-list, $current-color);
    .is-#{$current-color} {
      color: nth($color-variables, $i);
      background-color: rgba(nth($color-variables, $i), 0.1);
    }
  }
</style>
