<template>
    <section class="position-relative py-4 py-xl-5">
        <div class="container">
            <div class="row mb-2">
                <div class="col-md-8 col-xl-6 text-center mx-auto">
                    <h1>中學生校園事務參與平臺</h1>
                    <h2>Admin Login</h2>
                    <p class="w-lg-50" style="color: var(--bs-red);">此為後臺管理系統，若需使用一般功能，請<a href="/">按此</a></p>
                </div>
            </div>
            <div class="row d-flex justify-content-center">
                <div class="col-md-6 col-xl-4">
                    <div class="card mb-2">
                        <div class="card-body d-flex flex-column align-items-center">
                            <div class="bs-icon-xl bs-icon-circle bs-icon-primary bs-icon my-2" style="background: var(--bs-card-bg);">
                                <img style="height: 1em;" src="@/assets/images/logo/black.svg">
                            </div>
                            <form class="text-center" action="">
                                <div v-if="alert != ''" class="alert alert-danger alert-dismissible fade show" role="alert">
                                    <i class="bi bi-exclamation-triangle" style="margin-right: 1em;"></i>
                                    <strong>{{ alert }}</strong>
                                    <button type="button" class="btn close align-items-end" data-dismiss="alert" aria-label="Close" @click="clearAlert">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="mb-3">
                                    <input v-model="name" class="form-control" type="text" placeholder="Account" required>
                                </div>
                                <div class="mb-3">
                                    <input v-model="password" class="form-control" type="password" name="pasword" placeholder="Password" required>
                                </div>
                                <div class="mb-3">
                                    <button v-if="status.loginSending == false" @click="login" class="btn btn-primary d-block w-100" type="button">
                                        <span>Login</span>
                                    </button>
                                    <button v-else @click="login" class="btn btn-primary d-block w-100" type="button" disabled>
                                        <div class="spinner-border" role="status"></div>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { ajax } from '@/lib/util'
export default {
    name: 'loginSec',
    data() {
        return {
            name: "",
            password: "",
            alert: "",
            status: {
                loginSending: false,
            },
        }
    },
    methods: {
        clearAlert() {
            this.alert = ''
        },
        login() {
            this.status.loginSending = true
            if (this.name == '' || this.password == '') {
                this.alert = '請輸入帳號密碼'
            } else {
                ajax.post('admin/login', {
                    account: this.name,
                    password: this.password,
                }
                    ,(res) => {
                        if(res.data.status == false){
                            this.isLogin = false
                            switch (res.data.reason) {
                                case 'data-incorrect':
                                    this.alert = '帳號或密碼錯誤';
                                    break;
                                case 'banned':
                                    this.alert = '您的帳號已被停權';
                                    break;
                                case 'not-admin':
                                    this.alert = '您的帳號不是管理員';
                                    break;
                                default:
                                    this.alert = '您的帳號發生登入錯誤，請聯絡管理員';
                                    break;
                            }
                        }else{
                            this.alert = '';
                            this.$router.push({ name: 'home' });
                            this.emitter.emit('login');
                        }
                        this.status.loginSending = false;
                    },
                    () => {
                        alert('發生錯誤！');
                        this.status.loginSending = false;
                    }
                )
            }
        }
    },
    created(){
        document.addEventListener('keypress', (e) => {
            if (e.keyCode == 13) {
                this.login();
            }
        })
    }
}
</script>