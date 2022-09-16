<template>
<div id="content">
<h2>The failure matrix</h2>
</div>

<div v-if="isLoading" class="spinner" />
<table v-if="!isLoading" class="latest-report-table">
  <caption>List of the number of failing smokes by test.</caption>
  <tr v-for="(row, idxr) in failMatrix" :key="idxr" :class="rowClass(idxr)">
    <th v-for="(column, idxc) in row" v-if="idxr === 0" :key="idxc">
      <span v-if="idxc === 0">Test</span>
      <span v-else>{{ column }}</span>
    </th>
    <td v-for="(column, idxc) in row" v-if="idxr > 0" :key="idxc" :class="cntClass(column.cnt)">
      <span v-if="idxc === 0">
      <a :href="`/submatrix?test=${row[0]}`">{{ column }}</a></span>
      <span v-else>
        <span v-if="column.cnt > 0">
          <a
:href="`/submatrix?test=${row[0]}&pversion=${failMatrix[0][idxc]}`"
             :title="column.alt" style="color: #EEE;">{{ column.cnt }}</a>
        </span>
        <span v-else>&nbsp;</span>
      </span>
    </td>
  </tr>
</table>
  <div class="show-report">
  <P5SDBFullFooter />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { rowClass }               from '@/helpers/css';
import P5SDBFullFooter from '@/components/P5SDBFullFooter.vue'

export default {
  name: "FailureMatrix",
  components: {
    P5SDBFullFooter,
  },
  setup() {
    return { rowClass };
  },
  data() {
    return {
      httpError: false,
      isLoading: true,
    };
  },
  computed: {
    ...mapGetters({
      hasFailMatrix: "getFailMatrix/hasFailMatrix",
      failMatrix:    "getFailMatrix/failMatrix",
    }),
  },
  mounted() {
    if (!this.hasFailMatrix) {
      this.getFailMatrixNow();
    }
  },
  methods: {
    ...mapActions({
      getFailMatrix: "getFailMatrix/getFailMatrix",
    }),
    async getFailMatrixNow() {
      this.httpError = false;
      this.isLoadin = true;
      try {
        await this.getFailMatrix();
      } catch(e) {
        this.httpError = true;
        console.log("HTTP-Error " + e);
        console.log(e);
      };
      this.isLoading = false;
    },
    cntClass(number) {
      if (number === "") { return "passtest"; }
      const looksLikeInt = /^[0-9]+$/;
      if (!looksLikeInt.test(number)) { return ""; }
      return number > 0 ? "failbuild" : "passtest";
    },
  },
};
</script>
