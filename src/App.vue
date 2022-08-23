<template>
    <div class = "pageWrapper">
        <NavbarTop/>
        <EquationEditorSidebar @equationInput = "updateGraph"/>
        <GraphCanvas2d ref = "graph" v-if="settings.graphType == '2d'"/>
        <GraphCanvas3d ref = "graph" v-else-if="settings.graphType == '3d'"/>
        <TutorialMenu v-if="settings.tutorialMode"/>
        <ShareMenu v-if="settings.shareMode" @uploadEquations = "updateGraph"/>
        <SettingsMenu v-if="settings.settingsMode"/>
    </div>
</template>

<script setup>
import NavbarTop from './components/NavbarTop.vue'
import EquationEditorSidebar from './components/EquationEditorSidebar.vue'
import GraphCanvas2d from './components/GraphCanvas2d.vue'
import GraphCanvas3d from './components/GraphCanvas3d.vue'
import SettingsMenu from './components/SettingsMenu.vue'

import { settings } from './stores/settings.js'

import { ref } from "vue";
import TutorialMenu from './components/TutorialMenu.vue'
import ShareMenu from './components/ShareMenu.vue'

let graph = ref()

function updateGraph() {
    graph.value.setChunks();
}

</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

body {
    height: 100%;
    overflow: hidden;
    margin: 0;
    padding: 0;
}

html {
    height: 100%;
}

.pageWrapper {
    height: 100px;
    overflow: hidden;
}
</style>
