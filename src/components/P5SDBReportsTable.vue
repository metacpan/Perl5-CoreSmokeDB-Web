<template>
  <table class="latest-report-table">
    <caption v-if="hasLength(caption)">{{ caption }}</caption>
    <tr class="odd">
      <th>Architecture</th>
      <th>Host</th>
      <th>OS</th>
      <th>{{ idLabel }}</th>
      <th>Branch</th>
      <th>Date</th>
      <th>Status</th>
    </tr>
    <tr
v-for="(report, idx) in reports"
        :key="idx"
        :class="rowClass(idx)">
      <td>{{report.architecture}}</td>
      <td>{{report.hostname}}</td>
      <td>{{report.osname}} {{report.osversion}}</td>
      <td>{{ report[idColumn] }}</td>
      <td>{{ report.smokeBranch }}</td>
      <td>{{report.smokeDate}}</td>
      <td :class="summaryClass(report.summary)">
        <a
         :href="'/report/' + report.id"
         :class="summaryClass(report.summary)">{{report.summary}}</a>
      </td>
    </tr>
  </table>
</template>

<script>
import { hasLength } from '@/helpers';
import { rowClass, summaryClass } from '@/helpers/css';

export default {
  name: "ReportsTable",
  props: {
    caption:  {type: String, default: "Search results"},
    idColumn: {type: String, default: "gitDescribe"},
    idLabel:  {type: String, default: "Git-describe"},
    reports:  {type: Object, required: true},
  },
  setup() {
    return { hasLength, rowClass, summaryClass };
  },
}
</script>
