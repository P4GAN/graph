<template>
    <canvas id = "canvas" ref = "canvas"></canvas>
    <canvas id = "textCanvas" ref = "textCanvas" @wheel = "scroll"></canvas>
</template>

<script setup>
/* eslint-disable */

import { ref, onMounted, onBeforeUnmount } from "vue";
import marchingSquares2d from "@/modules/graphing/marchingSquares2d.js";
import { createShader, createProgram } from "@/modules/graphing/webGLBoilerplate.js";
import * as m3 from  "@/modules/matrix/matrix3.js";
import { equationList } from "@/stores/equations.js";
import { settings } from "@/stores/settings.js";
import { math } from "@/modules/math.js";
import { transformVector } from "../modules/matrix/matrix3.js";

const canvas = ref(null);
const textCanvas = ref(null)

let gl = null;

let context = null;

let mousePressed = false;

let scaleX = 0.1;
let scaleY = 0.1;
let translationX = 0;
let translationY = 0;
let angle = 0;

let scaleHigh = 1;
let scaleLow = 0.01;

let positions = []
let colors = []

let textPositions = [];
let textStrings = [];

let programInfo = {};

let exit = false;

defineExpose({setChunks})

function resizeWindow() {
    canvas.value.width = canvas.value.clientWidth;
    canvas.value.height = canvas.value.clientHeight;
    textCanvas.value.width = textCanvas.value.clientWidth;
    textCanvas.value.height = textCanvas.value.clientHeight;
    scaleY = scaleX * canvas.value.width / canvas.value.height;
    setChunks()
}

function mouseMoved(event) {
    if (mousePressed) {
        event.preventDefault();

        translationX += (2 * event.movementX / canvas.value.width / scaleX);
        translationY -= (2 * event.movementY / canvas.value.height / scaleY);

        setChunks();

    }
}

onMounted(async () => {
    canvas.value.width = canvas.value.clientWidth;
    canvas.value.height = canvas.value.clientHeight;

    textCanvas.value.width = textCanvas.value.clientWidth;
    textCanvas.value.height = textCanvas.value.clientHeight;

    scaleX = 0.1;
    scaleY = 0.1 * canvas.value.width / canvas.value.height;

    textCanvas.value.addEventListener("mousedown", function(event) {
        mousePressed = true;
    });

    window.addEventListener("mouseup", function(event) {
        mousePressed = false;
    });

    window.addEventListener("resize", resizeWindow);

    textCanvas.value.addEventListener("mousemove", mouseMoved);

    exit = false;

    gl = canvas.value.getContext("webgl");

    context = textCanvas.value.getContext("2d");

    let vertexShaderSource = await fetch("shaders/graph2d.vert").then(response => response.text());
    let fragmentShaderSource = await fetch("shaders/graph2d.frag").then(response => response.text());

    let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    let shaderProgram = createProgram(gl, vertexShader, fragmentShader);

    programInfo = {
        program: shaderProgram,
        attributes: {
            positionAttribute: gl.getAttribLocation(shaderProgram, "a_position"),
            colorAttribute: gl.getAttribLocation(shaderProgram, "a_color"),
        },
        uniforms: {
            matrix: gl.getUniformLocation(shaderProgram, "u_matrix"),

        },
        buffers: {
            positionBuffer: gl.createBuffer(),
            colorBuffer: gl.createBuffer(),
        }
    }
    

    setChunks();

    //gl.bindBuffer(gl.ARRAY_BUFFER, programInfo.buffers.colorBuffer);
    //gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    requestAnimationFrame(draw);

})

onBeforeUnmount(() => {
    textCanvas.value.removeEventListener("mousedown", function(event) {
        mousePressed = true;
    });

    window.removeEventListener("mouseup", function(event) {
        mousePressed = false;
    });

    window.removeEventListener("resize", resizeWindow);

    textCanvas.value.removeEventListener("mousemove", mouseMoved);

    exit = true;
})

function getCameraMatrix() {
    /*transformation should be

    vector * translation * scaling * rotation * projection

    aka [projection][rotation][scaling][translation][vector]

    therefore this is order of multiplication
    */
    let cameraMatrix = m3.multiply(m3.identity(), m3.rotation(angle));
    cameraMatrix = m3.multiply(cameraMatrix, m3.scaling(scaleX, scaleY));
    cameraMatrix = m3.multiply(cameraMatrix, m3.translation(translationX, translationY));
    return cameraMatrix;
}

