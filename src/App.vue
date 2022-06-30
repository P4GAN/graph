<template>
    <div class = "pageWrapper">
        <NavbarTop/>
        <EquationEditorSidebar/>
    </div>
</template>

<script>
import NavbarTop from './components/NavbarTop.vue'
import EquationEditorSidebar from './components/EquationEditorSidebar.vue'

export default {
    name: 'App',
    components: {
        NavbarTop,
        EquationEditorSidebar
    }
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
