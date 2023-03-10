<template>
    <div class="container mw-100" style="padding-right: 0px;padding-left: 0px;margin: 0;margin-right: 0px;">
        <div class="row" style="margin: 0;">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-body">
                        <h5 class="text-uppercase card-title mb-0">用戶管理</h5>
                    </div>
                    <div class="table-responsive">
                        <table class="table no-wrap user-table mb-0">
                            <thead>
                                <tr>
                                    <th class="text-uppercase border-0 font-medium" scope="col">姓名</th>
                                    <th class="text-uppercase border-0 font-medium" scope="col">ID</th>                                    
                                    <th class="text-uppercase border-0 font-medium" scope="col">學校</th>
                                    <th class="text-uppercase border-0 font-medium" scope="col">加入日期</th>
                                    <th class="text-uppercase border-0 font-medium" scope="col">身分</th>
                                    <th class="text-uppercase border-0 font-medium" scope="col">管理</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in accountsData" :key="item.id">
                                    <td><h5 class="font-medium mb-0">{{ item.name }}</h5></td>
                                    <td><span class="text-muted">{{ item.id }}</span><br></td>
                                    <td><span class="text-muted">{{ item.school }}</span><br></td>
                                    <td><span class="text-muted">{{ new Date(item.joindate).toLocaleDateString() }}</span><br></td>
                                    <td><span>{{ (item.isAdmin==true) ? '管理員' : '學生' }}</span></td>
                                    <td style="padding: 0;">
                                        <div class="container d-flex justify-content-around">
                                            <router-link class="col btn btn-secondary mx-1" type="button" title="edit" :to="{ name:'accountsEditing', params:{ id:item.id } }">
                                                <i class="bi bi-pencil-square"></i>
                                            </router-link>
                                            <button v-if="item.isBanned==false" class="col btn btn-secondary mx-1" type="button" title="ban" @click="banUser(item.id)">
                                                <i class="bi bi-x-circle"></i>
                                            </button>
                                            <button v-else class="col btn btn-danger mx-1" type="button" title="active" @click="unbanUser(item.id)">
                                                <i class="bi bi-x-circle"></i>
                                            </button>
                                            <button v-if="item.isDeleted==false" class="col btn btn-secondary mx-1" type="button" title="delete" @click="deleteUser(item.id)">
                                                <i class="bi bi-trash"></i>
                                            </button>
                                            <button v-else class="col btn btn-danger mx-1" type="button" title="active" @click="restoreUser(item.id)">
                                                <i class="bi bi-magic"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ajax } from '@/lib/util'
export default {
    name: 'accountHome',
    data() {
        return {
            accountsData: undefined,
        }
    },
    methods: {
        getUsers() {
            ajax.get('admin/getUsers',{},
                (res) => {
                    this.accountsData = res.data;
                },
                (err) => {
                    console.log(err)
                }
            )
        },
        banUser(id) {
            ajax.post('admin/banUser',{id: id},
                () => {
                    this.getUsers();
                    alert('已停權用戶');
                },
                (err) => {
                    console.log(err)
                }
            )
        },
        unbanUser(id) {
            ajax.post('admin/unbanUser',{id: id},
                () => {
                    this.getUsers();
                    alert('已復權用戶');
                },
                (err) => {
                    console.log(err)
                }
            )
        },
        deleteUser(id) {
            ajax.post('admin/deleteUser',{id: id},
                () => {
                    this.getUsers();
                    alert('已將用戶排定刪除');
                },
                (err) => {
                    console.log(err)
                }
            )
        },
        restoreUser(id) {
            ajax.post('admin/restoreUser',{id: id},
                () => {
                    this.getUsers();
                    alert('已重啟用戶');
                },
                (err) => {
                    console.log(err)
                }
            )
        }
    },
    created() {
        this.getUsers();
        setInterval(() => {
            this.getUsers();
        }, 10000)
    },
}
</script>