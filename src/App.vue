<template>
    <div class = "pageWrapper">
        <NavbarTop/>
        <EquationEditorSidebar/>
        <GraphCanvas3d/>
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


console.log(settings.value.settingsMode)
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
