<template>
<div style="margin: 0 1rem; border-bottom: 1px solid black; padding: 0 0 20rem 0; font-size: smaller;">
  <div style="width: 45%; float: left; padding: 1rem;">
    <input v-model="modelValue.andnotArch" type="radio" value="and" />And
    <input v-model="modelValue.andnotArch" type="radio" value="not" />Not
    <v-select
     v-model="modelValue.selectedArch"
     :reduce="item => item.id"
     :options="filteredArchs()"
    />

    <input v-model="modelValue.andnotHost" type="radio" value="and" />And
    <input v-model="modelValue.andnotHost" type="radio" value="not" />Not
    <v-select
     v-model="modelValue.selectedHost"
     :reduce="item => item.id"
     :options="filteredHosts()" />
     <br>

     <span>Perl version: <v-select
      v-model="modelValue.selectedPerlVersion"
      :reduce="item => item.id"
      :options="filteredPerlVersions()" /></span>

     <span>Perl branch: <v-select
      v-model="modelValue.selectedBranch"
      :reduce="item => item.id"
      :options="filteredBranches()" /></span>

      <br><br>
      <button @click="submitSearchToParent">Search reports</button>
  </div>

  <div style="width: 45%; float: left; padding: 1rem;">
    <input v-model="modelValue.andnotOsname" type="radio" value="and" />And
    <input v-model="modelValue.andnotOsname" type="radio" value="not" />Not
    <v-select
     v-model="modelValue.selectedOsname"
     :reduce="item => item.id"
     :options="filteredOsnames()" />

    <input v-model="modelValue.andnotOsversion" type="radio" value="and" />And
    <input v-model="modelValue.andnotOsversion" type="radio" value="not" />Not
    <v-select
     v-model="modelValue.selectedOsversion"
     :reduce="item => item.id"
     :options="filteredOsversions()" />
    <br>
    <input v-model="modelValue.andnotCc" type="radio" value="and" />And
    <input v-model="modelValue.andnotCc" type="radio" value="not" />Not
    <v-select
     v-model="modelValue.selectedCc"
     :reduce="item => item.id"
     :options="filteredCcs()" />
    <input v-model="modelValue.andnotCcversion" type="radio" value="and" />And
    <input v-model="modelValue.andnotCcversion" type="radio" value="not" />Not
    <v-select
     v-model="modelValue.selectedCcversion"
     :reduce="item => item.id"
     :options="filteredCcversions()" />

    <br><br>
    <button @click="
      modelValue.selectedArch = '';
      modelValue.selectedHost = '';
      modelValue.selectedOsname = '';
      modelValue.selectedOsversion = '';
      modelValue.selectedCc = '';
      modelValue.selectedCcversion = '';
      modelValue.selectedPerlVersion = 'latest';
      modelValue.selectedBranch = '';
      modelValue.andnotArch = 'and';
      modelValue.andnotHost = 'and';
      modelValue.andnotOsname = 'and';
      modelValue.andnotOsversion = 'and';
      modelValue.andnotCc = 'and';
      modelValue.andnotCcversion = 'and';
      page = 1;
      emitResetSearch();
    ">Reset filters</button>
  </div>

</div>
</template>

<script>
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

import { hasLength } from '@/helpers';
import { logDebug } from '@/helpers/logging';

