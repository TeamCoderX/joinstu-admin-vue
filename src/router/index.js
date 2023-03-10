import { createRouter, createWebHashHistory } from 'vue-router'
import { index } from '@/router/list'

const router = createRouter({
  history:createWebHashHistory(),
  routes: index//.concat()
})
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = `${to.meta.title} | 中學生校園事務參與平台`;
  }
  next();
})
router.afterEach((to) => {
  if (to.meta.title) {
    document.title = `${to.meta.title} | 中學生校園事務參與平台`;
  }
})
export default router;