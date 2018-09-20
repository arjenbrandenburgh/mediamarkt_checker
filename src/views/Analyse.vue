<template>
  <div class="analyse">
    <h1 class="title">Grootste veranderingen</h1>

    <div class="control">
      <div class="select" :class="{ 'is-loading' : loadingCategories }">
        <select v-model="selectedCategory" v-on:change="getChanges()">
          <option value="all">Alles</option>
          <optgroup v-for="lvl1 in categories" :label="lvl1.name" :key="lvl1.name">
            <option v-for="lvl2 in lvl1.subcategories" :value="lvl2" :key="lvl2">{{lvl2}}</option>
          </optgroup>
        </select>
      </div>
    </div>

    <h2 class="subtitle">Grootste veranderingen sinds gisteren</h2>
    <div class="columns">
      <changes-table :changes="changes" period='day' type='+'></changes-table>
      <changes-table :changes="changes" period='day' type='-'></changes-table>
    </div>

    <h2 class="subtitle">Grootste veranderingen sinds vorige week</h2>
    <div class="columns">
      <changes-table :changes="changes" period='week' type='+'></changes-table>
      <changes-table :changes="changes" period='week' type='-'></changes-table>
    </div>

  </div>
</template>


<script>
import axios from "axios";
import ChangesTable from '@/components/ChangesTable';

export default {
  name: 'analyse',
  components: {
    ChangesTable,
  },

  data () {
    return {
      changes: [],
      categories: [],
      loadingCategories: true,
      selectedCategory: 'all'
    };
  },

  created () {
    this.getCategories();
    this.getChanges();
  },

  methods: {
    getCategories() {
      axios.get(`/categories/`).then(res => {
        if (res.data) {
          this.categories = res.data.data;
        }
      })
      .catch(() => this.categories = [])
      .finally(() => this.loadingCategories = false);
    },

    getChanges() {
      axios.get(`/changes/?lvl2=${this.selectedCategory}`).then(res => {
        if (res.data) {
          this.changes = res.data.data;
        }
      })
      .catch(() => this.changes = []);
    },
  }
}
</script>


<style scoped>
  .control, .select, .select select {
    width: 100%;
  }
  .control {
    margin-bottom: 3vh;
  }

</style>