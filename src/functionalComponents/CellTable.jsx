import React, { useContext } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';

const CellTable = () => {
  const { data } = useContext(StarWarsContext);
  console.log(data);
  return (
    data.map((result) => (
      <tbody key={result.name}>
        <tr>
          {Object.values(result).map((item, index) => {
            if (index !== 9) {
              return (
                <td key={item}>{item}</td>
              );
            }
            return null;
          })}
        </tr>
      </tbody>
    ))
  );
};

export default CellTable;
