
const canvas = document.getElementById("canvas");

const gl = canvas.getContext("webgl");

let mousePressed = false;

let scaleX = 0.5;
let scaleY = 0.5;

let angle = 0;

let translationX = 0;
let translationY = 0;

let vertexShaderSource = document.getElementById("vertex-shader-2d").text;
let fragmentShaderSource = document.getElementById("fragment-shader-2d").text;
 
let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

let program = createProgram(gl, vertexShader, fragmentShader);

let positionAttributeLocation = gl.getAttribLocation(program, "a_position");
let matrixLocation = gl.getUniformLocation(program, "u_matrix");

let positionBuffer = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

// three 2d points
let positions = [
    /*0.0, 0.0,
    0.0, 5.0,
    5.0, 0,*/

    -10, -10,
    -10, 10,
    10, -10,
    -10, 10,
    10, 10,
    10, -10,

];
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);


function getCameraMatrix() {
    /*transformation should be

    vector * translation * scaling * rotation * projection

    aka [projection][rotation][scaling][translation][vector]

    therefore this is order of multiplication
    */
    let cameraMatrix = multiply(identity(), rotation(angle));
    cameraMatrix = multiply(cameraMatrix, scaling(scaleX, scaleY));
    cameraMatrix = multiply(cameraMatrix, translation(translationX, translationY));
    return cameraMatrix
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

    // Clear the canvas
    gl.clearColor(1, 1, 1, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.useProgram(program);

    gl.enableVertexAttribArray(positionAttributeLocation);
    
    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    let size = 2;          // 2 components per iteration
    let type = gl.FLOAT;   // the data is 32bit floats
    let normalize = false; // don't normalize the data
    let stride = 8;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    let offset = 0;        // start at the beginning of the buffer

    gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset)

    gl.uniformMatrix3fv(matrixLocation, false, getCameraMatrix())

    let primitiveType = gl.TRIANGLES;
    let count = 6;
    gl.drawArrays(primitiveType, offset, count);

    requestAnimationFrame(draw);
}

canvas.addEventListener("wheel", function(event) {
    event.preventDefault();

    let rect = canvas.getBoundingClientRect();

    let mouseX = event.offsetX
    let mouseY = canvas.height - event.offsetY;

    let [clipX, clipY] = transformVector(projection(canvas.width, canvas.height), [mouseX, mouseY, 1]);
    let [x, y] = transformVector(inverse(getCameraMatrix(), 3), [clipX, clipY, 1])

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

    let [newX, newY] = transformVector(inverse(getCameraMatrix(), 3), [clipX, clipY, 1])

    translationX += newX - x;
    translationY += newY - y ;

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

        translationX += (event.movementX / canvas.width / scaleX);
        translationY -= (event.movementY / canvas.height / scaleY);
    }
});

requestAnimationFrame(draw);