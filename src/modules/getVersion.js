import { p5sdbClient } from '@/clients/p5sdbClient';
import { logInfo }     from '@/helpers/logging';

const defaultState = () => {
  return { version: '' };
};

const state = defaultState();

const getters = {
  theVersion: (state) => { return state.version; },
  hasVersion: (state) => { return state.version.length > 0; },
};

const mutations = {
  resetSearchResults (state) {
    Object.assign(state, defaultState());
  },
  setSearchResults (state, data) {
    state.version = data;
  },
};

const actions = {
  async getVersion({ commit }) {
    const response = await p5sdbClient.get("/version");

    logInfo(`getVersion.response: ${JSON.stringify(response.data)}`);

    commit("setSearchResults", response.data.version);
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
