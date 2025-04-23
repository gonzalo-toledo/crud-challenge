import React, { Fragment } from 'react';
import { UnicornsProvider } from './context/UnicornsContext';
import ProductsPage from './products';
import UnicornsPage from './unicorns';

const App = () => (
  <Fragment>
    <UnicornsProvider>
      <UnicornsPage />
    </UnicornsProvider>
    <ProductsPage />
  </Fragment>
);

export default App;
