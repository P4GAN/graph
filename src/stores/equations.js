import { ref } from "vue";

import { settings } from "@/stores/settings.js"
import math from "@/modules/math.js";

export const equationList = ref([])

export function updateEquation(equationString, index) {
    try {
        equationList.value[index].equationString = equationString;
        equationString = equationString.replaceAll("⋅", "*");
        equationString = equationString.replaceAll("?", ")");
        if (!equationString.includes("=") && !equationString.includes("y")) {
            equationString = "y = " + equationString;
        }
        equationString = equationString.split("=");
        equationString = equationString[0] + "-(" + equationString[1] + ")";
        let functionString = "f(x, y) = ";
        if (settings.value.graphType == "3d") {
            functionString = "f(x, y, z) = ";
        }
        console.log(equationString);
        equationList.value[index].fieldValue = math.evaluate(functionString + equationString);
    }
    catch(err) {
        console.error("invalid equation", err)
        let functionString = "f(x, y) = 0";
        if (settings.value.graphType == "3d") {
            functionString = "f(x, y, z) = 0";
        }
        equationList.value[index].fieldValue = math.evaluate(functionString)
    }
}