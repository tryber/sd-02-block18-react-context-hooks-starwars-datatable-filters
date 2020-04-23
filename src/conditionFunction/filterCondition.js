import conditionFunction from './conditionFunction';

const filterCondition = (newNumeric, data, setDataMock, setDataMockFilter) => {
  const filterStore = newNumeric.filter((element) =>
    !Object.keys(element).includes('name'));
  const mappedMockResult = data.filter((result) => {
    let isValid = true;
    filterStore.forEach((filter) => {
      isValid = isValid && conditionFunction(Number(result[filter.numericValues.column]),
                                            filter.numericValues.comparisson,
                                            Number(filter.numericValues.value));
    });
    return isValid;
  });
  setDataMock(mappedMockResult);
  return setDataMockFilter(mappedMockResult);
};

export default filterCondition;
