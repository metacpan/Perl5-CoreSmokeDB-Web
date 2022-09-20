import { p5sdbClient } from '@/clients/p5sdbClient';
import { logDebug }    from '@/helpers/logging';

const defaultState = () => {
  return { subFailMatrix: {} };
}

const state = defaultState();

const getters = {
  hasSubFailMatrix: (state) => {
    return (Object.entries(state.subFailMatrix) > 0);
  },
  subFailMatrix:    (state) => {
    return state.subFailMatrix;
  },
};

const mutations = {
  resetSubFailMatrix(state) {
    Object.assign(state, defaultState());
  },
  setSubFailMatrix(state, data) {
    state.subFailMatrix = data;
  },
};

const actions = {
  async getSubFailMatrix({ commit }, data) {
    logDebug(`getSubFailMatrix(${JSON.stringify(data)}`);

    if (data.pversion === null) { data.pversion = "" };
    const params = new URLSearchParams(data);
    const response = await p5sdbClient.request({
      url:    '/submatrix',
      method: 'get',
      params: params,
    });
    logDebug(`/submatrix.response: ${JSON.stringify(response)}`);

    commit("setSubFailMatrix", response.data);
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
