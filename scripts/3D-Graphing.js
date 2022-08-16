
const canvas = document.getElementById("canvas");

const gl = canvas.getContext("webgl");

let aspect = canvas.width / canvas.height;

let mousePressed = false;

//spherical coordinates of camera
let radius = 100;
let theta = 0;
let phi = 0;

let cameraPosition = [0, 0, 100];

let isovalue = 0;

let vertexPositions = [
    [0, 0, 0],
    [1, 0, 0],
    [1, 1, 0],
    [0, 1, 0],
    [0, 0, 1],
    [1, 0, 1],
    [1, 1, 1],
    [0, 1, 1],
]

let edges = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0],
    [4, 5],
    [5, 6],
    [6, 7],
    [7, 4],
    [0, 4],
    [1, 5],
    [2, 6],
    [3, 7],
]

let triangulationTable = [
    [],
    [8, 3, 0],
    [9, 0, 1],
    [8, 3, 1, 8, 1, 9],
    [10, 1, 2],
    [8, 3, 0, 1, 2,10],
    [9, 0, 2, 9, 2,10],
    [3, 2, 8, 2,10, 8, 8,10, 9],
    [11, 2, 3],
    [11, 2, 0,11, 0, 8],
    [11, 2, 3, 0, 1, 9],
    [2, 1,11, 1, 9,11,11, 9, 8],
    [10, 1, 3,10, 3,11],
    [1, 0,10, 0, 8,10,10, 8,11],
    [0, 3, 9, 3,11, 9, 9,11,10],
    [8,10, 9, 8,11,10],
    [8, 4, 7],
    [3, 0, 4, 3, 4, 7],
    [1, 9, 0, 8, 4, 7],
    [9, 4, 1, 4, 7, 1, 1, 7, 3],
    [10, 1, 2, 8, 4, 7],
    [2,10, 1, 0, 4, 7, 0, 7, 3],
    [4, 7, 8, 0, 2,10, 0,10, 9],
    [2, 7, 3, 2, 9, 7, 7, 9, 4, 2,10, 9],
    [2, 3,11, 7, 8, 4],
    [7,11, 4,11, 2, 4, 4, 2, 0],
    [3,11, 2, 4, 7, 8, 9, 0, 1],
    [2, 7,11, 2, 1, 7, 1, 4, 7, 1, 9, 4],
    [8, 4, 7,11,10, 1,11, 1, 3],
    [11, 4, 7, 1, 4,11, 1,11,10, 1, 0, 4],
    [3, 8, 0, 7,11, 4,11, 9, 4,11,10, 9],
    [7,11, 4, 4,11, 9,11,10, 9],
    [9, 5, 4],
    [3, 0, 8, 4, 9, 5],
    [5, 4, 0, 5, 0, 1],
    [4, 8, 5, 8, 3, 5, 5, 3, 1],
    [2,10, 1, 9, 5, 4],
    [0, 8, 3, 5, 4, 9,10, 1, 2],
    [10, 5, 2, 5, 4, 2, 2, 4, 0],
    [3, 4, 8, 3, 2, 4, 2, 5, 4, 2,10, 5],
    [11, 2, 3, 9, 5, 4],
    [9, 5, 4, 8,11, 2, 8, 2, 0],
    [3,11, 2, 1, 5, 4, 1, 4, 0],
    [8, 5, 4, 2, 5, 8, 2, 8,11, 2, 1, 5],
    [5, 4, 9, 1, 3,11, 1,11,10],
    [0, 9, 1, 4, 8, 5, 8,10, 5, 8,11,10],
    [3, 4, 0, 3,10, 4, 4,10, 5, 3,11,10],
    [4, 8, 5, 5, 8,10, 8,11,10],
    [9, 5, 7, 9, 7, 8],
    [0, 9, 3, 9, 5, 3, 3, 5, 7],
    [8, 0, 7, 0, 1, 7, 7, 1, 5],
    [1, 7, 3, 1, 5, 7],
    [1, 2,10, 5, 7, 8, 5, 8, 9],
    [9, 1, 0,10, 5, 2, 5, 3, 2, 5, 7, 3],
    [5, 2,10, 8, 2, 5, 8, 5, 7, 8, 0, 2],
    [10, 5, 2, 2, 5, 3, 5, 7, 3],
    [11, 2, 3, 8, 9, 5, 8, 5, 7],
    [9, 2, 0, 9, 7, 2, 2, 7,11, 9, 5, 7],
    [0, 3, 8, 2, 1,11, 1, 7,11, 1, 5, 7],
    [2, 1,11,11, 1, 7, 1, 5, 7],
    [3, 9, 1, 3, 8, 9, 7,11,10, 7,10, 5],
    [9, 1, 0,10, 7,11,10, 5, 7],
    [3, 8, 0, 7,10, 5, 7,11,10],
    [11, 5, 7,11,10, 5],
    [10, 6, 5],
    [8, 3, 0,10, 6, 5],
    [0, 1, 9, 5,10, 6],
    [10, 6, 5, 9, 8, 3, 9, 3, 1],
    [1, 2, 6, 1, 6, 5],
    [0, 8, 3, 2, 6, 5, 2, 5, 1],
    [5, 9, 6, 9, 0, 6, 6, 0, 2],
    [9, 6, 5, 3, 6, 9, 3, 9, 8, 3, 2, 6],
    [3,11, 2,10, 6, 5],
    [6, 5,10, 2, 0, 8, 2, 8,11],
    [1, 9, 0, 6, 5,10,11, 2, 3],
    [1,10, 2, 5, 9, 6, 9,11, 6, 9, 8,11],
    [11, 6, 3, 6, 5, 3, 3, 5, 1],
    [0, 5, 1, 0,11, 5, 5,11, 6, 0, 8,11],
    [0, 5, 9, 0, 3, 5, 3, 6, 5, 3,11, 6],
    [5, 9, 6, 6, 9,11, 9, 8,11],
    [10, 6, 5, 4, 7, 8],
    [5,10, 6, 7, 3, 0, 7, 0, 4],
    [5,10, 6, 0, 1, 9, 8, 4, 7],
    [4, 5, 9, 6, 7,10, 7, 1,10, 7, 3, 1],
    [7, 8, 4, 5, 1, 2, 5, 2, 6],
    [4, 1, 0, 4, 5, 1, 6, 7, 3, 6, 3, 2],
    [9, 4, 5, 8, 0, 7, 0, 6, 7, 0, 2, 6],
    [4, 5, 9, 6, 3, 2, 6, 7, 3],
    [7, 8, 4, 2, 3,11,10, 6, 5],
    [11, 6, 7,10, 2, 5, 2, 4, 5, 2, 0, 4],
    [11, 6, 7, 8, 0, 3, 1,10, 2, 9, 4, 5],
    [6, 7,11, 1,10, 2, 9, 4, 5],
    [6, 7,11, 4, 5, 8, 5, 3, 8, 5, 1, 3],
    [6, 7,11, 4, 1, 0, 4, 5, 1],
    [4, 5, 9, 3, 8, 0,11, 6, 7],
    [9, 4, 5, 7,11, 6],
    [10, 6, 4,10, 4, 9],
    [8, 3, 0, 9,10, 6, 9, 6, 4],
    [1,10, 0,10, 6, 0, 0, 6, 4],
    [8, 6, 4, 8, 1, 6, 6, 1,10, 8, 3, 1],
    [9, 1, 4, 1, 2, 4, 4, 2, 6],
    [1, 0, 9, 3, 2, 8, 2, 4, 8, 2, 6, 4],
    [2, 4, 0, 2, 6, 4],
    [3, 2, 8, 8, 2, 4, 2, 6, 4],
    [2, 3,11, 6, 4, 9, 6, 9,10],
    [0,10, 2, 0, 9,10, 4, 8,11, 4,11, 6],
    [10, 2, 1,11, 6, 3, 6, 0, 3, 6, 4, 0],
    [10, 2, 1,11, 4, 8,11, 6, 4],
    [1, 4, 9,11, 4, 1,11, 1, 3,11, 6, 4],
    [0, 9, 1, 4,11, 6, 4, 8,11],
    [11, 6, 3, 3, 6, 0, 6, 4, 0],
    [8, 6, 4, 8,11, 6],
    [6, 7,10, 7, 8,10,10, 8, 9],
    [9, 3, 0, 6, 3, 9, 6, 9,10, 6, 7, 3],
    [6, 1,10, 6, 7, 1, 7, 0, 1, 7, 8, 0],
    [6, 7,10,10, 7, 1, 7, 3, 1],
    [7, 2, 6, 7, 9, 2, 2, 9, 1, 7, 8, 9],
    [1, 0, 9, 3, 6, 7, 3, 2, 6],
    [8, 0, 7, 7, 0, 6, 0, 2, 6],
    [2, 7, 3, 2, 6, 7],
    [7,11, 6, 3, 8, 2, 8,10, 2, 8, 9,10],
    [11, 6, 7,10, 0, 9,10, 2, 0],
    [2, 1,10, 7,11, 6, 8, 0, 3],
    [1,10, 2, 6, 7,11],
    [7,11, 6, 3, 9, 1, 3, 8, 9],
    [9, 1, 0,11, 6, 7],
    [0, 3, 8,11, 6, 7],
    [11, 6, 7],
    [11, 7, 6],
    [0, 8, 3,11, 7, 6],
    [9, 0, 1,11, 7, 6],
    [7, 6,11, 3, 1, 9, 3, 9, 8],
    [1, 2,10, 6,11, 7],
    [2,10, 1, 7, 6,11, 8, 3, 0],
    [11, 7, 6,10, 9, 0,10, 0, 2],
    [7, 6,11, 3, 2, 8, 8, 2,10, 8,10, 9],
    [2, 3, 7, 2, 7, 6],
    [8, 7, 0, 7, 6, 0, 0, 6, 2],
    [1, 9, 0, 3, 7, 6, 3, 6, 2],
    [7, 6, 2, 7, 2, 9, 2, 1, 9, 7, 9, 8],
    [6,10, 7,10, 1, 7, 7, 1, 3],
    [6,10, 1, 6, 1, 7, 7, 1, 0, 7, 0, 8],
    [9, 0, 3, 6, 9, 3, 6,10, 9, 6, 3, 7],
    [6,10, 7, 7,10, 8,10, 9, 8],
    [8, 4, 6, 8, 6,11],
    [11, 3, 6, 3, 0, 6, 6, 0, 4],
    [0, 1, 9, 4, 6,11, 4,11, 8],
    [1, 9, 4,11, 1, 4,11, 3, 1,11, 4, 6],
    [10, 1, 2,11, 8, 4,11, 4, 6],
    [10, 1, 2,11, 3, 6, 6, 3, 0, 6, 0, 4],
    [0, 2,10, 0,10, 9, 4,11, 8, 4, 6,11],
    [2,11, 3, 6, 9, 4, 6,10, 9],
    [3, 8, 2, 8, 4, 2, 2, 4, 6],
    [2, 0, 4, 2, 4, 6],
    [1, 9, 0, 3, 8, 2, 2, 8, 4, 2, 4, 6],
    [9, 4, 1, 1, 4, 2, 4, 6, 2],
    [8, 4, 6, 8, 6, 1, 6,10, 1, 8, 1, 3],
    [1, 0,10,10, 0, 6, 0, 4, 6],
    [8, 0, 3, 9, 6,10, 9, 4, 6],
    [10, 4, 6,10, 9, 4],
    [9, 5, 4, 7, 6,11],
    [4, 9, 5, 3, 0, 8,11, 7, 6],
    [6,11, 7, 4, 0, 1, 4, 1, 5],
    [6,11, 7, 4, 8, 5, 5, 8, 3, 5, 3, 1],
    [6,11, 7, 1, 2,10, 9, 5, 4],
    [11, 7, 6, 8, 3, 0, 1, 2,10, 9, 5, 4],
    [11, 7, 6,10, 5, 2, 2, 5, 4, 2, 4, 0],
    [7, 4, 8, 2,11, 3,10, 5, 6],
    [4, 9, 5, 6, 2, 3, 6, 3, 7],
    [9, 5, 4, 8, 7, 0, 0, 7, 6, 0, 6, 2],
    [4, 0, 1, 4, 1, 5, 6, 3, 7, 6, 2, 3],
    [7, 4, 8, 5, 2, 1, 5, 6, 2],
    [4, 9, 5, 6,10, 7, 7,10, 1, 7, 1, 3],
    [5, 6,10, 0, 9, 1, 8, 7, 4],
    [5, 6,10, 7, 0, 3, 7, 4, 0],
    [10, 5, 6, 4, 8, 7],
    [5, 6, 9, 6,11, 9, 9,11, 8],
    [0, 9, 5, 0, 5, 3, 3, 5, 6, 3, 6,11],
    [0, 1, 5, 0, 5,11, 5, 6,11, 0,11, 8],
    [11, 3, 6, 6, 3, 5, 3, 1, 5],
    [1, 2,10, 5, 6, 9, 9, 6,11, 9,11, 8],
    [1, 0, 9, 6,10, 5,11, 3, 2],
    [6,10, 5, 2, 8, 0, 2,11, 8],
    [3, 2,11,10, 5, 6],
    [9, 5, 6, 3, 9, 6, 3, 8, 9, 3, 6, 2],
    [5, 6, 9, 9, 6, 0, 6, 2, 0],
    [0, 3, 8, 2, 5, 6, 2, 1, 5],
    [1, 6, 2, 1, 5, 6],
    [10, 5, 6, 9, 3, 8, 9, 1, 3],
    [0, 9, 1, 5, 6,10],
    [8, 0, 3,10, 5, 6],
    [10, 5, 6],
    [11, 7, 5,11, 5,10],
    [3, 0, 8, 7, 5,10, 7,10,11],
    [9, 0, 1,10,11, 7,10, 7, 5],
    [3, 1, 9, 3, 9, 8, 7,10,11, 7, 5,10],
    [2,11, 1,11, 7, 1, 1, 7, 5],
    [0, 8, 3, 2,11, 1, 1,11, 7, 1, 7, 5],
    [9, 0, 2, 9, 2, 7, 2,11, 7, 9, 7, 5],
    [11, 3, 2, 8, 5, 9, 8, 7, 5],
    [10, 2, 5, 2, 3, 5, 5, 3, 7],
    [5,10, 2, 8, 5, 2, 8, 7, 5, 8, 2, 0],
    [9, 0, 1,10, 2, 5, 5, 2, 3, 5, 3, 7],
    [1,10, 2, 5, 8, 7, 5, 9, 8],
    [1, 3, 7, 1, 7, 5],
    [8, 7, 0, 0, 7, 1, 7, 5, 1],
    [0, 3, 9, 9, 3, 5, 3, 7, 5],
    [9, 7, 5, 9, 8, 7],
    [4, 5, 8, 5,10, 8, 8,10,11],
    [3, 0, 4, 3, 4,10, 4, 5,10, 3,10,11],
    [0, 1, 9, 4, 5, 8, 8, 5,10, 8,10,11],
    [5, 9, 4, 1,11, 3, 1,10,11],
    [8, 4, 5, 2, 8, 5, 2,11, 8, 2, 5, 1],
    [3, 2,11, 1, 4, 5, 1, 0, 4],
    [9, 4, 5, 8, 2,11, 8, 0, 2],
    [11, 3, 2, 9, 4, 5],
    [3, 8, 4, 3, 4, 2, 2, 4, 5, 2, 5,10],
    [10, 2, 5, 5, 2, 4, 2, 0, 4],
    [0, 3, 8, 5, 9, 4,10, 2, 1],
    [2, 1,10, 9, 4, 5],
    [4, 5, 8, 8, 5, 3, 5, 1, 3],
    [5, 0, 4, 5, 1, 0],
    [3, 8, 0, 4, 5, 9],
    [9, 4, 5],
    [7, 4,11, 4, 9,11,11, 9,10],
    [3, 0, 8, 7, 4,11,11, 4, 9,11, 9,10],
    [11, 7, 4, 1,11, 4, 1,10,11, 1, 4, 0],
    [8, 7, 4,11, 1,10,11, 3, 1],
    [2,11, 7, 2, 7, 1, 1, 7, 4, 1, 4, 9],
    [3, 2,11, 4, 8, 7, 9, 1, 0],
    [7, 4,11,11, 4, 2, 4, 0, 2],
    [2,11, 3, 7, 4, 8],
    [2, 3, 7, 2, 7, 9, 7, 4, 9, 2, 9,10],
    [4, 8, 7, 0,10, 2, 0, 9,10],
    [2, 1,10, 0, 7, 4, 0, 3, 7],
    [10, 2, 1, 8, 7, 4],
    [9, 1, 4, 4, 1, 7, 1, 3, 7],
    [1, 0, 9, 8, 7, 4],
    [3, 4, 0, 3, 7, 4],
    [8, 7, 4],
    [8, 9,10, 8,10,11],
    [0, 9, 3, 3, 9,11, 9,10,11],
    [1,10, 0, 0,10, 8,10,11, 8],
    [10, 3, 1,10,11, 3],
    [2,11, 1, 1,11, 9,11, 8, 9],
    [11, 3, 2, 0, 9, 1],
    [11, 0, 2,11, 8, 0],
    [11, 3, 2],
    [3, 8, 2, 2, 8,10, 8, 9,10],
    [9, 2, 0, 9,10, 2],
    [8, 0, 3, 1,10, 2],
    [10, 2, 1],
    [8, 1, 3, 8, 9, 1],
    [9, 1, 0],
    [8, 0, 3],
    []
];

