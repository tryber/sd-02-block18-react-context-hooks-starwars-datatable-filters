import React, { useContext } from 'react';
import { SWContext } from '../context/starWarsContext';
import './Table.css';

const generateBody = (data) => {
  data
    .map((values) => (
      <tbody key={values.name}>
        <tr>
          {Object.values(values).map((box, index) => (index !== 9
            ? <td className="tableData" key={box}>{box}</td>
            : null))}
        </tr>
      </tbody>
    ));
};
const generateTable = (loading, data, error) => {
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
        {generateBody(data)}
      </table>
    );
  }
  if (error) { return <div>{error}</div>; }
  return <div>Loading...</div>;
};

const Table = () => {
  const { data } = useContext(SWContext);
  console.log(data);
  return (
    <div>
      <h1>XABLAAAAAAAAAU</h1>
      <input />
      <h2>Filters:</h2>
      {generateTable(data)}
    </div>
  );
};

export default Table;
