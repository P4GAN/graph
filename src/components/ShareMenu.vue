<template>
    <div class = "blurBackground" @click="exitShare"></div>
    <div class = "shareMenu">
        <h1>Import/Export Graph</h1>
        <div class = "importExportContainer">
            <div class = "import">
                <h4>Import</h4>
                <input type = "file" ref = "fileElement" @change = "uploadEquations"/>
                <button @click = "uploadEquation">Submit</button>
            </div>
            <div class = "export">
                <h4>Export</h4>
                <button class = "download" @click="downloadEquations('graph')">Click to download graph</button>
            </div>
        </div>
    </div>
</template>

<script setup>

import { ref, defineEmits } from "vue"

import { settings } from "@/stores/settings.js"
import { equationList } from "@/stores/equations.js"

let fileElement = ref(null);

const emit = defineEmits(["uploadEquations"])

function exitShare() {
    settings.value.shareMode = false;
}


function uploadEquations() {
    let jsonFile = fileElement.value.files[0];
    let reader = new FileReader();
    reader.onload = function(e) {
        for (let i = 0; i < e.target.result.length; i++) {
            equationList[i] = e.target.result.length[i];
        }
        emit("uploadEquations");
    }
    reader.readAsText(jsonFile);
}

function downloadEquations(fileName){
    let dataStream = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(equationList.value));
    let downloadElement = document.createElement('a');
    downloadElement.setAttribute("href", dataStream);
    downloadElement.setAttribute("download", fileName + ".json");
    document.body.appendChild(downloadElement); 
    downloadElement.click();
    downloadElement.remove();
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
