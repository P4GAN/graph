//lookup tables for vertex positions, edges, and triangulation configurations for marching cubes algorithm
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

//cross product of two 3d vectors
function cross(a, b) {
    return [a[1] * b[2] - a[2] * b[1],
            a[2] * b[0] - a[0] * b[2],
            a[0] * b[1] - a[1] * b[0]];
}

//returns normal vector of v, unit vector in direction v
function normalizeVector(v) {
    let length = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);

    if (length > 0.001) {
        return [v[0] / length, v[1] / length, v[2] / length];
    }
    else {
        return [0, 0, 0];
    }
}

//returns difference of 3D vectors b - a
function subtract(a, b) {
    return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

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

//gets edge AB of cube with x, y, z position and returns interpolated middle vertex based on fieldValues
function edgeMiddleVertex(edge, x, y, z, cubeSize, fieldValue) {
    let isovalue = 0;
    let valueA = fieldValue(vertexPositions[edge[0]][0] * cubeSize + x, vertexPositions[edge[0]][1] * cubeSize + y, vertexPositions[edge[0]][2] * cubeSize + z);
    let valueB = fieldValue(vertexPositions[edge[1]][0] * cubeSize + x, vertexPositions[edge[1]][1] * cubeSize + y, vertexPositions[edge[1]][2] * cubeSize + z);

    return [x + cubeSize * interpolate(vertexPositions[edge[0]][0], vertexPositions[edge[1]][0], valueA, valueB, isovalue), 
            y + cubeSize * interpolate(vertexPositions[edge[0]][1], vertexPositions[edge[1]][1], valueA, valueB, isovalue), 
            z + cubeSize * interpolate(vertexPositions[edge[0]][2], vertexPositions[edge[1]][2], valueA, valueB, isovalue)];
}

//returns normal vector to triangle given 3 vector corners
function triangleNormal(a, b, c) {
    let edgeAB = subtract(b, a);
    let edgeBC = subtract(c, a);

    return normalizeVector(cross(edgeBC, edgeAB));
}

//Marching cubes creates a triangular mesh from a scalar field, generating an isosurface at the boundary between 
//where the field is positive and negative. Here the field is given by a user defined function.
//Takes input of starting and ending coordinates, cube size (resolution), color and a user defined function
//Returns an object containing trianglePositions, colors, and normals
export default function marchingCubes3d(startX, endX, startY, endY, startZ, endZ, cubeSize, color, fieldValue) {
    let trianglePositions = []; 
    let colors = [];
    let normals = [];

    //for each cube in the region
    for (let x = startX; x < endX - cubeSize; x += cubeSize) {
        for (let y = startY; y < endY - cubeSize; y += cubeSize) {
            for (let z = startZ; z < endZ - cubeSize; z += cubeSize) {
                /* The cube vertex and edge indices for base rotation:
                 *
                 *      v7------e6------v6
                 *     / |              /|
                 *   e11 |            e10|
                 *   /   e7           /  |
                 *  /    |           /   e5
                 *  v3------e2-------v2  |
                 *  |    |           |   |
                 *  |   v4------e4---|---v5
                 *  e3  /           e1   /
                 *  |  e8            |  e9
                 *  | /              | /    y z
                 *  |/               |/     |/
                 *  v0------e0-------v1     O--x
                 */

                //assign a 8 bit number based on which of the 8 vertices in the cube have field values greater than 0
                let cubeType = 0;

                for (let i = 0; i < 8; i++) {
                    let vertex = [vertexPositions[i][0] * cubeSize + x, vertexPositions[i][1] * cubeSize + y, vertexPositions[i][2] * cubeSize + z];
                    if (fieldValue(vertex[0], vertex[1], vertex[2]) >= 0) {
                        cubeType += Math.pow(2, i);
                    }
                }

                //8 bit number is used to find triangulation for cube configuration, which is used to find edges
                //Edges are then used to find points, which are then triangulated, with colors and normals added
                let trianglePoints = triangulationTable[cubeType];
                for (let triangleIndex = 0; triangleIndex < trianglePoints.length; triangleIndex += 3) {
                    let a = edgeMiddleVertex(edges[trianglePoints[triangleIndex]], x, y, z, cubeSize, fieldValue);
                    let b = edgeMiddleVertex(edges[trianglePoints[triangleIndex + 1]], x, y, z, cubeSize, fieldValue);
                    let c = edgeMiddleVertex(edges[trianglePoints[triangleIndex + 2]], x, y, z, cubeSize, fieldValue);
                    trianglePositions.push(...a, ...b, ...c);

                    colors.push(...color, ...color, ...color);

                    let normalVector = triangleNormal(a, b, c)
                    normals.push(...normalVector, ...normalVector, ...normalVector)
                }

            }
        }
    }

    //returns object with positions, colors and normals
    let marchingCubesResult = { "trianglePositions": trianglePositions, "colors": colors, "normals": normals }
    return marchingCubesResult;
}