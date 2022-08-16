
const canvas = document.getElementById("canvas");
console.log(canvas)
const gl = canvas.getContext("webgl");

let mousePressed = false;

let scaleX = 0.1;
let scaleY = 0.1;

let angle = 0;

let translationX = 0;
let translationY = 0;

let isovalue = 0;

let equationString = "f(x, y) = x * y - 10"
let fieldValue = math.evaluate(equationString);

let vertexShaderSource = document.getElementById("vertex-shader-2d").text;
let fragmentShaderSource = document.getElementById("fragment-shader-2d").text;
 
let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

let program = createProgram(gl, vertexShader, fragmentShader);

let positionAttributeLocation = gl.getAttribLocation(program, "a_position");
let matrixLocation = gl.getUniformLocation(program, "u_matrix");

let positionBuffer = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

let positions = setChunks();

gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

function setEquation() {
    equationString = document.getElementById("equation").value;
    fieldValue = math.evaluate("f(x, y) =" + equationString);

    console.log(equationString);
    let start = performance.now();
    positions = setChunks();
    console.log(performance.now() - start);


    // positionBuffer = gl.createBuffer();

    //gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
}

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



/*function fieldValue(x, y) {
    //return Math.cos(x * y) 
    return y - Math.sin(x)
    //return y - 3 * x * x * x - x * x + 2 * x + 1;
    let scope = {
        x: x,
        y: y
    }
    return code.evaluate(scope)
}*/


//y1 and y2 are low and high values of output
//x1 and x2 are low and high values of input
//takes input x and interpolates output
function interpolate(y1, y2, x1, x2, x) {
    //error check to prevent division by 0
    //if x1 is close to x2, input range is small so output y1
    if (Math.abs(x1 - x2) <= 0.00001) {
        return (y1);
    }
    return (y1 + (y2 - y1) * ((x - x1)/(x2 - x1)));
}

//marching squares algorithm sets the lines of function graph
//returns array of line positions 
function marchingSquares2D(startX, endX, startY, endY, squareSize) {
    let linePositions = [];

    for (let x = startX; x <= endX; x += squareSize) {
        for (let y = startY; y <= endY; y += squareSize) {
            //each 2x2 grid of values corresponds to cell
            //cell type is marked by 4 digit binary number corresponding to each of the 4 corners being > or < than isovalue i.e 0000 to 1111 or 0 to 15
            let squareType = 0;

            let bottomLeft = fieldValue(x, y);
            let bottomRight = fieldValue(x + squareSize, y);
            let topLeft = fieldValue(x, y + squareSize);
            let topRight = fieldValue(x + squareSize, y + squareSize);

            if (bottomLeft >= isovalue) {
                squareType += 1;
            }
            if (bottomRight >= isovalue) {
                squareType += 2;
            }
            if (topRight >= isovalue) {
                squareType += 4;
            }
            if (topLeft >= isovalue) {
                squareType += 8;
            }


            let bottomMiddle = [interpolate(x, x + squareSize, bottomLeft, bottomRight, isovalue), y]
            let rightMiddle = [x + squareSize, interpolate(y, y + squareSize, bottomRight, topRight, isovalue)]
            let topMiddle = [interpolate(x, x + squareSize, topLeft, topRight, isovalue), y + squareSize]
            let leftMiddle = [x, interpolate(y, y + squareSize, bottomLeft, topLeft, isovalue)]

            //add line based on which configuration of points
            switch (squareType) {
                case 0: //none
                    break;

                case 1: 
                    linePositions.push(...leftMiddle, ...bottomMiddle);
                    break;
                case 2: 
                    linePositions.push(...bottomMiddle, ...rightMiddle);
                    break;
                case 4:
                    linePositions.push(...rightMiddle, ...topMiddle);
                    break;
                case 8:
                    linePositions.push(...topMiddle, ...leftMiddle);
                    break;
    
                case 3:
                    linePositions.push(...leftMiddle, ...rightMiddle);
                    break;
                case 6:                
                    linePositions.push(...bottomMiddle, ...topMiddle);
                    break;
                case 9:
                    linePositions.push(...topMiddle, ...bottomMiddle);
                    break;
                case 12:
                    linePositions.push(...rightMiddle, ...leftMiddle);
                    break;
    
                case 5:
                    linePositions.push(...leftMiddle, ...topMiddle);
                    linePositions.push(...rightMiddle, ...bottomMiddle);
                    break;
                case 10:
                    linePositions.push(...topMiddle, ...rightMiddle);
                    linePositions.push(...bottomMiddle, ...leftMiddle);
                    break;
    
                case 7:
                    linePositions.push(...leftMiddle, ...topMiddle);
                    break;
                case 11:
                    linePositions.push(...topMiddle, ...rightMiddle);
                    break;
                case 13:
                    linePositions.push(...rightMiddle, ...bottomMiddle);
                    break;
                case 14:
                    linePositions.push(...bottomMiddle, ...leftMiddle);
                    break;
    
                case 15:
                    break;
            }
        }

    }
    return linePositions;
}

function setChunks() {
    let start = performance.now()
    let max = 1/scaleX
    let meshPositions = marchingSquares2D(-max, max, -max, max, max/50)

    //meshPositions.push(...marchingSquares2D(10, 30, -10, 10, 0.05))

    meshPositions.push(-max, 0, max, 0);
    meshPositions.push(0, -max, 0, max);
    console.log(performance.now() - start);

    return meshPositions;
}

function draw() {


    gl.viewport(0, 0, canvas.width, canvas.height);

    // Clear the canvas
    gl.clearColor(1, 1, 1, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.useProgram(program);

    gl.enableVertexAttribArray(positionAttributeLocation);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    let size = 2;          // 2 components per iteration
    let type = gl.FLOAT;   // the data is 32bit floats
    let normalize = false; // don't normalize the data
    let stride = 8;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    let offset = 0;        // start at the beginning of the buffer

    gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset)

    gl.uniformMatrix3fv(matrixLocation, false, getCameraMatrix())

    let primitiveType = gl.LINES;
    let count = positions.length / 2;
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

    positions = setChunks();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);


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