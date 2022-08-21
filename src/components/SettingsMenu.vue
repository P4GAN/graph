<template>
    <div class = "blurBackground" @click="exitSettings"></div>
    <div class = "settingsMenu">
        <h2>Settings</h2>
    </div>
</template>

<script setup>

import { settings } from "@/stores/settings.js"

function exitSettings() {
    settings.value.settingsMode = false;
}

</script>

<style>
    :root {
        font-size: 20px;
    }

    h1 {
        text-align: center;
    }
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.blurBackground {
    width: 100%;
    height: 100%;

    position: fixed;
    top: 0;
    left: 0;

    z-index: 1;

    background-color: rgba(100, 100, 100, 0.5);
}

.settingsMenu {
    width: 600px;
    height: 400px;

    border-radius: 20px;
    
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);

    z-index: 2;

    background-color: white;

}

</style>