let equationString = "f(x, y, z) = x * y * z - 10"
let fieldValue = math.evaluate(equationString);

/*
document.getElementById("angleTheta").oninput = function() { theta = this.value; }
document.getElementById("anglePhi").oninput = function() { phi = this.value; }
document.getElementById("radius").oninput = function() { radius = this.value; }

document.getElementById("scaleX").oninput = function() { scaleX = this.value; }
document.getElementById("scaleY").oninput = function() { scaleY = this.value; }
document.getElementById("scaleZ").oninput = function() { scaleZ = this.value; }
document.getElementById("angleX").oninput = function() { angleX = this.value; }
document.getElementById("angleY").oninput = function() { angleY = this.value; }
document.getElementById("angleZ").oninput = function() { angleZ = this.value; }
document.getElementById("translationX").oninput = function() { translationX = this.value; }
document.getElementById("translationY").oninput = function() { translationY = this.value; }
document.getElementById("translationZ").oninput = function() { translationZ = this.value; }
*/

let vertexShaderSource = document.getElementById("vertex-shader-3d").text;
let fragmentShaderSource = document.getElementById("fragment-shader-3d").text;
 
let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

let program = createProgram(gl, vertexShader, fragmentShader);

let positionAttributeLocation = gl.getAttribLocation(program, "a_position");
let colorAttributeLocation = gl.getAttribLocation(program, "a_color");
let normalAttributeLocation = gl.getAttribLocation(program, "a_normal")

