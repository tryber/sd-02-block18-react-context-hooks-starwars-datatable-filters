import React, { useContext } from 'react';

import Dropdown from './Dropdown';
import StarWarsContext from '../context/StarWarsContext';


function Orders() {
  const { params, filterOrderTypeFunc, filterOrderTagFunc } = useContext(StarWarsContext);

  function handle(e) {
    const type = e.target.name;
    filterOrderTypeFunc(type);
  }

  return (
    <div className="comp_order">
      <Dropdown
        name="Order:"
        arr={params}
        func={filterOrderTagFunc}
        testid="type"
      />
      <div>
        <button type="button" name="ASC" onClick={(e) => handle(e)}>Asc</button>
        <button type="button" name="DESC" onClick={(e) => handle(e)}>Desc</button>
      </div>
    </div>
  );
}

export default Orders;
