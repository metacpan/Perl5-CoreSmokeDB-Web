<template>
  <div id="content">
    <h2>About Perl5 CoreSmoke</h2>
  </div>
  <div class="show-report">
    This version consists of:
    <ul v-if="apiService === 'rest'">
      <li>Frontend written in <span class="hl">VueJS 3</span>
        ({{ webName }} v{{ webVersion }})
      </li>
      <li>Backend written in <span class="hl">Perl/Dancer-2</span>
        (API: Perl5::CoreSmokeDB v{{ apiVersion }})
      </li>
      <li>ORM: <span class="hl">DBIx::Class</span>
        (Schema.pm v{{ schemaVersion }}/tsgateway_config v{{ dbVersion }})
      </li>
      <li>Database <span class="hl">Postgresql-14</span></li>
      <li>Reverse Proxy <span class="hl">nginx</span></li>
      <li>OS <span class="hl">Ubuntu 22.04 (jammy)</span></li>
      <li>CI by <span class="hl">Jenkins</span></li>
      <li>
        <a :href="`${apiUrl}/openapi/web`">OpenAPI/Swagger</a>
        (<a :href="`${apiUrl}/openapi/web.yaml`">yaml</a>,
        <a :href="`${apiUrl}/openapi/web.json`">json</a>)
      </li>
    </ul>
    <ul v-else>
      <li>Frontend written in <span class="hl">VueJS 3</span>
        ({{ webName }} v{{ webVersion }})
      </li>
      <li>Backend written in <span class="hl">Perl/Dancer-1</span>
        (API: Perl5::CoreSmokeDB v{{ apiVersion }})
      </li>
      <li>ORM: <span class="hl">DBIx::Class</span>
        (Schema.pm v{{ schemaVersion }}/tsgateway_config v{{ dbVersion }})
      </li>
      <li>Database <span class="hl">Postgresql-14</span></li>
      <li>Reverse Proxy <span class="hl">nginx</span></li>
      <li>OS <span class="hl">Ubuntu 22.04 (jammy)</span></li>
      <li>CI by <span class="hl">Jenkins</span></li>
    </ul>

    <P5SDBFullFooter />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import P5SDBFullFooter from '@/components/P5SDBFullFooter.vue';

export default {
  name: "AboutPerl5CoreSmokeDB",
  components: {
    P5SDBFullFooter,
  },
  data() {
    return {
      apiUrl: import.meta.env.VITE_P5SDB_URL,
      webName: import.meta.env.VITE_APP_NAME,
      webVersion: import.meta.env.VITE_APP_VERSION,
      apiService: import.meta.env.VITE_API_SERVICE,
    };
  },
  computed: {
    ...mapGetters({
      hasVersion:    "getVersion/hasVersion",
      apiVersion:    "getVersion/theVersion",
      dbVersion:     "getVersion/dbVersion",
      schemaVersion: "getVersion/schemaVersion",
    }),
  },
  mounted() {
    if (!this.hasVersion) { this.getVersionNow() }
  },
  methods: {
    ...mapActions({
      getVersion: "getVersion/getVersion",
    }),
    async getVersionNow() {
      try {
        await this.getVersion();
      }
      catch(e) {
        console.log(`HTTP-Error: ${e}`);
      }
    },
  },
}
</script>
