import React from 'react';

import Order from './Order';
import Table from './Table';
import Filters from './Filters';

function Panel() {
  return (
    <div className="complete-panel">
      <Filters />
      <Order />
      <Table />
    </div>
  );
}

export default Panel;
