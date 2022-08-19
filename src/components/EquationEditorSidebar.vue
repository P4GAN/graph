<template>
    <div class = "sidebar">
        <div class = "equationBox" v-for="(item, index) in equationList" v-bind:key="index">
            <input type="color" class="color" value="#e66465" @input="(event) => changeColor(event, index)">
            <math-field
                class = "equation"
                @input = "(event) => mathInput(event, index)" > 
                
            </math-field>
            <div class = "deleteEquation" @click="deleteEquation(index)">
                <svg width="45" height="45" viewBox="0 0 48 48" fill="none">
                    <rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M14 14L34 34" stroke="#333" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M14 34L34 14" stroke="#333" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
                </svg> 
            </div>
        </div>
        <div class = "addEquation" @click="addEquation">
            <svg width="45" height="45" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16"> 
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/> 
            </svg>  
        </div>
    </div>

</template>


<script setup>
import { ref, reactive, onMounted, defineEmits} from "vue"
import { equationList } from "@/stores/equations.js"
import { settings } from "@/stores/settings.js"
import "mathlive"
import math from "@/modules/math.js";

const emit = defineEmits(["equationInput"])

function mathInput(event, index) {
    console.log(equationList)

    try {
        let equationString = event.target.getValue("ascii-math");
        equationString = equationString.replaceAll("⋅", "*");
        equationString = equationString.replaceAll("?", ")");
        equationString = equationString.split("=");
        equationString = equationString[0] + "-(" + equationString[1] + ")";
        let functionString = "f(x, y) = ";
        if (settings.graphType == "3d") {
            functionString = "f(x, y, z) = ";
        }
        console.log(equationString);
        equationList.value[index].fieldValue = math.evaluate(functionString + equationString);
        emit("equationInput");
    }
    catch(err) {
        console.error("invalid equation")
        let functionString = "f(x, y) = 0";
        if (settings.graphType == "3d") {
            functionString = "f(x, y, z) = 0";
        }
        equationList.value[index].fieldValue = math.evaluate(functionString)
    }
    
}

function changeColor(event, index) {
    let colorHex = event.target.value;
    let r = parseInt(colorHex.slice(1, 3), 16)
    let g = parseInt(colorHex.slice(3, 5), 16)
    let b = parseInt(colorHex.slice(5, 7), 16)
    equationList.value[index].color = [r, g, b, 255];
    emit("equationInput");
}

function addEquation() {
    let equationString = "0";
    let functionString = "f(x, y) = "
    if (settings.graphType == "2d") {
        functionString = "f(x, y, z) = "
    }
    equationList.value.push({
        equationString: equationString,
        fieldValue: math.evaluate(functionString + equationString),
        color: [255, 0, 0, 255],
    })
}

function deleteEquation(index) {
    equationList.value.splice(index, 1);
}

</script>


<style>
    :root {
        font-size: 20px;
        --sidebar-bg: #f1f0f0;
    }
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.sidebar {
    color: black;
    background-color: var(--sidebar-bg);
    
    z-index: 1;
    top: 50px;
    left: 0;
    height: 100%;
    width: 350px;
    position: fixed;

    padding: 0;

    display: flex;
    flex-direction: column;
    align-items: center;

    overflow-x: hidden;
    overflow-y: scroll;

    border-right: 1px solid rgba(0, 0, 0, 0.2);

}

.equationBox {
    border: 1px solid rgba(0, 0, 0, 0.2);
    
    overflow-y: hidden;
    padding: 5px 5px 5px 10px;
    width: 100%;

    display: flex;
}

.color {
    width: 45px;
    height: 45px;
}

.equation {
    width: 290px;
    height: 50px;
    margin-left: 5px;
}

.deleteEquation {
    display: inline;
}

</style>