let matrixLocation = gl.getUniformLocation(program, "u_matrix");

let reverseLightDirectionLocation = gl.getUniformLocation(program, "u_reverseLightDirection")

let start = performance.now();

let marchingCubes = marchingCubes3D(-20, 20, -20, 20, -20, 20, 1);

console.log(performance.now() - start);

//positions
let positionBuffer = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(marchingCubes.trianglePositions), gl.STATIC_DRAW);

//colors
let colorBuffer = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

gl.bufferData(gl.ARRAY_BUFFER, new Uint8Array(marchingCubes.colors), gl.STATIC_DRAW);

//normals
let normalBuffer = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);

gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(marchingCubes.normals), gl.STATIC_DRAW);

function setEquation() {
    equationString = document.getElementById("equation").value;
    fieldValue = math.evaluate("f(x, y, z) = " + equationString);

    console.log(equationString);
    let start = performance.now();
    marchingCubes = marchingCubes3D(-20, 20, -20, 20, -20, 20, 1);
    console.log(performance.now() - start);

    //positions
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(marchingCubes.trianglePositions), gl.STATIC_DRAW);

    //colors
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Uint8Array(marchingCubes.colors), gl.STATIC_DRAW);

    //normals
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(marchingCubes.normals), gl.STATIC_DRAW);
}

