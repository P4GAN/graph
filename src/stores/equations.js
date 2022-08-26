import { ref } from "vue";

import { settings } from "@/stores/settings.js"
import math from "@/modules/math.js";

//stores equation objects, with each containing equation string, id, color and equation function
export const equationList = ref([])

//updates list with new edited equation
export function updateEquation(equationString, index) {
    //math.js may not cause issues on invalid equation, therefore try catch loop is used to handle invalid equation
    try {
        equationList.value[index].equationString = equationString;
        //converts mathlive input to math.js parsing
        equationString = equationString.replaceAll("⋅", "*");
        equationString = equationString.replaceAll("?", ")");
        if (!equationString.includes("=") && !equationString.includes("y") && settings.value.graphType == "2d") {
            equationString = "y = " + equationString;
        }
        equationString = equationString.split("=");
        equationString = equationString[0] + "-(" + equationString[1] + ")";
        let functionString = "f(x, y) = ";
        if (settings.value.graphType == "3d") {
            functionString = "f(x, y, z) = ";
        }
        equationString = equationString.replaceAll(" ", "");

        console.log(equationString);
        equationList.value[index].fieldValue = math.evaluate(functionString + equationString);
    }
    //if invalid equation, graph nothing, which is achieved by having the function return 0
    catch(err) {
        console.error("invalid equation", err)
        let functionString = "f(x, y) = 0";
        if (settings.value.graphType == "3d") {
            functionString = "f(x, y, z) = 0";
        }
        equationList.value[index].fieldValue = math.evaluate(functionString)
    }
}