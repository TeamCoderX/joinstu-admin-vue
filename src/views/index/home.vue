<template>
<div class="card">
    <div class="card-body" style="display: flex;">
        <div>
            <i class="bi bi-person-badge"></i>
        </div>
        <div>
            <h4>{{username}}</h4>
            <h6 class="text-muted mb-2">管理員</h6>
        </div>
    </div>
</div>
<div style="padding: 10px;">
    <div>
        <!-- <h2>近期通過議案</h2>
        <div>
            <div class="card card-hover" style="margin-bottom: 1em;border-bottom: 2px solid var(--bs-gray-500) ;">
                <div class="card-body">
                    <h4 class="card-title">Title</h4>
                    <h6 class="text-muted card-subtitle mb-2">通過日：<span>2022/12/19</span></h6>
                    <h6 class="text-muted card-subtitle mb-2">票數：<span>250</span></h6><a class="card-link" href="#">檢視</a>
                </div>
            </div><a href="#">View all...</a>
        </div> -->
    </div>
</div>
</template>

<script>
import { parse } from 'cookie'
export default {
    name: 'indexHome',
    data() {
        return {
            status: {
                isLogin: false
            },
            username: parse(document.cookie).joinstu_username
        }
    },

}
</script>