export default {
  name: "SearchForm",
  components: {
    vSelect,
  },
  props: {
    searchParams: {type: Object, required: true},
    page:         {type: Number, default: 1},
    modelValue:   {type: Object, default: () => { return {} }},

  },
  emits: ['resetSearch', 'onSearch'],
  setup() {
    return { hasLength };
  },
  data() {
    return {
      field2Show: {
        arch: {
          label: "Architecture",
          method: "architectures",
        },
        hostname: {
          label: "Hostname",
          method: "hosts",
        },
        os: {
          label: "OS name",
          method: "osnames",
        },
        osversion: {
          label: "OS version",
          method: "osversions",
        },
        comp: {
          label: "Compiler",
          method: "ccnames",
        },
        compversion: {
          label: "Compiler version",
          method: "ccversions",
        },
      }
    };
  },
  mounted() {
    logDebug(`ZZZZZ SearchForm mounted: ${JSON.stringify(this.selectedValues)}`);
  },
  methods: {
    filteredArchs() {
      return this.filteredAHOCV('arch', this.modelValue.selectedArch);
    },
    filteredHosts() {
      return this.filteredAHOCV('hostname', this.modelValue.selectedHost);
    },
    filteredOsnames() {
      return this.filteredAHOCV('os', this.modelValue.selectedOsname);
    },
    filteredOsversions() {
      return this.filteredAHOCV('osversion', this.modelValue.selectedOsversion);
    },
    filteredCcs() {
      return this.filteredAHOCV('comp', this.modelValue.selectedCc);
    },
    filteredCcversions() {
      return this.filteredAHOCV('compversion', this.modelValue.selectedCc);
    },

    filteredAHOCV(fieldname, selectedValue) {
      const current = {
        arch:      this.modelValue.selectedArch,
        hostname:  this.modelValue.selectedHost,
        os:        this.modelValue.selectedOsname,
        osversion: this.modelValue.selectedOsversion,
        comp:      this.modelValue.selectedCc,
      };
      let selectOptions = [];
      if (this.hasLength(selectedValue)) {
        selectOptions = [
          {label: `-- Unselect ${this.field2Show[fieldname].label} --`, id: ""},
          {label: selectedValue, id: selectedValue},
        ];
      }
      else {
        const list = this.searchParams[this.field2Show[fieldname].method](current);
        selectOptions = [
          {label: `-- Select ${this.field2Show[fieldname].label} --`, id: ""},
          ...list.map(
            function (item) {
              const option = { label: item, id: item };
              return option;
            }
          ),
        ];
      }
      logDebug(`filtered-${fieldname}(): ${JSON.stringify(selectOptions)}`);

      return selectOptions;
    },

    filteredPerlVersions() {
      const selectOptions = [
        { label: "Latest version only", id: "latest" },
        { label: "All versions",        id: "all" },
        ...this.searchParams.perlVersions.map(
          function (item) {
            const option = { label: item.label, id: item.value };
            return option;
          }
        ),
      ];
      logDebug(`filteredPerlVersions(): ${JSON.stringify(selectOptions)}`);

      return selectOptions;
    },
    filteredBranches() {
      let selectOptions = [];
      if (this.hasLength(this.modelValue.selectedBranch)) {
        selectOptions = [
          { label: "-- Unselect Branch --", id: "" },
          { label: this.modelValue.selectedBranch, id: this.modelValue.selectedBranch },
        ];
      }
      else {
        selectOptions = [
          { label: "-- Select Branch --", id: "" },
          ...this.searchParams.branches.map(
            function (item) {
              const option = { label: item, id: item };
              return option;
            }
          ),
        ];
      }
      logDebug(`filteredBranches(): ${JSON.stringify(selectOptions)}`);

      return selectOptions;
    },

    currentSearchArguments() {
      const searchArguments = {
        selected_arch:   this.modelValue.selectedArch,
        selected_osnm:   this.modelValue.selectedOsname,
        selected_osvs:   this.modelValue.selectedOsversion,
        selected_host:   this.modelValue.selectedHost,
        selected_comp:   this.modelValue.selectedCc,
        selected_cver:   this.modelValue.selectedCcversion,
        selected_perl:   this.modelValue.selectedPerlVersion,
        selected_branch: this.modelValue.selectedBranch,
        andnotsel_arch:  this.modelValue.andnotArch === 'not' ? 1 : 0,
        andnotsel_osnm:  this.modelValue.andnotOsname === 'not' ? 1 : 0,
        andnotsel_osvs:  this.modelValue.andnotOsversion === 'not' ? 1 : 0,
        andnotsel_host:  this.modelValue.andnotHost === 'not' ? 1 : 0,
        andnotsel_comp:  this.modelValue.andnotCc === 'not' ? 1 : 0,
        andnotsel_cver:  this.modelValue.andnotCcversion === 'not' ? 1 : 0,
      };
      return searchArguments;
    },

    submitSearchToParent() {
      this.$emit('onSearch');
    },

    emitResetSearch() {
      this.$emit('resetSearch');
    },
  },
}
</script>
