import { ref } from "vue";

export const equationList = ref([
    {
        equationString: "x * y - 10",
        fieldValue: (x, y) => {
            return x * y - 10;
        },
        color:[255, 0, 0],
    },
    {
        equationString: "x * x + y * y - 9",
        fieldValue: (x, y) => {
            return x * x + y * y - 9;
        },
        color:[0, 0, 255],
    },
    {
        equationString: "y - x * (x - 1) * (x + 3) + 4",
        fieldValue: (x, y) => {
            return y - x * (x - 1) * (x + 3) + 4;
        },
        color:[0, 255, 0],
    },
])

