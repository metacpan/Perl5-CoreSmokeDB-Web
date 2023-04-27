<template>
    <div v-if="hasVersion" class="footer" style="margin: 0 -0.5em;">
      <span style="font-size: smaller;">CoreSmokeDB {{ apiVersion }}/{{ webVersion }};
           courtesy of Perl QA Hackathon:
             2010&nbsp;<span style="color: yellow">Vienna</span>
           + 2011&nbsp;<span style="color: yellow">Amsterdam</span>
           + 2012&nbsp;<span style="color: yellow">Paris</span>
           + 2013&nbsp;<span style="color: yellow">Lancaster</span>
           + 2014&nbsp;<span style="color: yellow">Lyon</span>
           + 2015&nbsp;<span style="color: yellow">Berlin</span>
           + 2016&nbsp;<span style="color: yellow">Rugby</span>
           + PTS&nbsp;2017&nbsp;<span style="color: yellow">Lyon</span>
           + 2018&nbsp;<span style="color: yellow">Oslo</span>
           + Private&nbsp;2022&nbsp;<span style="color: yellow">abeltje</span>
           + PTS&nbsp;2023&nbsp;<span style="color: yellow">Lyon</span>
      </span>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      httpError: false,
      webVersion: import.meta.env.VITE_APP_VERSION,
    }
  },
  computed: {
    ...mapGetters({
      apiVersion: 'getVersion/theVersion',
      hasVersion: 'getVersion/hasVersion',
    }),
  },
  created() {
    if (!this.hasVersion) { this.getVersionNow(); }
  },
  methods: {
    ...mapActions({
      getVersion: 'getVersion/getVersion',
    }),

    async getVersionNow() {
      this.httpError = false;
      try {
        await this.getVersion();
      }
      catch(e) {
        console.log(`HTTP-error: ${e}`);
        this.httpError = true;
      }
    },
  },
}
</script>
