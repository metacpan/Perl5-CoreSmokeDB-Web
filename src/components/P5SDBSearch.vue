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
        selected_osnm:   this.searchFormValues.selectedOsname,
        selected_osvs:   this.searchFormValues.selectedOsversion,
        selected_host:   this.searchFormValues.selectedHost,
        selected_comp:   this.searchFormValues.selectedCc,
        selected_cver:   this.searchFormValues.selectedCcversion,
        selected_perl:   this.searchFormValues.selectedPerlVersion,
        selected_branch: this.searchFormValues.selectedBranch,
        andnotsel_arch:  this.searchFormValues.andnotArch === 'not' ? 1 : 0,
        andnotsel_osnm:  this.searchFormValues.andnotOsname === 'not' ? 1 : 0,
        andnotsel_osvs:  this.searchFormValues.andnotOsversion === 'not' ? 1 : 0,
        andnotsel_host:  this.searchFormValues.andnotHost === 'not' ? 1 : 0,
        andnotsel_comp:  this.searchFormValues.andnotCc === 'not' ? 1 : 0,
        andnotsel_cver:  this.searchFormValues.andnotCcversion === 'not' ? 1 : 0,
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
        page: 1,
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
