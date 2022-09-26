import { p5sdbClient }        from '@/clients/p5sdbClient';
import { logDebug, logTrace } from '@/helpers/logging';
import SmokeReport            from '@/models/SmokeReport';

const defaultState = () => {
  return {
    reports: [],
    latestPlevel: null,
    reportsPerPage: null,
    reportCount: null,
    pageNumber: null,
    _loaded: false,
  };
};

const state = defaultState();

const getters = {
  reports:        (state) => { return state.reports; },
  reportCount:    (state) => { return state.reportCount; },
  latestPlevel:   (state) => { return state.latestPlevel; },
  reportsPerPage: (state) => { return state.reportsPerPage; },
  pageNumber:     (state) => { return state.pageNumber; },
  pageCount:      (state) => { return Math.ceil(state.reportCount/state.reportsPerPage); },
  hasReports:     (state) => { return state._loaded; },
};

const mutations = {
  resetReports(state) {
    Object.assign(state, defaultState());
  },
  setReports(state, data) {
    state.reports = data.reports;
    state.latestPlevel = data.latestPlevel;
    state.reportsPerPage = data.rpp;
    state.reportCount = data.reportCount;
    state.pageNumber = data.pageNumber;
    state._loaded = true;
  },
};

const actions = {
  async getReports({ commit }, searchArguments) {
    commit("resetReports");

    logDebug(`in getReports... ${JSON.stringify(searchArguments)}`);

    let response = {}; let type = '';
    if (typeof searchArguments === "undefined") { // getLatetst
      type = 'latest';
      response = await p5sdbClient.get('/latest');
    }
    else { // getSerchResults
      type = 'search';
      const params = new URLSearchParams(searchArguments);

      if (import.meta.env.VITE_API_SERVICE === 'rest') {
        logDebug(`post-request: ${JSON.stringify(params)}`);
        response = await p5sdbClient({
          url:    "/searchresults",
          method: 'get',
          params: params,
        });
      }
      else {
        logDebug(`post-request: ${JSON.stringify(searchArguments)}`);
        response = await p5sdbClient({
          url:    "/searchresults",
          method: 'post',
          data:   params,
        });
      }

    }
    logTrace(`getReports.${type}: ${JSON.stringify(response.data)}`);

    const reports = response.data.reports.map(
      function (report) {
        return new SmokeReport(
          report.id,
          report.perl_id,
          report.git_describe,
          report.git_id,
          report.plevel,
          report.smoke_branch,
          report.smoke_date,
          report.hostname,
          report.architecture,
          report.cpu_count,
          report.cpu_description,
          report.osname,
          report.osversion,
          report.username,
          report.summary
        )
    });
    const reportList = {
      reports: reports,
      latestPlevel: response.data.latest_plevel,
      rpp: response.data.rpp,
      pageNumber: response.data.page,
      reportCount: response.data.report_count,
    };
    logDebug(`setReports: ${JSON.stringify(reportList)}`);

    commit("setReports", reportList);
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
