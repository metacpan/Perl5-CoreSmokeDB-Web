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
    props: route => ({
      selected_arch: route.query.selected_arch,
      selected_host: route.query.selected_host,
      selected_osnm: route.query.selected_osnm,
      selected_osvs: route.query.selected_osvs,
      selected_comp: route.query.selected_comp,
      selected_cver: route.query.selected_cver,
      selected_branch: route.query.selected_branch,
      selected_perl: route.query.selected_perl,
      andnotsel_arch: route.query.andnotsel_arch,
      andnotsel_host: route.query.andnotsel_host,
      andnotsel_osnm: route.query.andnotsel_osnm,
      andnotsel_osvs: route.query.andnotsel_osvs,
      andnotsel_comp: route.query.andnotsel_comp,
      andnotsel_cver: route.query.andnotsel_cver,
      page: route.query.page,
      rpp: route.query.rpp,
    }),
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
