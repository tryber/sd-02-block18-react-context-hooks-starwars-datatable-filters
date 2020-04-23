const filterResults = (whosFilter, planet) => {
  const filteredResult = whosFilter.map((result) => {
    const filter = (result.name.toUpperCase().includes(planet.toUpperCase()))
  ? result
  : [];
    return filter;
  });
  return filteredResult;
};

const planetAction =
  (planet, data, dataMock, setFilters, setDataMockFilter, setDataMock, filters, MockFilterOn) => {
  let whosFilter = data;
  if (MockFilterOn) {
    whosFilter = dataMock;
  }
  const filteredResult = filterResults(whosFilter, planet);
  const filterWithoutUndefined = filteredResult.filter((element) => element.length !== 0);
  const planetCase = planet.charAt(0).toUpperCase() + planet.substring(1);
  if (MockFilterOn) {
    setFilters([...filters, { name: planetCase }]);
    return setDataMockFilter(filterWithoutUndefined);
  }
  setFilters([...filters, { name: planetCase }]);
  return setDataMock(filterWithoutUndefined);
};

export default planetAction;
