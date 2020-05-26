import countryNameList from "../Data/countryNameList";

const generateCountryQuestions = (num) => {
  const uniqueIndices = new Set();
  while (uniqueIndices.size < num) {
    const randomIndex = Math.floor(Math.random() * countryNameList.length);
    uniqueIndices.add(randomIndex);
  }

  const countryList = [...uniqueIndices].map(
    (randomIndex) => countryNameList[randomIndex]
  );

  return countryList;
};

export default generateCountryQuestions;
