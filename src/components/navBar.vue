<template>
 <nav class="navbar navbar-dark navbar-expand-md bg-dark py-3" style="box-shadow: 0px 3px 5px 0px;margin-bottom: 5px;background: linear-gradient(black, white 250%);">
      <div class="container"><a class="navbar-brand d-flex align-items-center" href="#"><img src="@/assets/images/logo/white.svg" style="width: 2em;"><span>&nbsp;Admin Center</span></a><button data-bs-toggle="collapse" class="navbar-toggler" data-bs-target="#navcol-6"><span class="visually-hidden">Toggle navigation</span><span class="navbar-toggler-icon"></span></button>
          <div class="collapse navbar-collapse flex-grow-0 order-md-first" id="navcol-6">
              <ul class="navbar-nav me-auto">
                  <li class="nav-item"><router-link :to="{ name: 'home' }" class="nav-link active">概要</router-link></li>
                  <li class="nav-item"><router-link :to="{ name:'accountsMangement'}" class="nav-link active">使用者管理</router-link></li>
              </ul>
              <div class="d-md-none my-2"><button class="btn btn-light me-2" type="button">Button</button><button class="btn btn-primary" type="button">Button</button></div>
          </div>
          <div class="d-none d-md-block">
            <a class="btn btn-light me-2" role="button" href="/">回到主頁</a>
            <a class="btn btn-primary" role="button" @click="logoutHandler">登出</a>
          </div>
      </div>
  </nav>
</template>

<script>
export default {
    name: 'navBar',
    methods:{
      logoutHandler(){
        this.emitter.emit('logout')
        window.location.href = '/api/admin/logout';
      }
    }
}
</script>

<style>
.bs-icon {
  --bs-icon-size: .75rem;
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  font-size: var(--bs-icon-size);
  width: calc(var(--bs-icon-size) * 2);
  height: calc(var(--bs-icon-size) * 2);
  color: var(--bs-primary);
}

.bs-icon-xs {
  --bs-icon-size: 1rem;
  width: calc(var(--bs-icon-size) * 1.5);
  height: calc(var(--bs-icon-size) * 1.5);
}

.bs-icon-sm {
  --bs-icon-size: 1rem;
}

.bs-icon-md {
  --bs-icon-size: 1.5rem;
}

.bs-icon-lg {
  --bs-icon-size: 2rem;
}

.bs-icon-xl {
  --bs-icon-size: 2.5rem;
}

.bs-icon.bs-icon-primary {
  color: var(--bs-white);
  background: var(--bs-primary);
}

.bs-icon.bs-icon-primary-light {
  color: var(--bs-primary);
  background: rgba(var(--bs-primary-rgb), .2);
}

.bs-icon.bs-icon-semi-white {
  color: var(--bs-primary);
  background: rgba(255, 255, 255, .5);
}

.bs-icon.bs-icon-rounded {
  border-radius: .5rem;
}

.bs-icon.bs-icon-circle {
  border-radius: 50%;
}
</style>