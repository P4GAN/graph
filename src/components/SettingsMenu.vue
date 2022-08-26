<template>
    <div class = "blurBackground" @click="exitSettings"></div>
    <div class = "settingsMenu">
        <h2>Settings</h2>
        <div>
            <input type="checkbox" v-model="settings.xAxis" @change="emit('updateSettings')" />
            <label for="checkbox">x-axis</label>
        </div>
        <div>
            <input type="checkbox" v-model="settings.yAxis" @change="emit('updateSettings')" />
            <label for="checkbox">y-axis</label>
        </div>
        <div>
            <input type="checkbox" v-model="settings.zAxis" @change="emit('updateSettings')" />
            <label for="checkbox">z-axis (3d)</label>
        </div>
        <div>
            <input type="checkbox" v-model="settings.gridLines" @change="emit('updateSettings')" />
            <label for="checkbox">Grid lines (2d)</label>        
        </div>




    </div>
</template>

<script setup>
import { defineEmits } from "vue"
import { settings } from "@/stores/settings.js"

const emit = defineEmits(["updateSettings"])

function exitSettings() {
    settings.value.settingsMode = false;
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

.blurBackground {
    width: 100%;
    height: 100%;

    position: fixed;
    top: 0;
    left: 0;

    z-index: 3;

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

    z-index: 4;

    background-color: white;

}

</style>
