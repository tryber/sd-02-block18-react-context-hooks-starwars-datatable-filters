import React, { useContext, useState } from 'react';
import { SWContext } from '../context/starWarsContext';
import './Table.css';

const generateBody = (data, text) => (
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

const generateTable = (loading, data, error, text) => {
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
        {generateBody(data, text)}
      </table>
    );
  }
  if (error) { return <div>{error}</div>; }
  return <div>Loading...</div>;
};

const Table = () => {
  const [text, setText] = useState('');
  const {
    loading,
    data,
    error,
  } = useContext(SWContext);
  const filterByText = (string) => {
    setText(string);
  };
  return (
    <div>
      <input onChange={(e) => filterByText(e.target.value)} />
      <h2>Filters:</h2>
      {generateTable(loading, data, error, text)}
    </div>
  );
};

export default Table;
