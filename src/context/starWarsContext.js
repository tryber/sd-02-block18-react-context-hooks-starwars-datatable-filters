import React, { createContext, useState, useEffect } from 'react';
import fetchPlanetFromServices from '../services/swAPI';

const SWContext = createContext();

const SWProvider = ({ children }) => {
  // state
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState('');
  const [error, setError] = useState(null);
  const [text, setText] = useState('');
  const [filterText, setFilterText] = useState(null);
  // functions
  const handleSWSuccess = (response) => {
    const { results } = response;
    setData(results);
    setLoading(false);
  };
  const handleSWFailure = (response) => {
    setError(response.error.message);
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    fetchPlanetFromServices()
      .then(
        (response) => handleSWSuccess(response),
        (response) => handleSWFailure(response),
      );
  }, []);
  const filterByText = (string) => {
    setText(string);
    setFilterText(
      data.some((planet) => planet.name.toLowerCase().includes(string))
        ? data.filter((planet) => planet.name.toLowerCase().includes(string))
        : null,
    );
    console.log(filterText);
  };
  const generateBody = () => (
    data
      .filter(({ name }) => name.toLowerCase().includes(text.toLowerCase()))
      .map((values) => (
        <tbody key={values.name}>
          <tr>
            {Object.values(values).map((box, index) => (index !== 9
              ? <td className="tableData" data-testid={box} key={box}>{box}</td>
              : null))}
          </tr>
        </tbody>
      )));
  const generateTable = () => {
    if (!loading && data) {
      return (
        <table>
          <thead>
            <tr>
              {Object.keys(data[0]).map((item) => (item !== 'residents'
                ? <th className="tableHeader" key={item}>{item}</th>
                : null))}
            </tr>
          </thead>
          {!filterText
            ? generateBody(data, text)
            : generateBody(filterText, text)}
        </table>
      );
    }
    if (error) { return <div>{error}</div>; }
    return <div>Loading...</div>;
  };
  // export
  const context = {
    generateTable,
    filterByText,
  };
  // render
  return (
    <SWContext.Provider value={context}>
      {children}
    </SWContext.Provider>
  );
};


export { SWContext, SWProvider };
