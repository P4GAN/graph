<template>
    <div class = "sidebar">
        <math-field
            class = "equation"
            v-for = "(item, index) in equationList"
            v-bind:key = "index"
            @input = "(event) => { mathInput(event, index) }" > 
            
        </math-field>
        <div class = "addEquation" @click="addEquation">
            <svg width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16"> 
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/> 
            </svg>  
        </div>
    </div>

</template>


<script setup>
import { ref, reactive, onMounted } from "vue"
import { equationList } from "@/stores/equations.js"
import "mathlive"
import math from "@/modules/math.js";

function mathInput(event, index) {
    console.log(equationList)

    try {
        let equationString = event.target.getValue("ascii-math");
        equationString = equationString.replaceAll("⋅", "*");
        equationString = equationString.split("=")
        equationString = equationString[0] + "-(" + equationString[1] + ")"
        equationList.value[index] = {
            equationString: equationString,
            fieldValue: math.evaluate("f(x, y) =" + equationString),
            color: [255, 0, 0, 255],
        }

    }
    catch(err) {
        console.error("invalid equation")
    }
    
}

function addEquation() {
    let equationString = "0";
    equationList.value.push({
        equationString: equationString,
        fieldValue: math.evaluate("f(x, y) =" + equationString),
        color: [255, 0, 0],
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

.equation {
    border: 1px solid rgba(0, 0, 0, 0.2);

    overflow-y: hidden;
    padding: 10px 5% 10px 5%;
    width: 90%;
}

</style>
