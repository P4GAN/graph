
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
export default function marchingSquares2d(startX, endX, startY, endY, squareSize, color, fieldValue) {
    let linePositions = [];
    let colors = [];
    let isovalue = 0;

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
                    colors.push(...color, ...color);
                    break;
                case 2: 
                    linePositions.push(...bottomMiddle, ...rightMiddle);
                    colors.push(...color, ...color);
                    break;
                case 4:
                    linePositions.push(...rightMiddle, ...topMiddle);
                    colors.push(...color, ...color);
                    break;
                case 8:
                    linePositions.push(...topMiddle, ...leftMiddle);
                    colors.push(...color, ...color);
                    break;
    
                case 3:
                    linePositions.push(...leftMiddle, ...rightMiddle);
                    colors.push(...color, ...color);
                    break;
                case 6:                
                    linePositions.push(...bottomMiddle, ...topMiddle);
                    colors.push(...color, ...color);
                    break;
                case 9:
                    linePositions.push(...topMiddle, ...bottomMiddle);
                    colors.push(...color, ...color);
                    break;
                case 12:
                    linePositions.push(...rightMiddle, ...leftMiddle);
                    colors.push(...color, ...color);
                    break;
    
                case 5:
                    linePositions.push(...leftMiddle, ...topMiddle);
                    linePositions.push(...rightMiddle, ...bottomMiddle);
                    colors.push(...color, ...color, ...color, ...color);
                    break;
                case 10:
                    linePositions.push(...topMiddle, ...rightMiddle);
                    linePositions.push(...bottomMiddle, ...leftMiddle);
                    colors.push(...color, ...color, ...color, ...color);
                    break;
    
                case 7:
                    linePositions.push(...leftMiddle, ...topMiddle);
                    colors.push(...color, ...color);
                    break;
                case 11:
                    linePositions.push(...topMiddle, ...rightMiddle);
                    colors.push(...color, ...color);
                    break;
                case 13:
                    linePositions.push(...rightMiddle, ...bottomMiddle);
                    colors.push(...color, ...color);
                    break;
                case 14:
                    linePositions.push(...bottomMiddle, ...leftMiddle);
                    colors.push(...color, ...color);
                    break;
    
                case 15:
                    break;
            }
        }

    }

    return { "linePositions": linePositions, "colors": colors};
}

