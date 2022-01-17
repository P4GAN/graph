//translation matrix translates vector tx units in x direction and ty units in y direction
function translation(tx, ty) {
    return [
        1, 0, 0,
        0, 1, 0,
        tx, ty, 1,
    ];

    /*
    Explanation
    matrix.translation(tx, ty) * [x, y, 1] 
    =  [x * 1 + y * 0 + tx * 1, 
        x * 0 + y * 1 + ty * 1, 
        x * 0 + y * 0 + 1 * 1]

    = [x + tx, y + ty, 1]
    */
}

//rotation matrix rotates vector angle radians
function rotation(angle) {
    return [
        Math.cos(angle), -Math.sin(angle), 0,
        Math.sin(angle), Math.cos(angle), 0,
        0, 0, 1,
    ];

    /*
    Explanation
    let x = r * cos(b), y = r * sin(b)
    rotated vector = [r * cos(a + b), r * sin(a + b), 1]
    rotated vector = [r * cos(a)cos(b) - r * sin(a)sin(b), r * sin(a)cos(b) + r * cos(a)sin(b), 1]
    rotated vector = [x * cos(a) - y * sin(a), x * sin(a) + y * cos(a), 1]

    matrix.rotation(a) * [x, y, 1]
    =  [x * cos(a) - y * sin(a) + 1 * 0,
        x * sin(a) + y * cos(a) + 1 * 0,
        x * 0 + y * 0 + 1 * 1]
    =  [x * cos(a) - y * sin(a), x * sin(a) + y * cos(a), 1]
    = rotated vector

    */
}

//scaling matrix scales vector sx units in x direction, sy units in y direction
function scaling(sx, sy) {
    return [
        sx, 0, 0,
        0, sy, 0,
        0, 0, 1,
    ];

    /*
    Explanation
    matrix.scaling(sx, sy) * [x, y, 1] 
    =  [x * sx + y * 0 + 0 * 1, 
        x * 0 + y * sy + 0 * 1, 
        x * 0 + y * 0 + 1 * 1]

    = [x * sx, y * sy, 1]
    */
}

function projection(width, height) {
    return [
        2 / width, 0, 0,
        0, 2 / height, 0,
        -1, -1, 1,
    ]
    /*
    Explanation
    matrix.projection(w, h) * [x, y, 1] 
    =  [2 * x / w + y * 0 + -1 * 1, 
        x * 0 + 2 * y / h + -1 * 1, 
        x * 0 + y * 0 + 1 * 1]

    = [2 * x / w - 1, 2 * y / h - 1, 1]
    converts [0, w], [0, h] to screen coords of [-1, 1]
    */
}

//returns identity matrix
function identity() {
    return [
        1, 0, 0,
        0, 1, 0,
        0, 0, 1,
    ]
    /*
    Explanation
    matrix.identity() * [x, y, 1] 
    =  [x * 1 + y * 0 + 0 * 1, 
        x * 0 + y * 1 + 0 * 1, 
        x * 0 + y * 0 + 1 * 1]

    = [x, y, 1]
    returns same matrix
    */
}

//multiplies two 3x3 matrices
function multiply(m1, m2) {
    let outputMatrix = []
    for (let row = 0; row < 3; row++) {
        for (let column = 0; column < 3; column ++) {
            let value = 0
            for (let j = 0; j < 3; j++) {
                //for each value in matrix
                //dot product of row and column
                value += m1[column + 3 * j] * m2[3 * row + j]
            }
            outputMatrix.push(value);
        }
    }
    return outputMatrix;
}

//multiplies matrix and vector and returns vector
function transformVector(m, v) {
    let outputVector = []
    for (let i = 0; i < v.length; i++) {
        let value = 0;
        for (let j = 0; j < v.length; j++) {
            value += v[j] * m[i + j * v.length];
        }
        outputVector.push(value);
    }
    return outputVector;
}

//returns 2x2 matrix representing cofactor of 3x3 matrix after row and column are removed
function cofactor(m, row, column) {
    let cofactor = []
    for (let rowCheck = 0; rowCheck < 3; rowCheck++) {
        for (let columnCheck = 0; columnCheck < 3; columnCheck++) {
            if (rowCheck != row && columnCheck != column) {
                cofactor.push(m[rowCheck * 3 + columnCheck]);
            }
        }
    }
    sign = (-1) ** (row * 3 + column)

    return sign * (cofactor[0] * cofactor[3] - cofactor[1] * cofactor[2]);
}

//finds inverse of 3x3 matrix using matrix of cofactors
function inverse(m) {
    let minorMatrix = []
    let determinant = 0;
    //loop through first row to determine determinant
    //determinant = a * cofactorA + b * cofactorB + c * cofactorC
    for (let i = 0; i < 3; i++) {
        determinant += cofactor(m, 0, i) * m[i];
    }
    for (let row = 0; row < 3; row++) {
        for (let column = 0; column < 3; column++) {
            let cofactorValue = cofactor(m, row, column);
            minorMatrix[row + column * 3] = cofactorValue / determinant //transposes matrix, swap columns with rows
        }
        
    }
    return minorMatrix;
}

function determinant(m) {
    let determinant = 0;
    for (let i = 0; i < 3; i++) {
        determinant += cofactor(m, 0, i) * m[i];
    }
    return determinant;
}
