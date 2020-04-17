import React, { useContext } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';

const Headtable = () => {
  const { data } = useContext(StarWarsContext);

  if (data[0] === undefined) return (<div>Loading...</div>);

  return (
    <thead>
      <tr>
        {Object.keys(data[0]).map((result) => (result !== 'residents')
          ? <th className="headTable" key={result.replace(/_/g, ' ')}>{result}</th>
          : null)
        }
      </tr>
    </thead>
  );
};

export default Headtable;
