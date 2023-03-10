
<template>
  <div>
    <div class="progress" v-if="status.isLogin == undefined">
      <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
    </div>

    <div v-if="status.isLogin == true">
      <navBar/>
      <div id="mainContainer">
        <router-view></router-view>
      </div>
      <footerBar/>
    </div>

    <div v-if="status.isLogin == false">
      <login/>
    </div>
  </div>
</template>

<script>
import { ajax } from '@/lib/util'
import navBar from '@/components/navBar.vue'
import footerBar from '@/components/footerBar.vue'
import login from '@/components/login.vue'
export default {
  name: 'App',
  data(){
    return {
      status: {
        isLogin: undefined,
      },
    }
  },
  components: {
    navBar,
    footerBar,
    login,
  },
  watch: {
    $route (to) {
      document.body.style.backgroundColor = (to.meta.bg == undefined) ? 'var(--bs-body-bg)' : to.meta.bg;
    }
  },
  created(){
    
    this.emitter.on('logout', () => {
      this.status.isLogin = false;
    })
    this.emitter.on('login', () => {
      this.status.isLogin = true;
    })
    ajax.post('accounts/status', {},
        (res) => {
          if(res.data.status){
            if(res.data.isAdmin){
              this.status.isLogin = true;
            }else{
              this.status.isLogin = false;
            }
          }else{
            this.status.isLogin = false;
          }
        },
        (err) => {
            console.error(err)
        })
  }
}
</script>

<style>
@import '@/lib/bootstrapIcons/bootstrap-icons.css';
@import '@/lib/bootstrap/css/bootstrap.min.css';
:root {
    --navHeight: 3.4em;
    --footerHeight: 8em;
    --appHeight: calc(100vh - var(--footerHeight));
}
#mainContainer {
    z-index: 2;
    min-height: var(--appHeight);
    padding-top: calc(var(--navHeight) + 1em);
}

nav {
    position: fixed !important;
    z-index: 1;
    height: var(--navHeight);
    width: 100%;
}

footer {
    z-index: 1;
    position: relative !important;
    height: var(--footerHeight);
    top: calc(100vh - var(--footerHeight) - var(--appHeight));
    width: 100%;
}

.card-hover:hover {
    background-color: var(--bs-gray-100) !important;
    border-top-width: 0px;
    border-top-color: var(--bs-dark);
}
</style>