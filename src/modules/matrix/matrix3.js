//translation matrix translates vector tx units in x direction and ty units in y direction
export function translation(tx, ty) {
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
export function rotation(angle) {
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
export function scaling(sx, sy) {
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

export function projection(width, height) {
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
export function identity() {
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
export function multiply(m1, m2) {
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
export function transformVector(m, v) {
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

//returns cofactor matrix, i.e matrix with one row and column and removed
export function cofactor(matrix, row, column, size) {
    let cofactorMatrix = []
    for (let rowCheck = 0; rowCheck < size; rowCheck++) {
        for (let columnCheck = 0; columnCheck < size; columnCheck++) {
            if (rowCheck != row && columnCheck != column) {
                cofactorMatrix.push(matrix[rowCheck * size + columnCheck]);
            }
        }
    }

    return cofactorMatrix
}

//finds inverse of using adjugate / determinant
export function inverse(matrix, size) {
    let minorMatrix = [];
    let matrixDeterminant = determinant(matrix, size);

    for (let row = 0; row < size; row++) {
        for (let column = 0; column < size; column++) {
            let sign = (-1) ** (column + size * row);
            let cofactorMatrix = cofactor(matrix, row, column, size);
            minorMatrix[row + column * size] = sign * determinant(cofactorMatrix, size - 1) / matrixDeterminant //transposes matrix, swap columns with rows, sign * adjugate / determinant
        }
        
    }
    return minorMatrix;
}

//return determinant of square matrix
export function determinant(matrix, size) {
    if (size == 2) {
        return (matrix[0] * matrix[3] - matrix[1] * matrix[2]);
    }
    else {
        let determinantValue = 0;
        for (let column = 0; column < size; column++) {
            let sign = (-1) ** column;
            determinantValue += sign * matrix[column + size * 0] * determinant(cofactor(matrix, 0, column, size), size - 1);

        }
        return determinantValue;

    }
}
