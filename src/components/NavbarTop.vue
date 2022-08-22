<template>
    <nav class = "navbar">
        <div class = "name">
            Graphing Calculator
        </div>
        <ul class = "graphTypes">
            <li>
                <a @click="changeGraphType('2d')">2D Graph</a>

            </li>
            <li>
                <a @click="changeGraphType('3d')">3D Graph</a>

            </li>
        </ul>
        <div class = "options">
            <div class = "tutorial" @click="toggleTutorialMenu">
                <svg width="48" height="48" viewBox="0 0 48 48">
                    <path d="M0 0h48v48h-48z" fill="none"/>
                    <path fill="#FFF" d="M38.86 25.95c.08-.64.14-1.29.14-1.95s-.06-1.31-.14-1.95l4.23-3.31c.38-.3.49-.84.24-1.28l-4-6.93c-.25-.43-.77-.61-1.22-.43l-4.98 2.01c-1.03-.79-2.16-1.46-3.38-1.97l-.75-5.3c-.09-.47-.5-.84-1-.84h-8c-.5 0-.91.37-.99.84l-.75 5.3c-1.22.51-2.35 1.17-3.38 1.97l-4.98-2.01c-.45-.17-.97 0-1.22.43l-4 6.93c-.25.43-.14.97.24 1.28l4.22 3.31c-.08.64-.14 1.29-.14 1.95s.06 1.31.14 1.95l-4.22 3.31c-.38.3-.49.84-.24 1.28l4 6.93c.25.43.77.61 1.22.43l4.98-2.01c1.03.79 2.16 1.46 3.38 1.97l.75 5.3c.08.47.49.84.99.84h8c.5 0 .91-.37.99-.84l.75-5.3c1.22-.51 2.35-1.17 3.38-1.97l4.98 2.01c.45.17.97 0 1.22-.43l4-6.93c.25-.43.14-.97-.24-1.28l-4.22-3.31zm-14.86 5.05c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/>
                </svg>
            </div>
            <div class = "share" @click="toggleShareMenu">
                <svg width="48" height="48" viewBox="0 0 48 48">
                    <path d="M0 0h48v48h-48z" fill="none"/>
                    <path fill="#FFF" d="M38.86 25.95c.08-.64.14-1.29.14-1.95s-.06-1.31-.14-1.95l4.23-3.31c.38-.3.49-.84.24-1.28l-4-6.93c-.25-.43-.77-.61-1.22-.43l-4.98 2.01c-1.03-.79-2.16-1.46-3.38-1.97l-.75-5.3c-.09-.47-.5-.84-1-.84h-8c-.5 0-.91.37-.99.84l-.75 5.3c-1.22.51-2.35 1.17-3.38 1.97l-4.98-2.01c-.45-.17-.97 0-1.22.43l-4 6.93c-.25.43-.14.97.24 1.28l4.22 3.31c-.08.64-.14 1.29-.14 1.95s.06 1.31.14 1.95l-4.22 3.31c-.38.3-.49.84-.24 1.28l4 6.93c.25.43.77.61 1.22.43l4.98-2.01c1.03.79 2.16 1.46 3.38 1.97l.75 5.3c.08.47.49.84.99.84h8c.5 0 .91-.37.99-.84l.75-5.3c1.22-.51 2.35-1.17 3.38-1.97l4.98 2.01c.45.17.97 0 1.22-.43l4-6.93c.25-.43.14-.97-.24-1.28l-4.22-3.31zm-14.86 5.05c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/>
                </svg>
            </div>
            <div class = "settings" @click="toggleSettingsMenu">
                <svg width="48" height="48" viewBox="0 0 48 48">
                    <path d="M0 0h48v48h-48z" fill="none"/>
                    <path fill="#FFF" d="M38.86 25.95c.08-.64.14-1.29.14-1.95s-.06-1.31-.14-1.95l4.23-3.31c.38-.3.49-.84.24-1.28l-4-6.93c-.25-.43-.77-.61-1.22-.43l-4.98 2.01c-1.03-.79-2.16-1.46-3.38-1.97l-.75-5.3c-.09-.47-.5-.84-1-.84h-8c-.5 0-.91.37-.99.84l-.75 5.3c-1.22.51-2.35 1.17-3.38 1.97l-4.98-2.01c-.45-.17-.97 0-1.22.43l-4 6.93c-.25.43-.14.97.24 1.28l4.22 3.31c-.08.64-.14 1.29-.14 1.95s.06 1.31.14 1.95l-4.22 3.31c-.38.3-.49.84-.24 1.28l4 6.93c.25.43.77.61 1.22.43l4.98-2.01c1.03.79 2.16 1.46 3.38 1.97l.75 5.3c.08.47.49.84.99.84h8c.5 0 .91-.37.99-.84l.75-5.3c1.22-.51 2.35-1.17 3.38-1.97l4.98 2.01c.45.17.97 0 1.22-.43l4-6.93c.25-.43.14-.97-.24-1.28l-4.22-3.31zm-14.86 5.05c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/>
                </svg>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { settings } from "@/stores/settings.js"
import { equationList } from "@/stores/equations.js"

function changeGraphType(type) {
    console.log(settings);
    equationList.value = [];
    settings.value.graphType = type;
}

function toggleTutorialMenu() {
    settings.value.tutorialMode = !settings.value.tutorialMode;
}

function toggleShareMenu() {
    settings.value.shareMode = !settings.value.shareMode;
}

function toggleSettingsMenu() {
    settings.value.settingsMode = !settings.value.settingsMode;
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

.name {
    width: 350px;
    border-right: 1px solid black;

    display: flex;
    justify-content: center;
    align-items: center;   

    height: 100%;
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
    padding: 0px 20px 0px 20px;
    border-right: 1px solid black;
}

.graphTypes li:hover {
    background-color: var(--navbar-button-hover);
}

.options {
    margin-left: auto;
    margin-top: 5px;
    display: flex;
    flex-direction: row;
}

</style>
