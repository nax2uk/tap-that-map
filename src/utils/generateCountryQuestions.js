import countryNameList from "../Data/countryNameList";


const checkRepeat = (array) => {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length; j++) {
            if (i !== j) {
                if (array[i] === array[j]) {
                    return false;
                }
            }
        }
    }
    return true;
};

const generateCountryQuestions = (num) => {
    let countryList = [];

    for (let i = 0; i < num; i++) {
        let country =
            countryNameList[Math.round(Math.random() * countryNameList.length)];
        countryList.push(country);
    }
    if (checkRepeat(countryList)) {
        return countryList;
    } else {
        generateCountryQuestions(num);
    }
};

export default generateCountryQuestions;