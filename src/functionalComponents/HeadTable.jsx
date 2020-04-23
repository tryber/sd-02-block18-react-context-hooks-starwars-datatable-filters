import React, { useContext } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';

const Headtable = () => {
  const { data } = useContext(StarWarsContext);

  if (data[0] === undefined) return (<thead><tr><th>Loading...</th></tr></thead>);

  return (
    <thead>
      <tr>
        {Object.keys(data[0]).map((result) => {
          const head = (result !== 'residents')
            ? (<th
              className="headTable"
              data-testid="headT"
              key={result}
            >{result.replace(/_/g, ' ')}
            </th>)
            : null;
          return head;
        })
        }
      </tr>
    </thead>
  );
};

export default Headtable;
