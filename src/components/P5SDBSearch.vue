<template>
  <div id="content">
    <h2>Search Perl5 CoreSmokeDB</h2>

    <div v-if="isFetching" class="spinner" />
    <P5SDBSearchForm
     v-if="!isFetching"
     v-model="searchFormValues"
     :search-params="sp"
     :page="currentPage"
     @on-search="submitSearch"
    @reset-search="resetSearch" />

  </div>

  <div v-if="isSearching" class="spinner" />
  <div v-if="haveResults" style="text-align: left; margin: 0 5%;">

    <button :disabled="currentPage == 1" @click="loadPage('first')">&laquo;</button>
    <button :disabled="currentPage == 1" @click="loadPage('previous')">&lt;</button>
    page&nbsp;{{ currentPage }}
    <button :disabled="currentPage == pageCount" @click="loadPage('next')">&gt;</button>
    <button :disabled="currentPage == pageCount" @click="loadPage('last')">&raquo;</button>
  </div>

  <P5SDBReportsTable
   v-if="haveResults"
   :caption="`Search results (${reportCount}: ${currentPage}/${pageCount})`"
   :reports="sr"
   id-column="gitDescribe"
   id-label="Git-describe" />

  <div class="show-report">
   <P5SDBFullFooter />
  </div>
</template>

<script>
import { reactive }               from 'vue';
import { mapGetters, mapActions } from 'vuex';
import { logTrace, logDebug }     from '@/helpers/logging';
import { hasLength }              from '@/helpers';
import P5SDBSearchForm   from '@/components/P5SDBSearchForm.vue';
import P5SDBReportsTable from '@/components/P5SDBReportsTable.vue';
import P5SDBFullFooter   from '@/components/P5SDBFullFooter.vue';

