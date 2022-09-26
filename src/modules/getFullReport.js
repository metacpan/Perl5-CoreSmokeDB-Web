import { p5sdbClient } from '@/clients/p5sdbClient';
import { logTrace }    from '@/helpers/logging';

const defaultState = () => {
  return { fullReportData: {}, _loaded: false };
}

const state = defaultState();

const getters = {
  hasFullReport: (state) => {
    return state._loaded;
  },
  reportData:    (state) => {
    return state.fullReportData;
  },
};

const mutations = {
  resetFullReport(state) {
    Object.assign(state, defaultState());
  },
  setFullReport(state, data) {
    state.fullReportData = data;
    state._loaded = true;
  },
};

const actions = {
  async getFullReport({ commit }, reportId) {
    const response = await p5sdbClient.get("/full_report_data/" + reportId);

    logTrace(`setFullReport(${reportId}): ${JSON.stringify(response.data)}`);
    commit("setFullReport", response.data);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export { actions, defaultState, getters, mutations, state };
