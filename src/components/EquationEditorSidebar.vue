<template>
    <div class = "sidebar" ref = "sidebar">
        <div class = "equationBox" v-for="(item, index) in equationList" v-bind:key="item.id">
            <input type="color" class="color" :value="colorToHex(item.color)" @change="(event) => changeColor(event, index)">
            <math-field
                class = "equation"
                virtual-keyboard-mode = "manual"
                @input = "(event) => mathInput(event, index)" 
                v-on:keyup.enter="addEquation"> {{ equationList[index].equationString }}
            </math-field>
            <div class = "deleteEquation" @click="deleteEquation(index);">
                <svg width="40" height="40">
                    <line stroke-width="1" stroke-linecap="undefined" stroke-linejoin="undefined" y2="30" x2="30" y1="10" x1="10" stroke="#000" fill="none"/>
                    <line stroke-width="1" stroke-linecap="undefined" stroke-linejoin="undefined" y2="30" x2="10" y1="10" x1="30" stroke="#000" fill="none"/>
                </svg> 
            </div>
        </div>
        <div class = "addEquation" @click="addEquation">
            <svg width="40" height="40">
                <line stroke-width="2" stroke-linecap="undefined" stroke-linejoin="undefined" y2="20" x2="30" y1="20" x1="10" stroke="#000" fill="none"/>
                <line stroke-width="2" stroke-linecap="undefined" stroke-linejoin="undefined" y2="30" x2="20" y1="10" x1="20" stroke="#000" fill="none"/>
            </svg> 
        </div>
    </div>

</template>


<script setup>
import { ref, reactive, onMounted, defineEmits} from "vue"
import { equationList, updateEquation } from "@/stores/equations.js"
import { settings } from "@/stores/settings.js"
import "mathlive"
import math from "@/modules/math.js";

const emit = defineEmits(["equationInput"])
let id = 0;
let sidebar = ref(null)

//when user enters input in equation editor, the program updates the equation function, and tells the graphing module to regraph the equation
function mathInput(event, index) {
    let equationString = event.target.getValue("ascii-math");
    updateEquation(equationString, index);
    emit("equationInput");
}

//gets hex color code from color picker, and converts to RGB array, which is stored, then tells graphing module to regraph
function changeColor(event, index) {
    let colorHex = event.target.value;
    let r = parseInt(colorHex.slice(1, 3), 16)
    let g = parseInt(colorHex.slice(3, 5), 16)
    let b = parseInt(colorHex.slice(5, 7), 16)
    equationList.value[index].color = [r, g, b, 255];
    emit("equationInput");
}

//RGB array to hex code
function colorToHex(color) {
    return "#" + color[0].toString(16).padStart(2, "0") + color[1].toString(16).padStart(2, "0") + color[2].toString(16).padStart(2, "0");
}

//adds new equation, with random color, and function returning 0
function addEquation() {
    let functionString = "f(x, y) = 0"
    if (settings.value.graphType == "3d") {
        functionString = "f(x, y, z) = 0"
    }
    equationList.value.push({
        id: id++,
        equationString: "",
        fieldValue: math.evaluate(functionString),
        color: [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), 255],
    })
    console.log(sidebar.value.scrollHeight);
    sidebar.value.scrollTop = sidebar.value.scrollHeight - 100;
}

//removes equation
function deleteEquation(index) {
    console.log(index);
    equationList.value.splice(index, 1);
    emit("equationInput");
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
    height: calc(100% - 50px);
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
    min-height: 55px;

    display: flex;
}

.color {
    margin-top: 4px;
    width: 45px;
    height: 45px;
}

.equation {
    width: 290px;
    margin-left: 5px;
    padding: 5px 5px 0px 5px;
}
.addEquation {
    margin-top: 5px;
    height: 40px;
}
.addEquation:hover {
    border-radius: 50%;
    background-color: rgb(200, 200, 200);
}
.deleteEquation {
    display: inline;
    margin-top: 5px;
    margin-right: 5px;
    height: 40px;
    border-radius: 50%;
}

.deleteEquation:hover {
    background-color: rgb(200, 200, 200);
}

</style>
