import countryNameList from "../Data/countryNameList";

const generateCountryQuestions = (num) => {
  const uniqueIndices = new Set();
  while (uniqueIndices.size < num) {
    const randomIndex = Math.round(
      Math.random() * (countryNameList.length - 1)
    );
    uniqueIndices.add(randomIndex);
  }

  const countryList = [...uniqueIndices].map(
    (randomIndex) => countryNameList[randomIndex]
  );

  return countryList;
};

export default generateCountryQuestions;
