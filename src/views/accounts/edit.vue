<template>
    <form action="">
        <h3>帳號：</h3>
        <span>{{ id }}</span>
        <h3>姓名：</h3>
        <input type="text" v-model="name">
        <h3>學校：</h3>
        <input type="text" v-model="school">
        <h3>密碼變更(無變更請保留):</h3>
        <input type="password" v-model="password">
        <br>
        <button type="button" @click="update">更新</button>
    </form>
</template>
<script>
import { ajax } from '@/lib/util'
export default {
    name: 'accountsEdit',
    data() {
        return {
            name: '',
            id: '',
            school: '',
            password: '',
            status: {
                usersUpdate: false,
            }
        }
    },
    methods: {
        getUsers() {
            this.status.usersUpdate = true;
            ajax.get(`admin/getUserData/${this.$route.params.id}`, {},
                (res) => {
                    this.name = res.data.name;
                    this.id = res.data.id;
                    this.school = res.data.school;
                    this.status.usersUpdate = false;
                    console.log(this.name,this.id,this.school,this.isAdmin,res.data)
                },
                (err) => {
                    console.log(err)
                }
            )
        },
        update() {
            ajax.post('admin/updateUser', {
                id: this.id,
                name: this.name,
                school: this.school,
                password: this.password,
            },
                () => {
                    this.getUsers();
                    alert('已更新用戶資料');
                },
                (err) => {
                    console.log(err)
                }
            )
        }
    },
    created() {
        this.getUsers();
    }
}
</script>