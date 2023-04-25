<template>
        <router-view></router-view>
</template>
<script>
import { defineComponent } from 'vue'
import { useUserinfoStore } from "./store/index";
export default defineComponent({
  setup() {
    const useUserinfo = useUserinfoStore();
  },
})
</script>

<style lang="scss">
/*html {
  overflow: hidden;
}
#app {
  overflow-y: auto;
}*/
html,
body,
#app {
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
}
</style>