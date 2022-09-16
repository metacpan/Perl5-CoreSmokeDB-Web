<template>
  <div id="content">
    <h2>Latest smoke reports per host</h2>
  </div>

  <div v-if="isLoading" class="spinner" />
  <P5SDBReportsTable
   v-if="!isLoading"
   :caption="`Latest plevel ${latestPlevel} (${reportCount})`"
   :reports="latestReports"
   id-column="plevel"
   id-label="Plevel" />

  <div class="show-report">
  <P5SDBFullFooter />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { logTrace }               from '@/helpers/logging';
import P5SDBReportsTable from '@/components/P5SDBReportsTable.vue';
import P5SDBFullFooter   from '@/components/P5SDBFullFooter.vue'

export default {
  name: "LatestReportByHost",
  components: {
    P5SDBReportsTable,
    P5SDBFullFooter,
  },
  data() {
    return {
      httpError: false,
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters({
      latestReports: "getReportList/reports",
      latestPlevel:  "getReportList/latestPlevel",
      reportCount:   "getReportList/reportCount",
      hasReports:    "getReportList/hasReports",
    }),
  },
  mounted() {
    this.getLatestReportsNow();
  },
  methods: {
    ...mapActions({
      getLatest: "getReportList/getReports",
    }),

    async getLatestReportsNow() {
      this.httpError = false;
      this.isLoading = true;
      try {
        await this.getLatest();
      } catch(e) {
        this.httpError = true;
        console.log("HTTP-Error " + e);
        console.log(e);
      };
      this.isLoading = false;
      logTrace(`getLatestReportsNow(${this.latestPlevel}): ${JSON.stringify(this.latestReports)}`);
    },
  },
};
</script>