function setChunks() {
    let maxX = 1/scaleX;
    let maxY = 1/scaleY;
    positions = [];
    colors = [];
    textPositions = [];
    textStrings = [];
    let increment = 0.1 / Math.pow(10, Math.floor(Math.log10(scaleX)));
    let roundedX = Math.floor((-translationX)/increment) * increment;
    let roundedY = Math.floor((-translationY)/increment) * increment;
    if (settings.value.gridLines) {
        for (let x = roundedX -15 * increment; x < roundedX + 15 * increment; x += increment) {

            positions.push(x, -translationY - maxY, x, -translationY + maxY);
            colors.push(0, 0, 0, 100, 0, 0, 0, 100);

            let clipSpacePos = transformVector(getCameraMatrix(), [x, 0, 1]);
            let pixelX = (clipSpacePos[0] *  0.5 + 0.5) * textCanvas.value.width;
            let pixelY = (clipSpacePos[1] * -0.5 + 0.5) * textCanvas.value.height;

            textPositions.push([pixelX, pixelY]);
            let decimalPlaces = Math.max(0, -Math.log10(increment));
            textStrings.push(x.toFixed(decimalPlaces));
        }
        for (let y = roundedY -15 * increment; y < roundedY + 15 * increment; y += increment) {
            positions.push(-translationX - maxX, y, -translationX + maxX, y);
            colors.push(0, 0, 0, 100, 0, 0, 0, 100);

            let clipSpacePos = transformVector(getCameraMatrix(), [0, y, 1]);
            let pixelX = (clipSpacePos[0] *  0.5 + 0.5) * textCanvas.value.width;
            let pixelY = (clipSpacePos[1] * -0.5 + 0.5) * textCanvas.value.height;

            textPositions.push([pixelX, pixelY])
            let decimalPlaces = Math.max(0, -Math.log10(increment));
            textStrings.push(y.toFixed(decimalPlaces));    
        }
    }

    if (settings.value.xAxis) { 
        positions.push(-translationX - maxX, 0, -translationX + maxX, 0);
        colors.push(0, 0, 0, 255, 0, 0, 0, 255);
    }
    if (settings.value.yAxis) { 
        positions.push(0, -translationY - maxY, 0, -translationY + maxY);
        colors.push(0, 0, 0, 255, 0, 0, 0, 255);
    }

    for (let i = 0; i < equationList.value.length; i++) {
        let graphColor = equationList.value[i].color;
        let graphFunction = equationList.value[i].fieldValue;

            let start = performance.now();

        let marchingSquaresResult = marchingSquares2d(-translationX - maxX, -translationX + maxX, -translationY - maxY, -translationY + maxY, maxX/50, graphColor, graphFunction);
            console.log(performance.now() - start);

        positions = positions.concat(marchingSquaresResult.linePositions)
        colors = colors.concat(marchingSquaresResult.colors)
    }

    console.log(positions)

    console.log(colors)


    gl.bindBuffer(gl.ARRAY_BUFFER, programInfo.buffers.positionBuffer);

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, programInfo.buffers.colorBuffer);

    gl.bufferData(gl.ARRAY_BUFFER, new Uint8Array(colors), gl.STATIC_DRAW);
}

function draw() {

    if (exit) {
        return;
    }

    gl.viewport(0, 0, canvas.value.width, canvas.value.height);

    // Clear the canvas
    gl.clearColor(1, 1, 1, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    gl.useProgram(programInfo.program);

    gl.enableVertexAttribArray(programInfo.attributes.positionAttribute);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, programInfo.buffers.positionBuffer);

    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    let size = 2;          // 2 components per iteration
    let type = gl.FLOAT;   // the data is 32bit floats
    let normalize = false; // don't normalize the data
    let stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    let offset = 0;        // start at the beginning of the buffer

    gl.vertexAttribPointer(programInfo.attributes.positionAttribute, size, type, normalize, stride, offset)

    gl.enableVertexAttribArray(programInfo.attributes.colorAttribute);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, programInfo.buffers.colorBuffer);

    size = 4;
    type = gl.UNSIGNED_BYTE;
    normalize = true;

    gl.vertexAttribPointer(programInfo.attributes.colorAttribute, size, type, normalize, stride, offset)

    gl.uniformMatrix3fv(programInfo.uniforms.matrix, false, getCameraMatrix())

    let primitiveType = gl.LINES;
    let count = positions.length / 2;
    gl.drawArrays(primitiveType, offset, count);

    for (let i = 0; i < textPositions.length; i++) {
        context.fillText(textStrings[i], textPositions[i][0], textPositions[i][1])
    }

    requestAnimationFrame(draw);
}

//listen for events

function scroll(event) {
    event.preventDefault();

    let rect = canvas.value.getBoundingClientRect();

    let mouseX = event.offsetX
    let mouseY = canvas.value.height - event.offsetY;

    let [clipX, clipY] = m3.transformVector(m3.projection(canvas.value.width, canvas.value.height), [mouseX, mouseY, 1]);
    let [x, y] = m3.transformVector(m3.inverse(getCameraMatrix(), 3), [clipX, clipY, 1])

    let zoomScale = 1;
    if (event.deltaY < 0) {
        zoomScale = 1.1 
    }
    else if (event.deltaY > 0){
        zoomScale = 0.9
    }
    scaleX *= zoomScale;
    scaleX = Math.max(0, scaleX);
    scaleY *= zoomScale;
    scaleY = Math.max(0, scaleY);

    let [newX, newY] = m3.transformVector(m3.inverse(getCameraMatrix(), 3), [clipX, clipY, 1])

    translationX += newX - x;
    translationY += newY - y ;

    

    setChunks();

}



</script>

<style scoped>

#canvas {
    top: 50px;
    left: 350px;
    width: calc(100% - 350px);
    height: calc(100% - 50px);
    position: fixed;

}

#textCanvas {
    top: 50px;
    left: 350px;
    width: calc(100% - 350px);
    height: calc(100% - 50px);
    position: fixed;
    z-index: 2;
}

</style>