<template>
    <canvas id = "canvas" ref = "canvas" @wheel = "scroll">

    </canvas>
</template>

<script setup>
/* eslint-disable */

//importing from vue and from local modules
import { ref, reactive, onMounted } from "vue";
import marchingCubes3d from "@/modules/graphing/marchingCubes3d.js";
import { createShader, createProgram } from "@/modules/graphing/webGLBoilerplate.js";
import * as m4 from  "@/modules/matrix/matrix4.js";
import { equationList } from "../stores/equations.js";

//initialising variables
const canvas = ref(null);

let gl = null;

let mousePressed = ref(false);

//spherical coordinates of camera
let radius = 100;
let epsilon = 0.01;
let theta = 0;
let phi = epsilon;

let aspect = 0;

let cameraPosition = [0, 0, 100];

let marchingCubes = {
    "trianglePositions": [],
    "colors": [],
    "normals": [],
};

let programInfo = {};

defineExpose({setChunks})

//when component is added to the page
onMounted(async () => {
    canvas.value.width = canvas.value.clientWidth;
    canvas.value.height = canvas.value.clientHeight;

    aspect = canvas.value.width / canvas.value.height;

    //handle mouse click, move, and window rezise event
    canvas.value.addEventListener("mousedown", function(event) {
        mousePressed = true;
    });

    window.addEventListener("mouseup", function(event) {
        mousePressed = false;
    });

    window.addEventListener("resize", function(event) {
        canvas.value.width = canvas.value.clientWidth;
        canvas.value.height = canvas.value.clientHeight;
        aspect = canvas.value.width / canvas.value.height;
    });

    //when mouse moved, change spherical coordinates, while clamping to specific range
    canvas.value.addEventListener("mousemove", function(event) {
        if (mousePressed) {
            event.preventDefault();

            theta -= 2 * (event.movementX / canvas.value.width);
            phi -= 2 * (event.movementY / canvas.value.height);

            phi = Math.min(phi, Math.PI - epsilon);
            phi = Math.max(phi, epsilon);

        }
    });

    gl = canvas.value.getContext("webgl");

    //fetch shaders and create webgl program
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

//converts spherical coordinates to cartesian coordinates
function getCameraPosition() {
    return [radius * Math.sin(phi) * Math.cos(theta), radius * Math.sin(phi) * Math.sin(theta), radius * Math.cos(phi)]
}

//gets transformation matrix with camera centered at origin
function getCameraMatrix() {
    let projectionMatrix = m4.perspective(Math.PI / 3, aspect, 1, 2000);

    cameraPosition = getCameraPosition();

    let cameraMatrix = m4.lookAt(cameraPosition, [0, 0, 0])

    return m4.multiply(projectionMatrix, m4.inverse(cameraMatrix, 4));
}

function setChunks() {
    let start = performance.now();

    for (let i = 0; i < equationList.value.length; i++) {
        let graphColor = equationList.value[i].color;
        let graphFunction = equationList.value[i].fieldValue;
        let marchingCubesResult = marchingCubes3d(-radius/2, radius/2, -radius/2, radius/2, -radius/2, radius/2, radius/10, graphColor, graphFunction);
        marchingCubes.trianglePositions = marchingCubes.trianglePositions.concat(marchingCubesResult.trianglePositions);
        marchingCubes.colors = marchingCubes.colors.concat(marchingCubesResult.colors);
        marchingCubes.normals = marchingCubes.normals.concat(marchingCubesResult.normals);
    }

    console.log(marchingCubes)
    console.log(performance.now() - start);

}

function draw() {
    gl.viewport(0, 0, canvas.value.width, canvas.value.height);

    gl.clearColor(1.0, 1.0, 1.0, 1.0);  // Clear to white, fully opaque
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
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(marchingCubes.trianglePositions), gl.STATIC_DRAW);

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
    gl.bufferData(gl.ARRAY_BUFFER, new Uint8Array(marchingCubes.colors), gl.STATIC_DRAW);

    size = 4;
    type = gl.UNSIGNED_BYTE;
    normalize = true;

    gl.vertexAttribPointer(programInfo.attributes.colorAttribute, size, type, normalize, stride, offset)

    //normals
    gl.enableVertexAttribArray(programInfo.attributes.normalAttribute);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, programInfo.buffers.normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(marchingCubes.normals), gl.STATIC_DRAW);

    size = 3;
    type = gl.FLOAT;
    normalize = false;

    gl.vertexAttribPointer(programInfo.attributes.normalAttribute, size, type, normalize, stride, offset)

    gl.uniformMatrix4fv(programInfo.uniforms.matrix, false, getCameraMatrix())
    gl.uniform3fv(programInfo.uniforms.reverseLightDirection, m4.normalizeVector([-cameraPosition[0], -cameraPosition[1], -cameraPosition[2]]))

    let primitiveType = gl.TRIANGLES;
    let count = marchingCubes.trianglePositions.length / 3;
    gl.drawArrays(primitiveType, offset, count);


    //Drawing axes
    gl.bindBuffer(gl.ARRAY_BUFFER, programInfo.buffers.positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-radius, 0, 0, radius, 0, 0, 0, -radius, 0, 0, radius, 0, 0, 0, -radius, 0, 0, radius]), gl.STATIC_DRAW);

    gl.vertexAttribPointer(programInfo.attributes.positionAttribute, size, type, normalize, stride, offset)

    gl.bindBuffer(gl.ARRAY_BUFFER, programInfo.buffers.colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Uint8Array([0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255]), gl.STATIC_DRAW);

    size = 4;
    type = gl.UNSIGNED_BYTE;
    normalize = true;
    
    gl.vertexAttribPointer(programInfo.attributes.colorAttribute, size, type, normalize, stride, offset)

    gl.bindBuffer(gl.ARRAY_BUFFER, programInfo.buffers.normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), gl.STATIC_DRAW);

    size = 3;
    type = gl.FLOAT;
    normalize = false;
    
    gl.vertexAttribPointer(programInfo.attributes.normalAttribute, size, type, normalize, stride, offset)

    primitiveType = gl.LINES;
    count = 6;
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