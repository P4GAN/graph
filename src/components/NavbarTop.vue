<template>
    <nav class = "navbar">
        <ul class = "graphTypes">
            <li>
                <a @click="changeGraphType('2d')">2D Graph</a>

            </li>
            <li>
                <a @click="changeGraphType('3d')">3D Graph</a>

            </li>
        </ul>

    </nav>
</template>

<script setup>
import { settings } from "@/stores/settings.js"

function changeGraphType(type) {
    console.log(settings);
    settings.value.graphType = type;
}

</script>

<style>
    :root {
        font-size: 20px;
        --navbar-bg: #5fc5e7;
        --navbar-button-hover: #31b8e6;
        --navbar-button-active: #5385e9;
    }
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.navbar {
    color: white;
    background-color: var(--navbar-bg);
    
    z-index: 2;
    top: 0;
    left: 0;
    height: 50px;
    width: 100%;
    position: fixed;

    padding: 0;

    display: flex;
    flex-direction: row;
    align-items: center;

    border-bottom: 1px solid rgba(0, 0, 0, 0.2);

}

.graphTypes {
    display: flex;
    flex-direction: row;
    list-style: none;
    align-items: center;
    justify-content: space-around;

    margin-inline: 0px;
    padding: 0;
    
    height: 100%;
}

.graphTypes li {
    display: flex;
    align-items: center;
    height: 100%;
    text-align: center;
    margin-left: 10px;
}

.graphTypes li:hover {
    background-color: var(--navbar-button-hover);
}

</style>
