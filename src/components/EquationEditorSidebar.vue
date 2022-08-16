<template>
    <div class = "sidebar">
        <math-field
            class = "equation"
            v-for = "(item, index) in equationList"
            v-bind:key = "index"
            @input = "(event) => { mathInput(event, index) }" > 
        </math-field>

    </div>

</template>


<script setup>
import { ref, reactive, onMounted } from "vue"
import { equationList } from "@/stores/equations.js"
import "mathlive"
import math from "@/modules/math.js";

function mathInput(event, index) {

    try {
        let equationString = event.target.getValue("ascii-math");
        equationString = equationString.replaceAll("⋅", "*");
        equationList.value[index] = {
            equationString: equationString,
            fieldValue: math.evaluate("f(x, y) =" + equationString),
            color: [255, 0, 0],
        }

    }
    catch(err) {
        console.error("invalid equation")
    }
    
    

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

    border-right: 1px solid rgba(0, 0, 0, 0.2);

}

.equation {
    border: 1px solid rgba(0, 0, 0, 0.2);

    padding: 10px 5% 10px 5%;
    width: 90%;
}

</style>
