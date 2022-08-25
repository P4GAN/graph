//translation matrix translates vector tx units in x direction, ty units in y direction, tz units in z direction
export function translation(tx, ty, tz) {
    return [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        tx, ty, tz, 1
    ];

    /*
    Explanation
    matrix.translation(tx, ty, tz) * [x, y, z, 1] 
    =  [x * 1 + y * 0 + z * 0 + tx * 1, 
        x * 0 + y * 1 + z * 0 + ty * 1, 
        x * 0 + y * 0 + z * 1 + tz * 1,
        x * 0 + y * 0 + z * 0 + 1 * 1
    ]

    = [x + tx, y + ty, z + tz, 1]
    */
}

//rotation matrix rotates vector angle radians around x axis
export function rotationX(angle) {
    return [
        1, 0, 0, 0,
        0, Math.cos(angle), Math.sin(angle), 0,
        0, -Math.sin(angle), Math.cos(angle), 0,
        0, 0, 0, 1,
    ];

    /*
    Explanation
    x remains unchanged, y and z rotate
    let x = x, y = r * cos(b), z = r * sin(b)
    rotated vector = [x, r * cos(a + b), r * sin(a + b), 1]
    rotated vector = [x, r * cos(a)cos(b) - r * sin(a)sin(b), r * sin(a)cos(b) + r * cos(a)sin(b), 1]
    rotated vector = [x, y * cos(a) + z * sin(a), y * cos(a) + z * sin(a), 1]

    matrix.rotation(a) * [x, y, z, 1]
    =  [x * 1 + y * 0 + z * 0 + 1 * 0,
        x * 0 + y * cos(a) - z * sin(a) + 1 * 0,
        x * 0 + y * sin(a) + z * cos(a) + 1 * 0,
        x * 0 + y * 0 + z * 0 + 1 * 1]
    = [x, y * cos(a) - z * sin(a), y * sin(a) + z * cos(a), 1]
    = rotated vector

    */
}

//rotation matrix rotates vector angle radians around y axis
export function rotationY(angle) {
    return [
        Math.cos(angle), 0, -Math.sin(angle), 0,
        0, 1, 0, 0,
        Math.sin(angle), 0, Math.cos(angle), 0,
        0, 0, 0, 1,

    ];

    /*
    Explanation
    y remains unchanged, x and z rotate
    let x = r * sin(b), y = y, z = r * cos(b)
    rotated vector = [r * sin(a + b), y, r * cos(a + b), 1]
    rotated vector = [r * sin(a)cos(b) + r * cos(a)sin(b), y, r * cos(a)cos(b) - r * sin(a)sin(b), 1]
    rotated vector = [z * sin(a) + x * cos(a), y, z * cos(a) - x * sin(a), 1]

    matrix.rotation(a) * [x, y, z, 1]
    =  [x * cos(a) + y * 0 + z * sin(a) + 1 * 0,
        x * 0 + y * 1 + z * 0 + 1 * 0,
        -x * sin(a) + y * 0 + z * cos(a) + 1 * 0,
        x * 0 + y * 0 + z * 0 + 1 * 1]
    = [x * cos(a) + z * sin(a), y, -x * sin(a) + z * cos(a), 1]
    = rotated vector

    */
}

//rotation matrix rotates vector angle radians around z axis
export function rotationZ(angle) {
    return [
        Math.cos(angle), Math.sin(angle), 0, 0,
        -Math.sin(angle), Math.cos(angle), 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
    ];

    /*
    Explanation
    z remains unchanged, x and y rotate
    let x = r * sin(b), y = r * cos(b), z = z
    rotated vector = [r * sin(a + b), r * cos(a + b), z, 1]
    rotated vector = [r * sin(a)cos(b) + r * cos(a)sin(b), r * cos(a)cos(b) - r * sin(a)sin(b), z, 1]
    rotated vector = [y * sin(a) + x * cos(a), y * cos(a) - x * sin(a), z, 1]

    matrix.rotation(a) * [x, y, z, 1]
    =  [x * cos(a) + -y * sin(a) + z * 0 + 1 * 0,
        x * sin(a) + y * cos(a) + z * 0 + 1 * 0,
        x * 0 + y * 0 + z * 1 + 0 * 1,
        x * 0 + y * 0 + z * 0 + 1 * 1]
    = [x * cos(a) + z * sin(a), -x * sin(a) + z * cos(a), z, 1]
    = rotated vector

    */
}

//scaling matrix scales vector sx units in x direction, sy units in y direction, sz units in z direction
export function scaling(sx, sy, sz) {
    return [
        sx, 0, 0, 0,
        0, sy, 0, 0,
        0, 0, sz, 0,
        0, 0, 0, 1,
    ];

    /*
    Explanation
    matrix.scaling(sx, sy, sy) * [x, y, z, 1] 
    =  [x * sx + y * 0 + z * 0 + 0 * 1, 
        x * 0 + y * sy + z * 0 + 0 * 1, 
        x * 0 + y * 0 + z * sz + 0 * 1,
        x * 0 + y * 0 + z * 0 + 1 * 1]

    = [x * sx, y * sy, z * sy, 1]
    */
}

