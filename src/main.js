import { createApp }   from 'vue'
import { createStore } from 'vuex'
import router from './router'
import App    from './App.vue'

import '@/assets/coresmokedb.css'

import getFailMatrix       from '@/modules/getFailMatrix';
import getFullReport       from '@/modules/getFullReport';
import getLogFileContent   from '@/modules/getLogFileContent';
import getReportList       from '@/modules/getReportList';
import getSearchParameters from '@/modules/getSearchParameters';
import getSubFailMatrix    from '@/modules/getSubFailMatrix';
import getVersion          from '@/modules/getVersion';

const store = createStore({
  modules: {
    getFailMatrix,
    getFullReport,
    getLogFileContent,
    getReportList,
    getSearchParameters,
    getSubFailMatrix,
    getVersion,
  },
  actions: {
    resetReports({ commit }) {
      commit("getFailMatrix/resetFailMatrix");
      commit("getFullReport/resetFullReport");
      commit("getLatest/resetReports");
      commit("getLogFileContent/resetContent");
      commit("getReportList/resetReports");
      commit("getSearchParameters/resetSearchParameters");
      commit("getSearchResults/resetSearchResults");
      commit("getSubFailMatrix/resetSubFailMatrix");
      commit("getVersion/resetVersion");
    }
  },
  state () {
    return { }
  },
});

createApp(App).use(store).use(router).mount('#app')
