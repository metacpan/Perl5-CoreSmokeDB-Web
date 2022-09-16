import { p5sdbClient } from "@/clients/p5sdbClient";

const defaultState = () => {
  return { fullReportData: {} };
}

const state = defaultState();

const getters = {
  hasFullReport: (state) => {
    return (Object.entries(state.fullReportData) > 0);
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
  },
};

const actions = {
  async getFullReport({ commit }, reportId) {
    const response = await p5sdbClient.get("/full_report_data/" + reportId);

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
