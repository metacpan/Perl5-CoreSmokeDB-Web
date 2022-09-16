import { createRouter, createWebHistory } from "vue-router";

import P5SDB404           from "@/components/P5SDB404.vue";
import P5SDBAbout         from "@/components/P5SDBAbout.vue";
import P5SDBFullReport    from "@/components/P5SDBFullReport.vue";
import P5SDBLatest        from "@/components/P5SDBLatest.vue";
import P5SDBMatrix        from "@/components/P5SDBMatrix.vue";
import P5SDBPlainText     from "@/components/P5SDBPlainText.vue";
import P5SDBSearch        from "@/components/P5SDBSearch.vue";
import P5SDBSubFailMatrix from "@/components/P5SDBSubFailMatrix.vue";

const routes = [
  {
    path: "/",
    name: "Default",
    component: P5SDBLatest,
  },
  {
    path: "/latest",
    name: "Latest",
    component: P5SDBLatest,
  },
  {
    path: "/search",
    name: "Search",
    component: P5SDBSearch,
    props: true,
  },
  {
    path: "/matrix",
    name: "Matrix",
    component: P5SDBMatrix,
  },
  {
    path: "/about",
    name: "About",
    component: P5SDBAbout,
  },
  {
    path: "/report/:reportId",
    name: "FullReport",
    component: P5SDBFullReport,
    props: true,
  },
  {
    path: "/submatrix",
    name: "SubFailMatrix",
    component: P5SDBSubFailMatrix,
    props: route => ({ test: route.query.test, pversion: route.query.pversion }),
  },
  {
    path: '/file/:fileType/:reportId',
    name: 'ShowOutFile',
    component: P5SDBPlainText,
    props: true,
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: P5SDB404,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
