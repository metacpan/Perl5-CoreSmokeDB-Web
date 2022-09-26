import { p5sdbClient } from '@/clients/p5sdbClient';
import { logInfo }     from '@/helpers/logging';

const defaultState = () => {
  return {
    appVersion:    null,
    dbVersion:     null,
    schemaVersion: null,
    _loaded:        false,
  };
};

const state = defaultState();

const getters = {
  theVersion:    (state) => { return state.appVersion; },
  dbVersion:     (state) => { return state.dbVersion; },
  schemaVersion: (state) => { return state.schemaVersion; },
  hasVersion:    (state) => { return state._loaded; },
};

const mutations = {
  resetSearchResults (state) {
    Object.assign(state, defaultState());
  },
  setSearchResults (state, data) {
    state.appVersion = data.version;
    state.dbVersion = data.db_version;
    state.schemaVersion = data.schema_version;
    state._loaded = true;
  },
};

const actions = {
  async getVersion({ commit }) {
    const response = await p5sdbClient.get("/version");

    logInfo(`getVersion.response: ${JSON.stringify(response.data)}`);
    commit("setSearchResults", response.data);
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
