import { p5sdbClient } from "@/clients/p5sdbClient";

const defaultState = () => {
  return { failMatrix: {} };
}

const state = defaultState();

const getters = {
  hasFailMatrix: (state) => {
    return (Object.entries(state.failMatrix) > 0);
  },
  failMatrix:    (state) => {
    return state.failMatrix;
  },
};

const mutations = {
  resetFailMatrix(state) {
    Object.assign(state, defaultState());
  },
  setFailMatrix(state, data) {
    state.failMatrix = data;
  },
};

const actions = {
  async getFailMatrix({ commit }) {
    const response = await p5sdbClient.get("/matrix");

    commit("setFailMatrix", response.data);
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