//returns normal vector to triangle given 3 vector corners
function triangleNormal(a, b, c) {
    edgeAB = subtract(b, a);
    edgeBC = subtract(c, a);

    return normalizeVector(cross(edgeBC, edgeAB));
}

function radiansToDegrees(r) {
    return r * 180 / Math.PI;
}

function degreesToRadians(d) {
    return d * Math.PI / 180;
}

/*function fieldValue(x, y, z) {
    //return z * z + (10 - Math.sqrt(x * x + y * y)) * (10 - Math.sqrt(x * x + y * y)) - 25; //torus
    //return z * z - x * x - y * y; //hyperboloid
    //return z - Math.sin(x) - Math.cos(y);
    //return z - Math.sin(0.05 * (x * x + y * y)) //sin ripple
    //return z - 1/(0.1 * (x * x + y * y));
    //return x * y * z - 10;

    //return Math.sin(z) + Math.sin(y) + Math.sin(x);
    //return z - Math.pow(x, y);
    //return Math.pow(x, 100) + Math.pow(y, 100) + Math.pow(z, 100) - 10;
    let scope = {
        x: x,
        y: y,
        z: z
    }
    return code.evaluate(scope)
}*/

/*function getWorldMatrix() {
    /*transformation should be

    vector * scaling * rotation * translation

    aka [translation][rotation][scaling][vector]

    therefore this is order of multiplication
    
    let worldMatrix = multiply(identity(), translation(translationX, translationY, translationZ));
    worldMatrix = multiply(worldMatrix, rotationX(angleX));
    worldMatrix = multiply(worldMatrix, rotationY(angleY));
    worldMatrix = multiply(worldMatrix, rotationZ(angleZ));
    worldMatrix = multiply(worldMatrix, scaling(scaleX, scaleY, scaleZ));

    return worldMatrix;
}*/

