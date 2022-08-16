<template>
    <canvas id = "canvas" ref = "canvas" @wheel = "scroll">

    </canvas>
</template>

<script setup>
/* eslint-disable */

import { ref, reactive, onMounted } from "vue";
import marchingCubes3d from "@/modules/graphing/marchingCubes3d.js";
import { createShader, createProgram } from "@/modules/graphing/webGLBoilerplate.js";
import * as m4 from  "@/modules/matrix/matrix4.js";

const canvas = ref(null);

let gl = null;

let mousePressed = ref(false);

//spherical coordinates of camera
let radius = 100;
let theta = 0;
let phi = 0;

let aspect = 0;

let cameraPosition = [0, 0, 100];

let marchingCubes = {};

let programInfo = {};

onMounted(async () => {
    canvas.value.width = canvas.value.clientWidth;
    canvas.value.height = canvas.value.clientHeight;

    aspect = canvas.value.width / canvas.value.height;

    canvas.value.addEventListener("mousedown", function(event) {
        mousePressed = true;
    });

    window.addEventListener("mouseup", function(event) {
        mousePressed = false;
    });

    canvas.value.addEventListener("mousemove", function(event) {
        if (mousePressed) {
            event.preventDefault();

            phi += 2 * (event.movementX / canvas.value.width);
            theta += 2 * (event.movementY / canvas.value.height);
        }
    });

    gl = canvas.value.getContext("webgl");

    let vertexShaderSource = await fetch("shaders/graph3d.vert").then(response => response.text());
    let fragmentShaderSource = await fetch("shaders/graph3d.frag").then(response => response.text());

    let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    let shaderProgram = createProgram(gl, vertexShader, fragmentShader);

    programInfo = {
        program: shaderProgram,
        attributes: {
            positionAttribute: gl.getAttribLocation(shaderProgram, "a_position"),
            colorAttribute: gl.getAttribLocation(shaderProgram, "a_color"),
            normalAttribute: gl.getAttribLocation(shaderProgram, "a_normal"),
        },
        uniforms: {
            matrix: gl.getUniformLocation(shaderProgram, "u_matrix"),
            reverseLightDirection: gl.getUniformLocation(shaderProgram, "u_reverseLightDirection"),
        },
        buffers: {
            positionBuffer: gl.createBuffer(),
            colorBuffer: gl.createBuffer(),
            normalBuffer: gl.createBuffer(),
        }
    }

    setChunks();

    requestAnimationFrame(draw);

})

function getCameraPosition() {
    return [radius * Math.cos(theta) * Math.cos(phi), radius * Math.sin(theta), radius * Math.cos(theta) * Math.sin(phi)]
}

function getCameraMatrix() {
    let projectionMatrix = m4.perspective(Math.PI / 3, aspect, 1, 2000);

    cameraPosition = getCameraPosition();

    let cameraMatrix = m4.lookAt(cameraPosition, [0, 0, 0])

    return m4.multiply(projectionMatrix, m4.inverse(cameraMatrix, 4));
}

function fieldValue(x, y, z) {
    return x * y * z - 10;
}

function setChunks() {
    let start = performance.now();
    marchingCubes = marchingCubes3d(-radius, radius, -radius, radius, -radius, radius, radius/10, [0, 255, 0], fieldValue);
    console.log(performance.now() - start);

    console.log(marchingCubes)

    //positions
    gl.bindBuffer(gl.ARRAY_BUFFER, programInfo.buffers.positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(marchingCubes.trianglePositions), gl.STATIC_DRAW);

    //colors
    gl.bindBuffer(gl.ARRAY_BUFFER, programInfo.buffers.colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Uint8Array(marchingCubes.colors), gl.STATIC_DRAW);

    //normals
    gl.bindBuffer(gl.ARRAY_BUFFER, programInfo.buffers.normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(marchingCubes.normals), gl.STATIC_DRAW);

}

function draw() {
    gl.viewport(0, 0, canvas.value.width, canvas.value.height);

    gl.clearColor(1.0, 1.0, 1.0, 1.0);  // Clear to black, fully opaque
    gl.clearDepth(1.0);                 // Clear everything
    //gl.enable(gl.DEPTH_TEST);           // Enable depth testing
    gl.depthFunc(gl.LEQUAL);            // Near things obscure far things
  
    // Clear the canvas before we start drawing on it.
  
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  
    //gl.enable(gl.CULL_FACE);

    gl.enable(gl.DEPTH_TEST);

    gl.useProgram(programInfo.program);

    //positions
    gl.enableVertexAttribArray(programInfo.attributes.positionAttribute);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, programInfo.buffers.positionBuffer);

    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    let size = 3;          // 3 components per iteration
    let type = gl.FLOAT;   // the data is 32bit floats
    let normalize = false; // don't normalize the data
    let stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    let offset = 0;        // start at the beginning of the buffer

    gl.vertexAttribPointer(programInfo.attributes.positionAttribute, size, type, normalize, stride, offset)

    //colors
    gl.enableVertexAttribArray(programInfo.attributes.colorAttribute);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, programInfo.buffers.colorBuffer);

    type = gl.UNSIGNED_BYTE;
    normalize = true;

    gl.vertexAttribPointer(programInfo.attributes.colorAttribute, size, type, normalize, stride, offset)

    //normals
    gl.enableVertexAttribArray(programInfo.attributes.normalAttribute);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, programInfo.buffers.normalBuffer);

    type = gl.FLOAT;

    gl.vertexAttribPointer(programInfo.attributes.normalAttribute, size, type, normalize, stride, offset)

    gl.uniformMatrix4fv(programInfo.uniforms.matrix, false, getCameraMatrix())
    gl.uniform3fv(programInfo.uniforms.reverseLightDirection, m4.normalizeVector([-cameraPosition[0], -cameraPosition[1], -cameraPosition[2]]))

    let primitiveType = gl.TRIANGLES;
    let count = marchingCubes.trianglePositions.length / 3;
    gl.drawArrays(primitiveType, offset, count);

    requestAnimationFrame(draw);

}
  




//listen for events

function scroll(event) {
    event.preventDefault();

    let zoomScale = 1;
    if (event.deltaY > 0) {
        zoomScale = 1.1 
    }
    else if (event.deltaY < 0){
        zoomScale = 0.9
    }
    radius *= zoomScale;
    radius = Math.max(0, radius);

    setChunks()

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

</style>