export default {
  name: "SearchPerl5CoreSmokeDB",
  components: {
    P5SDBSearchForm,
    P5SDBReportsTable,
    P5SDBFullFooter,
  },
  props: {
    selected_arch:   {type: String, default: ""},
    selected_host:   {type: String, default: ""},
    selected_osnm:   {type: String, default: ""},
    selected_osvs:   {type: String, default: ""},
    selected_comp:   {type: String, default: ""},
    selected_cver:   {type: String, default: ""},
    selected_branch: {type: String, default: ""},
    selected_perl:   {type: String, default: "latest"},
    andnotsel_arch:  {type: String, default: ""},
    andnotsel_host:  {type: String, default: ""},
    andnotsel_osnm:  {type: String, default: ""},
    andnotsel_osvs:  {type: String, default: ""},
    andnotsel_comp:  {type: String, default: ""},
    andnotsel_cver:  {type: String, default: ""},
    page:            {type: Number, default: 1 },
    rpp:             {type: Number, default: 25},
  },
  data() {
    return {
      httpError:   false,
      isFetching:  true,
      isSearching: false,
      haveResults: false,
    };
  },
  setup() {
    const searchFormValues = reactive({
      selectedArch:         "",
      selectedHost:         "",
      selectedOsname:       "",
      selectedOsversion:    "",
      selectedCc:           "",
      selectedCcversion:    "",
      selectedBranch:       "",
      selectedPerlVersion:  "latest",
      andnotArch:           "and",
      andnotHost:           "and",
      andnotOsname:         "and",
      andnotOsversion:      "and",
      andnotCc:             "and",
      andnotCcversion:      "and",
    });
    return { searchFormValues };
  },
  computed: {
    ...mapGetters({
      sp:                  "getSearchParameters/theSearchParameters",
      hasSearchParameters: "getSearchParameters/hasSearchParameters",
      sr:                  "getReportList/reports",
      hasSearchResults:    "getReportList/hasReports",
      reportCount:         "getReportList/reportCount",
      pageCount:           "getReportList/pageCount",
      currentPage:         "getReportList/pageNumber",
    }),
  },
  mounted() {
    logTrace("searchParameters mounted");
    if (!this.hasSearchParameters) { this.getSearchParametersNow(); }

    this.searchFormValues.selectedArch        = this.selected_arch;
    this.searchFormValues.selectedHost        = this.selected_host;
    this.searchFormValues.selectedOsname      = this.selected_osnm;
    this.searchFormValues.selectedOsversion   = this.selected_osvs;
    this.searchFormValues.selectedCc          = this.selected_comp;
    this.searchFormValues.selectedCcversion   = this.selected_cver;
    this.searchFormValues.selectedBranch      = this.selected_branch;
    this.searchFormValues.selectedPerlVersion = this.selected_perl;
    this.searchFormValues.andnotArch          = this.andnotsel_arch ? "not" : "and";
    this.searchFormValues.andnotHost          = this.andnotsel_host ? "not" : "and";
    this.searchFormValues.andnotOsname        = this.andnotsel_osnm ? "not" : "and";
    this.searchFormValues.andnotOsversion     = this.andnotsel_osvs ? "not" : "and";
    this.searchFormValues.andnotCc            = this.andnotsel_comp ? "not" : "and";
    this.searchFormValues.andnotCcversion     = this.andnotsel_cver ? "not" : "and";
    const autoSearch = hasLength(this.selected_arch)
                    || hasLength(this.selected_host)
                    || hasLength(this.selected_osnm)
                    || hasLength(this.selected_osvs)
                    || hasLength(this.selected_comp)
                    || hasLength(this.selected_cver)
                    || hasLength(this.selected_branch)
                    || (this.selected_perl !== 'latest')
                    || hasLength(this.andnotsel_arch)
                    || hasLength(this.andnotsel_host)
                    || hasLength(this.andnotsel_osnm)
                    || hasLength(this.andnotsel_osvs)
                    || hasLength(this.andnotsel_comp)
                    || hasLength(this.andnotsel_cver);
    if (autoSearch) { this.submitSearch() }
  },
  methods: {
    ...mapActions({
      getSearchParameters: "getSearchParameters/getSearchParameters",
      getSearchResults:    "getReportList/getReports",
      resetSearchResults:  "getReportList/resetReports",
    }),

    async getSearchParametersNow() {
      this.httpError  = false;
      this.isFetching = true;

      try {
        await this.getSearchParameters();
      } catch(e) {
        this.httpError = true;
        console.log(`HTTP-Error: ${e}`);
      };

      logDebug(`getSearchParameters(): ${JSON.stringify(this.sp)}`);
      this.isFetching = false;
    },

    async getSearchResultsNow(searchArguments) {
      logTrace(`enter Searchresults... ${JSON.stringify(searchArguments)}`);
      this.httpError   = false;
      this.isSearching = true;

      try {
        await this.getSearchResults(searchArguments);
      }
      catch(e) {
        this.httpError = true;
        console.log(`HTTP-Error: ${e}`);
      }
      this.isSearching = false;
      this.haveResults = true;
    },

    currentSearchArguments() {
      const args = {
        selected_arch:   this.searchFormValues.selectedArch,
        selected_host:   this.searchFormValues.selectedHost,
        selected_osnm:   this.searchFormValues.selectedOsname,
        selected_osvs:   this.searchFormValues.selectedOsversion,
        selected_comp:   this.searchFormValues.selectedCc,
        selected_cver:   this.searchFormValues.selectedCcversion,
        selected_perl:   this.searchFormValues.selectedPerlVersion,
        selected_branch: this.searchFormValues.selectedBranch,
        andnotsel_arch:  this.searchFormValues.andnotArch === 'not' ? 1 : 0,
        andnotsel_host:  this.searchFormValues.andnotHost === 'not' ? 1 : 0,
        andnotsel_osnm:  this.searchFormValues.andnotOsname === 'not' ? 1 : 0,
        andnotsel_osvs:  this.searchFormValues.andnotOsversion === 'not' ? 1 : 0,
        andnotsel_comp:  this.searchFormValues.andnotCc === 'not' ? 1 : 0,
        andnotsel_cver:  this.searchFormValues.andnotCcversion === 'not' ? 1 : 0,
        reports_per_page: this.rpp,
      };
      return args;
    },

    loadPage(direction) {
      let newPage = direction === 'next'
        ? parseInt(this.currentPage) + 1
        : direction === 'first'
          ? 1
          : direction == 'last'
            ? this.pageCount
            : parseInt(this.currentPage) - 1;
      logDebug(`loadPage(${direction}) => ${newPage}`);

      if (newPage < 1) { newPage = 1; }
      if (newPage > this.pageCount) { newPage = this.pageCount; }

      if (newPage === this.currentPage) {
        return true;
      }

      const searchArgs = {
        ...this.currentSearchArguments(),
        page: newPage,
      };

      logDebug(`loadPage(${direction}/${newPage}): ${JSON.stringify(searchArgs)}`);

      this.haveResults = false;
      this.getSearchResultsNow(searchArgs);
    },

    submitSearch() {
      const searchArgs = {
        ...this.currentSearchArguments(),
        page: this.page,
      };

      logDebug(`submitSearch: ${JSON.stringify(searchArgs)}`);

      this.haveResults = false;
      this.getSearchResultsNow(searchArgs);
    },

    resetSearch() {
      this.haveResults = false;
    }
  },
}
</script>
