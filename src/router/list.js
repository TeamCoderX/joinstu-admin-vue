export const index = [
    {
        "path": "/:pathMatch(.*)*",
        "name": "Error404",
        "meta": {
            "title": "錯誤",
        },
        "component": () => import('@/views/error.vue'),
    },
    {
        "path": "/",
        "name": "home",
        "meta": {
            "title": "首頁",
        },
        "component": () => import('@/views/index/home.vue'),
    },
    {
        "path": "/accounts",
        "name": "accountsMangement",
        "meta": {
            "title": "帳號管理",
        },
        "component": () => import('@/views/accounts/index.vue'),
    },
    {
        "path": "/accounts/edit/:id",
        "name": "accountsEditing",
        "meta": {
            "title": "帳號管理",
        },
        "component": () => import('@/views/accounts/edit.vue'),
    },
]