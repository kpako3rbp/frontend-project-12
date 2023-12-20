import React from 'react';
import './index.scss';
import { ToastContainer } from 'react-toastify';

import Layout from '../components/Layout.jsx';
import Routing from '../pages/index.jsx';

const App = () => (
  <>
    <Layout>
      <Routing />
    </Layout>
    <ToastContainer />
  </>
);

export default App;
