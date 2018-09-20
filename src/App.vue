<template>
  <div id="app">
    <app-navbar></app-navbar>

    <div class="columns body-columns">
      <div class="column is-two-thirds is-offset-2 has-text-centered">
        <transition name="fade" mode="out-in">
          <router-view/>
        </transition>
      </div>
    </div>

    <app-footer></app-footer>
  </div>
</template>

<script>
import AppNavbar from '@/components/NavBar';
import AppFooter from '@/components/Footer';

export default {
  name: 'mediamarkt',

  components: {
    AppNavbar,
    AppFooter
  },
}
</script>

<style lang="scss">
  @import url('//fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic');
  @import 'styles/main.scss';

  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .body-columns {
    @media screen and (max-width: 768px) {
      padding: 0.75rem;
    }
    margin-top: 3vh;
  }

  .fade-enter-active, .fade-leave-active {
    transition: all .2s ease;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
  }
</style>

