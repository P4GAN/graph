<template>
    <div class = "blurBackground" @click="exitTutorial"></div>
    <div class = "tutorialMenu">
        <h2>User Guide</h2>
        <div class="navigation">
            <button class="navigationButton" @click="imageSource = './assets/2d_graph_help.png'"> 1 </button>
            <button class="navigationButton" @click="imageSource = './assets/editing_equation_help.png'"> 2 </button>
            <button class="navigationButton" @click="imageSource = './assets/control_2d_help.png'"> 3 </button>
            <button class="navigationButton" @click="imageSource = './assets/control_3d_help.png'"> 4 </button>
        </div>
        <img :src="imageSource" class="guide"/>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { settings } from "@/stores/settings.js"

const imageSource = ref('/assets/2d_graph_help.png')

function exitTutorial() {
    settings.value.tutorialMode = false;
}

</script>

<style>
    :root {
        font-size: 20px;
    }

</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
    text-align: center;
    margin: 10px;
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

.tutorialMenu {
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

.navigation {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    margin-bottom: 10px;
}
.navigationButton {
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 50%;
    border: 5px solid black;
    background-color: rgba(220, 220, 220, 1);
}

.navigationButton:hover {
    background-color: rgb(150, 150, 150);
}

.guide {
    width: 550px;
    height: 270px;
}

</style>