//orthographic projection matrix projects 3d vectors in box to 2d
export function orthographic(left, right, bottom, top, near, far) {
    return [
        2 / (right - left), 0, 0, 0,
        0, 2 / (top - bottom), 0, 0,
        0, 0, 2 / (far - near), 0,
        -(right + left) / (right - left), -(top + bottom) / (top - bottom), -(far + near) / (far - near), 1,
    ]
    /*
    Explanation
    w = r - l, h = t - b, d = f - n
    midpoint of box mx = (r + l) / 2, my = (t + b) / 2, mz = (f + n) / 2
    matrix.projection(l, r, b, t, n, f) * [x, y, z, 1]
    =  [2 * x / w + y * 0 + z * 0 - (r + l) / w * 1, 
        x * 0 + 2 * y / h + z * 0 - (t - b) / h * 1, 
        x * 0 + y * 0 + 2 * z / d - (f - n) / d * 1,
        x * 0 + y * 0 + z * 0 + 1 * 1]

    = [2 * x / w - 2 * mx / w, 2 * y / h - 2 * my / h, 2 * z / d - 2 * mz / d, 1]
    = [2 * (x - mx) / w, 2 * (y - my) / h, 2 * (x - mz) / d, 1]
    converts [l, r], [b, t] to [-1, 1]
    */
}

//aspect = width / height
export function perspective(fov, aspect, near, far) {
    let f = Math.tan(Math.PI * 0.5 - fov * 0.5);
    //f = 1/tan(fov)
    return [
        f / aspect, 0, 0, 0,
        0, f, 0, 0,
        0, 0, (near + far) / (near - far), -1,
        0, 0, (2 * near * far) / (near - far), 0,
    ]
    //https://stackoverflow.com/questions/28286057/trying-to-understand-the-math-behind-the-perspective-matrix-in-webgl/28301213#28301213

}

//returns identity matrix
export function identity() {
    return [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
    ]
    /*
    Explanation
    matrix.identity() * [x, y, z, 1] 
    =  [x * 1 + y * 0 + z * 0 + 0 * 1, 
        x * 0 + y * 1 + z * 0 + 0 * 1, 
        x * 0 + y * 0 + z * 1 + 0 * 1,
        x * 0 + y * 0 + z * 0 + 1 * 1]

    = [x, y, z, 1]
    returns same matrix
    */
}

//multiplies two 4x4 matrices
export function multiply(m1, m2) {
    let outputMatrix = []
    for (let row = 0; row < 4; row++) {
        for (let column = 0; column < 4; column ++) {
            let value = 0
            for (let j = 0; j < 4; j++) {
                //for each value in matrix
                //dot product of row and column
                value += m1[column + 4 * j] * m2[4 * row + j]
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
    if (size == 1) {
        return matrix[0];
    }
    let minorMatrix = [];
    let matrixDeterminant = determinant(matrix, size);

    for (let row = 0; row < size; row++) {
        for (let column = 0; column < size; column++) {
            let sign = (-1) ** (column + row);
            let cofactorMatrix = cofactor(matrix, row, column, size);
            minorMatrix[row + column * size] = sign * determinant(cofactorMatrix, size - 1) / matrixDeterminant //transposes matrix, swap columns with rows, sign * adjugate / determinant
        }
        
    }
    return minorMatrix;
}

//return determinant of square matrix
export function determinant(matrix, size) {
    if (size == 1) {
        return matrix[0];
    }
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

//cross product of two 3d vectors
export function cross(a, b) {
    return [a[1] * b[2] - a[2] * b[1],
            a[2] * b[0] - a[0] * b[2],
            a[0] * b[1] - a[1] * b[0]];
    //(ay * bz - az * by, az * bx - ax * bz, ax * by - ay * bz)
}

//returns 4D normal vector of v, unit vector in direction v
export function normalizeVector(v) {
    let length = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);

    if (length > 0.001) {
        return [v[0] / length, v[1] / length, v[2] / length];
    }
    else {
        return [0, 0, 0];
    }
}

//returns difference of 4D vectors b - a
export function subtract(a, b) {
    return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

//returns matrix to point camera in direction of target

//TODO FIX CAMERA BREAKING WHEN POINTING UP
export function lookAt(cameraPosition, target) {
    let difference = subtract(cameraPosition, target);
    let up = [0, 0, 1];

    let zAxis = normalizeVector(difference); //z axis is normal vector pointing from camera to target
    let xAxis = normalizeVector(cross(up, zAxis)); //x axis perpendicular to z axis and up


    let yAxis = cross(zAxis, xAxis); //y axis perpendicular to x axis and z axis, automatically has length 1

    return [
        xAxis[0], xAxis[1], xAxis[2], 0,
        yAxis[0], yAxis[1], yAxis[2], 0,
        zAxis[0], zAxis[1], zAxis[2], 0,
        cameraPosition[0], cameraPosition[1], cameraPosition[2], 1,
    ]

    //transforms to new matrix with basis unit vectors xAxis, yAxis, zAxis and translates to place origin at cameraPosition
}