function getCameraPosition() {
    return [radius * Math.cos(theta) * Math.cos(phi), radius * Math.sin(theta), radius * Math.cos(theta) * Math.sin(phi)]
}

function getCameraMatrix() {
    let projectionMatrix = perspective(Math.PI / 3, aspect, 1, 2000);

    cameraPosition = getCameraPosition();

    let cameraMatrix = lookAt(cameraPosition, [0, 0, 0])

    return multiply(projectionMatrix, inverse(cameraMatrix, 4));
}

function createShader(gl, type, source) {
    let shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

    if (success) {
        return shader;
    }

    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}

function createProgram(gl, vertexShader, fragmentShader) {
    let program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    let success = gl.getProgramParameter(program, gl.LINK_STATUS);

    if (success) {
        return program;
    }
   
    console.error(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}



function draw() {
    gl.viewport(0, 0, canvas.width, canvas.height);

    gl.clearColor(1.0, 1.0, 1.0, 1.0);  // Clear to black, fully opaque
    gl.clearDepth(1.0);                 // Clear everything
    //gl.enable(gl.DEPTH_TEST);           // Enable depth testing
    gl.depthFunc(gl.LEQUAL);            // Near things obscure far things
  
    // Clear the canvas before we start drawing on it.
  
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  
    //gl.enable(gl.CULL_FACE);

    gl.enable(gl.DEPTH_TEST);

    gl.useProgram(program);

    //position

    gl.enableVertexAttribArray(positionAttributeLocation);

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    let size = 3;          // 3 components per iteration
    let type = gl.FLOAT;   // the data is 32bit floats
    let normalize = false; // don't normalize the data
    let stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    let offset = 0;        // start at the beginning of the buffer

    gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset)

    //color

    gl.enableVertexAttribArray(colorAttributeLocation);

    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

    // Tell the attribute how to get data out of colorBuffer (ARRAY_BUFFER)
    size = 3;          // 2 components per iteration
    type = gl.UNSIGNED_BYTE;   // the data is 32bit floats
    normalize = true; // 0 - 255 to 0 - 1
    stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    offset = 0;        // start at the beginning of the buffer
    

    gl.vertexAttribPointer(colorAttributeLocation, size, type, normalize, stride, offset)

    //normals

    gl.enableVertexAttribArray(normalAttributeLocation);

    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);

    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    size = 3;          // 3 components per iteration
    type = gl.FLOAT;   // the data is 32bit floats
    normalize = false; // don't normalize the data
    stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    offset = 0;        // start at the beginning of the buffer
    
    gl.vertexAttribPointer(normalAttributeLocation, size, type, normalize, stride, offset)

    gl.uniformMatrix4fv(matrixLocation, false, getCameraMatrix())
    gl.uniform3fv(reverseLightDirectionLocation, normalizeVector([-cameraPosition[0], -cameraPosition[1], -cameraPosition[2]]));

    let primitiveType = gl.TRIANGLES;
    let count = marchingCubes.trianglePositions.length / 3;
    gl.drawArrays(primitiveType, offset, count);

    requestAnimationFrame(draw);
}

canvas.addEventListener("wheel", function(event) {
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

    let start = performance.now();
    marchingCubes = marchingCubes3D(-radius, radius, -radius, radius, -radius, radius, radius/10);
    console.log(performance.now() - start);

    //positions
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(marchingCubes.trianglePositions), gl.STATIC_DRAW);

    //colors
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Uint8Array(marchingCubes.colors), gl.STATIC_DRAW);

    //normals
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(marchingCubes.normals), gl.STATIC_DRAW);

});

canvas.addEventListener("mousedown", function(event) {
    mousePressed = true;
});

window.addEventListener("mouseup", function(event) {
    mousePressed = false;
});

canvas.addEventListener("mousemove", function(event) {
    if (mousePressed) {
        event.preventDefault();

        phi += 2 * (event.movementX / canvas.width);
        theta += 2 * (event.movementY / canvas.height);
    }
});

requestAnimationFrame(draw);