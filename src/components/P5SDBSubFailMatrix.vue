<template>
<div id="content">
<h2>Submatrix {{ test }}<span v-if="hasLength(pversion)"> => {{ pversion }}</span></h2>
</div>
<div v-if="isLoading" class="spinner" />
<table v-if="!isLoading" class="latest-report-table">
  <caption>List of failing smokes by test.</caption>
  <tr>
    <th>Version</th>
    <th>Git-describe</th>
    <th>Report</th>
    <th>OS</th>
  </tr>
  <tr v-for="(report, idx) in subFailMatrix.reports" :key="idx" :class="rowClass(idx)">
    <td>{{ report.perl_id }}</td>
    <td>
      <a
:href="`https://github.com/Perl/perl5/commit/${report.git_sha}`"
         target="_blank">{{ report.git_id }}</a>
    </td>
    <td><a :href="`/report/${report.report_id}`">{{ report.report_id }}</a></td>
    <td>{{ report.os_name }}&nbsp;{{ report.os_version }}</td>
  </tr>
</table>
  <div class="show-report">
  <P5SDBFullFooter />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { hasLength }              from '@/helpers';
import { rowClass }               from '@/helpers/css';
import P5SDBFullFooter from '@/components/P5SDBFullFooter.vue'

export default {
  name: "SubFailMatrix",
  components: {
    P5SDBFullFooter,
  },
  props: {
    "test": {
      type: String,
      default: "",
    },
    "pversion": {
      type: String,
      default: null,
    },
  },
  setup() {
    return { hasLength, rowClass };
  },
  data() {
    return {
      httpError: false,
      isLoading: true,
    };
  },
  computed: {
    ...mapGetters({
      hasSubFailMatrix: "getSubFailMatrix/hasSubFailMatrix",
      subFailMatrix:    "getSubFailMatrix/subFailMatrix",
    }),
  },
  created() {
    if (!this.hasSubFailMatrix) {
      this.getSubFailMatrixNow();
    }
  },
  methods: {
    ...mapActions({
      getSubFailMatrix: "getSubFailMatrix/getSubFailMatrix",
    }),
    async getSubFailMatrixNow() {
      this.httpError = false;
      this.isLoading = true;
      const params = {
        test: this.test,
        pversion: this.pversion,
      };
      try {
        await this.getSubFailMatrix(params);
      } catch(e) {
        this.httpError = true;
        console.log("HTTP-Error " + e);
        console.log(e);
      };
      this.isLoading = false;
    },
  },
};
</script>
