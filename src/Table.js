import React, { useContext } from 'react';
import SwContext from './Context';

const Table = () => {
  const { planets } = useContext(SwContext);
  console.log(planets);
  return <p>Bão</p>;
};

export default Table;
