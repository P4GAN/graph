<template>
    <div class = "blurBackground" @click="exitShare"></div>
    <div class = "shareMenu">
        <h1>Import/Export Graph</h1>
        <div class = "importExportContainer">
            <div class = "import">
                <h4>Import</h4>

            </div>
            <div class = "export">
                <h4>Export</h4>

            </div>
        </div>
    </div>
</template>

<script setup>

import { settings } from "@/stores/settings.js"

function exitShare() {
    settings.value.shareMode = false;
}

</script>

<style>
    :root {
        font-size: 20px;
    }


</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
    text-align: center;
}

h4 {
    text-align: center;
}

.blurBackground {
    width: 100%;
    height: 100%;

    position: fixed;
    top: 0;
    left: 0;

    z-index: 3;

    background-color: rgba(100, 100, 100, 0.5);
}

.shareMenu {
    width: 600px;
    height: 400px;

    border-radius: 20px;
    
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);

    z-index: 4;

    background-color: white;

}

.importExportContainer {
    display: flex;
    flex-direction: row;
}

.import {
    flex: 1;
}

.export {
    flex: 1;
}

</style>
