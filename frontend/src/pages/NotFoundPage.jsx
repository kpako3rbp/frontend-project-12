import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const NotFoundPage = () => {
  return (
    <Layout>
      <div className="text-center">
        <h1 className="h4 text-muted">Страница не найдена</h1>
        <p className="text-muted">
          Но вы можете перейти <Link to="/">на главную страницу</Link>
        </p>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
