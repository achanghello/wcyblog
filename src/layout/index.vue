<template>
    <div class="app-wrapper">
        <div class="sidebar-fixed">
            <Sidebar class="sidebar-container"></Sidebar>
        </div>
        <router-view />
    </div>
</template>  

<script>
import path from "path"
import Sidebar from './components/Sidebar'
import { computed, defineComponent, h, reactive, ref } from "vue";
export default defineComponent({
    components: {
        Sidebar
    },
    setup(){
        console.log(path);
    }
})
</script>

<style lang="scss" scoped>
.app-wrapper {
    width: 100%;
    .sidebar-fixed {
        background-color: #fff;
        position: fixed;
        width: calc(100% - 20px);
        overflow: hidden;
        top: 0;
        left: 0;
        z-index: 10;
    } 
}
</style>