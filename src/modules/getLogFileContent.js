import { p5sdbClient } from '@/clients/p5sdbClient';
import { logDebug }    from '@/helpers/logging';

const defaultState = () => {
  return { file: { } };
}

const state = defaultState();

const getters = {
  hasContent: (state) => {
    return (Object.entries(state.file) > 0);
  },
  file:    (state) => {
    return state.file;
  },
};

const mutations = {
  resetContent(state) {
    Object.assign(state, defaultState());
  },
  setContent(state, data) {
    state.file.content = data;
  },
};

const actions = {
  async getLogFileContent({ commit }, args) {
    const fileType = args.type === 'logfile' ? 'logfile' : 'outfile'
    logDebug(`getLogFileContent(${fileType}/${args.id})`);

    const response = await p5sdbClient.get(`/${fileType}/${args.id}`);
    logDebug(`/getLogFileContent.response: ${JSON.stringify(response)}`);

    commit("setContent", response.data.file);
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
