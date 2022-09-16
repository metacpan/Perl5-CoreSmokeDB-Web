import { p5sdbClient }  from '@/clients/p5sdbClient';
import { logDebug }     from '@/helpers/logging';
import SearchParameters from '@/models/SearchParameters';

const defaultState = () => {
  return { sp: {} };
};

const state = defaultState();

const getters = {
  theSearchParameters: (state) => { return state.sp; },
  hasSearchParameters: (state) => { return (Object.entries(state.sp) > 0); },
};

const mutations = {
  resetSearchParameters (state) {
    Object.assign(state, defaultState());
  },
  setSearchParameters (state, data) {
    state.sp = data;
  },
};

const actions = {
  async getSearchParameters({ commit }) {
    const response = await p5sdbClient.get("/searchparameters");

    const newSearchParameters = new SearchParameters(
      response.data.sel_arch_os_ver,
      response.data.sel_comp_ver,
      response.data.perl_versions,
      response.data.branches,
    );
    logDebug(`getSearchParameters.response: ${JSON.stringify(newSearchParameters)}`);

    commit("setSearchParameters", newSearchParameters);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export { actions, defaultState, getters, mutations, state };
