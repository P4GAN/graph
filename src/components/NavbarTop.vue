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
                <svg width="48" height="45" viewBox="0 -1 20 20">
                    <path fill="#FFF" d="M10.06 1C13 1 15 2.89 15 5.53a4.59 4.59 0 0 1-2.29 4.08c-1.42.92-1.82 1.53-1.82 2.71V13H8.38v-.81a3.84 3.84 0 0 1 2-3.84c1.34-.9 1.79-1.53 1.79-2.71a2.1 2.1 0 0 0-2.08-2.14h-.17a2.3 2.3 0 0 0-2.38 2.22v.17H5A4.71 4.71 0 0 1 9.51 1a5 5 0 0 1 .55 0zM8 17a1.89 1.89 0 0 1 1.77-2H10a1.87 1.87 0 0 1 2 1.73 1.22 1.22 0 0 1 0 .27 1.87 1.87 0 0 1-1.73 2 1.22 1.22 0 0 1-.27 0 1.88 1.88 0 0 1-2-1.75A1 1 0 0 1 8 17z"/>
                </svg>
            </div>
            <div class = "share" @click="toggleShareMenu">
                <svg width="50" height="50" viewBox="0 0 50 50">
                    <path fill="#FFF" d="M30.3 13.7L25 8.4l-5.3 5.3-1.4-1.4L25 5.6l6.7 6.7z"/>
                    <path fill="#FFF" d="M24 7h2v21h-2z"/>
                    <path fill="#FFF" d="M35 40H15c-1.7 0-3-1.3-3-3V19c0-1.7 1.3-3 3-3h7v2h-7c-.6 0-1 .4-1 1v18c0 .6.4 1 1 1h20c.6 0 1-.4 1-1V19c0-.6-.4-1-1-1h-7v-2h7c1.7 0 3 1.3 3 3v18c0 1.7-1.3 3-3 3z"/>
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
    display: flex;
    flex-direction: row;
    height: 100%;
}

.options div:hover {
    background-color: var(--navbar-button-hover);

}

</style>
