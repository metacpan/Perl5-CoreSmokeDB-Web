<template>
    <P5SDBHead />
    <P5SDBMenu />

    <router-view />
</template>

<script>
import P5SDBHead from '@/components/P5SDBHead.vue'
import P5SDBMenu from '@/components/P5SDBMenu.vue'

export default {
  name: "Perl5CoreSmokeDB",
  components: {
    P5SDBHead,
    P5SDBMenu
   }
}
</script>
