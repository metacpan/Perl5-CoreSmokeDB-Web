<template>
  <div id="content">
    <h2>About Perl5 CoreSmoke</h2>
  </div>
  <div class="show-report">
    This version consists of:
    <ul>
      <li>Frontend written in <span class="hl">VueJS 3</span></li>
      <li>Backend written in <span class="hl">Perl/Dancer-1</span></li>
      <li>ORM: <span class="hl">DBIx::Class</span></li>
      <li>Database <span class="hl">Postgresql-14</span></li>
      <li>Reverse Proxy <span class="hl">nginx</span></li>
      <li>OS <span class="hl">Ubuntu 22.04 (jammy)</span></li>
      <li>CI by <span class="hl">Jenkins</span></li>
    </ul>
    The <code>Test::Smoke</code> and <code>CoreSmokeDB</code> are maintained:
    <ul>
      <li>Abe Timmerman (abeltje)</li>
      <li>H.Merijn Brand (tux)</li>
      <li>Bram (bram)</li>
    </ul>

    <P5SDBFullFooter />
  </div>
</template>

<script>
import P5SDBFullFooter from '@/components/P5SDBFullFooter.vue'

export default {
  name: "AboutPerl5CoreSmokeDB",
  components: {
    P5SDBFullFooter,
  },
}
</script>
