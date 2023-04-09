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
                                    <th class="text-uppercase border-0 font-medium" scope="col">#</th>
                                    <th class="text-uppercase border-0 font-medium" scope="col"><a
                                            @click="sortBy = 'name'">姓名</a></th>
                                    <th class="text-uppercase border-0 font-medium" scope="col"><a
                                            @click="sortBy = 'id'">ID</a></th>
                                    <th class="text-uppercase border-0 font-medium" scope="col">Email</th>
                                    <th class="text-uppercase border-0 font-medium" scope="col">學校</th>
                                    <th class="text-uppercase border-0 font-medium" scope="col"><a
                                            @click="sortBy = 'joindate'">加入日期</a></th>
                                    <th class="text-uppercase border-0 font-medium" scope="col">身分</th>
                                    <th class="text-uppercase border-0 font-medium" scope="col">管理</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in accountsData" :key="item.id">
                                    <td><span class="font-medium mb-0">{{ index + 1 }}</span></td>
                                    <td>
                                        <h5 class="font-medium mb-0">{{ item.name }}</h5>
                                    </td>
                                    <td><span class="text-muted">{{ item.id }}</span><br></td>
                                    <td><span class="text-muted">{{ item.email }}</span></td>
                                    <td><span class="text-muted">{{ item.school }}</span><br></td>
                                    <td><span class="text-muted">{{ new Date(item.joindate).toLocaleDateString()
                                    }}</span><br></td>
                                    <td><span>{{ (item.isAdmin == true) ? '管理員' : '學生' }}</span></td>
                                    <td style="padding: 0;">
                                        <div class="container d-flex justify-content-around">
                                            <router-link class="col btn btn-secondary mx-1 btn_edit" type="button"
                                                title="edit" :to="{ name: 'accountsEditing', params: { id: item.id } }">
                                                <i class="bi bi-pencil-square"></i>
                                            </router-link>
                                            <button v-if="item.isBanned == false" class="col btn btn-secondary mx-1 btn_ban"
                                                type="button" title="ban" @click="banUser(item.id)">
                                                <i class="bi bi-x-circle"></i>
                                            </button>
                                            <button v-else class="col btn btn-danger mx-1 btn_ban" type="button"
                                                title="active" @click="unbanUser(item.id)">
                                                <i class="bi bi-x-circle"></i>
                                            </button>
                                            <button v-if="item.isDeleted == false"
                                                class="col btn btn-secondary mx-1 btn_delete" type="button" title="delete"
                                                @click="deleteUser(item.id)">
                                                <i class="bi bi-trash"></i>
                                            </button>
                                            <button v-else class="col btn btn-danger mx-1 btn_delete" type="button"
                                                title="active" @click="restoreUser(item.id)">
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
// eslint-disable-next-line
let id_name = {
    1: name
}
import { ajax } from '@/lib/util'
export default {
    name: 'accountHome',
    data() {
        return {
            sortStatus: false, //降序升序
            sortBy: 'name',
            accountsData: undefined,
        }
    },
    watch: {
        sortBy: (val) => {
            this.sort(val);
        }
    },
    methods: {
        sort(col) {
            this.accountsData.sort((a, b) => {
                this.sortStatus = -1 * this.sortStatus;
                return a[col].localeCompare(b[col]);
            })
            if (this.sortStatus) {
                this.accountsData.reverse();
            }
            this.sortStatus = !this.sortStatus;
        },
        getUsers() {
            ajax.get('admin/getUsers', {},
                (res) => {
                    this.accountsData = res.data;
                },
                (err) => {
                    console.log(err)
                }
            )
        },
        banUser(id) {
            ajax.post('admin/banUser', { id: id },
                () => {
                    this.getUsers();
                },
                (err) => {
                    console.log(err)
                }
            )
        },
        unbanUser(id) {
            ajax.post('admin/unbanUser', { id: id },
                () => {
                    this.getUsers();
                },
                (err) => {
                    console.log(err)
                }
            )
        },
        deleteUser(id) {
            ajax.post('admin/deleteUser', { id: id },
                () => {
                    this.getUsers();
                },
                (err) => {
                    console.log(err)
                }
            )
        },
        restoreUser(id) {
            ajax.post('admin/restoreUser', { id: id },
                () => {
                    this.getUsers();
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
            this.sort(this.sortBy);
        }, 5000)
    },
}
</script>